export const Logo: React.FC<{ hideText?: boolean }> = ({ hideText }) => {
  return (
    <div className="flex items-center gap-2 self-center font-medium">
      <div className="size-8">
        <img src="/logo.png" alt="Sitemapy" className="h-full w-full" />
      </div>
      {!hideText && <span>Sitemapy</span>}
    </div>
  );
};
