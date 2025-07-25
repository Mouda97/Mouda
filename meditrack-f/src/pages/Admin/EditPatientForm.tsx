
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Patient } from '../../types';

const EditPatientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Patient>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/patients/${id}`);
        setForm(res.data.data || {});
      } catch (err: any) {
        setError("Erreur lors du chargement du patient");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await api.put(`/patients/${id}`, form);
      setSuccess('Patient modifié avec succès !');
      setTimeout(() => navigate('/admin/patients'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Modifier le patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Prénom</label>
          <input type="text" name="first_name" value={form.first_name || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Nom</label>
          <input type="text" name="last_name" value={form.last_name || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Date de naissance</label>
          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth ? new Date(form.date_of_birth).toISOString().slice(0, 10) : ''}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Sexe</label>
          <select name="gender" value={form.gender || ''} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Téléphone</label>
          <input type="text" name="phone" value={form.phone || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Adresse</label>
          <input type="text" name="address" value={form.address || ''} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Groupe sanguin</label>
          <input type="text" name="blood_type" value={form.blood_type || ''} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Statut</label>
          <select name="status" value={form.status || ''} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Sélectionner</option>
            <option value="suivi-chronique">Suivi chronique</option>
            <option value="aigu">Aigu</option>
            <option value="termine">Terminé</option>
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditPatientForm;
