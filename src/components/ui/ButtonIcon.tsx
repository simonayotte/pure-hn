type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function ButtonIcon({ children, onClick }: ButtonProps) {
  return (
    <button
      className="p-1 rounded-md border shadow-sm border-slate-200 dark:border-neutral-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
