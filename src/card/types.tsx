import { ComponentProps, ReactNode } from "react";
import { Card } from "../shared/ui/card";

export type CustomCardProps = ComponentProps<typeof Card> & {
  className?: string;
  width?: number;
  img?: ReactNode;
  title: string;
  description?: string;
  footer?: ReactNode;
};
