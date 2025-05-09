import React from 'react';
import HiveList from '../../components/hives/HiveList';
import { Archive } from 'lucide-react';

const ArchivePage: React.FC = () => {
  return (
    <HiveList 
      title="Archive"
      type="archive"
      icon={<Archive className="w-6 h-6" />}
      color="bg-purple-500"
    />
  );
};

export default ArchivePage;
