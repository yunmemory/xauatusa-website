import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { motion, useInView, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Fade-and-rise when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Number that counts up once it becomes visible. */
export function CountUp({ to, from = 0, duration = 1.8, suffix = '' }: { to: number; from?: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setV(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      const e = 1 - Math.pow(1 - p, 4)
      setV(Math.round(from + (to - from) * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to, from, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  )
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Hero background: scattered stars drift in and settle onto concentric orbits
 * around the emblem — "each shines alone; drawn to one center, a constellation".
 */
export function Constellation({ anchor, className }: { anchor: RefObject<HTMLElement | null>; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const RINGS = [1.2, 1.52, 1.92, 2.42, 3.05]
    type P = { sx: number; sy: number; ring: number; jit: number; a: number; sp: number; size: number; star: boolean; tw: number; gold: boolean; delay: number }
    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let R = 160
    let ps: P[] = []
    let raf = 0
    let visible = true
    const t0 = performance.now()

    const measure = () => {
      const r = cv.getBoundingClientRect()
      w = r.width
      h = r.height
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const a = anchor.current?.getBoundingClientRect()
      if (a && a.width > 0) {
        cx = a.left + a.width / 2 - r.left
        cy = a.top + a.height / 2 - r.top
        R = a.width / 2
      } else {
        cx = w / 2
        cy = h * 0.38
        R = Math.min(w, h) * 0.18
      }
    }

    const seed = () => {
      const rand = mulberry32(20261109)
      const n = w < 640 ? 80 : 170
      ps = Array.from({ length: n }, () => {
        const ring = Math.min(RINGS.length - 1, Math.floor(Math.pow(rand(), 0.8) * RINGS.length))
        const star = rand() < 0.07
        return {
          sx: (rand() * 1.3 - 0.15) * w,
          sy: (rand() * 1.3 - 0.15) * h,
          ring,
          jit: (rand() - 0.5) * 0.1,
          a: rand() * Math.PI * 2,
          sp: (0.035 + rand() * 0.03) / (0.7 + ring * 0.35),
          size: star ? 3.5 + rand() * 3 : 0.7 + rand() * 1.6,
          star,
          tw: rand() * Math.PI * 2,
          gold: rand() < 0.65,
          delay: rand() * 0.9,
        }
      })
    }

    const starPath = (x: number, y: number, r: number, rot: number) => {
      ctx.beginPath()
      for (let i = 0; i < 10; i++) {
        const rr = i % 2 === 0 ? r : r * 0.42
        const an = rot + (i * Math.PI) / 5 - Math.PI / 2
        const px = x + Math.cos(an) * rr
        const py = y + Math.sin(an) * rr
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const draw = (now: number) => {
      const s = reduce ? 60 : (now - t0) / 1000
      ctx.clearRect(0, 0, w, h)

      const g = Math.min(1, Math.max(0, (s - 0.6) / 2.4))
      const ge = 1 - Math.pow(1 - g, 3)
      ctx.lineWidth = 1
      RINGS.forEach((k, i) => {
        ctx.beginPath()
        ctx.arc(cx, cy, R * k, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200,155,90,${(0.3 - i * 0.045) * ge})`
        ctx.setLineDash(i >= 3 ? [2, 8] : [])
        ctx.stroke()
      })
      ctx.setLineDash([])

      for (const p of ps) {
        const k0 = Math.min(1, Math.max(0, (s - p.delay) / 2.8))
        const k = 1 - Math.pow(1 - k0, 4)
        const rad = R * (RINGS[p.ring] + p.jit)
        const ang = p.a + p.sp * s
        const ox = cx + Math.cos(ang) * rad
        const oy = cy + Math.sin(ang) * rad
        const x = p.sx + (ox - p.sx) * k
        const y = p.sy + (oy - p.sy) * k
        const tw = 0.62 + 0.38 * Math.sin(p.tw + s * 1.4)
        const alpha = (0.2 + 0.8 * k0) * tw * (p.star ? 0.9 : 0.75)
        ctx.fillStyle = p.gold ? `rgba(200,155,90,${alpha})` : `rgba(156,104,69,${alpha * 0.85})`
        if (p.star) {
          starPath(x, y, p.size, ang * 0.6)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(x, y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const restart = () => {
      cancelAnimationFrame(raf)
      measure()
      seed()
      raf = requestAnimationFrame(draw)
    }
    restart()

    const ro = new ResizeObserver(restart)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(cv)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [anchor, reduce])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}

/** Scattered twinkling dots for dark sections. */
export function Twinkles({ count = 70, className = '' }: { count?: number; className?: string }) {
  const dots = useMemo(() => {
    const rand = mulberry32(1895)
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2.2,
      dur: 2.5 + rand() * 4,
      delay: rand() * 5,
    }))
  }, [count])
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-brand-gold"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: 0.15,
            animation: `twinkle ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Unit({ children, progress, start, end }: { children: ReactNode; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/** Text that lights up unit by unit as the scroll progress advances. */
export function ScrollLitText({
  lines,
  progress,
  byWord,
  from = 0.08,
  to = 0.7,
}: {
  lines: string[][]
  progress: MotionValue<number>
  byWord: boolean
  from?: number
  to?: number
}) {
  const groups = lines.map((g) => g.map((l) => (byWord ? l.split(' ').map((w) => w + ' ') : Array.from(l))))
  const total = groups.reduce((n, g) => n + g.reduce((m, u) => m + u.length, 0), 0)
  let i = 0
  return (
    <>
      {groups.map((g, gi) => (
        <span key={gi} className="block">
          {g.map((u, li) => (
            <span key={li} className="block sm:inline">
              {u.map((ch, ci) => {
                const start = from + ((to - from) * i) / total
                const end = from + ((to - from) * (i + 1.5)) / total
                i++
                return (
                  <Unit key={ci} progress={progress} start={start} end={Math.min(1, end)}>
                    {ch}
                  </Unit>
                )
              })}
            </span>
          ))}
        </span>
      ))}
    </>
  )
}
