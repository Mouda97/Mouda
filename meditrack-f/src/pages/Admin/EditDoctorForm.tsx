import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as DoctorService from '../../services/DoctorService';
import DoctorForm from './DoctorForm';

const EditDoctorForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    DoctorService.getById(Number(id))
      .then(setDoctor)
      .catch(() => setError('Erreur lors du chargement du médecin.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      await DoctorService.update(Number(id), values);
      navigate('/admin/medecins');
    } catch (e) {
      setError('Erreur lors de la mise à jour.');
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!doctor) return <div className="p-6">Médecin introuvable.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier le médecin</h1>
      <DoctorForm initial={doctor} onSubmit={handleSubmit} onCancel={() => navigate('/admin/medecins')} />
    </div>
  );
};

export default EditDoctorForm;
