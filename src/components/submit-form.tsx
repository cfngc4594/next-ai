import { cn } from "@/lib/utils";
import type { ChatRequestOptions } from "ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, RotateCcwIcon, StopCircleIcon } from "lucide-react";

interface SubmitFormProps {
  input: string;
  status: "submitted" | "streaming" | "ready" | "error";
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  handleStop?: () => void;
  handleReload?: () => void;
  className?: string;
}

export const SubmitForm = ({
  input,
  status,
  handleInputChange,
  handleSubmit,
  handleStop,
  handleReload,
  className,
}: SubmitFormProps) => {
  return (
    <form
      className={cn(
        "flex flex-col p-2.5 bg-input/30 border rounded-2xl",
        className
      )}
      onSubmit={handleSubmit}
    >
      <Textarea
        name="prompt"
        value={input}
        onChange={handleInputChange}
        className="min-h-[56px] max-h-[336px] p-0 bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 dark:bg-transparent rounded-none"
      />
      <div className="flex items-center justify-end h-8 mt-1">
        <Button
          type={status === "ready" ? "submit" : "button"}
          variant="outline"
          disabled={status === "ready" && !input.trim()}
          onClick={(e) => {
            if (status === "error") {
              e.preventDefault();
              handleReload?.();
            } else if (status === "streaming" || status === "submitted") {
              e.preventDefault();
              handleStop?.();
            }
          }}
          className="size-8 rounded-full cursor-pointer"
        >
          {status === "ready" && <ArrowUpIcon size={16} aria-hidden="true" />}
          {status === "error" && <RotateCcwIcon size={16} aria-hidden="true" />}
          {(status === "streaming" || status === "submitted") && (
            <StopCircleIcon size={16} aria-hidden="true" />
          )}
        </Button>
      </div>
    </form>
  );
};
