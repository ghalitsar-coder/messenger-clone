import { CustomError } from "@/types/components/ErrorFromServer";
import { AxiosError } from "axios";
export function deepCompare(obj1: object, obj2: object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
// Type guard function for AxiosError with custom error properties
export function isCustomAxiosError(
  error: any
): error is AxiosError<CustomError> {
  return error.isAxiosError && error.response && error.response.data;
}
