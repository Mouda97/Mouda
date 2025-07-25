import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllByPatient, create, remove } from '../../services/DocumentService';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

const PatientDocuments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getAllByPatient(Number(id))
      .then(setDocuments)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = (doc: any) => {
    window.open(doc.file_path, '_blank');
  };

  const handleDelete = async (docId: number) => {
    if (!window.confirm('Supprimer ce document ?')) return;
    await remove(docId);
    setDocuments(docs => docs.filter(d => d.id !== docId));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !id) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patient_id', id);
    formData.append('type', 'other');
    const doc = await create(formData);
    setDocuments(docs => [doc, ...docs]);
    setFile(null);
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card title="Documents médicaux du patient">
        <form onSubmit={handleUpload} className="mb-4 flex gap-2 items-center">
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
          <Button type="submit" variant="primary" disabled={uploading || !file}>
            {uploading ? 'Ajout...' : 'Ajouter un document'}
          </Button>
        </form>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Date</th>
                <th>Aperçu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.name || doc.file_path.split('/').pop()}</td>
                  <td>{doc.type}</td>
                  <td>{new Date(doc.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    {doc.mime_type.startsWith('image') ? (
                      <img src={doc.file_path} alt="aperçu" className="h-12" />
                    ) : doc.mime_type === 'application/pdf' ? (
                      <a href={doc.file_path} target="_blank" rel="noopener noreferrer">PDF</a>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => handleDownload(doc)}>Télécharger</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(doc.id)}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default PatientDocuments;
