import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../services/PatientService';
import { Patient } from '../../types';
import Card from '../../components/Common/Card';
import { User } from 'lucide-react';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getById(Number(id))
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement du patient');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>Patient introuvable</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {patient.first_name} {patient.last_name}
            </h2>
            <p className="text-gray-500">{patient.email}</p>
          </div>
          <button
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate(`/patients/${id}/documents`)}
          >
            Documents
          </button>
        </div>
        <div className="space-y-2">
          <div><strong>Âge:</strong> {patient.date_of_birth ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear() : 'N/A'} ans</div>
          <div><strong>Sexe:</strong> {patient.gender === 'M' ? 'Masculin' : 'Féminin'}</div>
          <div><strong>Statut:</strong> {patient.status}</div>
          <div><strong>Chambre:</strong> {patient.room || 'Non assigné'}</div>
          <div><strong>Dernière consultation:</strong> {patient.last_consultation ? new Date(patient.last_consultation).toLocaleDateString('fr-FR') : 'Aucune'}</div>
          <div><strong>Téléphone:</strong> {patient.phone || 'N/A'}</div>
          <div><strong>Adresse:</strong> {patient.address || 'N/A'}</div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate(`/patients/${id}/documents`)}
          >
            Documents
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PatientDetails;
