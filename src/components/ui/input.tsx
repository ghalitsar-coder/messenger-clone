import * as React from "react";

import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  rules: RegisterOptions;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, rules, errors, ...props }, ref) => {
    return (
      <input
        type={type}
        id={props.name}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          errors?.[props?.name! ?? props?.id]?.type &&
            "!border-rose-500 focus:!ring-rose-500"
        )}
        autoComplete={props?.name}
        {...register(props?.name!, rules)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
