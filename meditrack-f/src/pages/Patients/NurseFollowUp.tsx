import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save
} from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import { useAuth } from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import { useVitalSigns } from '../../hooks/useVitalSigns';
import { VitalSigns } from '../../types';


interface FollowUpData {
  date: string;
  time: string;
  temperature: string;
  blood_pressure: string;
  heart_rate: string;
  oxygen_saturation: string;
  mobility: string;
  consciousness: string;
  nutrition: string;
  medications_administered: string[];
  comments: string;
  anomaly_detected: boolean;
}

const NurseFollowUp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { patients = [] } = usePatients();
  const { vitalSigns = [] } = useVitalSigns();

  if (!id) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Identifiant du patient manquant.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Retour</Button>
      </div>
    );
  }

  const numericId = parseInt(id);
  const patient = patients.find(p => p.id === numericId);
  const patientSigns = vitalSigns.filter(v => v.patient_id === numericId);
  const lastSign = patientSigns[patientSigns.length - 1];

  const [form, setForm] = useState<FollowUpData>({
    date: '',
    time: '',
    temperature: '',
    blood_pressure: '',
    heart_rate: '',
    oxygen_saturation: '',
    mobility: '',
    consciousness: '',
    nutrition: '',
    medications_administered: [],
    comments: '',
    anomaly_detected: false
  });

  useEffect(() => {
    if (lastSign) {
      setForm({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        temperature: String(lastSign.temperature),
        blood_pressure: lastSign.blood_pressure,
        heart_rate: String(lastSign.heart_rate),
        oxygen_saturation: String(lastSign.oxygen_saturation),
        mobility: lastSign.mobility,
        consciousness: lastSign.consciousness,
        nutrition: lastSign.nutrition,
        medications_administered: lastSign.medications_administered || [],
        comments: lastSign.notes || '',
        anomaly_detected: lastSign.anomaly_detected
      });
    }
  }, [lastSign]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
  const { refetch } = useVitalSigns();
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Formatage des données pour l'API
      // Format ISO 8601 pour measurement_date
      let measurementDate = '';
      if (form.date && form.time) {
        // S'assure que form.time est bien au format HH:mm
        const timeParts = form.time.split(':');
        const hour = timeParts[0].padStart(2, '0');
        const minute = (timeParts[1] || '00').padStart(2, '0');
        // Format Laravel natif: YYYY-MM-DD HH:mm:ss
        measurementDate = `${form.date} ${hour}:${minute}:00`;
      } else {
        // Fallback: aujourd'hui à minuit
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        measurementDate = `${date} 00:00:00`;
      }
      const vitalData = {
        patient_id: patient?.id,
        nurse_id: user?.id,
        measurement_date: measurementDate,
        temperature: parseFloat(form.temperature),
        blood_pressure: form.blood_pressure,
        heart_rate: parseInt(form.heart_rate),
        oxygen_saturation: parseInt(form.oxygen_saturation),
        mobility: form.mobility,
        consciousness: form.consciousness,
        nutrition: form.nutrition,
        medications_administered: Array.isArray(form.medications_administered) ? form.medications_administered : [],
        notes: form.comments,
        anomaly_detected: !!form.anomaly_detected,
      };
      // Si un suivi existe déjà aujourd'hui, on met à jour, sinon on crée
      const todaySign = vitalSigns.find(v => {
        const datePart = v.measurement_date.split(' ')[0];
        return datePart === form.date && v.patient_id === patient?.id;
      });
      const { toast } = await import('react-toastify');
      console.log('Données envoyées au backend:', vitalData);
      if (todaySign) {
        await import('../../services/VitalSignsService').then(async svc => {
          try {
            const res = await svc.update(todaySign.id, vitalData);
            console.log('Réponse update:', res);
            toast.success('Suivi mis à jour avec succès !');
          } catch (err) {
            console.error('Erreur update:', err);
            throw err;
          }
        });
      } else {
        await import('../../services/VitalSignsService').then(async svc => {
          try {
            const res = await svc.create(vitalData);
            console.log('Réponse create:', res);
            toast.success('Suivi enregistré avec succès !');
          } catch (err) {
            console.error('Erreur create:', err);
            throw err;
          }
        });
      }
      await refetch();
      setLoading(false);
      setFieldErrors({});
      navigate(-1);
    } catch (err: any) {
      setLoading(false);
      let errorMsg = 'Erreur lors de l’enregistrement du suivi.';
      if (err.response && err.response.data && err.response.data.errors) {
        // Laravel retourne les erreurs de validation dans err.response.data.errors
        errorMsg = Object.values(err.response.data.errors).flat().join(' | ');
        setFieldErrors(err.response.data.errors);
        console.log('Validation errors:', err.response.data.errors);
        console.log('Full error object:', err);
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
      console.error('Message d\'erreur reçu du backend:', errorMsg);
      // Le toast d'erreur général est supprimé, seules les erreurs sous les champs sont affichées
    }
  };

  if (!patient) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Patient introuvable</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Retour</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erreur :</strong> {error}
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Suivi infirmier - {patient.first_name} {patient.last_name}</h2>
        <div className="flex gap-2">
          <Button icon={ArrowLeft} variant="secondary" onClick={() => navigate(-1)}>
            Retour
          </Button>
          {/* Bouton Modifier le suivi du jour */}
          {(() => {
            const today = new Date().toISOString().split('T')[0];
            const todaySign = vitalSigns.find(v => v.measurement_date.split(' ')[0] === today && v.patient_id === patient.id);
            if (todaySign) {
              return (
                <Button variant="secondary" onClick={() => {
                  setForm({
                    date: today,
                    time: todaySign.measurement_date.split(' ')[1]?.slice(0,5) || '',
                    temperature: String(todaySign.temperature),
                    blood_pressure: todaySign.blood_pressure,
                    heart_rate: String(todaySign.heart_rate),
                    oxygen_saturation: String(todaySign.oxygen_saturation),
                    mobility: todaySign.mobility,
                    consciousness: todaySign.consciousness,
                    nutrition: todaySign.nutrition,
                    medications_administered: todaySign.medications_administered || [],
                    comments: todaySign.notes || '',
                    anomaly_detected: todaySign.anomaly_detected
                  });
                }}>
                  Modifier le suivi du jour
                </Button>
              );
            }
            return null;
          })()}
        </div>
      </div>

      <Card title="Constantes vitales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input name="temperature" label="Température (°C)" value={form.temperature} onChange={handleChange} />
            {fieldErrors.temperature && fieldErrors.temperature.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('The temperature field is required.', 'Le champ température est obligatoire.').replace('must be a valid date.', 'doit être une date valide.').replace('field', 'champ')}</div>
            ))}
          </div>
          <div>
            <Input name="heart_rate" label="Rythme cardiaque (bpm)" value={form.heart_rate} onChange={handleChange} />
            {fieldErrors.heart_rate && fieldErrors.heart_rate.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
          <div>
            <Input name="blood_pressure" label="Tension artérielle" value={form.blood_pressure} onChange={handleChange} />
            {fieldErrors.blood_pressure && fieldErrors.blood_pressure.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
          <div>
            <Input name="oxygen_saturation" label="Saturation O₂ (%)" value={form.oxygen_saturation} onChange={handleChange} />
            {fieldErrors.oxygen_saturation && fieldErrors.oxygen_saturation.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Observations infirmières">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input name="consciousness" label="Conscience" value={form.consciousness} onChange={handleChange} />
            {fieldErrors.consciousness && fieldErrors.consciousness.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
          <div>
            <Input name="mobility" label="Mobilité" value={form.mobility} onChange={handleChange} />
            {fieldErrors.mobility && fieldErrors.mobility.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
          <div>
            <Input name="nutrition" label="Nutrition" value={form.nutrition} onChange={handleChange} />
            {fieldErrors.nutrition && fieldErrors.nutrition.map((err, i) => (
              <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Médicaments administrés (séparés par des virgules)</label>
          <Input
            name="medications_administered"
            value={form.medications_administered.join(', ')}
            onChange={e => setForm(prev => ({
              ...prev,
              medications_administered: e.target.value.split(',').map(med => med.trim()).filter(med => med.length > 0)
            }))}
          />
          {fieldErrors.medications_administered && fieldErrors.medications_administered.map((err, i) => (
            <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Commentaires</label>
          <textarea
            name="comments"
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
            value={form.comments}
            onChange={handleChange}
          />
          {fieldErrors.comments && fieldErrors.comments.map((err, i) => (
            <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
          ))}
        </div>
      </Card>

      <Card title="Détection d'anomalie">
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-red-600"
            name="anomaly_detected"
            checked={form.anomaly_detected}
            onChange={handleChange}
          />
          <span className="ml-2 text-gray-700">Anomalie détectée</span>
        </label>
        {fieldErrors.anomaly_detected && fieldErrors.anomaly_detected.map((err, i) => (
          <div key={i} className="text-red-600 text-sm font-semibold mt-1">{err.replace('field', 'champ')}</div>
        ))}
      </Card>

      <div className="flex justify-end">
        <Button icon={Save} variant="primary" onClick={handleSubmit}>
          Enregistrer le suivi
        </Button>
      </div>
    </div>
  );
};

export default NurseFollowUp;
