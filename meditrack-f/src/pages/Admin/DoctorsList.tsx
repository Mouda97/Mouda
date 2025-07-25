
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import * as DoctorService from '../../services/DoctorService';

export type Doctor = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  specialty: string;
  phone?: string;
  registration_number?: string;
  address?: string;
  date_of_birth?: string;
  gender: 'M' | 'F';
  photo?: string;
  notes?: string;
  patients_count: number;
  available: boolean;
  status: 'active' | 'suspended';
};

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    DoctorService.getAll()
      .then(data => {
        setDoctors(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des médecins.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(d =>
    `${d.first_name} ${d.last_name} ${d.specialty} ${d.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des médecins</h1>
        <Button variant="primary" onClick={() => navigate('/admin/medecins/add')}>Nouveau médecin</Button>
      </div>
      <Card>
        {loading && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Chargement...</div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Rechercher un médecin..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Spécialité</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Patients suivis</th>
                <th className="py-3 px-4 text-left">Disponibilité</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => (
                <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{doc.first_name} {doc.last_name}</td>
                  <td className="py-3 px-4">{doc.specialty}</td>
                  <td className="py-3 px-4">{doc.email}</td>
                  <td className="py-3 px-4">{doc.patients_count}</td>
                  <td className="py-3 px-4">{doc.available ? 'Disponible' : 'Absent'}</td>
                  <td className="py-3 px-4">
                    <span style={{color: doc.status === 'active' ? '#22c55e' : '#ef4444', fontWeight: 500}}>
                      {doc.status === 'active' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/medecins/edit/${doc.id}`)}>Modifier</Button>
                    {doc.status === 'active' ? (
                      <Button size="sm" style={{backgroundColor: '#f87171', color: 'white'}} onClick={async () => {
                        await DoctorService.suspend(doc.id);
                        setDoctors(doctors => doctors.map(d => d.id === doc.id ? {...d, status: 'suspended'} : d));
                      }}>Suspendre</Button>
                    ) : (
                      <Button size="sm" style={{backgroundColor: '#22d3ee', color: 'white'}} onClick={async () => {
                        await DoctorService.reactivate(doc.id);
                        setDoctors(doctors => doctors.map(d => d.id === doc.id ? {...d, status: 'active'} : d));
                      }}>Réactiver</Button>
                    )}
                    <Button size="sm" style={{backgroundColor: '#fb7185', color: 'white'}} onClick={async () => {
                      await DoctorService.remove(doc.id);
                      setDoctors(doctors => doctors.filter(d => d.id !== doc.id));
                    }}>Supprimer</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && !error && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">Aucun médecin trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DoctorsList;
