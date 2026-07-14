export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        {title}
      </h1>
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </div>
  );
}
