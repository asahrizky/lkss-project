export interface RequestFilterInterface {
  page?: number;
  length?: number;
  orders?: string[];
  sortType?: string;
  filters?: FilterType[];
}

export type FilterType = {
  field: string;
  value: string;
  type: string;
  comparisonOperator?: string;
};
