import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { createApiClient } from "@/lib/api";
import { toast } from "sonner";

export interface ISendOptions<T, Variables> {
  params?: unknown;
  useAuth?: boolean;
  baseUrl?: string;
  onSuccess?: (data: T, variables: Variables) => void;
  hideToast?: "none" | "success" | "error" | "all";
  successMessage?: string;
  errorMessage?: string;
  enabled?: boolean;
  onError?: (error: Error, variables: Variables) => void;
  method?: "post" | "put" | "patch" | "delete";
}

export const useSend = <Variables, T = unknown>(
  url: string,
  options: ISendOptions<T, Variables> = {}
) => {
  const {
    params,
    useAuth = true,
    baseUrl,
    onSuccess,
    successMessage,
    errorMessage,
    onError,
    hideToast = "none",
    method = "post",
  } = options;
  const { client } = createApiClient({ useAuth, baseUrl });
  const mutationFn = useCallback(
    async (variables: Variables) => {
      const { data } = await client[method](
        url,
        variables as Variables & AxiosRequestConfig<Variables>,
        { params }
      );

      return data;
    },
    [client, method, params, url]
  );
  const mutation = useMutation({
    mutationFn,
    onSuccess(data, variables) {
      onSuccess?.(data, variables);
      if (!["success", "all"].includes(hideToast))
        toast.success(successMessage ?? data?.message);
    },
    onError(err, variables) {
      onError?.(err, variables);
      const error = err as AxiosError<{
        message: string;
        error: string;
        statusCode: number;
      }>;
      const axiosError = error?.response?.data?.message;
      const axiosErrorMessage = errorMessage ?? axiosError;
      if (!["error", "all"].includes(hideToast))
        toast.error(axiosErrorMessage);
    },
  });

  return { ...mutation };
};
