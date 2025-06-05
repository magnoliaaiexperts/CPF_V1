import React from 'react';
import FormButtons from '../common/FormButtons';
import { validateFields } from '../../utils/validation';

interface Section4Props {
  isActive: boolean;
  formData: any;
  updateFormData: (data: any) => void;
  onSave: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Section4Project: React.FC<Section4Props> = ({
  isActive,
  formData,
  updateFormData,
  onSave,
  onNext,
  onPrevious
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const requiredFields = ['budget', 'decisionProcess'];
    const isValid = validateFields(formData, requiredFields);
    
    if (isValid) {
      onNext();
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className={`magnolia-form-section ${isActive ? 'block' : 'hidden'}`} id="magnolia-section4">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-500 inline-block">
        Project Information
      </h3>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Estimated Budget Range
            </label>
            <select 
              id="budget" 
              name="budget" 
              required
              value={formData.budget || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select budget range</option>
              <option value="under10k">Under $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-250k">$100,000 - $250,000</option>
              <option value="over250k">Over $250,000</option>
              <option value="undetermined">Undetermined</option>
            </select>
          </div>
          
          <div className="magnolia-form-group">
            <label htmlFor="decisionProcess" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Decision-Making Role
            </label>
            <select 
              id="decisionProcess" 
              name="decisionProcess" 
              required
              value={formData.decisionProcess || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select role</option>
              <option value="sole">Sole decision maker</option>
              <option value="key">Key influencer</option>
              <option value="part">Part of decision-making team</option>
              <option value="research">Researching options</option>
            </select>
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="otherDeciders" className="block mb-2 text-sm font-medium text-gray-700">
            Other Key Decision Makers
          </label>
          <textarea 
            id="otherDeciders" 
            name="otherDeciders" 
            rows={2} 
            placeholder="Names, titles, and roles of other stakeholders (if applicable)"
            value={formData.otherDeciders || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="successMetrics" className="block mb-2 text-sm font-medium text-gray-700">
            How will you measure success?
          </label>
          <textarea 
            id="successMetrics" 
            name="successMetrics" 
            rows={3} 
            placeholder="KPIs, metrics, or outcomes you expect from this AI implementation"
            value={formData.successMetrics || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="challenges" className="block mb-2 text-sm font-medium text-gray-700">
            Anticipated Challenges
          </label>
          <textarea 
            id="challenges" 
            name="challenges" 
            rows={3} 
            placeholder="Any potential hurdles you foresee with implementing AI"
            value={formData.challenges || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
      </div>
      
      <FormButtons 
        showPrevious={true}
        onPrevious={onPrevious}
        onSave={onSave}
        onNext={handleNext}
      />
    </div>
  );
};

export default Section4Project;