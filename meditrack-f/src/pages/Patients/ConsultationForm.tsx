import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { create } from '../../services/ConsultationService';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import Textarea from '../../components/Common/Textarea';
import { toast } from 'react-toastify';

const ConsultationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await create({ patient_id: Number(id), diagnosis, recommendations });
      toast.success('Consultation enregistrée');
      navigate(-1);
    } catch {
      toast.error('Erreur lors de la création de la consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card title="Nouvelle consultation">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Diagnostic</label>
            <Input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Recommandations</label>
            <Textarea value={recommendations} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRecommendations(e.target.value)} required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>Enregistrer</Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Annuler</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ConsultationForm;
