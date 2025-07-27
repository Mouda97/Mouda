import React, { useEffect, useState } from 'react';
import { useConsultations } from '../../hooks/useConsultations';
import Card from '../../components/Common/Card';
import { User, Plus } from 'lucide-react';
import Button from '../../components/Common/Button';
import { useNavigate } from 'react-router-dom';
import ConsultationActions from './ConsultationActions';
import { useAuth } from '../../hooks/useAuth';

const DoctorConsultations: React.FC = () => {
  const { user } = useAuth();
  const { consultations = [], loading, error, refetch } = useConsultations();
  const [filtered, setFiltered] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'medecin') {
      setFiltered(consultations.filter(c => c.doctor_id === user.id));
    } else {
      setFiltered([]);
    }
  }, [consultations, user]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Mes consultations</h1>
        <Button icon={Plus} variant="primary" onClick={() => navigate('/consultations/create')}>
          Ajouter une consultation
        </Button>
      </div>
      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">Erreur : {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <Card>
          <p className="text-gray-500">Aucune consultation trouvée.</p>
        </Card>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Diagnostic</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Recommandations</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Note</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                return (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      {c.patient?.first_name ? `${c.patient.first_name} ${c.patient.last_name}` : c.patient_id}
                    </td>
                    <td className="py-4 px-4">{new Date(c.consultation_date).toLocaleDateString('fr-FR')}</td>
                    <td className="py-4 px-4">{c.diagnosis}</td>
                    <td className="py-4 px-4">{c.recommendations}</td>
                    <td className="py-4 px-4">{c.note || '-'}</td>
                    <td className="py-4 px-4">
                      <ConsultationActions id={c.id} canEdit={true} canDelete={true} onDelete={refetch} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorConsultations;
