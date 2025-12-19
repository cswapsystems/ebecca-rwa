import type { FC, JSX } from "react";

import Radio from "./Radio";
import { Flex } from "@/components/primitives";
import { RadioGroupTitle } from "./RadioStyles";

export interface RadioGroupProps {
  options: Array<string>;
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({ title, value, options, onChange }): JSX.Element => {
  return (
    <Flex.Column rowGap="8px" alignItems="flex-start">
      <RadioGroupTitle weight={500} texttransform="capitalize" color={(theme) => theme.colors.base300}>
        {title}
      </RadioGroupTitle>
      <Flex.Column rowGap="16px">
        {options.map((option, idx) => (
          <Radio
            key={String(`${option}-${idx}`)}
            label={option}
            checked={option === value}
            onChange={() => onChange(option)}
          />
        ))}
      </Flex.Column>
    </Flex.Column>
  );
};

export default RadioGroup;
