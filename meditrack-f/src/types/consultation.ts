// TypeScript type pour une Consultation
export interface Consultation {
  id: number;
  date: string;
  patient?: {
    id: number;
    name: string;
  };
  doctor?: {
    id: number;
    name: string;
  };
  reason?: string;
  diagnosis?: string;
  treatment?: string;
  recommendations?: string;
  note?: string;
  // Ajoute ici d'autres champs selon ton backend
}
