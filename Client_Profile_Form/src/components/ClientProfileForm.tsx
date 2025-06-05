import React, { useState, useEffect } from 'react';
import FormHeader from './FormHeader';
import ValueBanner from './ValueBanner';
import ProgressBar from './ProgressBar';
import QuickOptions from './QuickOptions';
import TrustIndicators from './TrustIndicators';
import TestimonialSlider from './TestimonialSlider';
import CompletionIndicator from './CompletionIndicator';
import FormSections from './FormSections';
import ConfirmationScreen from './ConfirmationScreen';
import DemoModal from './modals/DemoModal';
import ExitPopup from './modals/ExitPopup';
import RestoreProgressModal from './modals/RestoreProgressModal';
import Notifications from './notifications/Notifications';
import FomoNotifications from './notifications/FomoNotifications';
import { useFormData } from '../hooks/useFormData';

const ClientProfileForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);
  const [savedData, setSavedData] = useState<any>(null);
  const { formData, updateFormData, saveProgress, loadSavedData } = useFormData();

  // Check for saved progress on component mount
  useEffect(() => {
    const checkSavedProgress = () => {
      try {
        const savedDataString = localStorage.getItem('magnoliaFormData');
        if (!savedDataString) return;

        const data = JSON.parse(savedDataString);
        const meta = data.magnoliaMeta;

        if (meta && meta.lastSaved) {
          const savedDate = new Date(meta.lastSaved);
          const now = new Date();
          const daysDifference = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

          if (daysDifference < 7) {
            setSavedData(data);
            setShowRestoreModal(true);
          } else {
            localStorage.removeItem('magnoliaFormData');
          }
        }
      } catch (e) {
        console.error('Error checking saved progress:', e);
        localStorage.removeItem('magnoliaFormData');
      }
    };

    checkSavedProgress();
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleFormSubmit = async () => {
    // In a real app, this would submit to a server
    console.log('Submitting form data:', formData);
    
    // Show confirmation screen
    setShowConfirmation(true);
    
    // Clear saved progress
    try {
      localStorage.removeItem('magnoliaFormData');
    } catch (e) {
      console.error('Error removing saved data:', e);
    }
  };

  const handleRestoreProgress = (restore: boolean) => {
    setShowRestoreModal(false);
    
    if (restore && savedData) {
      loadSavedData(savedData);
      setCurrentStep(savedData.magnoliaMeta?.currentStep || 1);
    } else {
      localStorage.removeItem('magnoliaFormData');
    }
  };

  return (
    <div className="magnolia-client-profile-container max-w-3xl mx-auto">
      <div className="magnolia-card bg-white rounded-xl shadow-lg overflow-hidden">
        <FormHeader />
        
        <div className="magnolia-card-body p-5 md:p-8">
          {!showConfirmation && (
            <>
              <ValueBanner />
              
              <ProgressBar currentStep={currentStep} />
              
              <QuickOptions onDemoClick={() => setShowDemoModal(true)} />
              
              <TrustIndicators />
              
              <TestimonialSlider />
              
              <CompletionIndicator currentStep={currentStep} />
              
              <FormSections 
                currentStep={currentStep}
                onStepChange={handleStepChange}
                onSaveProgress={saveProgress}
                onFormSubmit={handleFormSubmit}
                formData={formData}
                updateFormData={updateFormData}
              />
            </>
          )}
          
          {showConfirmation && <ConfirmationScreen />}
        </div>
      </div>
      
      <DemoModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
      
      <RestoreProgressModal 
        isOpen={showRestoreModal}
        onRestore={(restore) => handleRestoreProgress(restore)}
      />
      
      <ExitPopup />
      <Notifications />
      <FomoNotifications />
    </div>
  );
};

export default ClientProfileForm;