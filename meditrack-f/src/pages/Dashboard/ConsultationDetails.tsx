import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultationById } from '../../services/ConsultationService';
import { Consultation } from '../../types/consultation';
import { Card } from '../../components/Card';

/**
 * Page de détail d'une consultation
 * Affiche toutes les informations d'une consultation sélectionnée
 */
const ConsultationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getConsultationById(id)
      .then((data) => {
        setConsultation(data);
        setError(null);
      })
      .catch(() => setError("Impossible de charger la consultation."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!consultation) return <div>Aucune consultation trouvée.</div>;

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Détail de la consultation</h2>
      <div className="space-y-2">
        <div><strong>Date :</strong> {consultation.date}</div>
        <div><strong>Patient :</strong> {consultation.patient?.name || 'N/A'}</div>
        <div><strong>Médecin :</strong> {consultation.doctor?.name || 'N/A'}</div>
        <div><strong>Motif :</strong> {consultation.reason}</div>
        <div><strong>Diagnostic :</strong> {consultation.diagnosis}</div>
        <div><strong>Traitement :</strong> {consultation.treatment}</div>
        <div><strong>Recommandations :</strong> {consultation.recommendations}</div>
        <div><strong>Note :</strong> {consultation.note}</div>
        {/* Ajoute ici d'autres champs si besoin */}
      </div>
    </Card>
  );
};

export default ConsultationDetails;
