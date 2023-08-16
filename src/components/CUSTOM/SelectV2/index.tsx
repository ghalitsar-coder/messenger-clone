import { Doppio_One } from "next/font/google";
import React from "react";
import ReactSelect, { ActionMeta, GroupBase, MultiValue } from "react-select";

type KeyOfLabelAndValue = {
  label: string;
  value: string;
};

interface ReactSelectV2 {
  value?: Record<string, any>;
  options: Record<string, any>[];
  onChange: (val: Record<string, any>) => void;
  isDisabled?: boolean;
  isMulti?: boolean;
}

const SelectV2: React.FC<ReactSelectV2> = (props) => {
  const { isMulti, ...rest } = props;
  return (
    <ReactSelect
      isMulti={isMulti ?? false}
      classNames={{
        control: () => "text-sm",
      }}
      {...rest}
    />
  );
};

export default SelectV2;
