import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { User } from '../../types';
import Button from '../../components/Common/Button';

const InfirmiersList: React.FC = () => {
  const [infirmiers, setInfirmiers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchInfirmiers = async () => {
      try {
        const response = await api.get('/users?role=infirmier');
        // Correction : s'assurer que la donnée est un tableau
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setInfirmiers(data);
      } catch (err: any) {
        setError("Erreur lors du chargement des infirmiers");
        setInfirmiers([]); // fallback pour éviter le crash
      } finally {
        setLoading(false);
      }
    };
    fetchInfirmiers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet infirmier ?')) return;
    try {
      await api.delete(`/users/${id}`);
      setInfirmiers((prev) => prev.filter((inf) => inf.id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (id: number) => {
    // Redirection vers la page d'édition
    window.location.href = `/admin/utilisateurs/edit/${id}`;
  };

  const filteredInfirmiers = infirmiers.filter(
    (inf) =>
      inf.name.toLowerCase().includes(search.toLowerCase()) ||
      (inf.email && inf.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des infirmiers</h1>
        <Button variant="primary" size="md" className="bg-medical-blue text-white" onClick={() => window.location.href = '/admin/infirmiers/add'}>
          Ajouter un infirmier
        </Button>
      </div>
      <div className="mb-6">
        <div className="bg-white shadow rounded-lg p-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nom</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Téléphone</th>
                <th className="border px-4 py-2">Statut</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInfirmiers.map((inf) => (
                <tr key={inf.id}>
                  <td className="border px-4 py-2">{inf.name}</td>
                  <td className="border px-4 py-2">{inf.email}</td>
                  <td className="border px-4 py-2">{inf.phone || '-'}</td>
                  <td className="border px-4 py-2">{inf.is_active ? 'Actif' : 'Inactif'}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => handleEdit(inf.id)} className="bg-medical-blue text-white hover:bg-blue-600">Éditer</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(inf.id)}>Supprimer</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InfirmiersList;
