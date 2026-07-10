import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/OrderUKLogo.png';
import { loginUser } from '../../features/authSlice';
import { useAuthModal } from '../../context/AuthModalContext';

const Login = ({ embedded = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { close } = useAuthModal(); // to close the popup on success, if used inside the modal

  // Reading straight from the Redux whiteboard's "auth" section
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch(...) sends the thunk off; .unwrap() lets us await the real
    // result here and catch a clean rejection, instead of just firing and forgetting.
    try {
      await dispatch(loginUser(formData)).unwrap();

      if (embedded) {
        close(); // was opened via the popup — just close it
      } else {
        navigate('/'); // was a full page visit — send them home
      }
    } catch {
      // error is already saved in Redux state via the rejected case,
      // so nothing extra needed here — the UI below reads `error` directly.
    }
  };

  const cardContent = (
    <div className={embedded ? "w-full" : "w-full max-w-[440px] bg-[#fbfbfb] dark:bg-[#0a0f2e] rounded-[12px] shadow-[5px_5px_14px_0px_rgba(0,0,0,0.15)] p-8 lg:p-10"}>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-block dark:bg-white dark:rounded-[12px] dark:px-4 dark:py-2">
            <img src={logo} alt="Order UK Logo" className="w-[160px] h-auto object-contain" />
          </Link>
        </div>

        <h1 className="text-[26px] font-bold text-[#03081F] dark:text-white text-center mb-2">
          Welcome back
        </h1>
        <p className="text-[14px] text-black/60 dark:text-white/60 text-center mb-8">
          Log in to continue ordering.
        </p>

        {/* Show the backend's real error message, if the last attempt failed */}
        {error && (
          <p className="text-[13px] text-red-500 text-center mb-4 -mt-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[14px] font-medium text-[#03081F] dark:text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-[52px] w-full rounded-[12px] border border-black/20 dark:border-white/20 bg-white dark:bg-white/5 px-5 text-[15px] text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 outline-none focus:border-[#fc8a06] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[14px] font-medium text-[#03081F] dark:text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-[52px] w-full rounded-[12px] border border-black/20 dark:border-white/20 bg-white dark:bg-white/5 px-5 text-[15px] text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 outline-none focus:border-[#fc8a06] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-[52px] w-full mt-2 rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        {!embedded && (
          <p className="text-[14px] text-center text-black/70 dark:text-white/70 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#fc8a06] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        )}
    </div>
  );

  if (embedded) return cardContent;

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-brand-dark transition-colors">
      {cardContent}
    </div>
  );
};

export default Login;