import React from 'react';
import Section1BasicInfo from './form-sections/Section1BasicInfo';
import Section2AIRequirements from './form-sections/Section2AIRequirements';
import Section3Technical from './form-sections/Section3Technical';
import Section4Project from './form-sections/Section4Project';
import Section5Communication from './form-sections/Section5Communication';

interface FormSectionsProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onSaveProgress: () => void;
  onFormSubmit: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const FormSections: React.FC<FormSectionsProps> = ({
  currentStep,
  onStepChange,
  onSaveProgress,
  onFormSubmit,
  formData,
  updateFormData
}) => {
  // Handle section navigation
  const goToNextStep = () => {
    if (currentStep < 5) {
      onStepChange(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProgress = () => {
    onSaveProgress();
  };

  return (
    <form id="magnoliaClientProfileForm" className="magnolia-form">
      {/* Section 1: Basic Information */}
      <Section1BasicInfo 
        isActive={currentStep === 1}
        formData={formData}
        updateFormData={updateFormData}
        onSave={handleSaveProgress}
        onNext={goToNextStep}
      />

      {/* Section 2: AI Requirements */}
      <Section2AIRequirements 
        isActive={currentStep === 2}
        formData={formData}
        updateFormData={updateFormData}
        onSave={handleSaveProgress}
        onNext={goToNextStep}
        onPrevious={goToPrevStep}
      />

      {/* Section 3: Technical Information */}
      <Section3Technical 
        isActive={currentStep === 3}
        formData={formData}
        updateFormData={updateFormData}
        onSave={handleSaveProgress}
        onNext={goToNextStep}
        onPrevious={goToPrevStep}
      />

      {/* Section 4: Project Information */}
      <Section4Project 
        isActive={currentStep === 4}
        formData={formData}
        updateFormData={updateFormData}
        onSave={handleSaveProgress}
        onNext={goToNextStep}
        onPrevious={goToPrevStep}
      />

      {/* Section 5: Communication & Next Steps */}
      <Section5Communication 
        isActive={currentStep === 5}
        formData={formData}
        updateFormData={updateFormData}
        onSave={handleSaveProgress}
        onSubmit={onFormSubmit}
        onPrevious={goToPrevStep}
      />
    </form>
  );
};

export default FormSections;