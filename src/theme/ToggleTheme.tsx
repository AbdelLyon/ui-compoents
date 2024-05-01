import { cn } from "@/shared/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleTheme = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <button
      className={cn(
        "cursor-pointer transition-all hover:opacity-80",
        className
      )}
      onClick={handleClick}
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="dark:hidden" />
    </button>
  );
};
export default ToggleTheme;
