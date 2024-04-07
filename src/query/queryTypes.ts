import { z } from "zod";

const NestedFilter = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  type: z.string().optional(),
});

const Scope = z.object({
  name: z.string(),
  parameters: z.array(z.union([z.string(), z.number(), z.boolean()])),
});

const Sort = z.object({
  field: z.string(),
  direction: z.string(),
});

const IncludeFilter = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
});

const Include = z.object({
  relation: z.string(),
  filters: z.array(IncludeFilter),
  limit: z.number(),
});

const AggregateFilter = z.object({
  field: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

const Aggregate = z.object({
  relation: z.string(),
  type: z.string(),
  field: z.string(),
  filters: z.array(AggregateFilter),
});

const InstructionField = z.object({
  name: z.string(),
  value: z.string(),
});

const Instruction = z.object({
  name: z.string(),
  fields: z.array(InstructionField),
});

const Search = z.object({
  scopes: z.array(Scope),
  filters: z.array(
    z.union([NestedFilter, z.object({ nested: z.array(NestedFilter) })])
  ),
  sorts: z.array(Sort),
  selects: z.array(z.object({ field: z.string() })),
  includes: z.array(Include),
  aggregates: z.array(Aggregate),
  instructions: z.array(Instruction),
  gates: z.array(z.enum(["create", "view"])),
  page: z.number(),
  limit: z.number(),
});

export type Search = z.infer<typeof Search>;
