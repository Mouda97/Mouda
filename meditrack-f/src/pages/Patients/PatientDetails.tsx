import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../services/PatientService';
import { Patient } from '../../types';
import Card from '../../components/Common/Card';
import { User } from 'lucide-react';
import { Clock, Thermometer, Droplets, Activity, Heart, Brain, Eye } from 'lucide-react';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vitalSigns, setVitalSigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getById(Number(id))
      .then((data) => {
        setPatient(data);
        setVitalSigns(data.vital_signs || []);
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
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="w-full min-h-[320px]">
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
      {/* Ajout affichage des signes vitaux */}
      <Card title="Signes vitaux du patient" className="w-full min-h-[320px]">
        {vitalSigns.length === 0 ? (
          <p className="text-gray-500">Aucun signe vital enregistré</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mt-4 border rounded-lg shadow-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Clock className="inline w-4 h-4 mr-1" /> Date</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Thermometer className="inline w-4 h-4 mr-1" /> Température</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Droplets className="inline w-4 h-4 mr-1" /> Tension</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Activity className="inline w-4 h-4 mr-1" /> Rythme cardiaque</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Heart className="inline w-4 h-4 mr-1" /> Saturation O₂</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Brain className="inline w-4 h-4 mr-1" /> Conscience</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Eye className="inline w-4 h-4 mr-1" /> Mobilité</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold"><Clock className="inline w-4 h-4 mr-1" /> Nutrition</th>
                </tr>
              </thead>
              <tbody>
                {vitalSigns.map((v, idx) => (
                  <tr key={v.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-2">{new Date(v.measurement_date).toLocaleString()}</td>
                    <td className="py-2 px-2">{v.temperature} °C</td>
                    <td className="py-2 px-2">{v.blood_pressure}</td>
                    <td className="py-2 px-2">{v.heart_rate} bpm</td>
                    <td className="py-2 px-2">{v.oxygen_saturation} %</td>
                    <td className="py-2 px-2">{v.consciousness}</td>
                    <td className="py-2 px-2">{v.mobility}</td>
                    <td className="py-2 px-2">{v.nutrition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {/* Ajout affichage des documents du patient */}
      <Card title="Documents du patient" className="w-full min-h-[220px] mt-6">
        {Array.isArray(patient?.documents) && patient.documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full mt-4 border rounded-lg shadow-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-2 text-blue-700 font-semibold">Nom</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold">Type</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold">Taille</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold">Ajouté le</th>
                  <th className="py-2 px-2 text-blue-700 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {patient.documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="py-2 px-2">{doc.name}</td>
                    <td className="py-2 px-2">{doc.type}</td>
                    <td className="py-2 px-2">{(doc.file_size / 1024).toFixed(2)} Ko</td>
                    <td className="py-2 px-2">{new Date(doc.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="py-2 px-2">
                      <a href={doc.file_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Voir</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Aucun document enregistré</p>
        )}
      </Card>
      <Card title="Consultations du patient" className="w-full min-h-[220px] mt-6">
{Array.isArray(patient?.consultations) && patient.consultations.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="w-full mt-4 border rounded-lg shadow-sm">
      <thead className="bg-blue-50">
        <tr>
          <th className="py-2 px-2 text-blue-700 font-semibold">Date</th>
          <th className="py-2 px-2 text-blue-700 font-semibold">Symptômes</th>
          <th className="py-2 px-2 text-blue-700 font-semibold">Diagnostic</th>
          <th className="py-2 px-2 text-blue-700 font-semibold">Traitement</th>
          <th className="py-2 px-2 text-blue-700 font-semibold">Médecin</th>
        </tr>
      </thead>
      <tbody>
        {patient.consultations.map((c) => (
          <tr key={c.id}>
            <td className="py-2 px-2">{new Date(c.consultation_date).toLocaleDateString('fr-FR')}</td>
            <td className="py-2 px-2">{c.symptoms}</td>
            <td className="py-2 px-2">{c.diagnosis}</td>
            <td className="py-2 px-2">{c.treatment}</td>
            <td className="py-2 px-2">{c.doctor_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-gray-500">Aucune consultation enregistrée</p>
)}
      </Card>
    </div>
  );
};

export default PatientDetails;
