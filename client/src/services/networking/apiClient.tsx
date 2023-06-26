import axios, { AxiosRequestConfig } from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const apiClientGet = async <T,>(url: string) => {
  const { data } = await apiClient.get<T>(url)
  return data
}

export const apiClientPost = async <T,>(
  url: string,
  payload?: unknown,
  config?: AxiosRequestConfig<T>
) => {
  const { data } = await apiClient.post<T>(url, payload, config)
  return data
}

export const apiClientPut = async <T,>(url: string, payload?: unknown) => {
  const { data } = await apiClient.put<T>(url, payload)
  return data
}

export const apiClientPatch = async <T,>(url: string, payload?: unknown) => {
  const { data } = await apiClient.patch<T>(url, payload)
  return data
}

export const apiClientDelete = async <T,>(url: string, payload?: unknown) => {
  const { data } = await apiClient.delete<T>(url, { data: payload })
  return data
}
