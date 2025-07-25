import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import { User } from '../../types';
import api from '../../services/api';

export type AppUser = User & { patients_count?: number };

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/users')
      .then(res => setUsers(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(() => setError('Erreur lors du chargement des utilisateurs.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    `${u.name} ${u.email} ${u.phone || ''} ${u.role}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <Button variant="primary" onClick={() => navigate('/admin/utilisateurs/add')}>Nouvel utilisateur</Button>
      </div>
      <Card>
        {loading && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Chargement...</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="Rechercher un utilisateur..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">Rôle</th>
                <th className="py-3 px-4 text-left">Patients suivis</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone || '-'}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.patients_count ?? '-'}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/utilisateurs/edit/${user.id}`)}>Modifier</Button>
                    <Button size="sm" variant="danger" onClick={async () => {
                      await api.delete(`/users/${user.id}`);
                      setUsers(users => users.filter(u => u.id !== user.id));
                    }}>Supprimer</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && !error && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">Aucun utilisateur trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
