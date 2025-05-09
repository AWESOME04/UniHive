import React, { useState } from 'react';
import HiveList from '../../components/hives/HiveList';
import { Calendar } from 'lucide-react';
import BuzzModal from '../../components/modals/BuzzModal';

const Buzz: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <HiveList 
        title="Buzz"
        type="buzz"
        icon={<Calendar className="w-6 h-6" />}
        color="bg-yellow-500"
      />
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-secondary/90 transition-colors"
      >
        Create New Event
      </button>

      <BuzzModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Refresh the events list
          // Add your refresh logic here
        }}
      />
    </div>
  );
};

export default Buzz;
