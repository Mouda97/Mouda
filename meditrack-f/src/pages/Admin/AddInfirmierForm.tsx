import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/api';
import Button from '../../components/Common/Button';

const AddInfirmierForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      await api.post('/nurses', {
        first_name: name,
        last_name: '', // à compléter si besoin
        email,
        phone,
        password,
        registration_number: '',
        address: '',
        date_of_birth: '',
        gender: 'M', // à compléter si besoin
        photo: '',
        notes: '',
      });
      setSuccess('Infirmier ajouté avec succès !');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    } catch (err: any) {
      setError('Erreur lors de l\'ajout de l\'infirmier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-medical-blue">Ajouter un infirmier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Téléphone</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <Button type="submit" variant="primary" size="md" className="w-full bg-medical-blue text-white" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
};

export default AddInfirmierForm;
