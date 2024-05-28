import { SidebarProps } from "@/types";
import { cn } from "@/utils";
import { CustomButton } from "@/button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SidebarMenu } from "./SidebarMenu";

export const Sidebar = ({
  navigation,
  pathname,
  className,
  btnIcon,
  isOpenDropdown,
}: SidebarProps) => {
  return (
    <aside
      className={cn("md:min-w-[290px] md:w-[290px] md:px-2", className, {
        "min-w-[290px] w-[290px] px-2": isOpenDropdown,
      })}
    >
      <div className="sticky top-16 md:fixed md:w-[270px]  ">
        <nav className="flex flex-col items-center gap-4 px-3 mt-4">
          <CustomButton
            icon={
              <FontAwesomeIcon
                icon={btnIcon as IconProp}
                className={cn("h-5 w-5 md:h-6 md:w-6", {
                  "h-6 w-6": isOpenDropdown,
                })}
              />
            }
            iconPosition="left"
            className={cn("bg-primary px-2 h-9 md:w-full", {
              "w-full": isOpenDropdown,
            })}
          >
            <span
              className={cn("hidden md:block font-semibold", {
                block: isOpenDropdown,
              })}
            >
              Ajouter un évènement
            </span>
          </CustomButton>
          <div className="bg-sidebar w-full h-[1px]" />

          <SidebarMenu
            navigation={navigation}
            pathname={pathname}
            className="w-full"
            isOpenDropdown={isOpenDropdown}
          />
        </nav>
      </div>
    </aside>
  );
};
