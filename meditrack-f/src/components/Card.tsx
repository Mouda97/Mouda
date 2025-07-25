import React from 'react';

/**
 * Composant Card générique pour l'affichage d'un bloc visuel
 * @param children Contenu du bloc
 * @param className Classes CSS additionnelles
 */
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className || ''}`}>
    {children}
  </div>
);
