import { Suspense } from "react";
import { BotIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex items-center h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-full px-4 mx-auto">
          <div className="flex items-center gap-4">
            <BotIcon size={28} className="shrink-0" />
            <span className="text-lg font-bold whitespace-nowrap">Next AI</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Suspense fallback={<UserAvatarSkeleton />}>
              <UserAvatar />
            </Suspense>
          </div>
        </div>
      </header>
      <div className="container flex flex-col flex-1 px-4 mx-auto">
        {children}
      </div>
    </div>
  );
}
