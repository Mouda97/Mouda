import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Textarea from '../../components/Common/Textarea';
import { toast } from 'react-toastify';
import api from '../../services/api';

const QuickNoteForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/patients/${id}/notes`, { note });
      toast.success('Note ajoutée');
      navigate(-1);
    } catch {
      toast.error('Erreur lors de l\'ajout de la note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card title="Ajouter une note rapide">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Note</label>
            <Textarea value={note} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)} required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>Enregistrer</Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Annuler</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QuickNoteForm;
