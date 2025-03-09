interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className || ""}`}>
      <h1 className="text-2xl font-medium text-[#202124]">{title}</h1>
      {description && <p className="mt-1 text-[#5f6368]">{description}</p>}
    </div>
  );
}
