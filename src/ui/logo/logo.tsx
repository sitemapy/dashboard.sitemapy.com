import { GalleryVerticalEnd } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 self-center font-medium">
      <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd className="size-4" />
      </div>
      Acme Inc.
    </div>
  );
};
