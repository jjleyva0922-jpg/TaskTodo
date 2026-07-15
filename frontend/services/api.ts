import api from '../lib/apiClient';

export async function getRequest<T>(url: string, params?: any) {
  const res = await api.get<T>(url, { params });
  return res.data as T;
}

export async function postRequest<T>(url: string, data?: any) {
  const res = await api.post<T>(url, data);
  return res.data as T;
}

export async function putRequest<T>(url: string, data?: any) {
  const res = await api.put<T>(url, data);
  return res.data as T;
}

export async function deleteRequest<T>(url: string) {
  const res = await api.delete<T>(url);
  return res.data as T;
}
