interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "success" | "error";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded-full";

  const variants = {
    primary: "bg-brand-primary/10 text-brand-primary",
    accent: "bg-brand-accent/10 text-brand-accent",
    success: "bg-brand-success/10 text-brand-success",
    error: "bg-brand-error/10 text-brand-error",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
