import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import Button from '../../components/Common/Button';
import api from '../../services/api';

interface Props {
  id: number;
  canEdit?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
}

const ConsultationActions: React.FC<Props> = ({ id, canEdit = true, canDelete = true, onDelete }) => {
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/consultations/${id}`);
  const handleEdit = () => navigate(`/consultations/${id}/edit`);
  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette consultation ?')) return;
    try {
      await api.delete(`/consultations/${id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="secondary" icon={Eye} onClick={handleDetail}>
        Détail
      </Button>
      <Button
        size="sm"
        variant="primary"
        icon={Edit}
        onClick={canEdit ? handleEdit : undefined}
        disabled={!canEdit}
      >
        Modifier
      </Button>
      <Button
        size="sm"
        variant="danger"
        icon={Trash2}
        onClick={canDelete ? handleDelete : undefined}
        disabled={!canDelete}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default ConsultationActions;
