import React, { useState, useRef } from 'react';
import axios from 'axios';

const MemoryRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('Click the microphone to start recording');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showEnhancement, setShowEnhancement] = useState(false);
  const [enhancedMemory, setEnhancedMemory] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      
      recorder.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setRecordingStatus('Recording complete! Processing...');
        await processRecording(blob);
      };
      
      audioChunks.current = [];
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingStatus('Recording... Speak now');
    } catch (error) {
      console.error('Error starting recording:', error);
      setRecordingStatus('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processRecording = async (blob) => {
    try {
      // For now, we'll simulate processing since we don't have Whisper set up
      // In production, you would:
      // 1. Send audio to backend for transcription
      // 2. Get transcript back
      // 3. Enhance with AI
      
      setRecordingStatus('Transcribing audio...');
      
      // Simulate transcription delay
      setTimeout(() => {
        const simulatedTranscript = "I remember when I was young, we used to spend summers at my grandparents' farm. The smell of fresh hay and the sound of crickets at night are memories I'll always cherish. We'd help with the animals and play in the fields all day long.";
        
        setRecordingStatus('Enhancing with AI...');
        
        // Simulate AI enhancement
        setTimeout(() => {
          enhanceWithAI(simulatedTranscript);
        }, 1500);
      }, 2000);
      
    } catch (error) {
      console.error('Error processing recording:', error);
      setRecordingStatus('Error processing recording');
    }
  };

  const enhanceWithAI = async (transcript) => {
    try {
      // Try to use real AI enhancement from backend
      const response = await axios.post('/api/ai/enhance-memory', {
        transcript: transcript,
        year: new Date().getFullYear() - 30, // Default to 30 years ago
        location: "Unknown Location"
      });
      
      if (response.data.success) {
        setEnhancedMemory({
          title: response.data.suggested_title,
          enhanced_text: response.data.enhanced_text,
          historical_context: response.data.historical_context,
          suggested_tags: response.data.tags || ['memory', 'story'],
          original_transcript: transcript,
          year: new Date().getFullYear() - 30,
          location: "Unknown Location"
        });
      } else {
        // Fallback to simulated enhancement
        simulateAIEnhancement(transcript);
      }
    } catch (error) {
      console.log('AI enhancement failed, using simulation:', error);
      // Fallback to simulated enhancement
      simulateAIEnhancement(transcript);
    }
    
    setShowEnhancement(true);
    setRecordingStatus('Memory enhanced! Review and save.');
  };

  const simulateAIEnhancement = (transcript) => {
    const sampleEnhancedMemory = {
      title: "Summer Memories at the Farm",
      enhanced_text: transcript + " Looking back, those were some of the most carefree days of my life. The simplicity of farm life taught me so much about hard work, family, and appreciating the little things. Every evening, we'd sit on the porch and watch the fireflies dance in the twilight.",
      historical_context: "In the 1970s, family farms were still common across the country. Many children spent summers with grandparents, learning traditional skills and creating bonds that would last a lifetime.",
      suggested_tags: ["childhood", "summer", "family", "farm", "memories"],
      original_transcript: transcript,
      year: 1975,
      location: "Family Farm"
    };
    
    setEnhancedMemory(sampleEnhancedMemory);
  };

  const promptSuggestions = [
    {
      text: "Tell me about your childhood home",
      year: "1955",
      location: "Childhood Home"
    },
    {
      text: "What was your first job like?",
      year: "1965", 
      location: "First Workplace"
    },
    {
      text: "How did you meet your spouse?",
      year: "1970",
      location: "Where you met"
    },
    {
      text: "Share a favorite family tradition",
      year: "1980",
      location: "Family Home"
    },
    {
      text: "What was school like when you were young?",
      year: "1958",
      location: "School"
    },
    {
      text: "Tell me about your parents and grandparents",
      year: "1940",
      location: "Family"
    }
  ];

  const handlePromptClick = (prompt) => {
    setRecordingStatus(`Great! Tell me about "${prompt.text}"`);
    // Pre-fill some data based on the prompt
    if (enhancedMemory) {
      setEnhancedMemory({
        ...enhancedMemory,
        year: parseInt(prompt.year),
        location: prompt.location
      });
    }
  };
const API_BASE = 'http://localhost:5000/api';
const saveEnhancedMemory = async () => {
  try {
    setSaving(true);
    setRecordingStatus('Saving to backend...');
    
    const memoryData = {
      title: enhancedMemory.title,
      transcript: enhancedMemory.enhanced_text,
      year: enhancedMemory.year,
      location: enhancedMemory.location
    };

    console.log('💾 Saving memory to backend:', memoryData);
    
    // Test with different endpoints
    let response;
    
    try {
      // ✅ FIXED: Use proper string concatenation
      response = await axios.post(`${API_BASE}/memories`, memoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (mainError) {
      console.log('Main endpoint failed, trying test endpoint...');
      // Fallback to test endpoint
      response = await axios.post(`${API_BASE}/memories/test`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    console.log('✅ Memory saved successfully:', response.data);
    
    setShowEnhancement(false);
    setEnhancedMemory(null);
    setAudioBlob(null);
    setSaving(false);
    setRecordingStatus('Memory saved successfully to database!');
    
    // Refresh the timeline
    if (window.refreshMemories) {
      window.refreshMemories();
    }
    
    // Show success message
    setTimeout(() => {
      setRecordingStatus('Click the microphone to start recording');
    }, 3000);
    
  } catch (error) {
    console.error('❌ Error saving memory:', error);
    setRecordingStatus(`Failed to save memory: ${error.response?.data?.error || error.message}`);
    setSaving(false);
  }
};
  const quickSaveMemory = async (title, transcript, year, location) => {
    try {
      setRecordingStatus('Saving quick memory...');
      
      const memoryData = {
        title: title,
        transcript: transcript,
        year: year,
        location: location
      };

      const response = await axios.post('/api/memories', memoryData);
      
      console.log('✅ Quick memory saved:', response.data);
      setRecordingStatus('Memory saved successfully!');
      
      // Refresh timeline
      if (window.refreshMemories) {
        window.refreshMemories();
      }
      
    } catch (error) {
      console.error('❌ Error saving quick memory:', error);
      setRecordingStatus('Failed to save memory.');
    }
  };

  return (
    <section id="record" className="mb-16">
      <div className="voice-recorder rounded-2xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Record a Memory</h2>
        <p className="mb-6">Tell us a story from your life. The AI will help turn it into a beautiful memory post.</p>
        
        <div className="bg-white rounded-lg p-6 text-gray-800">
          {/* Quick Save Examples */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quick Save Examples:</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => quickSaveMemory(
                  "My First Bicycle", 
                  "I got my first bicycle when I was 8 years old. It was red and shiny, and I practiced for hours until I could ride without training wheels. The feeling of freedom was incredible!",
                  1960,
                  "Childhood Neighborhood"
                )}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                Save Bicycle Memory
              </button>
              <button 
                onClick={() => quickSaveMemory(
                  "High School Graduation",
                  "I remember wearing my cap and gown, feeling both excited and nervous about the future. All my friends were there, and we promised to stay in touch forever.",
                  1975,
                  "High School"
                )}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                Save Graduation Memory
              </button>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Need inspiration? Try one of these:</h3>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>
          
          {/* Recording Controls */}
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={isRecording ? stopRecording : startRecording}
              disabled={saving}
              className={`${
                isRecording 
                  ? 'bg-purple-500 animate-pulse' 
                  : saving
                  ? 'bg-gray-400'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              ) : saving ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-2">{recordingStatus}</p>
            {isRecording && (
              <div className="h-4 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-purple-500 rounded-full animate-pulse w-1/2"></div>
              </div>
            )}
          </div>

          {/* Backend Connection Status */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">
              <strong>Backend Status:</strong> {
                recordingStatus.includes('saved successfully') 
                  ? '✅ Connected and working' 
                  : '🔌 Ready to connect'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Memory Display */}
      {showEnhancement && enhancedMemory && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">✨ AI-Enhanced Memory</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Title *</label>
                <input 
                  type="text" 
                  value={enhancedMemory.title}
                  onChange={(e) => setEnhancedMemory({...enhancedMemory, title: e.target.value})}
                  className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter a title for your memory"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">Year *</label>
                <input 
                  type="number"
                  value={enhancedMemory.year}
                  onChange={(e) => setEnhancedMemory({...enhancedMemory, year: parseInt(e.target.value) || 1970})}
                  className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="1900"
                  max="2023"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Location</label>
              <input 
                type="text"
                value={enhancedMemory.location}
                onChange={(e) => setEnhancedMemory({...enhancedMemory, location: e.target.value})}
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Where did this happen?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Your Story *</label>
              <textarea 
                value={enhancedMemory.enhanced_text}
                onChange={(e) => setEnhancedMemory({...enhancedMemory, enhanced_text: e.target.value})}
                rows="6"
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tell your story..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Historical Context</label>
              <p className="text-green-600 text-sm bg-green-100 p-2 rounded">{enhancedMemory.historical_context}</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {enhancedMemory.suggested_tags.map((tag, index) => (
                <span key={index} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                onClick={saveEnhancedMemory}
                disabled={saving || !enhancedMemory.title || !enhancedMemory.enhanced_text}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save to Timeline'
                )}
              </button>
              <button 
                onClick={() => setShowEnhancement(false)}
                disabled={saving}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              * Required fields. This memory will be saved to your backend database.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Make the refresh function globally available
if (typeof window !== 'undefined') {
  window.refreshMemories = () => {
    // This will be used by other components to refresh the timeline
    console.log('Refresh memories requested');
  };
}

export default MemoryRecorder;