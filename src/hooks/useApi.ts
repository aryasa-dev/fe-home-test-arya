import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseApiOptions {
  manual?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
}

export const useApi = (
  requestProps: Parameters<typeof apiRequest>[0],
  options?: UseApiOptions
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!options?.manual);
  const [error, setError] = useState<any>(null);

  const fetchData = async (overrideProps?: Partial<typeof requestProps>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiRequest({ ...requestProps, ...overrideProps });
      setData(res.data);
      options?.onSuccess?.(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options?.manual) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData };
};
