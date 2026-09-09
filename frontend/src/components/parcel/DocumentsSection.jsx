import React from 'react';
import { DocumentVault } from '../records/DocumentVault.jsx';

export const DocumentsSection = ({ documents = [] }) => {
  return <DocumentVault documents={documents} />;
};
