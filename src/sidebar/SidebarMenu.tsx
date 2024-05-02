import { cn } from "@/utils";
import { Navigation, SidebarProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarMenu = ({
  navigation,
  pathname,
  className,
}: Partial<SidebarProps>) => {
  return (
    <div className={className}>
      {navigation?.map((item: Navigation) => {
        return (
          !item.hasAccess && (
            <a
              href={item.navigate}
              key={item.navigate}
              className={cn(
                "flex items-center py-3 my-1 cursor-pointer menu-transition transition-colors rounded-md line-transition px-4 text-white",
                {
                  "opacity-100 bg-LinksSidebar": pathname === item.navigate,

                  "opacity-70 transition-colors duration-150 hoverLinksSidebar ":
                    pathname !== item.navigate,
                }
              )}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={cn({
                  "mr-5 w-5 h-5": true,
                })}
              />

              <span className="truncate text-[15.4px] font-normal capitalize leading-5">
                {item.name}
              </span>
            </a>
          )
        );
      })}
    </div>
  );
};
