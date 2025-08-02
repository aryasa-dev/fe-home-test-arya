import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseApiOptions<T = any> {
  manual?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
}

export const useApi = <T = any>(
  requestProps: Parameters<typeof apiRequest>[0],
  options?: UseApiOptions<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async (overrideProps?: Partial<Parameters<typeof apiRequest>[0]>) => {
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
