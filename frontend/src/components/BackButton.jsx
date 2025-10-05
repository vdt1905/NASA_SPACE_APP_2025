import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/station'); // Navigate to StationNavigator page
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-800/20 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 transition-colors duration-300"
    >
      <ChevronLeft className="w-5 h-5" />
      <span className="font-medium">Back to Stations</span>
    </button>
  );
};

export default BackButton;
