import React from 'react';

const MemoryGallery = () => {
  const recentMemories = [
    {
      id: 1,
      title: "Summer of '75 Road Trip",
      preview: "We packed up the old station wagon and drove cross-country for six weeks...",
      year: 1975,
      duration: "12 min",
      hasAudio: true
    },
    {
      id: 2,
      title: "Becoming a Grandparent",
      preview: "When I held little Michael for the first time, it felt like my heart grew three sizes...",
      year: 1998,
      duration: "8 min",
      hasAudio: true
    }
  ];

  return (
    <section id="gallery" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Recent Memories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentMemories.map((memory) => (
          <div key={memory.id} className="memory-card bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {memory.year}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{memory.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{memory.preview}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {memory.duration}
              </div>
              {memory.hasAudio && (
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 012.728-2.728" />
                  </svg>
                  Listen
                </button>
              )}
            </div>
          </div>
        ))}
        
        {/* Add New Memory Card */}
        <div className="memory-card bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-sm p-6 border-2 border-dashed border-purple-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">Add a New Memory</h3>
          <p className="text-gray-600 text-sm mb-4">Record a new story to preserve for your family</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Start Recording
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemoryGallery;