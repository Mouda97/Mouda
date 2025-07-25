import React, { useState } from 'react';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import { Doctor } from './DoctorsList';

export type DoctorFormProps = {
  initial?: Partial<Doctor>;
  onSubmit: (data: Partial<Doctor>) => void;
  onCancel: () => void;
  loading?: boolean;
};

const DoctorForm: React.FC<DoctorFormProps> = ({ initial = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState<Partial<Doctor>>({ ...initial });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation minimale côté client
    const newErrors: { [key: string]: string } = {};
    if (!form.first_name) newErrors.first_name = 'Prénom requis';
    if (!form.last_name) newErrors.last_name = 'Nom requis';
    if (!form.email) newErrors.email = 'Email requis';
    if (!form.specialty) newErrors.specialty = 'Spécialité requise';
    if (!form.gender) newErrors.gender = 'Genre requis';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form className="space-y-4 p-6 bg-white rounded-xl shadow max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">{form.id ? 'Modifier' : 'Créer'} un médecin</h2>
      <Input name="first_name" label="Prénom" value={form.first_name || ''} onChange={handleChange} />
      {errors.first_name && <div className="text-red-600 text-sm">{errors.first_name}</div>}
      <Input name="last_name" label="Nom" value={form.last_name || ''} onChange={handleChange} />
      {errors.last_name && <div className="text-red-600 text-sm">{errors.last_name}</div>}
      <Input name="email" label="Email" value={form.email || ''} onChange={handleChange} />
      {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
      <Input name="specialty" label="Spécialité" value={form.specialty || ''} onChange={handleChange} />
      {errors.specialty && <div className="text-red-600 text-sm">{errors.specialty}</div>}
      <Input name="phone" label="Téléphone" value={form.phone || ''} onChange={handleChange} />
      <Input name="registration_number" label="Numéro d'enregistrement" value={form.registration_number || ''} onChange={handleChange} />
      <Input name="address" label="Adresse" value={form.address || ''} onChange={handleChange} />
      <Input name="date_of_birth" label="Date de naissance" type="date" value={form.date_of_birth || ''} onChange={handleChange} />
      <Input name="gender" label="Genre (M/F)" value={form.gender || ''} onChange={handleChange} />
      {errors.gender && <div className="text-red-600 text-sm">{errors.gender}</div>}
      <Input name="photo" label="Photo (URL)" value={form.photo || ''} onChange={handleChange} />
      <Input name="notes" label="Notes" value={form.notes || ''} onChange={handleChange} />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
        <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Enregistrement...' : 'Enregistrer'}</Button>
      </div>
    </form>
  );
};

export default DoctorForm;
