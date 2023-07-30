import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";

export type PAGE_AUTH = "LOGIN" | "REGISTER";

export interface IFieldFormDataProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface IDefaultValues {
  name: string;
  email: string;
  password: string;
}
export interface IFieldConfig
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  rules: RegisterOptions;
}

export interface IFieldFormData
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IFieldFormDataProps {
  name: keyof IDefaultValues;
  label: string;
  placeholder: string;
  rules: RegisterOptions;
}

type FieldConfigGenerator = (props: IFieldFormDataProps) => IFieldFormData[];

interface OnErrorAuthProps {
  setError: UseFormSetError<FieldValues>;
  page: PAGE_AUTH;
}

export const fieldFormData: FieldConfigGenerator = ({ register, errors }) => [
  {
    name: "email",
    label: "Email",
    placeholder: " Email",
    register,
    errors,
    rules: {
      required: "Email is required!",
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter a valid email address",
      },
    },
    type: "email",
  },
  {
    name: "name",
    label: "Name",
    placeholder: "Name",
    register,
    errors,
    rules: {
      required: "Name is required!",
      pattern: {
        value: /^[a-zA-Z' -]{3,}$/,
        message: "The character must have at least 3 characters",
      },
    },
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    register,
    errors,
    rules: {
      required: "Password required!",
      // pattern: {
      //   value:
      //     /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/,
      //   message:
      //     "Password must be at least 8 characters and contain alphanumeric and special characters",
      // },
    },
    type: "password",
  },
];

export const defaultValues: IDefaultValues = {
  name: "",
  email: "",
  password: "",
};

export const onErrorAuth = ({ setError, page }: OnErrorAuthProps) => {
  const { name, ...rest } = defaultValues;
  const newKeys = {
    LOGIN: rest,
    REGISTER: { name, ...rest },
  };
  Object.keys(newKeys[page]).forEach((key) => {
    setError(key, {
      type: "Error From server",
      message: "Invalid Credentials",
    });
  });
};
