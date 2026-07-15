import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';

/**
 * Gates access to the /admin-dashboard/* routes.
 * - Not logged in           → prompt to log in (opens the shared auth modal)
 * - Logged in, not an admin → "not authorized", link back home
 * - Logged in admin         → renders the dashboard
 */
export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { openLogin } = useAuthModal();

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-[#f5f5f7] dark:bg-[#060a1c] px-4">
        <ShieldAlert size={40} className="text-[#fc8a06]" />
        <p className="text-black/60 dark:text-white/60 text-[15px] text-center">
          Log in with an admin account to access the dashboard.
        </p>
        <button
          onClick={openLogin}
          className="h-[46px] px-8 rounded-full bg-[#fc8a06] text-white font-bold text-[14px] hover:bg-[#e07a00] transition-all"
        >
          Log In
        </button>
      </div>
    );
  }

  if (!user?.is_admin) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-[#f5f5f7] dark:bg-[#060a1c] px-4">
        <ShieldAlert size={40} className="text-red-500" />
        <p className="text-black/60 dark:text-white/60 text-[15px] text-center">
          You don't have access to the admin dashboard.
        </p>
        <Link
          to="/"
          className="h-[46px] px-8 flex items-center rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white font-bold text-[14px] hover:bg-black/20 dark:hover:bg-white/20 transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return children;
}