import { QueryKey } from "@tanstack/react-query";

export type Query<Data, Request> = {
  queryKey: QueryKey;
  request: ({ search }: { search: Partial<Request> }) => Promise<Data[]>;
  search: Partial<Request>;
  enabled?: boolean;
};
