interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-brand-text">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-lg border bg-white px-3 py-2 text-sm text-brand-text placeholder:text-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${error ? "border-brand-error" : "border-zinc-300 focus:border-brand-primary"} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-brand-error">{error}</span>}
    </div>
  );
}
