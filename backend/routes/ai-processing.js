const express = require('express');
const router = express.Router();
const axios = require('axios');

// Hugging Face API configuration
const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models';
const headers = {
  'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`
};

// Test endpoint to verify Hugging Face connection
router.get('/test', async (req, res) => {
  try {
    // Test with a simple model
    const response = await axios.get(
      `${HUGGING_FACE_API}/microsoft/DialoGPT-small`,
      { headers, timeout: 10000 }
    );
    
    res.json({ 
      success: true, 
      message: 'Hugging Face connection successful',
      model: response.data 
    });
  } catch (error) {
    console.error('Hugging Face test error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Hugging Face connection failed',
      details: error.response?.data || error.message
    });
  }
});

// Enhanced transcription with context
router.post('/enhance-memory', async (req, res) => {
  try {
    const { transcript, year, location } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ 
        success: false,
        error: 'Transcript is required' 
      });
    }

    console.log('🤖 Enhancing memory with AI...', { 
      transcriptLength: transcript.length,
      year, 
      location 
    });

    // Try to use real Hugging Face API if token is available
    if (process.env.HUGGING_FACE_API_KEY && process.env.HUGGING_FACE_API_KEY !== 'your_token_here') {
      try {
        const enhancedMemory = await enhanceWithHuggingFace(transcript, year, location);
        return res.json({
          success: true,
          ...enhancedMemory
        });
      } catch (hfError) {
        console.log('Hugging Face failed, using simulation:', hfError.message);
        // Fall through to simulation
      }
    }

    // Fallback to simulation
    const enhancedMemory = await simulateAIEnhancement(transcript, year, location);
    
    res.json({
      success: true,
      ...enhancedMemory
    });
    
  } catch (error) {
    console.error('AI enhancement error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'AI processing failed',
      // Fallback to ensure frontend always gets data
      enhanced_text: req.body.transcript,
      historical_context: getHistoricalContext(req.body.year),
      suggested_title: generateTitle(req.body.transcript),
      tags: generateTags(req.body.transcript)
    });
  }
});

// Real Hugging Face enhancement
async function enhanceWithHuggingFace(transcript, year, location) {
  try {
    const prompt = `Enhance this personal memory from ${year} in ${location}. Make it more descriptive and engaging while keeping the original facts and voice:\n\n"${transcript}"\n\nEnhanced version:`;
    
    const response = await axios.post(
      `${HUGGING_FACE_API}/microsoft/DialoGPT-medium`,
      {
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          do_sample: true
        }
      },
      { 
        headers,
        timeout: 30000 
      }
    );

    const enhancedText = response.data[0]?.generated_text || transcript;
    
    return {
      enhanced_text: enhancedText,
      historical_context: getHistoricalContext(year),
      suggested_title: generateTitle(transcript),
      tags: generateTags(transcript),
      source: 'hugging_face'
    };
  } catch (error) {
    console.error('Hugging Face API error:', error.response?.data || error.message);
    throw new Error('Hugging Face service unavailable');
  }
}

// Simulate AI enhancement (fallback)
async function simulateAIEnhancement(transcript, year, location) {
  console.log('Using simulated AI enhancement');
  
  const enhancements = [
    "Looking back with fondness, ",
    "I remember it as if it were yesterday - ",
    "That particular moment stands out vividly in my memory. ",
    "It was an experience that truly shaped who I am today. ",
    "The memory comes back to me with such clarity. "
  ];
  
  const conclusions = [
    " Those simple moments taught me so much about what really matters in life.",
    " Little did I know then how much those experiences would mean to me later in life.",
    " The lessons I learned during that time have stayed with me throughout my life.",
    " It's funny how the smallest moments can leave the biggest impressions.",
    " That period of my life was truly special in so many ways."
  ];
  
  const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
  const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
  
  return {
    enhanced_text: randomEnhancement + transcript + randomConclusion,
    historical_context: getHistoricalContext(year),
    suggested_title: generateTitle(transcript),
    tags: generateTags(transcript),
    source: 'simulation'
  };
}

function getHistoricalContext(year) {
  if (!year) return "An important time in history that shaped many lives.";
  
  const decade = Math.floor(year / 10) * 10;
  const contexts = {
    1920: "The Roaring Twenties - a decade of economic prosperity, jazz music, flapper culture, and significant social change.",
    1930: "The Great Depression era - a time of economic hardship, but also resilience and cultural development.",
    1940: "World War II and post-war recovery - a decade defined by global conflict and subsequent rebuilding.",
    1950: "Post-war prosperity and the birth of rock and roll - a time of economic growth and cultural transformation.",
    1960: "The 1960s were a time of social revolution, with the civil rights movement and the rise of rock and roll music shaping the era.",
    1970: "The 1970s saw the end of the Vietnam War, the birth of disco, and the beginning of the personal computer revolution.",
    1980: "The 1980s were marked by new wave music, the rise of MTV, and significant advances in technology and computing.",
    1990: "The 1990s brought the internet revolution, grunge music, and major global changes after the end of the Cold War.",
    2000: "The new millennium brought digital technology, social media, and rapid globalization that changed how people connect.",
    2010: "The 2010s saw the rise of smartphones, social media dominance, and significant technological advancements.",
    2020: "The 2020s began with a global pandemic that changed how people work, connect, and view the world."
  };
  
  return contexts[decade] || `The ${year}s were a time of change, growth, and important personal memories.`;
}

function generateTitle(transcript) {
  // Extract first meaningful sentence or create from keywords
  const sentences = transcript.split(/[.!?]+/);
  const firstSentence = sentences[0]?.trim();
  
  if (firstSentence && firstSentence.split(' ').length > 3) {
    const words = firstSentence.split(' ').slice(0, 6).join(' ');
    return words + (words.endsWith('.') ? '' : '...');
  }
  
  // Fallback to keyword-based title
  const keywords = transcript.split(' ').slice(0, 4).join(' ');
  return keywords + '...';
}

function generateTags(transcript) {
  const commonTags = ['memory', 'story', 'life', 'family', 'childhood', 'experience'];
  
  // Simple keyword matching for more relevant tags
  const text = transcript.toLowerCase();
  const additionalTags = [];
  
  if (text.includes('school') || text.includes('teacher') || text.includes('class')) {
    additionalTags.push('education');
  }
  if (text.includes('work') || text.includes('job') || text.includes('career')) {
    additionalTags.push('work');
  }
  if (text.includes('travel') || text.includes('vacation') || text.includes('trip')) {
    additionalTags.push('travel');
  }
  if (text.includes('love') || text.includes('marriage') || text.includes('wedding')) {
    additionalTags.push('relationships');
  }
  if (text.includes('summer') || text.includes('holiday') || text.includes('christmas')) {
    additionalTags.push('seasons');
  }
  
  return [...commonTags.slice(0, 2), ...additionalTags.slice(0, 2)].slice(0, 4);
}

// Health check for AI service
router.get('/health', (req, res) => {
  const hasApiKey = !!(process.env.HUGGING_FACE_API_KEY && process.env.HUGGING_FACE_API_KEY !== 'your_token_here');
  
  res.json({
    success: true,
    service: 'AI Memory Enhancement',
    status: 'operational',
    hugging_face_configured: hasApiKey,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;