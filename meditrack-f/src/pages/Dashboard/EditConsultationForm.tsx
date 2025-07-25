import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import Textarea from '../../components/Common/Textarea';
import Button from '../../components/Common/Button';
import { getById, update } from '../../services/ConsultationService';
import { toast } from 'react-toastify';

const EditConsultationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [consultation, setConsultation] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [prescription, setPrescription] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!id) return;
    getById(Number(id))
      .then((data) => {
        setConsultation(data);
        setDiagnosis(data.diagnosis || '');
        setTreatment(data.treatment || '');
        setRecommendations(data.recommendations || '');
        setPrescription(data.prescription || '');
        setNote(data.note || '');
      })
      .catch(() => toast.error('Erreur chargement consultation'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      await update(Number(id), {
        diagnosis,
        treatment,
        recommendations,
        prescription,
        note,
      });
      toast.success('Consultation modifiée');
      setTimeout(() => navigate('/consultations'), 1000);
    } catch (err: any) {
      let msg = 'Erreur lors de la modification';
      if (err?.response?.data) {
        msg += `\n${JSON.stringify(err.response.data)}`;
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!consultation) return <div className="p-6 text-red-600">Consultation introuvable</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card title="Modifier la consultation">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Diagnostic" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
          <div>
            <label className="block text-gray-700 font-medium mb-1">Traitement</label>
            <Textarea value={treatment} onChange={e => setTreatment(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Recommandations</label>
            <Textarea value={recommendations} onChange={e => setRecommendations(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ordonnance (médicaments)</label>
            <Textarea value={prescription} onChange={e => setPrescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Note confidentielle (non visible au patient)</label>
            <Textarea value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/consultations')}>Annuler</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditConsultationForm;
