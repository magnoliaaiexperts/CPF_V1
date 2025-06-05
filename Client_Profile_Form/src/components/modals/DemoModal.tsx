import React, { useState } from 'react';
import { validateFields } from '../../utils/validation';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    demoName: '',
    demoEmail: '',
    demoPhone: '',
    demoCompany: '',
    demoInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['demoName', 'demoEmail', 'demoPhone'];
    const isValid = validateFields(formData, requiredFields);
    
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        // Reset after close
        setFormData({
          demoName: '',
          demoEmail: '',
          demoPhone: '',
          demoCompany: '',
          demoInterest: ''
        });
        setIsSuccess(false);
      }, 4000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="magnolia-modal fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex justify-center items-center p-4 opacity-0 transition-opacity duration-300 ease-out"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="magnolia-modal-content bg-white p-6 md:p-8 rounded-xl max-w-lg w-full relative shadow-2xl transform transition-transform duration-300 ease-out scale-100"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
      >
        <button 
          type="button" 
          className="magnolia-modal-close absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 transition-all duration-200 hover:rotate-90 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        {!isSuccess ? (
          <>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Schedule Your Free AI Demo
            </h3>
            
            <p className="text-sm md:text-base text-gray-600 mb-5">
              Just provide your contact details, and we'll reach out to schedule your personalized 15-minute demo.
            </p>
            
            <form id="demoRequestForm" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="magnolia-form-group">
                  <label htmlFor="demoName" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="demoName" 
                    name="demoName" 
                    required 
                    placeholder="Your Name"
                    value={formData.demoName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                
                <div className="magnolia-form-group">
                  <label htmlFor="demoEmail" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="demoEmail" 
                    name="demoEmail" 
                    required 
                    placeholder="your@email.com"
                    value={formData.demoEmail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                
                <div className="magnolia-form-group">
                  <label htmlFor="demoPhone" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="demoPhone" 
                    name="demoPhone" 
                    required 
                    placeholder="(123) 456-7890"
                    value={formData.demoPhone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                
                <div className="magnolia-form-group">
                  <label htmlFor="demoCompany" className="block mb-2 text-sm font-medium text-gray-700">
                    Company (Optional)
                  </label>
                  <input 
                    type="text" 
                    id="demoCompany" 
                    name="demoCompany" 
                    placeholder="Your Company"
                    value={formData.demoCompany}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>
                
                <div className="magnolia-form-group">
                  <label htmlFor="demoInterest" className="block mb-2 text-sm font-medium text-gray-700">
                    What aspects of AI are you most interested in? (Optional)
                  </label>
                  <textarea 
                    id="demoInterest" 
                    name="demoInterest" 
                    rows={3} 
                    placeholder="e.g., Automation, Customer Service AI, Data Analysis"
                    value={formData.demoInterest}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="magnolia-btn-submit w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md mt-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Request Demo'}
              </button>
            </form>
          </>
        ) : (
          <div className="magnolia-success-message text-center py-6">
            <div className="magnolia-confirmation-icon text-4xl md:text-5xl text-green-500 mb-4">✅</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Demo Request Received!
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-[90%] mx-auto">
              Thank you! We'll contact you within 1 business day to schedule your personalized demo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;