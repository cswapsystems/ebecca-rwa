export type Category = 'real-estate' | 'commodities' | 'tradfi' | 'collectibles';

export type Subcategory = 'Vintage' | 'Modern' | 'Contemporary';

export type KycRequirement = 'Required' | 'Not Required';

export type TagKey = 'personal-collection' | 'home' | 'table' | 'green-house';

export type GridAsset = Pick<
  AssetItem,
  'id' | 'imageSrc' | 'title' | 'quantityLabel' | 'description' | 'price' | 'tags'
>;

export interface AssetItem {
  tags?: TagKey[];
  id: string;
  imageSrc: string;
  title: string;
  quantityLabel: string;
  description: string;
  price: number;
  category: Category;
  subcategory: Subcategory;
  kyc: KycRequirement;
}

export type FiltersValue = Subcategory[] | KycRequirement[] | number;

export interface FiltersState {
  [key: string]: string | number | undefined;
  category?: Category;
  subcategory?: Subcategory;
  kyc?: KycRequirement;
  minPrice: number;
  maxPrice: number;
}

export interface ProductsGridProps {
  assets: GridAsset[];
}

export interface FilterSidebarProps {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  hasActiveFilters: boolean;
  resultCount: number;
  onOpenMobile: () => void;
  onClear: () => void;
}

export interface MobileFilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onClear: () => void;
}

export interface FilterSection {
  key: string;
  label: string;
  options: string[];
}
