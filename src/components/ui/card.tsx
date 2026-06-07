interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white border border-zinc-200 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
