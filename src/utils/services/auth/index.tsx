import api from "@/context/AxiosContext";
import { CustomError } from "@/types/components/ErrorFromServer";
import { PostRegister, PostSignIn } from "@/types/pages/Auth";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const postRegister = async ({
  data,
  onSuccess,
  onError,
}: PostRegister | FieldValues) => {
  try {
    await api.post("/register", data);
    await postSignIn({ data, onSuccess });
  } catch (err: unknown | any) {
    onError();
    toast.error("Invalid credentials");
    return err;
  }
};

export const postSignIn = async ({
  data,
  onSuccess,
  onError,
}: PostSignIn | FieldValues) => {
  const response = await signIn("credentials", {
    ...data,
    redirect: false,
  });
  if (response?.error) {
    onError();
    toast.error("Invalid credentials");
  }
  if (response?.ok && !response?.error) {
    toast.success("Success Logged In");
    onSuccess();
  }
  return response;
};
// {
//   "message": "Request failed with status code 400",
//   "name": "AxiosError",
//   "stack": "AxiosError: Request failed with status code 400\n    at settle (webpack-internal:///(app-pages-browser)/./node_modules/axios/lib/core/settle.js:24:12)\n    at XMLHttpRequest.onloadend (webpack-internal:///(app-pages-browser)/./node_modules/axios/lib/adapters/xhr.js:121:66)",
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "adapter": [
//           "xhr",
//           "http"
//       ],
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "method": "post",
//       "url": "/api/register",
//       "data": "{\"firstName\":\"\",\"lastName\":\"\",\"email\":\"asd@asd.co\",\"password\":\"aa\",\"name\":\"aaaa\"}"
//   },
//   "code": "ERR_BAD_REQUEST",
//   "status": 400
// }
