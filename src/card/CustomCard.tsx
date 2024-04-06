import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { CustomCardProps } from "./types";

const CustomCard = ({
  title,
  description,
  content,
  footer,
  className,
  img,
  ...props
}: CustomCardProps) => {
  return (
    <Card className={cn("w-[350px] border-border", className)} {...props}>
      {img ?? null}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default CustomCard;
