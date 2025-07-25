
import React, { useEffect, useState } from 'react';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import Textarea from '../../components/Common/Textarea';
import Button from '../../components/Common/Button';

import { getAll as getAllPatients } from '../../services/PatientService';
import { create as createConsultation } from '../../services/ConsultationService';
import { create as createDocument } from '../../services/DocumentService';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ConsultationForm: React.FC = () => {

  const [patients, setPatients] = useState<any[]>([]);
  const [patientId, setPatientId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [consultationDate, setConsultationDate] = useState(() => new Date().toISOString().slice(0,16));
  const [note, setNote] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllPatients().then(setPatients).catch(() => toast.error('Erreur chargement patients'));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleGeneratePrescription = () => {
    setGenerating(true);
    // Génération automatique fictive (à remplacer par une vraie logique ou API)
    setTimeout(() => {
      setPrescription('Paracétamol 1g x3/jour pendant 5 jours');
      setGenerating(false);
      toast.success('Ordonnance générée automatiquement');
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit', { patientId, user });
    if (!patientId) return toast.error('Sélectionnez un patient');
    if (!user?.id) return toast.error('Utilisateur non authentifié');
    setUploading(true);
    let documentIds: number[] = [];
    try {
      for (const file of documents) {
        if (!patientId) throw new Error('patient_id manquant pour l’upload du document');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('patient_id', String(patientId));
        formData.append('type', 'other'); // ou un type choisi par l’utilisateur
        console.log('patientId envoyé', String(patientId));
        const doc = await createDocument(formData);
        documentIds.push(doc.id);
      }
      await createConsultation({
        patient_id: Number(patientId),
        doctor_id: user.id,
        consultation_date: new Date(consultationDate).toISOString(),
        symptoms,
        diagnosis,
        treatment,
        recommendations,
        prescription,
        note,
        documents: JSON.stringify(documentIds),
      });
      toast.success('Consultation enregistrée');
      setTimeout(() => navigate('/consultations'), 1000);
    } catch (err: any) {
      let msg = 'Erreur lors de la création';
      if (err?.response?.data) {
        msg += `\n${JSON.stringify(err.response.data)}`;
      }
      toast.error(msg);
      console.error('Erreur création consultation', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card title="Nouvelle consultation">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Patient</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              required
            >
              <option value="">Sélectionner un patient...</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.first_name} {p.last_name} ({p.email})
                </option>
              ))}
            </select>
          </div>
          <Input label="Date et heure" type="datetime-local" value={consultationDate} onChange={e => setConsultationDate(e.target.value)} required />
          <Textarea placeholder="Symptômes" value={symptoms} onChange={e => setSymptoms(e.target.value)} required />
          <Textarea placeholder="Diagnostic" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
          <Textarea placeholder="Traitement" value={treatment} onChange={e => setTreatment(e.target.value)} required />
          <Textarea placeholder="Recommandations" value={recommendations} onChange={e => setRecommendations(e.target.value)} />
          <div className="flex gap-2 items-center">
            <Textarea placeholder="Ordonnance (médicaments)" value={prescription} onChange={e => setPrescription(e.target.value)} />
            <Button
              type="button"
              variant="secondary"
              onClick={handleGeneratePrescription}
              disabled={generating || uploading}
            >
              {generating ? 'Génération...' : 'Générer l’ordonnance'}
            </Button>
          </div>
          <Textarea placeholder="Note confidentielle (non visible au patient)" value={note} onChange={e => setNote(e.target.value)} />
          <div>
            <label className="block text-gray-700 font-medium mb-1">Documents liés</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              variant="primary"
              // disabled={
              //   uploading || generating || !patientId || !consultationDate || !symptoms || !diagnosis || !treatment
              // }
            >
              {uploading
                ? 'Enregistrement...'
                : 'Enregistrer la consultation'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={!prescription || generating || uploading}
              onClick={() => {
                if (!prescription || generating || uploading) return;
                // Impression simple (window.print) ou génération PDF à brancher ici
                window.print();
              }}
            >
              {(!prescription || generating || uploading)
                ? 'Ordonnance requise'
                : 'Imprimer / Télécharger l’ordonnance'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ConsultationForm;
