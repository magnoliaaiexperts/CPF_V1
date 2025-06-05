export const validateFields = (formData: any, requiredFields: string[]): boolean => {
  for (const field of requiredFields) {
    // Check if the field exists and has a value
    if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
      return false;
    }

    // Additional validation for specific field types
    if (field === 'email' && !/^\S+@\S+\.\S+$/.test(formData[field])) {
      return false;
    }

    if (field === 'phone' && formData[field] && !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(formData[field].trim())) {
      return false;
    }

    if (field === 'website' && formData[field] && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData[field])) {
      return false;
    }

    if (field === 'terms' && formData[field] !== true) {
      return false;
    }
  }

  return true;
};