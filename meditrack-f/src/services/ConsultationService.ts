/**
 * Récupère une consultation par son ID
 * @param id string | number
 * @returns Promise<Consultation>
 */
export async function getConsultationById(id: string | number) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/consultations/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération de la consultation');
    const data = await response.json();
    // On suppose que l'API retourne { success, data, message }
    return data.data;
  } catch (e) {
    throw new Error('Impossible de récupérer la consultation.');
  }
}
import api from './api';
import { Consultation } from '../types';

const base = '/consultations';

export const getAll = async (): Promise<Consultation[]> => {
  try {
    const response = await api.get(base);
    return response.data.data;
  } catch {
    throw new Error("Impossible de récupérer les consultations.");
  }
};

export const getById = async (id: number): Promise<Consultation> => {
  try {
    const response = await api.get(`${base}/${id}`);
    return response.data.data;
  } catch {
    throw new Error(`Impossible de récupérer la consultation #${id}.`);
  }
};

export const create = async (data: Partial<Consultation>): Promise<Consultation> => {
  try {
    const response = await api.post(base, data);
    return response.data.data;
  } catch {
    throw new Error("Échec de l'enregistrement de la consultation.");
  }
};

export const update = async (id: number, data: Partial<Consultation>): Promise<Consultation> => {
  try {
    const response = await api.put(`${base}/${id}`, data);
    return response.data.data;
  } catch {
    throw new Error(`Échec de la mise à jour de la consultation #${id}.`);
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await api.delete(`${base}/${id}`);
  } catch {
    throw new Error(`Échec de la suppression de la consultation #${id}.`);
  }
};
