import React from "react";

/**
 * Common CTA button used across the app (e.g. "Get Started").
 *
 * Usage:
 *   <Button>Get Started</Button>
 *   <Button as="a" href="/signup/business">Get Started</Button>
 */
export default function Button({
  children,
  as = "button",
  className = "",
  ...props
}) {
  const Component = as;

  const baseClasses =
    "inline-flex items-center justify-center rounded-full bg-[#FC8A06] px-6 py-2.5 " +
    "text-sm font-semibold text-white shadow-sm transition-colors duration-200 " +
    "hover:bg-[#E5741A] active:bg-[#CC6716] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FC8A06]";

  return (
    <Component className={`${baseClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
}