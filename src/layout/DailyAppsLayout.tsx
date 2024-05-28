import { DailyAppsNavbar } from "@/navbar/Navbar";
import { cn } from "@/utils";
import { useState } from "react";
import { DailyAppsLayoutProps } from "@/types";
import { Sidebar } from "@/sidebar/Sidebar";

export const DailyAppsLayout = ({
  header,
  children,
  classNameContainer,
  sidebar,
}: DailyAppsLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpenDropdown = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="bg-foreground min-h-screen w-full overflow-x-auto">
      <DailyAppsNavbar
        applicationName={header.applicationName}
        accountNavigation={header.accountNavigation}
        user={header.user}
        className={header.className}
        toggleTheme={header.toggleTheme}
        setOpenDropdown={setOpenDropdown}
        isOpenDropdown={isOpen}
        Logo={header.Logo}
      />
      <div className="relative z-20 flex w-full">
        <Sidebar
          btnIcon={sidebar.btnIcon}
          navigation={sidebar.navigation}
          pathname={sidebar.pathname}
          className="flex mt-16 fixed inset-y-0 md:mt-0 md:sticky left-0 z-10 w-14 flex-col border-r min-h-screen border-border background-sidebar"
          isOpenDropdown={isOpen}
        />

        <main
          // fixer le responsive endessous se 300px
          className={cn(
            "ml-24 mr-10 md:mr-16 md:ml-16 mt-28 flex-1 bg-background min-h-[83vh] h-full relative ",
            classNameContainer
          )}
        >
          {children}
        </main>
        {isOpen && (
          <div className="absolute top-0 w-screen min-h-screen backdrop-blur-sm -z-10" />
        )}
      </div>
    </div>
  );
};
