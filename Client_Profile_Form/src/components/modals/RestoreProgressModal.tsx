import React from 'react';

interface RestoreProgressModalProps {
  isOpen: boolean;
  onRestore: (restore: boolean) => void;
}

const RestoreProgressModal: React.FC<RestoreProgressModalProps> = ({ 
  isOpen, 
  onRestore 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="magnolia-modal fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4 opacity-0 transition-opacity duration-300 ease-out"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div 
        className="magnolia-modal-content bg-white p-6 md:p-8 rounded-xl max-w-lg w-full relative shadow-2xl transform transition-transform duration-300 ease-out scale-100"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
      >
        <button 
          type="button" 
          className="magnolia-modal-close absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 transition-all duration-200 hover:rotate-90 p-2 bg-transparent border-none"
          onClick={() => onRestore(false)}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Saved Progress Found
        </h3>
        
        <p className="text-sm md:text-base text-gray-600 mb-5">
          We found saved progress from your last visit. Would you like to continue where you left off?
        </p>
        
        <div className="magnolia-modal-actions flex flex-col-reverse md:flex-row md:justify-end space-y-3 space-y-reverse md:space-y-0 md:space-x-3 mt-6">
          <button 
            type="button" 
            className="magnolia-modal-btn secondary w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 border border-gray-200"
            onClick={() => onRestore(false)}
          >
            No, Start Over
          </button>
          
          <button 
            type="button" 
            className="magnolia-modal-btn primary w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md"
            onClick={() => onRestore(true)}
          >
            Yes, Restore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreProgressModal;