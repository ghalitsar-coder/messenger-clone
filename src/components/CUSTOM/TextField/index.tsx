"use client";

import { IFieldFormData } from "@/components/AuthForm/constants";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface ITextField extends IFieldFormData {
  key?: any;
  fieldClass?: string;
}

const TextField: React.FC<ITextField> = (props) => {
  const { label,fieldClass, ...rest } = props;
  return (
    <fieldset className={cn("grid gap-y-1.5", fieldClass)}>
      {label && (
        <label
          className="cursor-pointer w-fit block text-sm font-medium leading-6 text-gray-900"
          htmlFor={props.name}
        >
          {label}{" "}
        </label>
      )}
      <Input {...rest} />
      {rest.errors?.[props.name] && (
        <p className={"text-rose-500 text-xs"}>
          {rest?.errors?.[props.name]?.message as string}
        </p>
      )}
    </fieldset>
  );
};

export default TextField;
