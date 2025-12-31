import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  User as UserIcon,
  LogOut,
  X,
  PlusCircle,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../utils/cn";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";
import NotificationDropdown from "./NotificationDropdown";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { unreadCount, toggleDropdown, fetchNotifications } =
    useNotificationStore();

  React.useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", href: "/tasks", icon: CheckCircle2 },
    { name: "Support & Help", href: "/complaints", icon: PlusCircle },
    { name: "Inbox", href: "/inbox", icon: Bell },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-prussian-blue border-r border-blue-700 flex flex-col transition-all duration-300 z-50",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="p-2 flex items-center gap-3 justify-center">
          {isSidebarOpen && (
            <span className="font-bold text-xl tracking-tight text-neutral-900">
              <img src="/images/nextif-logo-lg.png" alt="logo" title="logo" />
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 cursor-pointer transition-colors text-neutral-400"
          >
            {isSidebarOpen ? (
              <X size={24} className="text-blue-300" />
            ) : (
              <img
                src="/images/nextif-logo-3.png"
                title="mini-logo"
                alt="mini-logo"
                className="size-12"
              />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group",
                  isActive
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                    : "text-blue-300 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-white"
                      : "text-blue-300 group-hover:text-blue-600"
                  )}
                />
                {isSidebarOpen && (
                  <span className="font-heading font-bold text-sm">
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-600" />
            {isSidebarOpen && (
              <span className="font-heading font-bold text-blue-300 text-sm">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-royal-blue/10 backdrop-blur-md border-b border-neutral-100 px-8 flex items-center justify-end sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-white"></span>
                )}
              </button>
              <NotificationDropdown />
            </div>
            <div className="h-8 w-px bg-neutral-100 mx-2"></div>
            <Link
              to="/profile"
              className="flex items-center gap-3 pl-2 hover:bg-neutral-50 p-2 rounded-2xl transition-all group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-neutral-900 leading-none group-hover:text-blue-600 transition-colors">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-wider">
                  {user?.role}
                </p>
              </div>
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-bold text-xs ring-4 ring-neutral-50 group-hover:ring-blue-50 group-hover:bg-blue-600 transition-all overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </header>

        <div className="p-8 pb-12">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
