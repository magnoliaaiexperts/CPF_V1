import React, { useState, useEffect } from 'react';
import FormButtons from '../common/FormButtons';
import CheckboxGroup from '../common/CheckboxGroup';
import { validateFields } from '../../utils/validation';

interface Section2Props {
  isActive: boolean;
  formData: any;
  updateFormData: (data: any) => void;
  onSave: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Section2AIRequirements: React.FC<Section2Props> = ({
  isActive,
  formData,
  updateFormData,
  onSave,
  onNext,
  onPrevious
}) => {
  // Local state for checkbox groups
  const [objectives, setObjectives] = useState<string[]>([]);
  const [otherObjective, setOtherObjective] = useState('');
  const [showOtherObjective, setShowOtherObjective] = useState(false);

  // Initialize local state from formData
  useEffect(() => {
    if (formData.aiObjectives) {
      setObjectives(Array.isArray(formData.aiObjectives) ? formData.aiObjectives : [formData.aiObjectives]);
      setShowOtherObjective(formData.aiObjectives.includes('other'));
    }
    if (formData.objectiveOther) {
      setOtherObjective(formData.objectiveOther);
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleObjectiveChange = (checked: boolean, value: string) => {
    let newObjectives;
    if (checked) {
      newObjectives = [...objectives, value];
    } else {
      newObjectives = objectives.filter(item => item !== value);
    }
    
    setObjectives(newObjectives);
    updateFormData({ ...formData, aiObjectives: newObjectives });
    
    if (value === 'other') {
      setShowOtherObjective(checked);
      if (!checked) {
        setOtherObjective('');
        updateFormData({ ...formData, aiObjectives: newObjectives, objectiveOther: '' });
      }
    }
  };

  const handleOtherObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherObjective(e.target.value);
    updateFormData({ ...formData, objectiveOther: e.target.value });
  };

  const handleNext = () => {
    const requiredFields = ['aiTimeline', 'aiExperience'];
    const isValid = validateFields(formData, requiredFields);
    
    if (objectives.length === 0) {
      alert('Please select at least one AI objective.');
      return;
    }
    
    if (objectives.includes('other') && !otherObjective) {
      alert('Please specify your other objective.');
      return;
    }
    
    if (isValid) {
      onNext();
    } else {
      alert('Please fill in all required fields');
    }
  };

  const aiObjectivesOptions = [
    { id: 'objective1', value: 'automation', label: 'Automate repetitive tasks' },
    { id: 'objective2', value: 'insights', label: 'Generate business insights' },
    { id: 'objective3', value: 'customer', label: 'Enhance customer experience' },
    { id: 'objective4', value: 'predictions', label: 'Make predictions or forecasts' },
    { id: 'objective5', value: 'decisions', label: 'Support decision making' },
    { id: 'objective6', value: 'other', label: 'Other' }
  ];

  return (
    <div className={`magnolia-form-section ${isActive ? 'block' : 'hidden'}`} id="magnolia-section2">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-500 inline-block">
        AI Requirements
      </h3>
      
      <div className="space-y-5">
        <div className="magnolia-form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
            What are your primary objectives for implementing AI? (Select all that apply)
          </label>
          
          <div className="magnolia-checkbox-group mt-3 space-y-3">
            {aiObjectivesOptions.map(option => (
              <div key={option.id} className="magnolia-checkbox-item flex items-start">
                <input 
                  type="checkbox" 
                  id={option.id} 
                  value={option.value}
                  checked={objectives.includes(option.value)}
                  onChange={(e) => handleObjectiveChange(e.target.checked, option.value)}
                  className="w-5 h-5 mt-0.5 mr-3 accent-indigo-500 cursor-pointer"
                />
                <label htmlFor={option.id} className="text-sm md:text-base text-gray-600 cursor-pointer">
                  {option.label}
                </label>
                
                {option.value === 'other' && showOtherObjective && (
                  <input 
                    type="text" 
                    id="objectiveOther" 
                    name="objectiveOther" 
                    placeholder="Please specify"
                    value={otherObjective}
                    onChange={handleOtherObjectiveChange}
                    className="ml-3 p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="magnolia-form-group">
            <label htmlFor="aiTimeline" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Implementation Timeline
            </label>
            <select 
              id="aiTimeline" 
              name="aiTimeline" 
              required
              value={formData.aiTimeline || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate (Within 1 month)</option>
              <option value="short">Short-term (1-3 months)</option>
              <option value="medium">Medium-term (3-6 months)</option>
              <option value="long">Long-term (6-12 months)</option>
              <option value="planning">Just planning at this stage</option>
            </select>
          </div>
          
          <div className="magnolia-form-group">
            <label htmlFor="aiExperience" className="block mb-2 text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">
              Previous AI Experience
            </label>
            <select 
              id="aiExperience" 
              name="aiExperience" 
              required
              value={formData.aiExperience || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2364748B'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                backgroundSize: '1.2em 1.2em'
              }}
            >
              <option value="">Select experience level</option>
              <option value="none">No previous experience</option>
              <option value="basic">Basic understanding</option>
              <option value="some">Some experience with AI projects</option>
              <option value="significant">Significant experience</option>
              <option value="expert">Expert with multiple AI implementations</option>
            </select>
          </div>
        </div>
        
        <div className="magnolia-form-group">
          <label htmlFor="aiSpecifics" className="block mb-2 text-sm font-medium text-gray-700">
            Please describe your specific AI needs or challenges
          </label>
          <textarea 
            id="aiSpecifics" 
            name="aiSpecifics" 
            rows={4} 
            placeholder="Tell us about your specific requirements or problems you're trying to solve with AI"
            value={formData.aiSpecifics || ''}
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

export default Section2AIRequirements;