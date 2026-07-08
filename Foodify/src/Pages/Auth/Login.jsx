import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/OrderUKLogo.png';

const Login = ({ embedded = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic (validation + API/Redux call) comes later
    console.log('Login form data:', formData);
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
            className="h-[52px] w-full mt-2 rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all shadow-md"
          >
            Log In
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