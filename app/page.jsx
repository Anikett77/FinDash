'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const stats = [
  { label: 'Active Users', value: '12,400+' },
  { label: 'Transactions Tracked', value: '$2.4B+' },
  { label: 'Accuracy Rate', value: '99.97%' },
]

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Real-time Analytics',
    desc: 'Live financial insights with intelligent trend detection across all your accounts and categories.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Granular permissions for Viewers, Analysts, and Admins. Every action is logged and auditable.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
    ),
    title: 'Smart Categorization',
    desc: 'Automatically classify income and expenses. Filter, search, and export records with precision.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Summary Dashboard',
    desc: 'Net balance, monthly trends, and category breakdowns — all in one clean overview.',
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'var(--bg)' }}>

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(var(--border-subtle) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        opacity: 0.4,
      }} />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,184,154,0.06) 0%, transparent 70%)' }} />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <span className="font-display text-lg" style={{ color: 'var(--text-primary)' }}>Ledger</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Docs'].map(item => (
            <a key={item} href="#" className="text-sm transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            Sign In
          </Link>
          <Link href="/dashboard" className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-24">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium border transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'var(--accent-dim)', borderColor: 'rgba(200,184,154,0.2)', color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          Now with real-time analytics
        </div>

        <h1 className={`font-display text-5xl md:text-7xl leading-[1.05] mb-6 max-w-3xl transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ color: 'var(--text-primary)' }}>
          Finance, managed
          <br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>with clarity.</span>
        </h1>

        <p className={`text-base md:text-lg max-w-lg mb-10 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ color: 'var(--text-secondary)' }}>
          A backend-powered finance dashboard for teams. Track records, enforce access rules,
          and surface insights — without the noise.
        </p>

        <div className={`flex items-center gap-3 flex-wrap justify-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            Open Dashboard
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <a href="#features"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            See features
          </a>
        </div>

        {/* Stats row */}
        <div className={`mt-20 flex flex-wrap justify-center gap-12 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-3xl" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
              <span className="text-xs tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard preview mockup */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#e05c5c' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--yellow)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--green)' }} />
              </div>
              <div className="flex-1 mx-4 h-6 rounded" style={{ background: 'var(--bg-raised)', maxWidth: 240 }}>
                <div className="flex items-center h-full px-3 gap-1.5">
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0zm4.5 9l-3.75-3.75" />
                  </svg>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>ledger.app/dashboard</span>
                </div>
              </div>
            </div>

            {/* Fake dashboard UI */}
            <div className="flex" style={{ background: 'var(--bg)', minHeight: 420 }}>
              {/* Fake sidebar */}
              <div className="w-52 border-r p-4 flex flex-col gap-1" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
                  <div className="w-5 h-5 rounded" style={{ background: 'var(--accent)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Ledger</span>
                </div>
                {['Overview', 'Transactions', 'Analytics', 'Users', 'Settings'].map((item, i) => (
                  <div key={item} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs"
                    style={{
                      background: i === 0 ? 'var(--accent-dim)' : 'transparent',
                      color: i === 0 ? 'var(--accent)' : 'var(--text-muted)',
                    }}>
                    <div className="w-3 h-3 rounded" style={{ background: i === 0 ? 'var(--accent)' : 'var(--border)' }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Fake content */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Net Balance', val: '$84,200', color: 'var(--accent)' },
                    { label: 'Income', val: '$124,500', color: 'var(--green)' },
                    { label: 'Expenses', val: '$40,300', color: 'var(--red)' },
                    { label: 'This Month', val: '+$6,400', color: 'var(--blue)' },
                  ].map(card => (
                    <div key={card.label} className="rounded-lg p-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                      <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{card.label}</div>
                      <div className="text-base font-medium" style={{ color: card.color }}>{card.val}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 flex-1">
                  {/* Fake chart */}
                  <div className="flex-1 rounded-lg p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <div className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>Monthly Trend</div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm transition-all"
                          style={{ height: `${h}%`, background: i === 11 ? 'var(--accent)' : 'var(--bg-raised)' }} />
                      ))}
                    </div>
                  </div>

                  {/* Fake table */}
                  <div className="flex-1 rounded-lg p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <div className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>Recent Activity</div>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: 'Payroll', type: 'income', amt: '+$8,000' },
                        { name: 'AWS Cloud', type: 'expense', amt: '-$420' },
                        { name: 'Consulting', type: 'income', amt: '+$2,200' },
                        { name: 'Office Rent', type: 'expense', amt: '-$3,200' },
                      ].map(t => (
                        <div key={t.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full"
                              style={{ background: t.type === 'income' ? 'var(--green-dim)' : 'var(--red-dim)', border: `1px solid ${t.type === 'income' ? 'var(--green)' : 'var(--red)'}` }} />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.name}</span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: t.type === 'income' ? 'var(--green)' : 'var(--red)' }}>{t.amt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Built for how finance
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>teams actually work.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card p-6 relative overflow-hidden group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                {f.icon}
              </div>
              <h3 className="text-base font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: 'radial-gradient(circle at top left, var(--accent-dim), transparent 60%)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Role Cards */}
      <section className="relative z-10 px-6 py-20 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Access Control</p>
            <h2 className="font-display text-4xl" style={{ color: 'var(--text-primary)' }}>
              Right access, <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>right person.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { role: 'Viewer', color: 'var(--blue)', desc: 'Read-only access to dashboard summaries and reports.', perms: ['View dashboard', 'Export reports', 'Filter records'] },
              { role: 'Analyst', color: 'var(--yellow)', desc: 'Full read access plus analytical insights and trends.', perms: ['All Viewer access', 'Access analytics', 'View all records'] },
              { role: 'Admin', color: 'var(--green)', desc: 'Complete control over records, users, and system config.', perms: ['All Analyst access', 'Create / edit / delete', 'Manage users & roles'] },
            ].map(r => (
              <div key={r.role} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm" style={{ color: r.color }}>{r.role}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                </div>
                <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.perms.map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <svg width="12" height="12" fill="none" stroke={r.color} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            Ready to take
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>control?</span>
          </h2>
          <p className="text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>
            Open the dashboard and start managing your financial records today.
          </p>
          <Link href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'var(--accent)', color: 'var(--bg)', fontSize: 15 }}>
            Open Dashboard
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t px-8 py-8 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <span className="font-display text-sm" style={{ color: 'var(--text-muted)' }}>Ledger</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 Ledger. Finance made clear.</p>
      </footer>
    </div>
  )
}
