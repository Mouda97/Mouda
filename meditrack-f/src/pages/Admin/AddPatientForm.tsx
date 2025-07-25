import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Common/Button';

import Input from '../../components/Common/Input';
import { Patient } from '../../types';
import * as PatientService from '../../services/PatientService';

type PatientFormType = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address: string;
  blood_type: string;
  allergies: string;
  medical_history: string;
  assigned_doctor_id?: number | '';
  assigned_nurse_id?: number | '';
  status: 'suivi-chronique' | 'aigu' | 'termine';
  room: string;
  last_consultation: string;
  lieu_naissance: string;
  profession: string;
  situation_matrimoniale: string;
  assurance: string;
  numero_assurance: string;
  contact_urgence: string;
  relation_contact: string;
  numero_contact_urgence: string;
  note: string;
};

const initialForm: PatientFormType = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: 'M',
  phone: '',
  email: '',
  address: '',
  blood_type: '',
  allergies: '',
  medical_history: '',
  assigned_doctor_id: '',
  assigned_nurse_id: '',
  status: 'suivi-chronique',
  room: '',
  last_consultation: '',
  lieu_naissance: '',
  profession: '',
  situation_matrimoniale: '',
  assurance: '',
  numero_assurance: '',
  contact_urgence: '',
  relation_contact: '',
  numero_contact_urgence: '',
  note: '',
};

const AddPatientForm: React.FC = () => {
  const [form, setForm] = useState<PatientFormType>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Pour allergies et medical_history, on stocke une string temporaire
    if (name === 'allergies' || name === 'medical_history') {
      setForm(prev => ({ ...prev, [name]: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      // Mapping des champs pour l'API Laravel avec les bons noms attendus par la base de données
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        gender: form.gender,
        date_of_birth: form.date_of_birth,
        lieu_naissance: form.lieu_naissance || '',
        address: form.address,
        phone: form.phone,
        email: form.email,
        blood_type: form.blood_type,
        profession: form.profession || '',
        situation_matrimoniale: form.situation_matrimoniale || '',
        assurance: form.assurance || '',
        numero_assurance: form.numero_assurance || '',
        contact_urgence: form.contact_urgence || '',
        relation_contact: form.relation_contact || '',
        numero_contact_urgence: form.numero_contact_urgence || '',
        note: form.note || '',
      };
      await PatientService.create(payload);
      navigate('/admin/patients');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 p-6 max-w-xl mx-auto bg-white rounded-xl shadow" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Ajouter un patient</h2>
      <Input name="first_name" label="Prénom" value={form.first_name} onChange={handleChange} />
      {errors.first_name && errors.first_name.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="last_name" label="Nom" value={form.last_name} onChange={handleChange} />
      {errors.last_name && errors.last_name.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="date_of_birth" label="Date de naissance" type="date" value={form.date_of_birth} onChange={handleChange} />
      {errors.date_of_birth && errors.date_of_birth.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="lieu_naissance" label="Lieu de naissance" value={form.lieu_naissance} onChange={handleChange} />
      {errors.lieu_naissance && errors.lieu_naissance.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="gender" label="Genre (M/F)" value={form.gender} onChange={handleChange} />
      {errors.gender && errors.gender.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="phone" label="Téléphone" value={form.phone} onChange={handleChange} />
      {errors.phone && errors.phone.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="email" label="Email" value={form.email} onChange={handleChange} />
      {errors.email && errors.email.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="address" label="Adresse" value={form.address} onChange={handleChange} />
      {errors.address && errors.address.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="blood_type" label="Groupe sanguin" value={form.blood_type} onChange={handleChange} />
      {errors.blood_type && errors.blood_type.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="contact_urgence" label="Contact d'urgence (nom)" value={form.contact_urgence} onChange={handleChange} />
      {errors.contact_urgence && errors.contact_urgence.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="relation_contact" label="Relation avec le contact d'urgence" value={form.relation_contact} onChange={handleChange} />
      {errors.relation_contact && errors.relation_contact.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="numero_contact_urgence" label="Numéro du contact d'urgence" value={form.numero_contact_urgence} onChange={handleChange} />
      {errors.numero_contact_urgence && errors.numero_contact_urgence.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="allergies" label="Allergies (séparées par des virgules)" value={form.allergies} onChange={handleChange} />
      {errors.allergies && errors.allergies.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="medical_history" label="Antécédents médicaux (séparés par des virgules)" value={form.medical_history} onChange={handleChange} />
      {errors.medical_history && errors.medical_history.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="assigned_doctor_id" label="ID Médecin" value={form.assigned_doctor_id || ''} onChange={handleChange} />
      {errors.assigned_doctor_id && errors.assigned_doctor_id.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="assigned_nurse_id" label="ID Infirmier" value={form.assigned_nurse_id || ''} onChange={handleChange} />
      {errors.assigned_nurse_id && errors.assigned_nurse_id.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="status" label="Statut" value={form.status} onChange={handleChange} />
      {errors.status && errors.status.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="room" label="Chambre" value={form.room ? String(form.room) : ''} onChange={handleChange} />
      {errors.room && errors.room.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <Input name="last_consultation" label="Date dernière consultation" type="date" value={form.last_consultation ? String(form.last_consultation) : ''} onChange={handleChange} />
      {errors.last_consultation && errors.last_consultation.map((err, i) => <div key={i} className="text-red-600 text-sm">{err}</div>)}
      <div className="flex justify-end">
        <Button type="submit" variant="primary">{loading ? 'Ajout...' : 'Ajouter'}</Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="ml-2">Annuler</Button>
      </div>
    </form>
  );
};

export default AddPatientForm;
