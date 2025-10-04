// Application constants used by both frontend and backend

export const MEMORY_CATEGORIES = {
  CHILDHOOD: 'childhood',
  EDUCATION: 'education',
  CAREER: 'career',
  RELATIONSHIPS: 'relationships',
  TRAVEL: 'travel',
  FAMILY: 'family',
  HISTORICAL: 'historical',
  OTHER: 'other'
};

export const AUDIO_FORMATS = {
  MP3: 'audio/mpeg',
  WAV: 'audio/wav',
  OGG: 'audio/ogg'
};

export const MAX_FILE_SIZES = {
  AUDIO: 10 * 1024 * 1024, // 10MB
  IMAGE: 5 * 1024 * 1024,  // 5MB
  VIDEO: 50 * 1024 * 1024  // 50MB
};

export const TIMELINE_DECADES = {
  1920: '1920s',
  1930: '1930s', 
  1940: '1940s',
  1950: '1950s',
  1960: '1960s',
  1970: '1970s',
  1980: '1980s',
  1990: '1990s',
  2000: '2000s',
  2010: '2010s',
  2020: '2020s'
};

export const PROMPT_SUGGESTIONS = [
  "Tell me about your childhood home and neighborhood",
  "What was your first job and what did you learn from it?",
  "How did you meet your spouse or partner?",
  "Share a favorite family tradition from your childhood",
  "What was school like when you were growing up?",
  "Tell me about your parents and grandparents",
  "What historical events did you live through and how did they affect you?",
  "Share a story about your best friend from childhood",
  "What was your favorite vacation or trip?",
  "Tell me about your wedding day",
  "What advice would you give to your younger self?",
  "Share a story about becoming a parent",
  "What hobbies have you enjoyed throughout your life?",
  "Tell me about your first car or mode of transportation",
  "What technological changes have amazed you the most?"
];