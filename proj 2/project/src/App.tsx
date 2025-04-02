import React, { useEffect, useState } from 'react';
import { TopUsers } from './pages/TopUsers';
import { TrendingPosts } from './pages/TrendingPosts';
import { Feed } from './pages/Feed';
import { dataManager } from './utils/dataManager';

function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'top-users'>('feed');
  
  useEffect(() => {
    dataManager.updateCache();
    const interval = setInterval(() => {
      dataManager.updateCache();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-3 ${
                activeTab === 'feed'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-3 ${
                activeTab === 'trending'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab('top-users')}
              className={`px-4 py-3 ${
                activeTab === 'top-users'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
              }`}
            >
              Top Users
            </button>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'trending' && <TrendingPosts />}
        {activeTab === 'top-users' && <TopUsers />}
      </main>
    </div>
  );
}

export default App;