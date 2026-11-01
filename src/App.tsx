import { useEffect, useState } from 'react'
import { Menu, X, Mail, ArrowRight } from 'lucide-react'
import seal from '@/assets/seal.webp'
import { content, EMAIL, type Lang } from '@/content'

/* ---------- small graphic elements from the VI ---------- */

function Star({ className = '', filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.8l2.95 6.6 7.2.66-5.45 4.8 1.62 7.05L12 17.2l-6.32 3.71 1.62-7.05-5.45-4.8 7.2-.66z"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={filled ? 0 : 1.2}
      />
    </svg>
  )
}

/** Concentric rings with five orbiting stars — echoes the emblem's star orbits. */
function Orbits({ className = '' }: { className?: string }) {
  const rings = [140, 196, 252, 308]
  const stars = [0, 52, 104, 156, 208, 260, 312].map((deg) => {
    const r = 252
    const a = ((deg - 90) * Math.PI) / 180
    return { x: 320 + r * Math.cos(a), y: 320 + r * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 640 640" className={className} aria-hidden="true">
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="320"
          cy="320"
          r={r}
          fill="none"
          stroke="#C89B5A"
          strokeOpacity={0.55 - i * 0.1}
          strokeWidth={i === 0 ? 1.5 : 1}
          strokeDasharray={i === 3 ? '2 7' : undefined}
        />
      ))}
      <g className="orbit-spin">
        {stars.map((s, i) => (
          <path
            key={i}
            transform={`translate(${s.x - 9} ${s.y - 9}) scale(0.75)`}
            d="M12 1.8l2.95 6.6 7.2.66-5.45 4.8 1.62 7.05L12 17.2l-6.32 3.71 1.62-7.05-5.45-4.8 7.2-.66z"
            fill={i === 0 ? '#C89B5A' : '#E9D3B6'}
          />
        ))}
      </g>
    </svg>
  )
}

