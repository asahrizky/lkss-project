import { useState, useEffect, useCallback } from "react";

/**
 * @description Hook ini digunakan untuk melakukan pengambilan data berupa list dan detail dari API
 * @param {function} fn Function yang akan dijalankan untuk melakukan pengambilan data
 * @returns {object} { data, errorMessage, isError, isLoading }
 * @example
 * const { data, errorMessage, isError, isLoading } = useFetch(() => fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json()));
 */
export default function useFetch<T = unknown>(
  queryKey: any[],
  fn: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(null as unknown as T);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialFetch = useCallback(() => {
    setIsLoading(true);

    fn()
      .then((res) => {
        setData(res as T);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const refetch = useCallback(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    initialFetch();
  }, queryKey);

  // implement query key
  // useEffect(() => {
  //   initialFetch();
  // }, [queryKey]);

  return {
    data,
    refetch,
    errorMessage,
    isError,
    isLoading,
  };
}
