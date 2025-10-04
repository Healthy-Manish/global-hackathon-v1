import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemoryTimeline = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);

  useEffect(() => {
    fetchMemories();
  }, []);

 const fetchMemories = async () => {
  try {
    console.log('🔄 Fetching memories from API...');
    const response = await axios.get('/api/memories');
    console.log('✅ API Response:', response.data);
    
    if (response.data.success) {
      setMemories(response.data.memories || []);
    } else {
      console.warn('API returned unsuccessful:', response.data);
      setMemories([]);
    }
    setLoading(false);
  } catch (apiError) {
    console.log('❌ API not available, using mock data:', apiError.message);
    // Fallback to mock data if API is not available
    setTimeout(() => {
      const mockMemories = [
        {
          id: 1,
          title: "First Day at Johnson Manufacturing",
          transcript: "I remember walking into that factory, nervous but excited. The smell of oil and metal filled the air, and the sound of machinery was overwhelming at first. Mr. Johnson himself showed me around and told me I had a good hand for detail work.",
          year: 1965,
          location: "Chicago, IL",
          audio_path: null,
          created_at: "2023-10-01",
          photos: []
        },
        {
          id: 2,
          title: "Wedding Day",
          transcript: "It rained that morning, and we were so worried the outdoor ceremony would be ruined. But by noon, the sun came out and created the most beautiful rainbow over the church. Sarah looked absolutely radiant in her mother's wedding dress.",
          year: 1972,
          location: "New York, NY", 
          audio_path: null,
          created_at: "2023-10-02",
          photos: []
        }
      ];
      setMemories(mockMemories);
      setLoading(false);
    }, 1000);
  }
};

  const playAudio = (memoryId) => {
    if (playingAudio === memoryId) {
      setPlayingAudio(null);
      // Stop audio playback logic would go here
    } else {
      setPlayingAudio(memoryId);
      // Start audio playback logic would go here
      console.log('Playing audio for memory:', memoryId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="timeline" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Life Timeline</h2>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Loading memories...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="timeline" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Life Timeline</h2>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">
            <p>Error loading memories: {error}</p>
            <button 
              onClick={fetchMemories}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Life Timeline</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {memories.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Memories Yet</h3>
            <p className="text-gray-500 mb-4">Start recording your first memory to begin your timeline.</p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Record First Memory
            </button>
          </div>
        ) : (
          <div className="timeline-container">
            <div className="relative border-l-2 border-purple-200 ml-4">
              {memories
                .sort((a, b) => a.year - b.year)
                .map((memory, index) => (
                  <div key={memory.id} className="mb-8 ml-6">
                    {/* Timeline dot */}
                    <div className="absolute -left-3 mt-1.5 bg-purple-500 rounded-full w-6 h-6 border-4 border-white shadow"></div>
                    
                    {/* Year */}
                    <time className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {memory.year}
                    </time>
                    
                    {/* Memory title */}
                    <h3 className="text-lg font-semibold mt-1 text-gray-800">{memory.title}</h3>
                    
                    {/* Location */}
                    {memory.location && (
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {memory.location}
                      </div>
                    )}
                    
                    {/* Transcript */}
                    <p className="mt-2 text-gray-600 leading-relaxed">{memory.transcript}</p>
                    
                    {/* Photos */}
                    {memory.photos && memory.photos.length > 0 && (
                      <div className="mt-3 flex space-x-2 overflow-x-auto pb-2">
                        {memory.photos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Audio player and actions */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {memory.audio_path && (
                          <button
                            onClick={() => playAudio(memory.id)}
                            className={`flex items-center space-x-1 text-sm font-medium ${
                              playingAudio === memory.id ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 012.728-2.728" />
                            </svg>
                            <span>{playingAudio === memory.id ? 'Stop' : 'Listen'}</span>
                          </button>
                        )}
                        
                        {/* Created date */}
                        <span className="text-xs text-gray-400">
                          Added {formatDate(memory.created_at)}
                        </span>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Separator */}
                    {index < memories.length - 1 && (
                      <div className="mt-4 border-t border-gray-100"></div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryTimeline;