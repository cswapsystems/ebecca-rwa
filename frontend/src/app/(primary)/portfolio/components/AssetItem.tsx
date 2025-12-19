'use client';

import React from 'react';
import Image from 'next/image';
import { Button, DropdownInput } from '@/components/common';
import {
  AssetItem as StyledAssetItem,
  AssetLeft,
  AssetIcon,
  AssetImage,
  AssetTitleRow,
  AssetTitle,
  AssetMeta,
  Gain,
  StatusPill,
  RightActions,
  StatusPillContainer,
  MobileDropdown,
  DesktopDropdown,
  AssetDetails,
  YieldItem,
  AssetMetaValue,
  AssetMetaItem,
  YieldLabel,
  Amount,
} from '../portfolioStyles';
import { PortfolioAsset } from '@/mocks/portfolio';
import { portfolioAssetActions } from '@/mocks/portfolio';

interface AssetItemProps {
  asset: PortfolioAsset;
  openDropdownId: string | null;
  onDropdownToggle: (dropdownId: string, expanded: boolean) => void;
}

const AssetItem: React.FC<AssetItemProps> = ({ asset, openDropdownId, onDropdownToggle }) => {
  const mobileDropdownId = `mobile-${asset.id}`;
  const desktopDropdownId = `desktop-${asset.id}`;

  return (
    <StyledAssetItem>
      <AssetImage>
        <Image src={asset.icon} alt={asset.title} fill sizes="100vw" />
      </AssetImage>
      <AssetLeft>
        <AssetIcon>
          <Image src={asset.icon} alt="icon" fill sizes="66px" />
        </AssetIcon>
        <AssetDetails>
          <AssetTitleRow>
            <AssetTitle>{asset.title}</AssetTitle>
            <StatusPillContainer>
              {asset.badge && <StatusPill $badge={asset.badge}>{asset.badge}</StatusPill>}
              <MobileDropdown>
                <DropdownInput
                  options={portfolioAssetActions}
                  onOptionSelect={() => {}}
                  padding={5}
                  borderRadius={12}
                  variant="dotted"
                  icon={<Image src="/icons/more-vertical.svg" alt="More options" width={24} height={24} />}
                  isExpanded={openDropdownId === mobileDropdownId}
                  onToggle={(expanded) => onDropdownToggle(mobileDropdownId, expanded)}
                  dropdownId={mobileDropdownId}
                />
              </MobileDropdown>
            </StatusPillContainer>
          </AssetTitleRow>
          <AssetMeta>
            <AssetMetaItem>
              Purchase price <AssetMetaValue>$ {asset.purchase.toLocaleString()}</AssetMetaValue>
            </AssetMetaItem>
            <AssetMetaItem>
              Current price <AssetMetaValue>$ {asset.current.toLocaleString()}</AssetMetaValue>
            </AssetMetaItem>
            <AssetMetaItem>
              Gain/Loss <Gain>↑ {asset.gainPct}%</Gain>
            </AssetMetaItem>
            {asset.monthlyYield != null && (
              <YieldItem>
                <YieldLabel>Monthly Yield</YieldLabel>
                <Amount>$ {asset.monthlyYield.toLocaleString()}</Amount>
              </YieldItem>
            )}
            {asset.totalYield != null && (
              <YieldItem>
                <YieldLabel>Total Yield</YieldLabel>
                <Amount>$ {asset.totalYield.toLocaleString()}</Amount>
              </YieldItem>
            )}
          </AssetMeta>
        </AssetDetails>
      </AssetLeft>

      <RightActions>
        {asset.earning === 'start' ? (
          <Button variant="primary" onClick={() => {}}>
            Start Earning
          </Button>
        ) : (
          <Button variant="earning" onClick={() => {}}>
            <Image src="/icons/earning-arrow.svg" alt="earning" width={18} height={18} />
            Earning Active
          </Button>
        )}
        <DesktopDropdown>
          <DropdownInput
            options={portfolioAssetActions}
            onOptionSelect={() => {}}
            padding={5}
            borderRadius={12}
            variant="dotted"
            icon={<Image src="/icons/more-vertical.svg" alt="More options" width={24} height={24} />}
            isExpanded={openDropdownId === desktopDropdownId}
            onToggle={(expanded) => onDropdownToggle(desktopDropdownId, expanded)}
            dropdownId={desktopDropdownId}
          />
        </DesktopDropdown>
      </RightActions>
    </StyledAssetItem>
  );
};

export default AssetItem;
