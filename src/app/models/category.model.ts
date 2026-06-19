export interface Category {
  id: number;
  name: string;
  label: string;
  isLeaf: boolean;
  firstLevelCatId: number;
  active: boolean;
  subcategories?: Category[];
  catPropertyModels?: any[];
  rules?: any;
  lscSetId?: number;
  variationCat?: boolean;
}