import { CustomError } from "@/types/components/ErrorFromServer";
import { IPostRegister } from "@/types/pages/Auth";
import { isCustomAxiosError } from "@/utils/helper";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const postRegister = async (data: IPostRegister | FieldValues) => {
  try {
    const user = await axios.post("/api/register", data);
    return user;
  } catch (err: unknown | any) {
    toast.error("Something went wrong", err);
    return err;
  }
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
