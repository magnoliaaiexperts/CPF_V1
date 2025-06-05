import React, { useState, useEffect } from 'react';
import FormButtons from '../common/FormButtons';
import { validateFields } from '../../utils/validation';

interface Section5Props {
  isActive: boolean;
  formData: any;
  updateFormData: (data: any) => void;
  onSave: () => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

const Section5Communication: React.FC<Section5Props> = ({
  isActive,
  formData,
  updateFormData,
  onSave,
  onSubmit,
  onPrevious
}) => {
  // Local state for checkbox groups
  const [nextSteps, setNextSteps] = useState<string[]>([]);

  // Initialize local state from formData
  useEffect(() => {
    if (formData.nextSteps) {
      setNextSteps(Array.isArray(formData.nextSteps) ? formData.nextSteps : [formData.nextSteps]);
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ ...formData, [name]: checked });
  };

  const handleNextStepChange = (checked: boolean, value: string) => {
    let newNextSteps;
    if (checked) {
      newNextSteps = [...nextSteps, value];
    } else {
      newNextSteps = nextSteps.filter(item => item !== value);
    }
    
    setNextSteps(newNextSteps);
    updateFormData({ ...formData, nextSteps: newNextSteps });
  };

  const handleSubmit = () => {
    const requiredFields = ['contactPreference', 'terms'];
    const isValid = validateFields(formData, requiredFields);
    
    // Check terms
    if (!formData.terms) {
      alert('You must agree to the terms and privacy policy to proceed.');
      return;
    }
    
    if (isValid) {
      onSubmit();
    } else {
      alert('Please fill in all required fields');
    }
  };

  const nextStepsOptions = [
    { id: 'step1', value: 'consult', label: 'Initial Consultation Call' },
    { id: 'step2', value: 'demo', label: 'Product/Platform Demo' },
    { id: 'step3', value: 'proposal', label: 'Custom Solution Proposal' },
    { id: 'step4', value: 'assessment', label: 'Detailed AI Readiness Assessment' },
    { id: 'step5', value: 'workshop', label: 'Strategy Workshop' }
  ];

  return (
    <div className={`magnolia-form-section ${isActive ? 'block' : 'hidden'}`} id="magnolia-section5">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-500 inline-block">
        Communication & Next Steps
      </h3>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="contactPreference" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Preferred Contact Method
            </label>
            <select 
              id="contactPreference" 
              name="contactPreference" 
              required
              value={formData.contactPreference || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select preferred method</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="video">Video Call</option>
            </select>
          </div>
          
          <div className="magnolia-form-group">
            <label htmlFor="urgency" className="block mb-2 text-sm font-medium text-gray-700">
              Project Urgency
            </label>
            <select 
              id="urgency" 
              name="urgency"
              value={formData.urgency || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select urgency level</option>
              <option value="critical">Critical - Need immediate attention</option>
              <option value="high">High - Important but not urgent</option>
              <option value="medium">Medium - Planning phase</option>
              <option value="low">Low - Just exploring options</option>
            </select>
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-700">
            General Availability for Meetings
          </label>
          <textarea 
            id="availability" 
            name="availability" 
            rows={2} 
            placeholder="e.g., Weekday mornings, Tuesday/Thursday afternoons"
            value={formData.availability || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
        
        <div className="magnolia-form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Next Steps You're Interested In (Optional)
          </label>
          
          <div className="magnolia-checkbox-group mt-3 space-y-3">
            {nextStepsOptions.map(option => (
              <div key={option.id} className="magnolia-checkbox-item flex items-start">
                <input 
                  type="checkbox" 
                  id={option.id} 
                  value={option.value}
                  checked={nextSteps.includes(option.value)}
                  onChange={(e) => handleNextStepChange(e.target.checked, option.value)}
                  className="w-5 h-5 mt-0.5 mr-3 accent-indigo-500 cursor-pointer"
                />
                <label htmlFor={option.id} className="text-sm md:text-base text-gray-600 cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium text-gray-700">
            Additional Information
          </label>
          <textarea 
            id="additionalInfo" 
            name="additionalInfo" 
            rows={3} 
            placeholder="Anything else you'd like to share about your needs or project?"
            value={formData.additionalInfo || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
        
        <div className="magnolia-form-group">
          <div className="magnolia-checkbox-item flex items-center">
            <input 
              type="checkbox" 
              id="newsletter" 
              name="newsletter"
              checked={formData.newsletter !== false}
              onChange={handleCheckboxChange}
              className="w-5 h-5 mr-3 accent-indigo-500 cursor-pointer"
            />
            <label htmlFor="newsletter" className="text-sm md:text-base text-gray-600 cursor-pointer">
              Subscribe to our AI insights newsletter
            </label>
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <div className="magnolia-checkbox-item flex items-center">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms"
              required
              checked={formData.terms || false}
              onChange={handleCheckboxChange}
              className="w-5 h-5 mr-3 accent-indigo-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm md:text-base text-gray-600 cursor-pointer after:content-['*'] after:ml-0.5 after:text-red-500">
              I agree to the <a href="#" className="text-indigo-500 hover:text-indigo-700 underline font-medium" target="_blank" rel="noopener noreferrer">terms and privacy policy</a>
            </label>
          </div>
        </div>
      </div>
      
      <div className="magnolia-final-cta flex flex-col md:flex-row text-center md:text-left items-center bg-gradient-to-r from-blue-900 to-purple-900 p-5 rounded-lg text-white my-6 md:my-8">
        <div className="magnolia-cta-icon text-2xl md:text-3xl mb-3 md:mb-0 md:mr-5">🎯</div>
        <div className="magnolia-cta-content">
          <h4 className="mb-2 text-lg md:text-xl font-semibold">You're Almost There!</h4>
          <p className="text-sm md:text-base opacity-90">
            Submit your profile to receive your personalized AI implementation plan and schedule your free consultation with our AI experts.
          </p>
        </div>
      </div>
      
      <div className="magnolia-buttons flex flex-col md:flex-row md:justify-between gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <button 
          type="button" 
          className="magnolia-btn-prev order-2 md:order-1 w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 border border-gray-200"
          onClick={onPrevious}
        >
          Previous
        </button>
        
        <button 
          type="button" 
          className="magnolia-btn-save order-3 md:order-2 w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 border border-gray-200"
          onClick={onSave}
        >
          Save Progress
        </button>
        
        <button 
          type="button" 
          className="magnolia-btn-submit order-1 md:order-3 w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md"
          onClick={handleSubmit}
        >
          Submit Profile
        </button>
      </div>
    </div>
  );
};

export default Section5Communication;