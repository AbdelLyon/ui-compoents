interface NestedFilter {
  field: string;
  operator: string;
  value: string | number | boolean | string[];
  type?: string;
}

interface Scope {
  name: string;
  parameters: (string | number | boolean)[];
}

interface Sort {
  field: string;
  direction: string;
}

interface IncludeFilter {
  field: string;
  operator: string;
  value: string | number | boolean | string[];
}

interface Include {
  relation: string;
  filters: IncludeFilter[];
  limit: number;
}

interface AggregateFilter {
  field: string;
  value: string | number | boolean;
}

interface Aggregate {
  relation: string;
  type: string;
  field: string;
  filters: AggregateFilter[];
}

interface InstructionField {
  name: string;
  value: string;
}

interface Instruction {
  name: string;
  fields: InstructionField[];
}

export interface QuerySearch {
  scopes: Scope[];
  filters: (NestedFilter | { nested: NestedFilter[] })[];
  sorts: Sort[];
  includes: Include[];
  aggregates: Aggregate[];
  instructions: Instruction[];
  gates: ("create" | "view")[];
  page: number;
  limit: number;
}
