import React from 'react';
import FormButtons from '../common/FormButtons';
import { validateFields } from '../../utils/validation';

interface Section1Props {
  isActive: boolean;
  formData: any;
  updateFormData: (data: any) => void;
  onSave: () => void;
  onNext: () => void;
}

const Section1BasicInfo: React.FC<Section1Props> = ({
  isActive,
  formData,
  updateFormData,
  onSave,
  onNext
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ ...formData, [name]: checked });
  };

  const handleNext = () => {
    const requiredFields = ['email', 'contactName', 'phone', 'companyName', 'jobTitle', 'industry', 'companySize'];
    const isValid = validateFields(formData, requiredFields);
    
    if (isValid) {
      onNext();
    } else {
      // Show validation errors
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className={`magnolia-form-section ${isActive ? 'block' : 'hidden'}`} id="magnolia-section1">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-500 inline-block">
        Basic Information
      </h3>
      
      <div className="space-y-5">
        <div className="magnolia-form-group">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="your@email.com"
            value={formData.email || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Full Name
            </label>
            <input 
              type="text" 
              id="contactName" 
              name="contactName" 
              required 
              placeholder="Your Name"
              value={formData.contactName || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
          <div className="magnolia-form-group">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Phone Number
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              placeholder="(123) 456-7890"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
            Company Name
          </label>
          <input 
            type="text" 
            id="companyName" 
            name="companyName" 
            required 
            placeholder="Company Name"
            value={formData.companyName || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Job Title
            </label>
            <input 
              type="text" 
              id="jobTitle" 
              name="jobTitle" 
              required 
              placeholder="Your Position"
              value={formData.jobTitle || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
          <div className="magnolia-form-group">
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-700">
              Company Website
            </label>
            <input 
              type="url" 
              id="website" 
              name="website" 
              placeholder="https://www.example.com"
              value={formData.website || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Industry/Sector
            </label>
            <select 
              id="industry" 
              name="industry" 
              required
              value={formData.industry || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select an industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance & Banking</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="transportation">Transportation & Logistics</option>
              <option value="energy">Energy & Utilities</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="magnolia-form-group">
            <label htmlFor="companySize" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Company Size
            </label>
            <select 
              id="companySize" 
              name="companySize" 
              required
              value={formData.companySize || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="magnolia-lead-magnet my-6 md:my-8">
        <div className="magnolia-lead-magnet-banner flex flex-col md:flex-row items-start bg-gradient-to-r from-emerald-50 to-green-100 p-5 rounded-lg text-emerald-800 border border-emerald-200">
          <div className="magnolia-lead-magnet-icon text-2xl md:text-3xl mb-2 md:mb-0 md:mr-4 text-emerald-500">
            📊
          </div>
          <div className="magnolia-lead-magnet-info">
            <h4 className="mt-0 mb-2 text-lg font-semibold text-emerald-700">
              Free AI Readiness Assessment
            </h4>
            <p className="mb-3 text-sm md:text-base text-emerald-800">
              Get our exclusive guide on evaluating if your business is ready for AI implementation. We'll email it to you immediately when you complete this step!
            </p>
            <div className="magnolia-checkbox-item flex items-center">
              <input 
                type="checkbox" 
                id="optInLead" 
                name="optInLead" 
                checked={formData.optInLead !== false}
                onChange={handleCheckboxChange}
                className="w-5 h-5 mr-3 accent-emerald-500 cursor-pointer"
              />
              <label htmlFor="optInLead" className="text-sm md:text-base text-emerald-800 font-medium cursor-pointer">
                Yes, I'd like to receive the free AI Readiness Assessment
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="magnolia-form-note bg-amber-50 border-l-4 border-amber-500 p-4 my-5 rounded-r">
        <p className="text-sm text-amber-800">
          <strong className="text-amber-900 font-semibold">Why we need this information:</strong> These details help us understand your business context and prepare a personalized AI implementation strategy.
        </p>
      </div>
      
      <FormButtons 
        showPrevious={false}
        onSave={onSave}
        onNext={handleNext}
      />
    </div>
  );
};

export default Section1BasicInfo;