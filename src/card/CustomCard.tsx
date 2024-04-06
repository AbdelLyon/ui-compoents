import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

type CustomCardProps = React.ComponentProps<typeof Card> & {
  className?: string;
  title: string;
  description?: string;
  img?: React.ReactNode;
  footer?: React.ReactNode;
};
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
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default CustomCard;
