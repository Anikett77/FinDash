'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const stats = [
  { label: 'Active Users',          value: '12,400+' },
  { label: 'Transactions Tracked',  value: '₹2.4cr+'  },
  { label: 'Accuracy Rate',         value: '99.97%'  },
]

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Real-time Analytics',
    desc:  'Live financial insights with intelligent trend detection across all your accounts and categories.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Role-Based Access',
    desc:  'Granular permissions for Viewers, Analysts, and Admins. Every action is controlled and auditable.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: 'Smart Categorization',
    desc:  'Automatically classify income and expenses. Filter, search, and export records with precision.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Summary Dashboard',
    desc:  'Net balance, monthly trends, and category breakdowns — all in one clean overview.',
  },
]

const roles = [
  {
    role:  'Viewer',
    color: 'text-blue-600',
    bg:    'bg-blue-50',
    border:'border-blue-200',
    dot:   'bg-blue-500',
    desc:  'Read-only access to dashboard summaries and reports.',
    perms: ['View dashboard', 'View transactions', 'Filter records'],
  },
  {
    role:  'Analyst',
    color: 'text-purple-600',
    bg:    'bg-purple-50',
    border:'border-purple-200',
    dot:   'bg-purple-500',
    desc:  'Full read access plus analytical insights and trends.',
    perms: ['All Viewer access', 'Access analytics', 'View all records'],
  },
  {
    role:  'Admin',
    color: 'text-green-700',
    bg:    'bg-green-50',
    border:'border-green-200',
    dot:   'bg-green-500',
    desc:  'Complete control over records, users, and system config.',
    perms: ['All Analyst access', 'Create / edit / delete', 'Manage users & roles'],
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">

            <span className="text-xl font-bold text-blue-950">FinDash</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Roles', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/signup"
              className="text-sm px-4 py-2 rounded-xl bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-200 overflow-hidden">

        {/* Subtle grid bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            opacity: 0.4,
          }} />

        {/* Blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(30,58,138,0.07) 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">


          {/* Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold text-blue-950 leading-tight mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Finance, managed
            <br />
            <span className="text-blue-600 italic font-bold">with clarity.</span>
          </h1>

          <p className={`text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            A role-based finance dashboard for teams. Track records, enforce access rules,
            and surface insights — without the noise.
          </p>

          {/* Buttons */}
          <div className={`flex items-center gap-3 justify-center flex-wrap transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white font-medium text-sm hover:bg-blue-800 transition-colors">
              Open Dashboard
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
            <a href="#features"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
              See features
            </a>
          </div>

          {/* Stats */}
          <div className={`mt-20 flex flex-wrap justify-center gap-16 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            {stats.map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-blue-950">{s.value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview Mockup ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-xl">

            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-300">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white border border-gray-200 max-w-xs flex items-center px-3 gap-1.5">
                <svg width="10" height="10" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0zm4.5 9l-3.75-3.75"/>
                </svg>
                <span className="text-xs text-gray-400">findash-finance.vercel.app</span>
              </div>
            </div>

            {/* Fake dashboard */}
            <div className="flex bg-white min-h-96">

              {/* Fake sidebar */}
              <div className="w-48 border-r border-gray-100 p-4 flex flex-col gap-1 bg-white">
                <div className="flex items-center gap-2 px-2 py-1.5 mb-4">
                  <div className="w-5 h-5 rounded bg-blue-900" />
                  <span className="text-xs font-bold text-blue-950">FinDash</span>
                </div>
                {['Dashboard', 'Analytics', 'Records', 'Users', 'Settings'].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${i === 0 ? 'bg-blue-900 text-white font-medium' : 'text-gray-500'}`}>
                    <div className={`w-2.5 h-2.5 rounded-sm ${i === 0 ? 'bg-white/40' : 'bg-gray-200'}`} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Fake content */}
              <div className="flex-1 p-5 flex flex-col gap-4 bg-gray-50">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Net Balance', val: '₹84,200', color: 'text-blue-900'  },
                    { label: 'Income',      val: '₹124,500', color: 'text-green-600' },
                    { label: 'Expenses',    val: '₹40,300',  color: 'text-red-500'   },
                    { label: 'This Month',  val: '480',  color: 'text-blue-600'  },
                  ].map(card => (
                    <div key={card.label} className="rounded-xl p-3 bg-white border border-gray-200">
                      <div className="text-xs text-gray-400 mb-1.5">{card.label}</div>
                      <div className={`text-sm font-bold ${card.color}`}>{card.val}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 flex-1">
                  {/* Fake bar chart */}
                  <div className="flex-1 rounded-xl p-4 bg-white border border-gray-200">
                    <div className="text-xs text-gray-400 mb-3">Monthly Trend</div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm"
                          style={{ height: `${h}%`, background: i === 11 ? '#1e3a8a' : '#e5e7eb' }} />
                      ))}
                    </div>
                  </div>

                  {/* Fake recent activity */}
                  <div className="flex-1 rounded-xl p-4 bg-white border border-gray-200">
                    <div className="text-xs text-gray-400 mb-3">Recent Activity</div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { name: 'Payroll',    type: 'income',  amt: '+₹8,000' },
                        { name: 'AWS Cloud',  type: 'expense', amt: '-₹420'   },
                        { name: 'Consulting', type: 'income',  amt: '+₹2,200' },
                        { name: 'Office Rent',type: 'expense', amt: '-₹3,200' },
                      ].map(t => (
                        <div key={t.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${t.type === 'income' ? 'bg-green-500' : 'bg-red-400'}`} />
                            <span className="text-xs text-gray-500">{t.name}</span>
                          </div>
                          <span className={`text-xs font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                            {t.amt}
                          </span>
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

      {/* ── Features ── */}
      <section id="features" className="bg-white py-24 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Capabilities</p>
            <h2 className="text-4xl font-bold text-blue-950">
              Built for how finance
              <br />
              <span className="text-blue-600 italic">teams actually work.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all group bg-white">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section id="roles" className="bg-gray-50 py-24 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Access Control</p>
            <h2 className="text-4xl font-bold text-blue-950">
              Right access,{' '}
              <span className="text-blue-600 italic">right person.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {roles.map(r => (
              <div key={r.role} className={`rounded-2xl border p-6 bg-white ${r.border} hover:shadow-sm transition-all`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.dot}`} />
                    <span className={`text-sm font-semibold ${r.color}`}>{r.role}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.bg} ${r.color}`}>{r.role}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{r.desc}</p>
                <div className="flex flex-col gap-2">
                  {r.perms.map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs text-gray-600">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                        className={r.color}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
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

      {/* ── CTA ── */}
      <section className="bg-blue-900 py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Ready to take control?
          </h2>
          <p className="text-blue-200 text-sm mb-10 leading-relaxed">
            Open the dashboard and start managing your financial records today.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/dashboard"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-900 font-semibold text-sm hover:bg-blue-50 transition-colors">
              Open Dashboard
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
            <Link href="/login"
              className="px-8 py-3.5 rounded-xl border border-blue-600 text-white font-medium text-sm hover:bg-blue-800 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">

          <span className="font-bold text-blue-950 text-sm">FinDash</span>
        </div>
        <p className="text-xs text-gray-400">© 2025 FinDash. Finance made clear.</p>
      </footer>

    </div>
  )
}