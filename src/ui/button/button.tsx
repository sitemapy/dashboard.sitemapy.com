import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button/button-variants";
import { Loader2 } from "lucide-react";

function Button({
  className,
  variant,
  size,
  isLoading,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : props.children}
    </Comp>
  );
}

export { Button };
