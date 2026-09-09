import React from 'react';
import { LandRecordsList } from '../records/LandRecordsList.jsx';

export const LandRecordSection = ({ records = [] }) => {
  return <LandRecordsList records={records} />;
};
