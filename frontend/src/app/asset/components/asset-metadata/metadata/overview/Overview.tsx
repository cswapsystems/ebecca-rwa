"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";
import styled from "styled-components";

import { Grid } from "@/components/primitives";
import { Flex } from "@/components/primitives";
import { Typography } from "@/components/common";
import useGetAssetOverviewData from "./useGetAssetOverviewData";
import KeywordButton from "../../../keywords-select/KeywordButton";

import { breakpoints } from "@/constants";

const AssetOverviewHeaderTextDesktop = styled(Typography.H4)`
  @media only screen and (max-width: ${breakpoints.s}px) {
    display: none;
  }
`;

const AssetOverviewHeaderTextMobile = styled(Typography.H5)`
  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    display: none;
  }
`;

const AssetOverviewTitleItem = styled(Typography.Span)`
  font-size: 16px;
  line-height: 22px;

  @media only screen and (max-width: ${breakpoints.s}px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const AssetOverview: FC<object> = (): JSX.Element => {
  const assetOverviewData = useGetAssetOverviewData();

  const assetOverviewLabel = useMemo<string>(() => "Asset overview", []);

  return (
    <>
      <AssetOverviewHeaderTextDesktop
        weight={600}
        size="20px"
        lineHeight="26px"
        color={(theme) => theme.colors.base950}
        texttransform="capitalize"
      >
        {assetOverviewLabel}
      </AssetOverviewHeaderTextDesktop>
      <AssetOverviewHeaderTextMobile
        weight={600}
        size="18px"
        lineHeight="24px"
        color={(theme) => theme.colors.base950}
        texttransform="capitalize"
      >
        {assetOverviewLabel}
      </AssetOverviewHeaderTextMobile>
      <Grid.Container numColumns={2} mobileNumColumns={1} width="100%">
        {assetOverviewData.map((data) => (
          <Grid.Item key={data.title}>
            <Flex.Column rowGap="8px">
              <AssetOverviewTitleItem weight={500} color={(theme) => theme.colors.base300}>
                {data.title}
              </AssetOverviewTitleItem>
              {typeof data.item === "string" ? (
                <AssetOverviewTitleItem weight={400} color={(theme) => theme.colors.base950}>
                  {data.item}
                </AssetOverviewTitleItem>
              ) : (
                <Flex.Row flexWrap="wrap" columnGap="10px" rowGap="20px">
                  {data.item.map(
                    (item): JSX.Element => (
                      <KeywordButton
                        key={item}
                        data={{
                          id: data.title,
                          keyword: item,
                        }}
                        isSelected={false}
                      />
                    )
                  )}
                </Flex.Row>
              )}
            </Flex.Column>
          </Grid.Item>
        ))}
      </Grid.Container>
    </>
  );
};

export default AssetOverview;
