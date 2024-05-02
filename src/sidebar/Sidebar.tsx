import { cn } from "@/utils";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProps } from "@/types";

export const Sidebar = ({
  navigation,
  Button,
  pathname,
  className,
}: SidebarProps) => {
  return (
    <div className={cn("bg-sidebar z-40 relative", className)}>
      <div className="fixed min-w-[290px] p-4">
        {Button && (
          <div className="mt-20">
            {Button}
            <div className="bg-LinksSidebar my-6" />
          </div>
        )}
        <SidebarMenu navigation={navigation} pathname={pathname} />
      </div>
    </div>
  );
};
