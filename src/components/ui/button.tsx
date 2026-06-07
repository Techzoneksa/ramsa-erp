interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 cursor-pointer";

  const variants = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-primary-dark active:bg-brand-primary-dark",
    accent:
      "bg-brand-accent text-white hover:bg-brand-accent-light active:bg-brand-accent-light",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white active:bg-brand-primary",
    ghost:
      "text-brand-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary active:bg-brand-primary/15",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
