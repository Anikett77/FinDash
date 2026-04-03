export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl shadow-sm border border-gray-400/30 bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-2 ">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

