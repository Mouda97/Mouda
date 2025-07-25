import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorForm from './DoctorForm';
import * as DoctorService from '../../services/DoctorService';
import { Doctor } from './DoctorsList';

const AddDoctorForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<Doctor>) => {
    await DoctorService.create(data);
    navigate('/admin/medecins');
  };

  const handleCancel = () => {
    navigate('/admin/medecins');
  };

  return (
    <div className="p-6 flex justify-center">
      <DoctorForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddDoctorForm;
