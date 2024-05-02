import { Navbar } from "@/navbar/Navbar";
import { Sidebar } from "@/sidebar/Sidebar";
import { cn } from "@/utils";
import { useRef, useState } from "react";
import { DailyAppsLayoutProps } from "@/types";

export const DailyAppsLayout = ({
  header,
  sidebar,
  children,
  classNameContainer,
}: DailyAppsLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-foreground w-screen min-h-screen">
      <Navbar
        title={header.title}
        navigation={header.navigation}
        username={header.username}
        className={header.className}
        toggleTheme={header.toggleTheme}
        toggleDropdownSidebar={() => setIsOpen(!isOpen)}
      />
      <div className="relative z-20 flex min-h-screen">
        <Sidebar
          className="hidden min-w-[290px] md:block min-h-screen "
          navigation={sidebar.navigation}
          iconSidebar={sidebar.iconSidebar}
          pathname={sidebar.pathname}
          Button={sidebar.Button}
        ></Sidebar>

        <div
          className={cn(
            "md:hidden md:min-w-[290px] md:inset-y-0 transition-all duration-300 -translate-x-64 opacity-0 ease-in-out",
            {
              "opacity-100 translate-x-0": isOpen,
            }
          )}
          ref={dropdownRef}
        >
          {isOpen && (
            <Sidebar
              className="absolute z-40 min-w-[290px] h-full"
              navigation={sidebar.navigation}
              iconSidebar={sidebar.iconSidebar}
              pathname={sidebar.pathname}
              Button={sidebar.Button}
            ></Sidebar>
          )}
        </div>
        <main
          className={cn(
            "mx-6 mt-20 flex-1 bg-background min-h-screen md:mx-16 md:mt-28 relative -z-10",
            classNameContainer
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
