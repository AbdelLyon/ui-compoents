import { ReactNode } from "react";
import { Card } from "../shared/ui/card";

export type CustomCardProps = React.ComponentProps<typeof Card> & {
  className?: string;
  img?: ReactNode;
  title: string;
  description?: string;
  footer?: ReactNode;
};
