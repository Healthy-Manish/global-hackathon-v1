// Validation schemas for both frontend and backend

export const memoryValidation = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s.,!?()-]+$/,
    message: 'Title must be between 5 and 100 characters and contain only letters, numbers, and basic punctuation'
  },
  
  transcript: {
    required: true,
    minLength: 10,
    maxLength: 10000,
    message: 'Memory transcript must be between 10 and 10,000 characters'
  },
  
  year: {
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
    message: `Year must be between 1900 and ${new Date().getFullYear()}`
  },
  
  location: {
    required: false,
    maxLength: 100,
    message: 'Location must be less than 100 characters'
  }
};

export const validateMemory = (memoryData) => {
  const errors = [];
  
  // Validate title
  if (!memoryData.title || memoryData.title.trim() === '') {
    errors.push('Title is required');
  } else if (memoryData.title.length < memoryValidation.title.minLength) {
    errors.push(memoryValidation.title.message);
  }
  
  // Validate transcript
  if (!memoryData.transcript || memoryData.transcript.trim() === '') {
    errors.push('Memory transcript is required');
  } else if (memoryData.transcript.length < memoryValidation.transcript.minLength) {
    errors.push(memoryValidation.transcript.message);
  }
  
  // Validate year
  if (!memoryData.year) {
    errors.push('Year is required');
  } else if (memoryData.year < memoryValidation.year.min || memoryData.year > memoryValidation.year.max) {
    errors.push(memoryValidation.year.message);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const audioValidation = {
  allowedFormats: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  maxSize: 10 * 1024 * 1024, // 10MB
  maxDuration: 30 * 60 * 1000 // 30 minutes
};

export const imageValidation = {
  allowedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize: 5 * 1024 * 1024 // 5MB
};