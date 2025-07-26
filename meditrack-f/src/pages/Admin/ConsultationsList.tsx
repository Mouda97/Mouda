import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Consultation } from '../../types';
// Removed unused Button import

const ConsultationsList: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await api.get('/consultations');
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setConsultations(data);
      } catch (err: any) {
        setError('Erreur lors du chargement des consultations');
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Liste des consultations</h1>
      <div className="bg-white shadow rounded-lg p-4">
        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Patient ID</th>
                <th className="border px-4 py-2">Médecin ID</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Symptômes</th>
                <th className="border px-4 py-2">Diagnostic</th>
                <th className="border px-4 py-2">Traitement</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c.id}>
                  <td className="border px-4 py-2">{c.id}</td>
                  <td className="border px-4 py-2">{c.patient_id}</td>
                  <td className="border px-4 py-2">{c.doctor_id}</td>
                  <td className="border px-4 py-2">{c.consultation_date}</td>
                  <td className="border px-4 py-2">{c.symptoms}</td>
                  <td className="border px-4 py-2">{c.diagnosis}</td>
                  <td className="border px-4 py-2">{c.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ConsultationsList;
