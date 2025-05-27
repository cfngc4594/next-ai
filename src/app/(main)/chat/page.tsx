"use client";

import {
  CircleAlertIcon,
  LoaderCircleIcon,
  PenLineIcon,
  RotateCcwIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { SubmitForm } from "@/components/submit-form";
import { MdxClientRenderer } from "@/components/mdx/mdx-client-renderer";

export default function DemoPage() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    stop,
    reload,
    append,
  } = useChat({});
  const isEmpty = !messages.length;
  const [editedMessageIds, setEditedMessageIds] = useState<string[]>([]);
  const [editingContent, setEditingContent] = useState<Record<string, string>>(
    {}
  );

  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-w-[343px] w-full mx-auto",
        isEmpty ? "items-center justify-center" : "", // position
        isEmpty ? "max-w-[672px]" : "max-w-[800px]" //width
      )}
    >
      {!isEmpty && (
        <div className="flex-1 p-4">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={cn(
                  "flex max-w-full",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex flex-col max-w-full mb-4",
                    message.role === "user" ? "items-end" : "items-start",
                    editedMessageIds.includes(message.id) && "w-full"
                  )}
                >
                  <div
                    className={cn(
                      "break-words w-full rounded-lg border",
                      message.role === "user" ? "bg-muted" : "",
                      !editedMessageIds.includes(message.id) && "px-5 py-2"
                    )}
                  >
                    {message.role === "user" ? (
                      editedMessageIds.includes(message.id) ? (
                        <Textarea
                          value={editingContent[message.id]}
                          onChange={(e) => {
                            setEditingContent((prev) => ({
                              ...prev,
                              [message.id]: e.target.value,
                            }));
                          }}
                          className="px-5 py-2 min-h-[100px] max-h-[268px] w-w-full bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 dark:bg-transparent rounded-none"
                        />
                      ) : (
                        <span className="whitespace-pre-wrap">
                          {message.content}
                        </span>
                      )
                    ) : (
                      <MdxClientRenderer source={message.content} />
                    )}
                  </div>
                  {message.role === "user" &&
                    (editedMessageIds.includes(message.id) ? (
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          variant="outline"
                          className="h-8.5 w-auto px-3.5"
                          onClick={() => {
                            setEditedMessageIds((prev) =>
                              prev.filter((id) => id !== message.id)
                            );
                            setEditingContent((prev) => {
                              const newContent = { ...prev };
                              delete newContent[message.id];
                              return newContent;
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="h-8.5 w-auto px-3.5"
                          onClick={() => {
                            const updatedMessages = messages.map((m) =>
                              m.id === message.id
                                ? { ...m, content: editingContent[message.id] }
                                : m
                            );
                            setMessages(updatedMessages);
                            const index = messages.findIndex(
                              (m) => m.id === message.id
                            );
                            const newMessages = messages.slice(0, index);
                            setMessages(newMessages);
                            append({
                              role: "user",
                              content: editingContent[message.id],
                            });
                            setEditedMessageIds((prev) =>
                              prev.filter((id) => id !== message.id)
                            );
                            setEditingContent((prev) => {
                              const newContent = { ...prev };
                              delete newContent[message.id];
                              return newContent;
                            });
                          }}
                        >
                          Send
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2">
                        <CopyButton
                          text={message.content}
                          variant="ghost"
                          className="h-5 w-5 cursor-pointer"
                        />
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => {
                                  setEditedMessageIds((prev) =>
                                    prev.includes(message.id)
                                      ? prev
                                      : [...prev, message.id]
                                  );
                                  setEditingContent((prev) => ({
                                    ...prev,
                                    [message.id]: message.content,
                                  }));
                                }}
                              >
                                <PenLineIcon size={16} aria-hidden="true" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              className="px-2 py-1 text-xs"
                            >
                              Edit
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  {message.role !== "user" && (
                    <div className="mt-3 flex items-center gap-2">
                      <CopyButton
                        text={message.content}
                        variant="ghost"
                        className="h-5 w-5 cursor-pointer"
                      />
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 cursor-pointer"
                              onClick={() => {
                                const index = messages.findIndex(
                                  (m) => m.id === message.id
                                );
                                const newMessages = messages.slice(0, index);
                                setMessages(newMessages);
                                if (newMessages.length > 0) reload();
                              }}
                            >
                              <RotateCcwIcon size={16} aria-hidden="true" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="px-2 py-1 text-xs"
                          >
                            Reset
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {status === "submitted" && (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              aria-hidden="true"
            />
          )}
          {error && (
            <div className="rounded-md border border-red-500/50 px-5 py-2 text-red-600 w-fit">
              <p className="text-sm">
                <CircleAlertIcon
                  className="me-3 -mt-0.5 inline-flex opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                An error occurred
              </p>
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full bg-background",
          isEmpty ? "" : "sticky bottom-0 pb-6.5 rounded-t-2xl "
        )}
      >
        <SubmitForm
          input={input}
          status={status}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleStop={stop}
          handleReload={reload}
        />
        <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-6.5">
          <span className="text-xs">Powered by Vercel AI SDK</span>
        </footer>
      </div>
    </div>
  );
}
