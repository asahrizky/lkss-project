import { useState, useCallback } from "react";

type ExecuteFnGeneric<T, P> = (payload: P) => Promise<T>;

/**
 * Custom hook that returns the mutation state and the executeMutation function
 * @description Hook ini digunakan untuk melakukan action POST/PUT/DELETE ke API
 * @param executeFn - Function that will be executed when the mutation is called
 * @returns - Object containing the mutation state and the executeMutation function
 * @example
 * const { isLoading, isError, errorMessage, executeMutation } = useMutation(
 *  (payload) => fetch("/api/users", payload)
 * );
 * executeMutation({ name: "John Doe" });
 */
export default function useMutation<T = unknown, P = unknown>(
  executeFn: ExecuteFnGeneric<T, P>,
  callback?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) {
  const { onError, onSuccess } = callback || {};

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const executeMutation = useCallback(
    (payload: P) => {
      setIsLoading(true);
      setIsError(false);

      executeFn(payload)
        .then((res) => {
          setIsLoading(false);
          setIsError(false);

          onSuccess && onSuccess(res);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(err.message);
          onError && onError(err);
        });
    },
    [executeFn]
  );

  return {
    isLoading,
    isError,
    errorMessage,
    executeMutation,
  };
}
