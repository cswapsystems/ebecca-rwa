"use client";

import type { FC, JSX } from "react";

import { Flex } from "@/components/primitives";
import { Switch, Typography } from "@/components/common";

import { useAssetWizardContext } from "../../../context/AssetWizardProvider";
import { toCamelCase } from "@/utils";
interface Props {
  switchItems: Array<string>;
}

type HasMetadataFields = {
  metadataFields?: Record<string, boolean>;
};

const FormSwitchGroup: FC<Props> = ({ switchItems }): JSX.Element => {
  const { updateField, data } = useAssetWizardContext();

  const mdFields = (data as HasMetadataFields).metadataFields ?? {};

  return (
    <Flex.Column rowGap="16px" marginTop="24px">
      {switchItems.map(
        (si): JSX.Element => (
          <Flex.Row key={si} columnGap="12px" alignItems="center">
            <Switch
              checked={mdFields[toCamelCase(si)] ?? false}
              onChange={(checked) => {
                updateField(`metadataFields.${toCamelCase(si)}`, checked);
              }}
            />
            <Typography.Span weight={400} size="16px" lineHeight="150%">
              {si}
            </Typography.Span>
          </Flex.Row>
        )
      )}
    </Flex.Column>
  );
};

export default FormSwitchGroup;
