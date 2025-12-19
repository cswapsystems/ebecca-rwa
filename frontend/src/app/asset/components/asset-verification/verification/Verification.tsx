"use client";

import type { FC, JSX } from "react";
import { useMemo } from "react";

import { Card, Typography, CategoryTag } from "@/components/common";
import { Flex } from "@/components/primitives";

import DocumentThumbnails from "./DocumentThumbnails";

export interface Tags {
  icon: string;
  tag: string;
}

interface Props {
  name: string | null;
  submissionDate: string | null;
  tags: Array<Tags>;
  images: Array<string>;
}

const Verification: FC<Props> = ({ name, submissionDate, tags, images }): JSX.Element => {
  const submissionDateFormat = useMemo((): string => {
    if (!submissionDate) return "";

    const date = new Date(submissionDate);

    if (isNaN(date.getTime())) return "";

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }, [submissionDate]);

  return (
    <Card
      display="flex"
      gap="105px"
      flexDirection="column"
      borderRadius="16px"
      padding="24px"
      border="none"
      backgroundColor={(theme) => theme.colors.white}
      width="100%"
      boxShadow="0px 2px 4px 0px rgba(0, 0, 21, 0.075)"
    >
      <Flex.Column rowGap="24px">
        <Typography.H3 texttransform="capitalize" size="24px" weight={700} lineHeight="30px" color="#2D3648">
          asset tokenization
        </Typography.H3>
        <Flex.Column rowGap="12px">
          {name && (
            <Typography.H4 weight={700} size="20px" lineHeight="26px" color={(theme) => theme.colors.base950}>
              {name}
            </Typography.H4>
          )}

          <Flex.Row columnGap="8px" rowGap="8px" flexWrap="wrap">
            {tags?.map(
              (tag, idx): JSX.Element => (
                <CategoryTag key={String(`${tag?.tag}-${idx}`)} icon={tag?.icon} tag={tag?.tag} />
              )
            )}
          </Flex.Row>

          <Typography.Span weight={500} size="16px" lineHeight="22px" color={(theme) => theme.colors.base950}>
            Submission Date: {submissionDateFormat}
          </Typography.Span>
        </Flex.Column>
      </Flex.Column>
      <DocumentThumbnails images={images} />
    </Card>
  );
};

export default Verification;
