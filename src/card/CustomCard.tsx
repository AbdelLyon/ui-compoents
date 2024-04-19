import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { CustomCardProps } from "./types";
import { ReactNode } from "react";

export const CardImage = ({
  children,
  height,
  width,
}: {
  children: ReactNode;
  height?: string | number;
  width?: string | number;
}) => {
  return (
    <div
      className="relative overflow-hidden transition-transform duration-300 ease-in-out transform"
      style={{ minHeight: 100, minWidth: 150, height, width }}
    >
      {children}
    </div>
  );
};

export const CustomCardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <CardHeader>
      <CardTitle className={className}>{children}</CardTitle>
    </CardHeader>
  );
};

export const CustomCardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <CardContent className={className}>{children}</CardContent>;
};

export const CustomCardFooter = ({ children }: { children: ReactNode }) => {
  return <CardFooter>{children}</CardFooter>;
};

export const CustomCard = ({
  className,
  width,
  height,
  clickable = false,
  children,
}: CustomCardProps) => {
  return (
    <Card
      className={cn(
        "border-border relative",
        {
          "border-border rounded-b-sm cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg":
            clickable,
        },
        className
      )}
      style={{ minWidth: 200, minHeight: 200, width, height }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
