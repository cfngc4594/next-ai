"use client";

import React, { useRef } from "react";
import { CopyButton } from "@/components/copy-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  className?: string;
  "data-language"?: string;
}

export const Pre = ({ children, className, ...props }: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const language = props["data-language"];
  const upperCaseLanguage = language ? language.toUpperCase() : "TEXT";

  return (
    <div className="rounded-lg overflow-hidden bg-muted border">
      <header className="h-10 pl-3.5 pr-2 py-1.5 bg-muted flex items-center justify-between border-b">
        <span className="text-sm">{upperCaseLanguage}</span>
        <CopyButton
          text={preRef.current?.textContent ?? ""}
          variant="ghost"
          className="h-7 w-7 cursor-pointer"
        />
      </header>
      <ScrollArea>
        <pre ref={preRef} className={className} {...props}>
          {children}
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
