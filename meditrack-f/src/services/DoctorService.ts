export const getById = async (id: number): Promise<Doctor> => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data.data;
};

import api from './api';
import { Doctor } from '../pages/Admin/DoctorsList';

const API_URL = '/doctors';

export const getAll = async (): Promise<Doctor[]> => {
  const response = await api.get(API_URL);
  return response.data.data;
};

export const create = async (doctor: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.post(API_URL, doctor);
  return response.data.data;
};

export const update = async (id: number, doctor: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.put(`${API_URL}/${id}`, doctor);
  return response.data.data;
};

export const remove = async (id: number): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};

export const suspend = async (id: number): Promise<Doctor> => {
  const response = await api.patch(`${API_URL}/${id}/status`, { status: 'suspended' });
  return response.data.data;
};

export const reactivate = async (id: number): Promise<Doctor> => {
  const response = await api.patch(`${API_URL}/${id}/status`, { status: 'active' });
  return response.data.data;
};
