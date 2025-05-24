"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

type ButtonProps = React.ComponentProps<typeof Button>;

interface CopyButtonProps extends ButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            disabled={copied}
            onClick={handleCopy}
            className={cn("disabled:opacity-100", className)}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            {...props}
          >
            <div
              className={cn(
                "transition-all",
                copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            >
              <CheckIcon
                className="stroke-emerald-500"
                size={16}
                aria-hidden="true"
              />
            </div>
            <div
              className={cn(
                "absolute transition-all",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
              )}
            >
              <CopyIcon size={16} aria-hidden="true" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="px-2 py-1 text-xs">
          Copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
