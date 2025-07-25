
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { User } from '../../types';

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setForm(res.data.data || {});
      } catch (err: any) {
        setError("Erreur lors du chargement de l'utilisateur");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await api.put(`/users/${id}`, form);
      setSuccess('Utilisateur modifié avec succès !');
      setTimeout(() => navigate('/admin/utilisateurs'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nom</label>
          <input type="text" name="name" value={form.name || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Téléphone</label>
          <input type="text" name="phone" value={form.phone || ''} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Rôle</label>
          <select name="role" value={form.role || ''} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Sélectionner</option>
            <option value="infirmier">Infirmier</option>
            <option value="medecin">Médecin</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditUserForm;
