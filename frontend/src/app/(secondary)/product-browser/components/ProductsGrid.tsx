import { Grid, NoDataMessage } from '../productBrowserStyles';
import AssetCard from '@/components/common/card/AssetCard';
import type { ProductsGridProps } from '../productBrowserTypes';

export default function ProductsGrid({ assets }: ProductsGridProps) {
  if (assets.length === 0) {
    return <NoDataMessage>No products found matching your filters. Try adjusting your search criteria.</NoDataMessage>;
  }

  return (
    <Grid>
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          imageSrc={asset.imageSrc}
          title={asset.title}
          quantityLabel={asset.quantityLabel}
          description={asset.description}
          price={asset.price}
          tags={asset.tags}
        />
      ))}
    </Grid>
  );
}
