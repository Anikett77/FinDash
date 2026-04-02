'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserInfo from '@/components/userInfo'
import Logout from '@/components/logout'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '👤', href: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: '🔒', href: '/dashboard/analytics' },
  { id: 'records',   label: 'Records',   icon: '🎨', href: '/dashboard/records' },
  { id: 'activity',  label: 'Activity',  icon: '💳', href: '/dashboard/activity' },
  { id: 'users',  label: 'Users',  icon: '⚙️', href: '/dashboard/users' },
  { id: 'settings',  label: 'Settings',  icon: '⚙️', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">

      {/* ── Sidebar ── */}
      <div className="w-1/6 p-7 flex flex-col fixed">
        <h1 className="text-blue-950 text-2xl font-bold">FinDash</h1>

        <div className="flex mt-8 gap-3 ">
          <div className="bg-amber-500 rounded-full w-8 h-8 mt-2 flex-shrink-0 " />
          <UserInfo />
          
        </div>
        <div className='border-b border-gray-500/30 w-full mt-10'></div>

        <nav className=" space-y-1 mt-10">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-md transition-all duration-150 border mt-5
                  ${isActive
                    ? 'bg-blue-900 text-white font-semibold border-blue-900'
                    : 'text-black/70 hover:text-black hover:bg-gray-100 border-transparent'
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <Logout/>
      </div>
      

      {/* ── Page content changes here ── */}
      <div className="w-5/6 border-l border-gray-400/50 bg-gray-500/10 p-6 ml-65">
        {children}
      </div>

    </div>
  )
}