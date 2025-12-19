"use client";

import type { FC, JSX } from "react";

import Checkbox from "./Checkbox";
import { CheckboxGroupTitle } from "./CheckboxStyles";
import { Flex } from "@/components/primitives";

interface Props {
  options: Array<string>;
  title: string;
  value: string[];
  onChange: (value: string[]) => void;
}

const CheckboxGroup: FC<Props> = ({ value, title, options, onChange }): JSX.Element => {
  return (
    <Flex.Column rowGap="8px" alignItems="flex-start">
      <CheckboxGroupTitle weight={500} texttransform="capitalize" color={(theme) => theme.colors.base300}>
        {title}
      </CheckboxGroupTitle>
      <Flex.Column rowGap="16px">
        {options.map((option, idx) => {
          const isChecked = value.includes(option);

          return (
            <Checkbox
              key={String(`${option}-${idx}`)}
              label={option}
              checked={isChecked}
              onChange={() => {
                const next = isChecked ? value.filter((v) => v !== option) : [...value, option];

                onChange(next);
              }}
            />
          );
        })}
      </Flex.Column>
    </Flex.Column>
  );
};

export default CheckboxGroup;
