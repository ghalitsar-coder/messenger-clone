import React from "react";
import { PAGE_AUTH, fieldFormData } from "../constants";
import TextField from "@/components/CUSTOM/TextField";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IFormFields {
  page: PAGE_AUTH;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

// eslint-disable-next-line react/display-name
const FormFields = ({ page, errors, register }: IFormFields) => {
  let formFields = fieldFormData({ register, errors }).map((field) => (
    <TextField key={field.name} {...field} />
  ));

  if (page === "LOGIN") {
    const formDataCopy = fieldFormData({ register, errors }).slice();
    formDataCopy.splice(1, 1);
    return formDataCopy.map((field) => (
      <TextField key={field.name} {...field} />
    ));
  }

  return formFields;
};

export default FormFields;
