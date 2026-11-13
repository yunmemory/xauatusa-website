import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, BookOpen, ChevronDown, ChevronRight, Globe, HeartHandshake, Landmark, Link2, Mail, Menu, Sprout, X } from 'lucide-react'
import seal from '@/assets/seal-hd.webp'
import { content, EMAIL, type Lang } from '@/content'
import { bylaws, BYLAWS_VERSION } from '@/bylaws'
import { Constellation, CountUp, EASE, Reveal, ScrollLitText, Twinkles } from '@/fx'

type C = (typeof content)['zh']

const MISSION_ICONS = [Link2, HeartHandshake, Landmark, BookOpen, Sprout, Globe]
const COUNTS: ({ to: number; from?: number; suffix?: string } | null)[] = [{ to: 100, suffix: '+' }, null, null, { to: 2026, from: 1956 }]

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.8l2.95 6.6 7.2.66-5.45 4.8 1.62 7.05L12 17.2l-6.32 3.71 1.62-7.05-5.45-4.8 7.2-.66z" fill="currentColor" />
    </svg>
  )
}

function Heading({ eyebrow, title, light = false, center = false }: { eyebrow: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      <div className={`text-[15px] font-semibold tracking-[0.02em] ${light ? 'text-brand-gold' : 'text-brand'}`}>{eyebrow}</div>
      <h2
        className={`mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[56px] lg:text-[64px] ${
          light ? 'text-brand-ivory' : 'text-brand-ink'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  )
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  if (typeof window !== 'undefined' && window.location.hash === '#en') return 'en'
  return 'zh'
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ c, isZh }: { c: C; isZh: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const sealBox = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const skyOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 90, damping: 16 })
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 90, damping: 16 })
  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  const line = (delay: number) => ({
    initial: { y: '115%' },
    animate: { y: '0%' },
    transition: { duration: 1.1, ease: EASE, delay },
  })
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-20 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 34%, rgba(245,227,206,0.95) 0%, rgba(251,246,238,0) 70%)' }}
      />
      <motion.div style={{ opacity: skyOpacity }} className="pointer-events-none absolute inset-0">
        <Constellation anchor={sealBox} className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y, scale, opacity }} className="relative flex flex-col items-center">
        <div ref={sealBox} className="h-[min(32svh,290px)] w-[min(32svh,290px)] sm:h-[min(33svh,330px)] sm:w-[min(33svh,330px)]" style={{ perspective: 900 }}>
          <motion.div
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, scale: 0.62, rotate: -24, filter: 'blur(18px)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
            className="relative h-full w-full"
          >
            <img
              src={seal}
              alt={c.nameFull}
              width={1278}
              height={1278}
              className="h-full w-full drop-shadow-[0_24px_48px_rgba(92,58,34,0.28)]"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <div
                className="absolute -inset-y-1/4 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                style={{ animation: 'sheen 1.5s cubic-bezier(0.22,1,0.36,1) 1.5s 1 both' }}
              />
            </div>
          </motion.div>
        </div>

        <h1 className="mt-9 text-brand-ink sm:mt-11">
          <span className="block overflow-hidden pb-1">
            <motion.span
              {...line(0.55)}
              className={`block font-medium text-brand-deep ${isZh ? 'text-[22px] tracking-[0.08em] sm:text-[30px]' : 'text-[17px] sm:text-[23px]'}`}
            >
              {c.hero.titleTop}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3">
            <motion.span
              {...line(0.68)}
              className={`text-gradient block font-bold leading-[1.08] tracking-[-0.02em] ${
                isZh ? 'text-[clamp(60px,15.5vw,132px)]' : 'text-[clamp(38px,8.6vw,92px)]'
              }`}
            >
              {c.hero.titleBottom}
            </motion.span>
          </span>
        </h1>

        <motion.p {...fade(1.05)} className="mt-2 text-[13px] font-medium uppercase tracking-[0.3em] text-brand-stone sm:text-[14px]">
          {c.nameEn}
        </motion.p>

        <motion.div {...fade(1.2)} className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <a
            href="#join"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[18px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(156,104,69,0.7)] transition-all duration-300 hover:bg-brand-deep active:scale-[0.97]"
          >
            {c.hero.ctaJoin}
          </a>
          <a href="#about" className="group inline-flex items-center gap-1 text-[18px] font-medium text-brand transition-colors hover:text-brand-deep">
            {c.hero.ctaMore}
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div {...fade(1.35)} className="mt-8 inline-flex items-center gap-2.5 text-[15px] text-brand-deep/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          {c.hero.status}
        </motion.div>
      </motion.div>

      <motion.a
        href="#statement"
        aria-label={c.hero.scroll}
        style={{ opacity: skyOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-brand/60"
      >
        <ChevronDown className="h-6 w-6" style={{ animation: 'bob 2s ease-in-out infinite' }} />
      </motion.a>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Statement: the tagline lights up as you scroll                      */
/* ------------------------------------------------------------------ */

function Statement({ c, isZh }: { c: C; isZh: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.25])
  const ringOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.6, 0.9])
  const lit: MotionValue<number> = useTransform(scrollYProgress, (v) => (reduce ? 1 : v))

  return (
    <section ref={ref} id="statement" className="night relative h-[230vh] text-brand-ivory">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6">
        <Twinkles />
        <motion.svg
          viewBox="0 0 800 800"
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="pointer-events-none absolute h-[150vmin] w-[150vmin]"
          aria-hidden="true"
        >
          <g style={{ transformOrigin: 'center', animation: 'spin-slow 160s linear infinite' }}>
            {[150, 215, 285, 360].map((r, i) => (
              <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#C89B5A" strokeOpacity={0.5 - i * 0.09} strokeWidth="1" strokeDasharray={i === 3 ? '2 9' : undefined} />
            ))}
            {[0, 72, 144, 216, 288].map((deg) => {
              const a = ((deg - 90) * Math.PI) / 180
              return <circle key={deg} cx={400 + 285 * Math.cos(a)} cy={400 + 285 * Math.sin(a)} r="3.5" fill="#E9C891" />
            })}
          </g>
        </motion.svg>
        <p
          className={`relative mx-auto max-w-[1100px] text-center font-semibold leading-[1.4] tracking-[-0.01em] ${
            isZh ? 'text-[clamp(30px,6.4vw,72px)]' : 'text-[clamp(26px,4.6vw,56px)]'
          }`}
        >
          <ScrollLitText
            lines={c.hero.tagline.map((l) => {
              const k = isZh ? l.indexOf('，') : -1
              return k > 0 ? [l.slice(0, k + 1), l.slice(k + 1)] : [l]
            })}
            progress={lit}
            byWord={!isZh}
          />
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Emblem story: pinned stage that zooms into each detail              */
/* ------------------------------------------------------------------ */

const VIEW = {
  full: { s: 1, fx: 0.5, fy: 0.5 },
  arch: { s: 2.25, fx: 0.5, fy: 0.655 },
  star: { s: 3.1, fx: 0.5, fy: 0.475 },
  ring: { s: 1.7, fx: 0.5, fy: 0.33 },
}
const SEQ = [VIEW.full, VIEW.full, VIEW.arch, VIEW.arch, VIEW.star, VIEW.star, VIEW.ring, VIEW.ring, VIEW.full, VIEW.full]
const STOPS = [0, 0.14, 0.24, 0.36, 0.46, 0.58, 0.68, 0.8, 0.9, 1]
const WINDOWS: [number, number][] = [
  [0.2, 0.38],
  [0.42, 0.6],
  [0.64, 0.82],
  [0.86, 1.2],
]

function StoryStep({ p, win, children }: { p: MotionValue<number>; win: [number, number]; children: ReactNode }) {
  const opacity = useTransform(p, [win[0] - 0.05, win[0], win[1], win[1] + 0.05], [0, 1, 1, 0])
  const y = useTransform(p, [win[0] - 0.05, win[0], win[1], win[1] + 0.05], [36, 0, 0, -36])
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? 'auto' : 'none'))
  return (
    <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.div>
  )
}

function StoryDot({ p, win }: { p: MotionValue<number>; win: [number, number] }) {
  const w = useTransform(p, [win[0] - 0.05, win[0], win[1], win[1] + 0.05], [8, 28, 28, 8])
  const o = useTransform(p, [win[0] - 0.05, win[0], win[1], win[1] + 0.05], [0.3, 1, 1, 0.3])
  return <motion.span style={{ width: w, opacity: o }} className="h-2 rounded-full bg-brand" />
}

function Palette({ c }: { c: C }) {
  return (
    <div className="mt-7 grid grid-cols-6 gap-2 sm:gap-3">
      {c.emblem.palette.map((sw) => (
        <div key={sw.hex}>
          <div className="aspect-square rounded-2xl border border-black/5 shadow-sm" style={{ background: sw.hex }} />
          <div className="mt-2 hidden text-[12px] font-medium text-brand-ink sm:block">{sw.n}</div>
          <div className="mt-1 text-[10px] tracking-wide text-brand-stone sm:mt-0 sm:text-[11px]">{sw.hex}</div>
        </div>
      ))}
    </div>
  )
}

function EmblemStory({ c }: { c: C }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, STOPS, SEQ.map((v) => v.s))
  const x = useTransform(p, STOPS, SEQ.map((v) => `${(0.5 - v.fx) * 100 * v.s}%`))
  const y = useTransform(p, STOPS, SEQ.map((v) => `${(0.5 - v.fy) * 100 * v.s}%`))
  const introOpacity = useTransform(p, [0, 0.12, 0.17], [1, 1, 0])
  const introY = useTransform(p, [0.12, 0.17], [0, -36])
  const introPE = useTransform(introOpacity, (o) => (o > 0.5 ? 'auto' : 'none'))

  if (reduce) {
    return (
      <section id="emblem" className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
          <div className="mx-auto w-full max-w-[420px] rounded-[44px] bg-gradient-to-b from-brand-apricot to-brand-ivory p-10">
            <img src={seal} alt={c.nameFull} className="w-full" />
          </div>
          <div>
            <Heading eyebrow={c.emblem.eyebrow} title={c.emblem.title} />
            <p className="mt-5 text-[21px] text-brand-deep">{c.emblem.lead}</p>
            <p className="mt-2 text-[16px] text-brand-stone">{c.emblem.voted}</p>
            <div className="mt-8 space-y-6">
              {c.emblem.points.map((pt) => (
                <div key={pt.en}>
                  <div className="text-[13px] font-semibold tracking-[0.2em] text-brand-gold">{pt.en}</div>
                  <p className="mt-1 text-[18px] leading-[1.75] text-brand-ink/80">{pt.d}</p>
                </div>
              ))}
            </div>
            <Palette c={c} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="emblem" className="relative h-[460vh] bg-white">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-rows-[auto_1fr] items-center gap-6 px-5 pt-16 sm:px-8 md:grid-cols-2 md:grid-rows-1 md:gap-16 md:pt-10">
          {/* stage */}
          <div className="relative mx-auto aspect-square w-[min(74vw,40svh)] overflow-hidden rounded-[36px] bg-gradient-to-b from-brand-apricot to-brand-ivory shadow-[0_40px_80px_-40px_rgba(92,58,34,0.45)] md:w-full md:max-w-[520px] md:rounded-[56px]">
            <motion.img
              src={seal}
              alt={c.nameFull}
              width={1278}
              height={1278}
              style={{ scale, x, y }}
              className="absolute inset-[11%] h-[78%] w-[78%] will-change-transform"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-brand/10" />
          </div>

          {/* copy */}
          <div className="relative h-[40svh] min-h-[300px] md:h-[440px]">
            <motion.div style={{ opacity: introOpacity, y: introY, pointerEvents: introPE }} className="absolute inset-0 flex flex-col justify-center">
              <div className="text-[15px] font-semibold text-brand">{c.emblem.eyebrow}</div>
              <h2 className="mt-3 text-[44px] font-semibold leading-[1.08] tracking-[-0.015em] text-brand-ink sm:text-[64px] lg:text-[76px]">
                {c.emblem.title}
              </h2>
              <p className="mt-5 text-[20px] leading-[1.6] text-brand-deep sm:text-[24px]">{c.emblem.lead}</p>
              <p className="mt-3 text-[16px] text-brand-stone">{c.emblem.voted}</p>
              <p className="mt-8 flex items-center gap-2 text-[15px] text-brand/80">
                <ChevronDown className="h-4 w-4" style={{ animation: 'bob 2s ease-in-out infinite' }} />
                {c.emblem.hint}
              </p>
            </motion.div>

            {c.emblem.points.map((pt, i) => (
              <StoryStep key={pt.en} p={p} win={WINDOWS[i]}>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-apricot text-[26px] font-semibold text-brand sm:h-16 sm:w-16 sm:text-[30px]">
                    {pt.k}
                  </span>
                  <span className="text-[14px] font-semibold tracking-[0.28em] text-brand-gold">{pt.en}</span>
                </div>
                <p className="mt-6 text-[22px] font-medium leading-[1.55] tracking-[-0.005em] text-brand-ink sm:text-[30px] sm:leading-[1.45]">{pt.d}</p>
                {i === 3 && <Palette c={c} />}
              </StoryStep>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {WINDOWS.map((w, i) => (
            <StoryDot key={i} p={p} win={w} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Timeline with a line that fills as you scroll                       */
/* ------------------------------------------------------------------ */

function Timeline({ c }: { c: C }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 85%'] })
  const nowRef = useRef<HTMLLIElement>(null)
  const [cap, setCap] = useState(0.5)
  useEffect(() => {
    const measure = () => {
      const ol = ref.current
      const li = nowRef.current
      if (ol && li && ol.offsetHeight > 24) setCap(Math.min(1, (li.offsetTop + 4) / (ol.offsetHeight - 24)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [c])
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const fill = useTransform(smooth, (v) => v * cap)
  return (
    <section id="timeline" className="bg-brand-ivory py-24 sm:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Heading eyebrow={c.timeline.eyebrow} title={c.timeline.title} center />
        <ol ref={ref} className="relative mt-16 sm:mt-20">
          <div className="absolute bottom-3 left-[13px] top-3 w-[2px] rounded-full bg-brand/15 sm:left-[15px]" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-3 left-[13px] top-3 w-[2px] origin-top rounded-full bg-gradient-to-b from-brand to-brand-gold sm:left-[15px]"
          />
          {c.timeline.steps.map((s, i) => {
            const label = s.state === 'done' ? c.timeline.done : s.state === 'now' ? c.timeline.now : c.timeline.next
            return (
              <li key={s.t} ref={s.state === 'now' ? nowRef : undefined} className="relative pb-12 pl-12 last:pb-0 sm:pl-16">
                <span
                  className={`absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                    s.state === 'done'
                      ? 'bg-brand text-white'
                      : s.state === 'now'
                        ? 'bg-brand-gold text-brand-ink ring-[6px] ring-brand-gold/25'
                        : 'border-2 border-brand/25 bg-brand-ivory text-brand/30'
                  }`}
                >
                  <Star className="h-3.5 w-3.5" />
                </span>
                <Reveal delay={0.05 * i}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[16px] font-medium text-brand">{s.when}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${
                        s.state === 'done'
                          ? 'bg-brand/10 text-brand'
                          : s.state === 'now'
                            ? 'bg-brand-gold/25 text-brand-deep'
                            : 'bg-black/5 text-brand-stone'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.01em] text-brand-ink sm:text-[34px]">{s.t}</h3>
                  <p className="mt-2 max-w-2xl text-[18px] leading-[1.75] text-brand-ink/70">{s.d}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openCh, setOpenCh] = useState<boolean[]>(() => bylaws.map((_, i) => i === 0))
  const allOpen = openCh.every(Boolean)
  const c = content[lang]
  const isZh = lang === 'zh'

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang, isZh])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(c.join.mailSubject)}&body=${encodeURIComponent(c.join.mailBody)}`
  const toggleLang = () => setLang(isZh ? 'en' : 'zh')

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* ---------------- nav ---------------- */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
            scrolled || menuOpen ? 'glass border-b border-black/5' : 'border-b border-transparent'
          }`}
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a href="#top" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <img src={seal} alt="" className="h-8 w-8" width={32} height={32} />
              <span className="text-[16px] font-semibold tracking-[-0.01em] text-brand-ink">{c.nameShort}</span>
            </a>
            <nav className="hidden items-center gap-7 lg:flex">
              {c.nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="text-[15px] text-brand-ink/75 transition-colors hover:text-brand">
                  {n.label}
                </a>
              ))}
              <button
                onClick={toggleLang}
                className="rounded-full bg-black/5 px-3.5 py-1.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-brand hover:text-white"
                aria-label={isZh ? 'Switch to English' : '切换到中文'}
              >
                {c.langSwitch}
              </button>
            </nav>
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleLang}
                className="rounded-full bg-black/5 px-3.5 py-1.5 text-[14px] font-medium text-brand-ink"
                aria-label={isZh ? 'Switch to English' : '切换到中文'}
              >
                {c.langSwitch}
              </button>
              <button onClick={() => setMenuOpen((v) => !v)} className="-mr-2 rounded-full p-2 text-brand-ink" aria-label="Menu" aria-expanded={menuOpen}>
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-brand to-brand-gold" />
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex flex-col bg-brand-ivory px-8 pt-24 lg:hidden"
            >
              {c.nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.06 }}
                  className="flex items-center justify-between border-b border-black/5 py-5 text-[30px] font-semibold tracking-[-0.01em] text-brand-ink"
                >
                  {n.label}
                  <ChevronRight className="h-6 w-6 text-brand-gold" />
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        <main>
          <Hero c={c} isZh={isZh} />
          <Statement c={c} isZh={isZh} />

          {/* ---------------- about ---------------- */}
          <section id="about" className="bg-white py-24 sm:py-36">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
                <Heading eyebrow={c.about.eyebrow} title={c.about.title} />
                <div>
                  {c.about.body.map((para, i) => (
                    <Reveal key={para} delay={0.1 * i}>
                      <p className={`mb-6 leading-[1.75] ${i === 0 ? 'text-[22px] font-medium text-brand-ink sm:text-[26px] sm:leading-[1.6]' : 'text-[19px] text-brand-ink/70 sm:text-[20px]'}`}>
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <dl className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-5 lg:grid-cols-4">
                {c.about.stats.map((s, i) => {
                  const k = COUNTS[i]
                  return (
                    <Reveal key={s.label} delay={0.08 * i}>
                      <div className="card-lift flex h-full flex-col justify-between rounded-[28px] bg-brand-ivory p-6 sm:p-8">
                        <dt className={`text-gradient font-bold leading-none tracking-[-0.03em] ${s.value.length > 5 ? 'text-[34px] sm:text-[46px]' : 'text-[46px] sm:text-[68px]'}`}>
                          {k ? <CountUp to={k.to} from={k.from} suffix={k.suffix} /> : s.value}
                        </dt>
                        <dd className="mt-6 text-[16px] leading-snug text-brand-ink/65 sm:mt-10 sm:text-[17px]">{s.label}</dd>
                      </div>
                    </Reveal>
                  )
                })}
              </dl>
            </div>
          </section>

          {/* ---------------- mission ---------------- */}
          <section id="mission" className="bg-brand-ivory py-24 sm:py-36">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <Heading eyebrow={c.mission.eyebrow} title={c.mission.title} center />
              <Reveal delay={0.1}>
                <p className="mt-5 text-center text-[21px] text-brand-deep sm:text-[24px]">{c.mission.lead}</p>
              </Reveal>
              <ul className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {c.mission.items.map((m, i) => {
                  const Icon = MISSION_ICONS[i]
                  return (
                    <li key={m.t}>
                      <Reveal delay={0.07 * (i % 3)} className="h-full">
                        <div className="card-soft card-lift group h-full rounded-[28px] bg-white p-8 sm:p-9">
                          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-apricot text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                            <Icon className="h-7 w-7" strokeWidth={1.75} />
                          </span>
                          <h3 className="mt-7 text-[26px] font-semibold tracking-[-0.01em] text-brand-ink">{m.t}</h3>
                          <p className="mt-3 text-[18px] leading-[1.7] text-brand-ink/70">{m.d}</p>
                        </div>
                      </Reveal>
                    </li>
                  )
                })}
              </ul>

              <Reveal className="mt-5">
                <div className="night relative overflow-hidden rounded-[36px] p-8 text-brand-ivory sm:p-14">
                  <Twinkles count={40} />
                  <h3 className="relative text-[30px] font-semibold tracking-[-0.01em] sm:text-[40px]">{c.mission.programsTitle}</h3>
                  <div className="no-scrollbar relative -mx-8 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                    {c.mission.programs.map((pr, i) => (
                      <div key={pr.t} className="w-[76%] flex-none snap-start rounded-3xl bg-white/[0.07] p-6 sm:w-auto sm:rounded-none sm:bg-transparent sm:p-0">
                        <div className="text-[14px] font-semibold tabular-nums text-brand-gold/80">{String(i + 1).padStart(2, '0')}</div>
                        <div className="text-gradient-gold mt-2 text-[24px] font-semibold">{pr.t}</div>
                        <p className="mt-3 text-[17px] leading-[1.7] text-brand-apricot/75">{pr.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <EmblemStory c={c} />
          <Timeline c={c} />

          {/* ---------------- bylaws ---------------- */}
          <section id="bylaws" className="bg-white py-24 sm:py-36">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <Heading eyebrow={c.bylaws.eyebrow} title={c.bylaws.title} />
                  <Reveal delay={0.1}>
                    <div className="mt-4 inline-block rounded-full bg-brand/10 px-3 py-1 text-[14px] font-medium text-brand">{BYLAWS_VERSION}</div>
                    <p className="mt-6 text-[18px] leading-[1.8] text-brand-ink/75">{c.bylaws.lead}</p>
                    {c.bylaws.langNote && <p className="mt-4 rounded-2xl bg-brand-ivory p-4 text-[16px] leading-[1.7] text-brand-deep">{c.bylaws.langNote}</p>}
                    <ul className="mt-6 space-y-3">
                      {c.bylaws.notes.map((n) => (
                        <li key={n} className="flex gap-3 text-[16px] leading-[1.7] text-brand-ink/65">
                          <Star className="mt-[7px] h-3 w-3 flex-none text-brand-gold" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 break-words text-[16px] leading-[1.7] text-brand-ink/65">
                      {c.bylaws.feedback}
                      <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.bylaws.mailSubject)}`} className="font-medium text-brand underline-offset-4 hover:underline">
                        {EMAIL}
                      </a>
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={0.15}>
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => setOpenCh(bylaws.map(() => !allOpen))}
                      className="rounded-full bg-black/5 px-5 py-2 text-[15px] font-medium text-brand-ink transition-colors hover:bg-brand hover:text-white"
                    >
                      {allOpen ? c.bylaws.collapseAll : c.bylaws.expandAll}
                    </button>
                  </div>
                  <div className="space-y-3" lang="zh-CN">
                    {bylaws.map((ch, i) => {
                      const sp = ch.title.indexOf(' ')
                      const num = sp > 0 ? ch.title.slice(0, sp) : ''
                      const name = sp > 0 ? ch.title.slice(sp + 1) : ch.title
                      return (
                        <details
                          key={ch.title}
                          open={openCh[i]}
                          onToggle={(e) => {
                            const o = (e.currentTarget as HTMLDetailsElement).open
                            setOpenCh((prev) => (prev[i] === o ? prev : prev.map((v, j) => (j === i ? o : v))))
                          }}
                          className="group rounded-[24px] bg-brand-ivory transition-colors duration-300 open:bg-brand-apricot/50"
                        >
                          <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
                            <span className="w-[62px] flex-none text-[14px] font-semibold text-brand-gold">{num}</span>
                            <span className="flex-1 text-[20px] font-semibold leading-snug text-brand-ink sm:text-[22px]">{name}</span>
                            <span className="hidden flex-none text-[14px] text-brand-stone sm:inline">
                              {ch.articles.length} {c.bylaws.articles}
                            </span>
                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-brand transition-transform duration-500 group-open:rotate-180">
                              <ChevronDown className="h-5 w-5" />
                            </span>
                          </summary>
                          <ol className="space-y-5 px-6 pb-8 pt-1 sm:px-8">
                            {ch.articles.map((a) => (
                              <li key={a.no} className="text-[17px] leading-[1.85] text-brand-ink/80 sm:text-[18px]">
                                <span className="mr-2 font-semibold text-brand">{a.no}</span>
                                {a.text}
                              </li>
                            ))}
                          </ol>
                        </details>
                      )
                    })}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ---------------- join ---------------- */}
          <section id="join" className="night relative overflow-hidden py-24 text-brand-ivory sm:py-36">
            <Twinkles />
            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Reveal>
                  <img src={seal} alt="" className="mx-auto h-24 w-24 drop-shadow-[0_0_40px_rgba(200,155,90,0.45)] sm:h-28 sm:w-28" width={112} height={112} />
                </Reveal>
                <div className="mt-8">
                  <Heading eyebrow={c.join.eyebrow} title={c.join.title} light center />
                </div>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-[19px] leading-[1.8] text-brand-apricot/80 sm:text-[21px]">{c.join.who}</p>
                </Reveal>
              </div>

              <ol className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3 md:gap-5">
                {c.join.steps.map((s, i) => (
                  <li key={s.t}>
                    <Reveal delay={0.1 * i} className="h-full">
                      <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1]">
                        <span className="text-gradient-gold text-[56px] font-bold leading-none tracking-[-0.03em]">{i + 1}</span>
                        <h3 className="mt-5 text-[24px] font-semibold">{s.t}</h3>
                        <p className="mt-3 break-words text-[17px] leading-[1.75] text-brand-apricot/75">{s.d}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>

              <Reveal className="mt-14 text-center">
                <a
                  href={mailto}
                  className="inline-flex items-center gap-3 rounded-full bg-brand-gold px-9 py-4 text-[19px] font-semibold text-brand-ink shadow-[0_14px_40px_-12px_rgba(200,155,90,0.8)] transition-all duration-300 hover:bg-[#e2bb7e] active:scale-[0.97]"
                >
                  <Mail className="h-5 w-5" />
                  {c.join.cta}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <div className="mt-6 text-[16px] text-brand-apricot/65">
                  {c.join.contact}
                  {isZh ? '：' : ': '}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-brand-gold underline-offset-4 hover:underline">
                    {EMAIL}
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ---------------- footer ---------------- */}
        <footer className="bg-[#0b111f] py-10 text-brand-apricot/55">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img src={seal} alt="" className="h-11 w-11" width={44} height={44} />
              <div>
                <div className="text-[16px] font-semibold text-brand-ivory">{content.zh.nameFull}</div>
                <div className="text-[12px] tracking-[0.08em] text-brand-gold">{content.en.nameFull}</div>
              </div>
            </div>
            <div className="text-[13px] leading-relaxed md:text-right">
              <div>{c.footer.note}</div>
              <div>{c.footer.rights}</div>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
