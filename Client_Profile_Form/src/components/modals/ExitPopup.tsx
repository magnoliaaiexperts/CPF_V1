import React, { useState, useEffect } from 'react';
import { validateFields } from '../../utils/validation';

const ExitPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [exitShownThisSession, setExitShownThisSession] = useState(false);
  const [formData, setFormData] = useState({
    exitEmail: '',
    exitName: ''
  });

  useEffect(() => {
    // Set up exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitShownThisSession && !document.body.classList.contains('modal-open')) {
        setTimeout(() => {
          setIsOpen(true);
          document.body.classList.add('modal-open');
        }, 150);
        setExitShownThisSession(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitShownThisSession]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const handleSubmit = () => {
    const requiredFields = ['exitEmail'];
    const isValid = validateFields(formData, requiredFields);
    
    if (!isValid) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simulate submission
    setTimeout(() => {
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
        // Reset after closing
        setIsSuccess(false);
        setFormData({
          exitEmail: '',
          exitName: ''
        });
      }, 4000);
    }, 1000);
  };

  return (
    <div 
      className={`magnolia-exit-popup fixed inset-0 bg-gray-900 bg-opacity-80 z-50 ${isOpen ? 'flex' : 'hidden'} justify-center items-center p-4 opacity-0 transition-opacity duration-400 ease-out`}
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div 
        className="magnolia-exit-popup-content bg-white p-6 md:p-8 rounded-xl max-w-md w-full relative shadow-2xl transform transition-all duration-400 ease-out"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <button 
          type="button" 
          className="magnolia-exit-close absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 transition-all duration-200 hover:scale-110 p-2 bg-transparent border-none"
          onClick={handleClose}
          aria-label="Close popup"
        >
          &times;
        </button>
        
        {!isSuccess ? (
          <>
            <div className="magnolia-exit-header text-center mb-5">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Wait! Don't Miss Out
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Get our free guide: "5 Ways AI Is Transforming Business in 2025"
              </p>
            </div>
            
            <div className="magnolia-exit-form mb-4">
              <div className="magnolia-form-group mb-4">
                <label htmlFor="exitEmail" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="exitEmail" 
                  name="exitEmail" 
                  placeholder="Your email address" 
                  required
                  value={formData.exitEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
              
              <div className="magnolia-form-group">
                <label htmlFor="exitName" className="block mb-2 text-sm font-medium text-gray-700">
                  Name (Optional)
                </label>
                <input 
                  type="text" 
                  id="exitName" 
                  name="exitName" 
                  placeholder="Your name"
                  value={formData.exitName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
              
              <button 
                type="button" 
                id="exitSubmit"
                onClick={handleSubmit}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md mt-5"
              >
                Send Me the Guide
              </button>
            </div>
            
            <div className="magnolia-exit-footer text-center text-xs md:text-sm text-gray-400 mt-4">
              <p>We respect your privacy and will never share your information.</p>
            </div>
          </>
        ) : (
          <div className="magnolia-success-message text-center py-6">
            <div className="magnolia-confirmation-icon text-4xl md:text-5xl text-green-500 mb-4">✅</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Success!
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-[90%] mx-auto">
              Your free guide is on its way to your inbox.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitPopup;