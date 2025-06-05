import React, { useState, useEffect } from 'react';
import FormButtons from '../common/FormButtons';
import { validateFields } from '../../utils/validation';

interface Section3Props {
  isActive: boolean;
  formData: any;
  updateFormData: (data: any) => void;
  onSave: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Section3Technical: React.FC<Section3Props> = ({
  isActive,
  formData,
  updateFormData,
  onSave,
  onNext,
  onPrevious
}) => {
  // Local state for checkbox groups
  const [systems, setSystems] = useState<string[]>([]);
  const [otherSystem, setOtherSystem] = useState('');
  const [showOtherSystem, setShowOtherSystem] = useState(false);

  // Initialize local state from formData
  useEffect(() => {
    if (formData.currentSystems) {
      setSystems(Array.isArray(formData.currentSystems) ? formData.currentSystems : [formData.currentSystems]);
      setShowOtherSystem(formData.currentSystems.includes('other'));
    }
    if (formData.systemOther) {
      setOtherSystem(formData.systemOther);
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleSystemChange = (checked: boolean, value: string) => {
    let newSystems;
    if (checked) {
      newSystems = [...systems, value];
    } else {
      newSystems = systems.filter(item => item !== value);
    }
    
    setSystems(newSystems);
    updateFormData({ ...formData, currentSystems: newSystems });
    
    if (value === 'other') {
      setShowOtherSystem(checked);
      if (!checked) {
        setOtherSystem('');
        updateFormData({ ...formData, currentSystems: newSystems, systemOther: '' });
      }
    }
  };

  const handleOtherSystemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherSystem(e.target.value);
    updateFormData({ ...formData, systemOther: e.target.value });
  };

  const handleNext = () => {
    const requiredFields = ['dataAvailability'];
    const isValid = validateFields(formData, requiredFields);
    
    if (systems.includes('other') && !otherSystem) {
      alert('Please specify your other system.');
      return;
    }
    
    if (isValid) {
      onNext();
    } else {
      alert('Please fill in all required fields');
    }
  };

  const systemOptions = [
    { id: 'system1', value: 'crm', label: 'CRM (e.g., Salesforce, HubSpot)' },
    { id: 'system2', value: 'erp', label: 'ERP System' },
    { id: 'system3', value: 'ecommerce', label: 'E-commerce Platform' },
    { id: 'system4', value: 'analytics', label: 'Analytics Platform' },
    { id: 'system5', value: 'cloud', label: 'Cloud Services' },
    { id: 'system6', value: 'other', label: 'Other' }
  ];

  return (
    <div className={`magnolia-form-section ${isActive ? 'block' : 'hidden'}`} id="magnolia-section3">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-500 inline-block">
        Technical Information
      </h3>
      
      <div className="space-y-5">
        <div className="magnolia-form-group">
          <label htmlFor="dataAvailability" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
            Data Availability
          </label>
          <select 
            id="dataAvailability" 
            name="dataAvailability" 
            required
            value={formData.dataAvailability || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
              backgroundSize: '1.2em 1.2em'
            }}
          >
            <option value="">Select data availability</option>
            <option value="extensive">Extensive data available</option>
            <option value="some">Some data available</option>
            <option value="limited">Limited data available</option>
            <option value="none">No relevant data available</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
        
        <div className="magnolia-form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Current Systems (Select all that apply)
          </label>
          
          <div className="magnolia-checkbox-group mt-3 space-y-3">
            {systemOptions.map(option => (
              <div key={option.id} className="magnolia-checkbox-item flex items-start">
                <input 
                  type="checkbox" 
                  id={option.id} 
                  value={option.value}
                  checked={systems.includes(option.value)}
                  onChange={(e) => handleSystemChange(e.target.checked, option.value)}
                  className="w-5 h-5 mt-0.5 mr-3 accent-indigo-500 cursor-pointer"
                />
                <label htmlFor={option.id} className="text-sm md:text-base text-gray-600 cursor-pointer">
                  {option.label}
                </label>
                
                {option.value === 'other' && showOtherSystem && (
                  <input 
                    type="text" 
                    id="systemOther" 
                    name="systemOther" 
                    placeholder="Please specify"
                    value={otherSystem}
                    onChange={handleOtherSystemChange}
                    className="ml-3 p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="integrationNeeds" className="block mb-2 text-sm font-medium text-gray-700">
            Integration Requirements
          </label>
          <textarea 
            id="integrationNeeds" 
            name="integrationNeeds" 
            rows={3} 
            placeholder="Describe any systems that need to be integrated with your AI solution"
            value={formData.integrationNeeds || ''}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
          ></textarea>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="techStack" className="block mb-2 text-sm font-medium text-gray-700">
            Current Technology Stack
          </label>
          <textarea 
            id="techStack" 
            name="techStack" 
            rows={3} 
            placeholder="List key technologies, languages, frameworks, databases, etc."
            value={formData.techStack || ''}
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

export default Section3Technical;