import { useState, useCallback } from 'react';

export const useFormData = () => {
  const [formData, setFormData] = useState<any>({
    optInLead: true,
    newsletter: true,
    terms: false,
    aiObjectives: [],
    currentSystems: [],
    nextSteps: []
  });

  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx5Pfk8QwXAZOGj-YsJRl5PN10b1sY_kHlJuDJpWOZHX7HJRUpXgohd8-9erpxcy8WnEA/exec';

  const updateFormData = useCallback((newData: any) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  const saveProgress = useCallback(() => {
    const data = {
      ...formData,
      magnoliaMeta: {
        lastSaved: new Date().toISOString(),
        currentStep: formData.currentStep || 1
      }
    };

    try {
      localStorage.setItem('magnoliaFormData', JSON.stringify(data));
      
      const saveEvent = new CustomEvent('saveProgress');
      window.dispatchEvent(saveEvent);
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }, [formData]);

  const loadSavedData = useCallback((savedData: any) => {
    if (!savedData) return;
    
    const { magnoliaMeta, ...formFields } = savedData;
    setFormData(formFields);
  }, []);

  const submitForm = async () => {
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          formType: 'client_profile'
        })
      });
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  };

  return {
    formData,
    updateFormData,
    saveProgress,
    loadSavedData,
    submitForm
  };
};