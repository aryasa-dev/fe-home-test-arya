import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiRequestProps {
  url?: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  bodyRequest?: any;
  params?: Record<string, any>;
  path: string;
  timeout?: number;
  auth?: boolean;
}

export const apiRequest = async ({
  url,
  method,
  timeout,
  headers,
  bodyRequest,
  params,
  path,
  auth = true,
}: ApiRequestProps) => {
  const baseUrl = url ? `${url}/` : `${BASE_URL}/`;
  const fullUrl = baseUrl + path;

  const token = Cookies.get("ACCESS_TOKEN");

  const config: AxiosRequestConfig = {
    method,
    url: fullUrl,
    headers: {
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...(bodyRequest ? { data: bodyRequest } : {}),
    ...(params ? { params } : {}),
    ...(timeout ? { timeout } : {}),
  };

  try {
    const res = await axios(config);
    return res;
  } catch (err: any) {
    console.info("[ERROR] Api Request:", err?.response?.data || err.message);
    throw err;
  }
};
