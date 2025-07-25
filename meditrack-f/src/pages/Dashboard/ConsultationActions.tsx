import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import Button from '../../components/Common/Button';

interface Props {
  id: number;
  canEdit?: boolean;
  canDelete?: boolean;
}

const ConsultationActions: React.FC<Props> = ({ id, canEdit = true, canDelete = true }) => {
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/consultations/${id}`);
  const handleEdit = () => navigate(`/consultations/${id}/edit`);
  // Suppression à brancher selon confirmation

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
        disabled={!canDelete}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default ConsultationActions;
