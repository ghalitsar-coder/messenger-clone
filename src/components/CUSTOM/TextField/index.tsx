"use client";

import {
  IDefaultValues,
  IFieldFormData,
  IFieldFormDataProps,
} from "@/components/AuthForm/constants";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

interface ITextField extends IFieldFormData {
  key: any;
}

const TextField: React.FC<ITextField> = (props) => {
  const { label, ...rest } = props;
  return (
    <fieldset className="grid gap-y-1.5">
      <label
        className="cursor-pointer block text-sm font-medium leading-6 text-gray-900"
        htmlFor={props.name}
      >
        {label}{" "}
      </label>
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