/** A row of four gate arches, the "arcade" motif from the university gate. */
function Arcade({ className = '', color = '#C89B5A' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${6 + i * 29} 40V18a11.5 11.5 0 0 1 23 0v22`}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      ))}
      <path d="M0 39h120" stroke={color} strokeWidth="2" />
    </svg>
  )
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

function SectionHead({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="reveal">
      <div className={`eyebrow flex items-center gap-3 ${light ? 'text-brand-gold' : 'text-brand'}`}>
        <Star className="h-3.5 w-3.5 text-brand-gold" />
        {eyebrow}
      </div>
      <h2
        className={`mt-4 font-serif text-[34px] font-bold leading-tight tracking-[-0.01em] sm:text-[44px] ${
          light ? 'text-brand-ivory' : 'text-brand-ink'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

/* ---------- page ---------- */

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

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const c = content[lang]
  const isZh = lang === 'zh'

  useReveal()

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

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(c.join.mailSubject)}&body=${encodeURIComponent(c.join.mailBody)}`
  const toggleLang = () => setLang(isZh ? 'en' : 'zh')

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ---------------- header ---------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'border-b border-brand/15 bg-brand-ivory/95 backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img src={seal} alt="" className="h-11 w-11" width={44} height={44} />
            <span className="leading-tight">
              <span className="block font-serif text-[16px] font-bold text-brand-ink sm:text-[17px]">{c.nameShort}</span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-brand sm:block">
                {isZh ? 'XAUAT U.S. Alumni' : '西建大美国校友会'}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {c.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded px-3 py-2 text-[15px] font-medium text-brand-deep transition-colors hover:bg-brand-apricot hover:text-brand-ink"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="ml-3 rounded border border-brand/40 px-3 py-1.5 text-[14px] font-medium text-brand-deep transition-colors hover:border-brand hover:bg-brand hover:text-brand-ivory"
              aria-label={isZh ? 'Switch to English' : '切换到中文'}
            >
              {c.langSwitch}
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="rounded border border-brand/40 px-3 py-1.5 text-[14px] font-medium text-brand-deep"
              aria-label={isZh ? 'Switch to English' : '切换到中文'}
            >
              {c.langSwitch}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded p-2 text-brand-deep"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-brand/10 bg-brand-ivory px-4 pb-4 md:hidden">
            {c.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-brand/10 py-4 text-[18px] font-medium text-brand-ink"
              >
                {n.label}
                <ArrowRight className="h-4 w-4 text-brand-gold" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        {/* ---------------- hero ---------------- */}
        <section className="grid-paper relative bg-brand-apricot pt-[72px]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-brand-apricot" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-6 md:pb-28 md:pt-16">
            <div className="order-2 md:order-1">
              <div className="reveal inline-flex items-center gap-2 border border-brand/30 bg-brand-ivory/70 px-3 py-1.5 text-[14px] font-medium text-brand-deep">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                {c.hero.status}
              </div>
              <h1 className="reveal mt-6 font-serif font-black text-brand-ink">
                <span
                  className={`block text-brand-deep ${isZh ? 'text-[28px] sm:text-[38px]' : 'text-[22px] leading-snug sm:text-[28px]'}`}
                >
                  {c.hero.titleTop}
                </span>
                <span
                  className={`mt-1 block leading-[1.08] tracking-[-0.01em] ${
                    isZh ? 'text-[56px] sm:text-[84px]' : 'text-[42px] sm:text-[60px]'
                  }`}
                >
                  {c.hero.titleBottom}
                </span>
              </h1>
              <p className="reveal mt-3 text-[13px] font-medium uppercase tracking-[0.3em] text-brand">{c.nameEn}</p>
              <div className="reveal mt-8 border-l-2 border-brand-gold pl-5 font-serif text-[19px] leading-[1.9] text-brand-deep sm:text-[21px]">
                {(isZh ? c.hero.tagline : [c.hero.tagline.join(' ')]).map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </div>
              <div className="reveal mt-10 flex flex-wrap gap-3">
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 bg-brand px-7 py-4 text-[17px] font-medium text-brand-ivory transition-colors hover:bg-brand-deep"
                >
                  {c.hero.ctaJoin}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 border border-brand/50 px-7 py-4 text-[17px] font-medium text-brand-deep transition-colors hover:border-brand hover:bg-brand-ivory"
                >
                  {c.hero.ctaMore}
                </a>
              </div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[460px] md:order-2">
              <Orbits className="absolute inset-[-14%] h-[128%] w-[128%]" />
              <img
                src={seal}
                alt={c.nameFull}
                width={720}
                height={720}
                className="relative mx-auto w-[72%] drop-shadow-[0_18px_40px_rgba(92,58,34,0.22)] md:w-[78%]"
              />
            </div>
          </div>
        </section>

        {/* ---------------- about ---------------- */}
        <section id="about" className="bg-brand-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-[1fr_1.35fr] md:gap-16">
              <div>
                <SectionHead eyebrow={c.about.eyebrow} title={c.about.title} />
                <div className="reveal mt-10 hidden md:block">
                  <div className="arch-mask relative aspect-[4/5] w-full max-w-[300px] overflow-hidden bg-brand-apricot">
                    <div className="grid-paper absolute inset-0" />
                    <Orbits className="absolute left-1/2 top-[18%] w-[150%] -translate-x-1/2 opacity-70" />
                    <Arcade className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2" color="#9C6845" />
                  </div>
                </div>
              </div>
              <div>
                {c.about.body.map((p) => (
                  <p key={p} className="reveal mb-6 text-[18px] leading-[1.9] text-brand-ink/85 sm:text-[19px]">
                    {p}
                  </p>
                ))}
                <dl className="reveal mt-10 grid grid-cols-2 border-t border-brand/25">
                  {c.about.stats.map((s, i) => (
                    <div
                      key={s.label}
                      className={`border-b border-brand/25 py-6 ${i % 2 === 0 ? 'pr-4' : 'border-l pl-5 sm:pl-8'}`}
                    >
                      <dt className="font-serif text-[32px] font-bold leading-none text-brand sm:text-[40px]">{s.value}</dt>
                      <dd className="mt-3 text-[15px] leading-snug text-brand-stone sm:text-[16px]">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- mission ---------------- */}
        <section id="mission" className="grid-paper bg-brand-apricot py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHead eyebrow={c.mission.eyebrow} title={c.mission.title} />
              <p className="reveal font-serif text-[20px] text-brand-deep sm:text-[22px]">{c.mission.lead}</p>
            </div>
            <ol className="mt-12 grid gap-px overflow-hidden border border-brand/20 bg-brand/20 sm:grid-cols-2 lg:grid-cols-3">
              {c.mission.items.map((m, i) => (
                <li key={m.t} className="reveal group relative bg-brand-ivory p-7 transition-colors hover:bg-white sm:p-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[13px] font-semibold tracking-[0.2em] text-brand-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Star className="h-4 w-4 text-brand-apricot transition-colors group-hover:text-brand-gold" />
                  </div>
                  <h3 className="mt-5 font-serif text-[24px] font-bold text-brand-ink">{m.t}</h3>
                  <p className="mt-3 text-[16.5px] leading-[1.8] text-brand-ink/75">{m.d}</p>
                </li>
              ))}
            </ol>

            <div className="reveal mt-14 bg-brand-deep p-7 text-brand-ivory sm:p-10">
              <div className="flex items-center gap-4">
                <Arcade className="h-6 w-[72px]" />
                <h3 className="font-serif text-[22px] font-bold sm:text-[26px]">{c.mission.programsTitle}</h3>
              </div>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {c.mission.programs.map((p) => (
                  <div key={p.t} className="border-t border-brand-gold/40 pt-5">
                    <div className="font-serif text-[20px] font-bold text-brand-gold">{p.t}</div>
                    <p className="mt-2 text-[16px] leading-[1.75] text-brand-apricot/85">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- emblem ---------------- */}
        <section id="emblem" className="bg-brand-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div className="reveal relative mx-auto w-full max-w-[420px]">
                <div className="arch-mask relative aspect-[5/6] overflow-hidden bg-brand-apricot">
                  <div className="grid-paper absolute inset-0" />
                  <img
                    src={seal}
                    alt={c.nameFull}
                    width={720}
                    height={720}
                    className="absolute left-1/2 top-[54%] w-[78%] -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <div className="mt-4 flex justify-between text-[12px] font-medium uppercase tracking-[0.24em] text-brand-stone">
                  <span>XAUAT US AA</span>
                  <span>EST. 2026</span>
                </div>
              </div>
              <div>
                <SectionHead eyebrow={c.emblem.eyebrow} title={c.emblem.title} />
                <p className="reveal mt-4 font-serif text-[20px] text-brand-deep">{c.emblem.lead}</p>
                <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                  {c.emblem.points.map((p) => (
                    <div key={p.en} className="reveal flex gap-4">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-brand-gold font-serif text-[22px] font-bold text-brand">
                        {p.k}
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold tracking-[0.24em] text-brand-gold">{p.en}</div>
                        <p className="mt-1 text-[16px] leading-[1.75] text-brand-ink/80">{p.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="reveal mt-12">
                  <div className="text-[14px] font-medium text-brand-stone">{c.emblem.paletteTitle}</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {c.emblem.palette.map((sw) => (
                      <div key={sw.hex}>
                        <div className="h-14 border border-brand/15" style={{ background: sw.hex }} />
                        <div className="mt-2 text-[13px] font-medium text-brand-ink">{sw.n}</div>
                        <div className="text-[12px] tracking-wider text-brand-stone">{sw.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- timeline ---------------- */}
        <section id="timeline" className="border-t border-brand/15 bg-brand-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHead eyebrow={c.timeline.eyebrow} title={c.timeline.title} />
            <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
              <div className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-brand/25 md:left-0 md:top-[11px] md:h-px md:w-full" />
              {c.timeline.steps.map((s) => {
                const label = s.state === 'done' ? c.timeline.done : s.state === 'now' ? c.timeline.now : c.timeline.next
                return (
                  <li key={s.t} className="reveal relative pl-10 md:pl-0 md:pt-10">
                    <span
                      className={`absolute left-0 top-0 flex h-[23px] w-[23px] items-center justify-center rounded-full ${
                        s.state === 'done'
                          ? 'bg-brand text-brand-ivory'
                          : s.state === 'now'
                            ? 'bg-brand-gold text-brand-ink ring-4 ring-brand-gold/25'
                            : 'border border-brand/40 bg-brand-ivory text-brand/50'
                      }`}
                    >
                      <Star className="h-3 w-3" filled={s.state !== 'next'} />
                    </span>
                    <div
                      className={`text-[13px] font-semibold tracking-[0.12em] ${
                        s.state === 'now' ? 'text-brand-gold' : 'text-brand-stone'
                      }`}
                    >
                      {label}
                    </div>
                    <div className="mt-1 text-[15px] font-medium text-brand">{s.when}</div>
                    <h3 className="mt-2 font-serif text-[22px] font-bold text-brand-ink">{s.t}</h3>
                    <p className="mt-2 text-[16px] leading-[1.75] text-brand-ink/75">{s.d}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ---------------- join ---------------- */}
        <section id="join" className="grid-paper-night relative overflow-hidden bg-brand-night py-20 text-brand-ivory sm:py-28">
          <Orbits className="pointer-events-none absolute -right-48 -top-40 w-[720px] opacity-25" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
              <div>
                <SectionHead eyebrow={c.join.eyebrow} title={c.join.title} light />
                <p className="reveal mt-6 text-[18px] leading-[1.9] text-brand-apricot/85">{c.join.who}</p>
                <a
                  href={mailto}
                  className="reveal mt-10 inline-flex items-center gap-3 bg-brand-gold px-7 py-4 text-[17px] font-semibold text-brand-ink transition-colors hover:bg-brand-apricot"
                >
                  <Mail className="h-5 w-5" />
                  {c.join.cta}
                </a>
                <div className="reveal mt-6 text-[15px] text-brand-apricot/70">
                  {c.join.contact}
                  {isZh ? '：' : ': '}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-brand-gold underline-offset-4 hover:underline">
                    {EMAIL}
                  </a>
                </div>
              </div>
              <ol className="space-y-px">
                {c.join.steps.map((s, i) => (
                  <li key={s.t} className="reveal flex gap-6 border-t border-brand-gold/25 py-7 last:border-b">
                    <span className="w-8 flex-none font-serif text-[44px] font-bold leading-none text-brand-gold/90">{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-[22px] font-bold">{s.t}</h3>
                      <p className="mt-2 break-words text-[16.5px] leading-[1.8] text-brand-apricot/80">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- footer ---------------- */}
      <footer className="bg-brand-ink py-12 text-brand-apricot/75">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={seal} alt="" className="h-14 w-14" width={56} height={56} />
            <div>
              <div className="font-serif text-[18px] font-bold text-brand-ivory">{content.zh.nameFull}</div>
              <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-brand-gold">{content.en.nameFull}</div>
            </div>
          </div>
          <div className="text-[14px] leading-relaxed md:text-right">
            <a href={`mailto:${EMAIL}`} className="text-brand-gold hover:underline">
              {EMAIL}
            </a>
            <div className="mt-1">{c.footer.note}</div>
            <div>{c.footer.rights}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
