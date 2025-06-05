import React from 'react';

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (checked: boolean, value: string) => void;
  name: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  name
}) => {
  return (
    <div className="magnolia-checkbox-group mt-3 space-y-3">
      {options.map(option => (
        <div key={option.id} className="magnolia-checkbox-item flex items-start">
          <input 
            type="checkbox" 
            id={option.id} 
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={(e) => onChange(e.target.checked, option.value)}
            className="w-5 h-5 mt-0.5 mr-3 accent-indigo-500 cursor-pointer"
          />
          <label htmlFor={option.id} className="text-sm md:text-base text-gray-600 cursor-pointer">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;