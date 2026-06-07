interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-brand-text-secondary">{icon}</div>}
      <h3 className="text-lg font-medium text-brand-text">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-brand-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
