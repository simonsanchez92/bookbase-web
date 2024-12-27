import { FilterOption } from './filter-option.interface';
import { SortOption } from './sort-option.interface';

export interface QueryObject {
  Search: string;
  Sorts: SortOption[];
  Filters: FilterOption[];
}
