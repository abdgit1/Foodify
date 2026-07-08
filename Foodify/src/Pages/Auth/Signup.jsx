import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/OrderUKLogo.png';

const Signup = ({ embedded = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    country: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic (validation + API/Redux call) comes later
    console.log('Signup form data:', formData);
  };

  const inputClass =
    "h-[52px] w-full rounded-[12px] border border-black/20 dark:border-white/20 bg-white dark:bg-white/5 px-5 text-[15px] text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 outline-none focus:border-[#fc8a06] transition-colors";
  const labelClass = "text-[14px] font-medium text-[#03081F] dark:text-white";

  const cardContent = (
    <div className={embedded ? "w-full" : "w-full max-w-[480px] bg-[#fbfbfb] dark:bg-[#0a0f2e] rounded-[12px] shadow-[5px_5px_14px_0px_rgba(0,0,0,0.15)] p-8 lg:p-10"}>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-block dark:bg-white dark:rounded-[12px] dark:px-4 dark:py-2">
            <img src={logo} alt="Order UK Logo" className="w-[160px] h-auto object-contain" />
          </Link>
        </div>

        <h1 className="text-[26px] font-bold text-[#03081F] dark:text-white text-center mb-2">
          Create your account
        </h1>
        <p className="text-[14px] text-black/60 dark:text-white/60 text-center mb-8">
          Sign up to start ordering.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className={labelClass}>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="yourusername"
              value={formData.username}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Country + City — side by side */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="country" className={labelClass}>Country</label>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="United Kingdom"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="city" className={labelClass}>City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="London"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password" className={labelClass}>Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="h-[52px] w-full mt-2 rounded-full bg-[#fc8a06] text-white font-bold text-[16px] hover:bg-[#e07a00] active:scale-[0.98] transition-all shadow-md"
          >
            Sign Up
          </button>
        </form>

        {!embedded && (
          <p className="text-[14px] text-center text-black/70 dark:text-white/70 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#fc8a06] font-semibold hover:underline">
              Log in
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

export default Signup;