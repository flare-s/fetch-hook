import { useState, useCallback } from "react";
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = useCallback(async (requestConfig, handleData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, requestConfig.config);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      handleData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    fetchRequest,
  };
};

export default useFetch;
