import React from 'react';
import MemoryRecorder from './components/MemoryRecorder';
import MemoryTimeline from './components/MemoryTimeline';
import MemoryMap from './components/MemoryMap';
import MemoryGallery from './components/MemoryGallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-purple-600">Memory Keeper</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#record" className="text-gray-700 hover:text-purple-600">Record</a>
              <a href="#timeline" className="text-gray-700 hover:text-purple-600">Timeline</a>
              <a href="#map" className="text-gray-700 hover:text-purple-600">Map</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Preserve Your Family's Legacy</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Capture your grandparents' life stories and transform them into a beautiful digital legacy for generations to come.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Your First Memory
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MemoryRecorder />
        <MemoryTimeline />
        <MemoryMap />
        <MemoryGallery />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Memory Keeper &copy; 2023 - Preserving family legacies one story at a time</p>
        </div>
      </footer>
    </div>
  );
}

export default App;