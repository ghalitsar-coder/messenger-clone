export interface ClientError {
  message: string;
  statusCode: number;
}

export interface ServerError {
  message: string;
  errorCode: number;
}

// Union type for all possible error types
export type CustomError = ClientError | ServerError;
