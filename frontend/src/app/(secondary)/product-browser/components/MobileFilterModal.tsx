import { Modal } from '@/components/common';
import { FilterPanel } from '@/components/common';
import { productFilterSectionsData } from '@/mocks/productBrowser';
import type { MobileFilterModalProps, FilterSection, FiltersState } from '../productBrowserTypes';
import { ModalActions, ModalActionButton } from '../productBrowserStyles';

export default function MobileFilterModal({
  open,
  onClose,
  // filters,
  onChange,
  resultCount,
  onClear,
}: MobileFilterModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Filter Products" width={560}>
      <FilterPanel
        onChange={(filters) => onChange(filters as FiltersState)}
        resultCount={resultCount}
        sections={productFilterSectionsData as unknown as FilterSection[]}
      />
      <ModalActions>
        <ModalActionButton type="button" $variant="secondary" onClick={onClear}>
          Clear all
        </ModalActionButton>
        <ModalActionButton
          type="button"
          $variant="primary"
          onClick={() => {
            onClose();
          }}
        >
          {`Show (${resultCount})`}
        </ModalActionButton>
      </ModalActions>
    </Modal>
  );
}
