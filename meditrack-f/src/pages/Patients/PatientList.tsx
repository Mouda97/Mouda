import React, { useState } from 'react';
import { useVitalSigns } from '../../hooks/useVitalSigns';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Edit, User, Stethoscope, StickyNote } from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import { useAuth } from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';

  const PatientList: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { patients = [], loading: isLoading, error } = usePatients();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterAge, setFilterAge] = useState('');
    const [filterDiagnosis, setFilterDiagnosis] = useState('');

    // Get all vital signs for nurse logic
    const { vitalSigns, loading: vitalSignsLoading } = useVitalSigns();

    const filteredPatients = Array.isArray(patients) ? patients.filter(patient => {
      const matchesSearch =
        `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;

      const matchesAge = !filterAge || calculateAge(patient.date_of_birth) === Number(filterAge);

      // Diagnostic: on cherche dans le dernier diagnostic connu (last_consultation/diagnosis si dispo)
      let matchesDiagnosis = true;
      if (filterDiagnosis) {
        if (patient.last_diagnosis) {
          matchesDiagnosis = patient.last_diagnosis.toLowerCase().includes(filterDiagnosis.toLowerCase());
        } else {
          matchesDiagnosis = false;
        }
      }

      const matchesRole =
        user?.role === 'admin' || 
        (user?.role === 'medecin' && patient.assigned_doctor_id === user.id) ||
        (user?.role === 'infirmier' && patient.assigned_nurse_id === user.id);

      return matchesSearch && matchesStatus && matchesAge && matchesDiagnosis && matchesRole;
    }) : [];

    if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-center">Chargement des patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 text-center">Erreur lors du chargement : {error}</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'suivi-chronique': return 'bg-blue-100 text-blue-800';
      case 'aigu': return 'bg-red-100 text-red-800';
      case 'termine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'suivi-chronique': return 'Suivi chronique';
      case 'aigu': return 'Aigu';
      case 'termine': return 'Terminé';
      default: return status;
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Get all vital signs for nurse logic - already called at top of component */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'Gestion des patients' : 'Mes patients'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isLoading ? (
              'Chargement...'
            ) : error ? (
              <span className="text-red-600">Erreur : {error}</span>
            ) : (
              `${filteredPatients.length} patient(s) trouvé(s)`
            )}
          </p>
        </div>
        {user?.role === 'admin' && (
          <Button icon={Plus} variant="primary" disabled={isLoading} onClick={() => navigate('/admin/patients/add')}>
            Ajouter un patient
          </Button>
        )}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              placeholder="Rechercher un patient."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div>
            <Input
              type="number"
              min="0"
              placeholder="Âge"
              value={filterAge}
              onChange={e => setFilterAge(e.target.value)}
              className="w-24"
            />
          </div>
          <div>
            <Input
              placeholder="Diagnostic"
              value={filterDiagnosis}
              onChange={e => setFilterDiagnosis(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="suivi-chronique">Suivi chronique</option>
              <option value="aigu">Aigu</option>
              <option value="termine">Terminé</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Âge</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Sexe</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                {user?.role === 'infirmier' && (
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Chambre</th>
                )}
                <th className="text-left py-3 px-4 font-medium text-gray-900">Dernière consultation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {patient.first_name} {patient.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{calculateAge(patient.date_of_birth)} ans</td>
                  <td className="py-4 px-4 text-gray-900">
                    {patient.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {getStatusLabel(patient.status)}
                    </span>
                  </td>
                  {user?.role === 'infirmier' && (
                    <td className="py-4 px-4 text-gray-900">
                      {patient.room || 'Non assigné'}
                    </td>
                  )}
                  <td className="py-4 px-4 text-gray-500">
                    {patient.last_consultation
                      ? new Date(patient.last_consultation).toLocaleDateString('fr-FR')
                      : 'Aucune'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {user?.role === 'infirmier' ? (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Eye}
                            onClick={() => navigate(`/patients/${patient.id}/health`)}
                          >
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/patients/${patient.id}/suivi`)}
                          >
                            Suivi
                          </Button>
                          {/* Commencer un suivi button if no vital sign for today */}
                          {(() => {
                            // Find if patient has a vital sign for today
                            const today = new Date();
                            const todayStr = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
                            const hasFollowUpToday = vitalSigns.some(vs => vs.patient_id === patient.id && vs.measurement_date.slice(0, 10) === todayStr);
                            if (!hasFollowUpToday) {
                              return (
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() => navigate(`/patients/${patient.id}/suivi`)}
                                >
                                  Commencer un suivi
                                </Button>
                              );
                            }
                            return null;
                          })()}
                        </>
                      ) : null}
                      {user?.role === 'medecin' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Eye}
                            onClick={() => navigate(`/patients/${patient.id}/health`)}
                          >
                            Voir fiche
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            icon={Stethoscope}
                            onClick={() => navigate('/consultations')}
                          >
                            Consultation
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={StickyNote}
                            onClick={() => navigate(`/medecin/patients/${patient.id}/note`)}
                          >
                            Note rapide
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/patients/${patient.id}/documents`)}
                          >
                            Documents
                          </Button>
                        </>
                      )}
                      {user?.role === 'admin' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Eye}
                            onClick={() => navigate(`/admin/patients/view/${patient.id}`)}
                          >
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Edit}
                            onClick={() => navigate(`/admin/patients/edit/${patient.id}`)}
                          >
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/patients/${patient.id}/documents`)}
                          >
                            Documents
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 py-6">Aucun patient trouvé</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PatientList;
