import { ReactNode } from "react";
export type CustomCardProps = {
  className?: string;
  fetchNextPage?: () => void;
  width?: number | string;
  height?: number | string;
  clickable?: boolean;
  count?: number;
  index?: number;
  children?: ReactNode;
};
