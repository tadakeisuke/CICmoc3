import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, MapPin, Users, Calendar, Star, Crown, Trophy, Flame, Heart } from 'lucide-react';

const EmoterrainEventDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock experience data - would be received from TOP screen in production
  const experience = {
    id: 1,
    title: 'Awa Odori Festival Experience',
    subtitle: 'Tokushima Awa Odori - 400 Years of Traditional Japanese Dance Magic',
    category: 'dance',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop',
    videoUrl: 'https://example.com/awa-odori-festival.mp4',
    duration: '3h 30m',
    location: '🇯🇵 Tokushima City Center',
    participants: 8450,
    description: 'Immerse yourself in one of Japan\'s three great traditional Bon dances. Experience the captivating Awa Odori festival that lights up Tokushima\'s summer nights. Embodying the spirit of "You\'re a fool whether you dance or watch, so you might as well dance!", spectators are invited to join the dancing circles. Enjoy the spectacular sight of colorfully dressed yukata-clad dancers parading through the streets, accompanied by live performances of traditional instruments including taiko drums, shamisen, and flutes.',
    highlights: [
      'Experience 400 years of traditional performing arts up close',
      'Powerful performances by famous dance troupes (ren)',
      'Interactive dance experience corners for audience participation',
      'Live performances of traditional Japanese instruments',
      'Rich variety of local Tokushima food stalls and delicacies'
    ],
    emotions: {
      primary: { name: 'EXCITEMENT', value: 96, color: '#f59e0b', icon: '🔥' },
      secondary: { name: 'UNITY', value: 91, color: '#8b5cf6', icon: '🤝' },
      tertiary: { name: 'TRADITION', value: 88, color: '#10b981', icon: '🏮' }
    },
    status: 'LIVE',
    tags: ['Traditional Dance', 'Japanese Culture', 'Festival', 'Community', 'Heritage'],
    history: [
      { date: '2024-11-01', event: 'Partnership with Awa Odori Dance Troupe established', type: 'planning' },
      { date: '2024-12-15', event: 'Event planning officially approved', type: 'planning' },
      { date: '2025-01-10', event: 'Participant registration opens', type: 'sales' },
      { date: '2025-02-20', event: 'Full capacity reached - Registration closed', type: 'milestone' },
      { date: '2025-03-01', event: 'Pre-event practice session held', type: 'preparation' },
      { date: '2025-03-15', event: 'Festival begins', type: 'start' }
    ]
  };

  const topEmotibers = [
    {
      rank: 1,
      name: 'AwaOdoriKing',
      avatar: '🏮',
      emotionScore: 9847,
      badge: 'LEGEND',
      badgeColor: 'from-yellow-400 to-orange-500',
      primaryEmotion: 'EXCITEMENT',
      level: 25,
      experiences: 142
    },
    {
      rank: 2,
      name: 'TokushimaSoul',
      avatar: '🥁',
      emotionScore: 9123,
      badge: 'MASTER',
      badgeColor: 'from-purple-400 to-pink-500',
      primaryEmotion: 'UNITY',
      level: 23,
      experiences: 98
    },
    {
      rank: 3,
      name: 'DanceSpirit',
      avatar: '💃',
      emotionScore: 8654,
      badge: 'EXPERT',
      badgeColor: 'from-blue-400 to-cyan-500',
      primaryEmotion: 'TRADITION',
      level: 21,
      experiences: 87
    },
    {
      rank: 4,
      name: 'FestivalHeart',
      avatar: '🎭',
      emotionScore: 8234,
      badge: 'PRO',
      badgeColor: 'from-green-400 to-teal-500',
      primaryEmotion: 'EXCITEMENT',
      level: 19,
      experiences: 76
    },
    {
      rank: 5,
      name: 'TraditionKeeper',
      avatar: '🎌',
      emotionScore: 7892,
      badge: 'ADVANCED',
      badgeColor: 'from-red-400 to-pink-500',
      primaryEmotion: 'UNITY',
      level: 18,
      experiences: 65
    }
  ];

  const EmotionMeter = ({ emotion, size = 'normal' }) => {
    const sizeClasses = size === 'large' ? 'w-24 h-24' : size === 'small' ? 'w-16 h-16' : 'w-20 h-20';
    const textSize = size === 'large' ? 'text-lg' : size === 'small' ? 'text-sm' : 'text-base';
    
    return (
      <div className="text-center">
        <div className={`${sizeClasses} relative mx-auto mb-3`}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(55, 65, 81, 0.3)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={emotion.color}
              strokeWidth="3"
              strokeDasharray={`${emotion.value}, 100`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${emotion.color}60)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">{emotion.icon}</span>
            <span className={`font-mono font-bold ${textSize}`} style={{ color: emotion.color }}>
              {emotion.value}%
            </span>
          </div>
        </div>
        <div className="text-gray-300 font-mono text-sm tracking-wider font-semibold">
          {emotion.name}
        </div>
      </div>
    );
  };

  const EmotiberCard = ({ emotiber }) => {
    const getRankIcon = (rank) => {
      switch(rank) {
        case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
        case 2: return <Trophy className="w-5 h-5 text-gray-300" />;
        case 3: return <Trophy className="w-5 h-5 text-orange-400" />;
        default: return <Star className="w-4 h-4 text-cyan-400" />;
      }
    };

    return (
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center text-xl border border-cyan-500/30">
                {emotiber.avatar}
              </div>
              <div className="absolute -top-1 -right-1">
                {getRankIcon(emotiber.rank)}
              </div>
            </div>
            <div>
              <h4 className="font-mono font-bold text-cyan-300 text-sm">{emotiber.name}</h4>
              <div className="text-gray-400 font-mono text-xs">Level {emotiber.level}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 font-mono text-sm font-bold">#{emotiber.rank}</div>
          </div>
        </div>

        <div className={`bg-gradient-to-r ${emotiber.badgeColor} rounded-lg p-2 mb-3`}>
          <div className="text-center text-black font-mono text-xs font-bold">
            {emotiber.badge}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="text-center">
            <div className="text-cyan-400 font-bold">{emotiber.emotionScore.toLocaleString()}</div>
            <div className="text-gray-400">SCORE</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold">{emotiber.experiences}</div>
            <div className="text-gray-400">EXP</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold">{emotiber.primaryEmotion}</div>
            <div className="text-gray-400">PRIMARY</div>
          </div>
        </div>
      </div>
    );
  };

  const HistoryItem = ({ item }) => (
    <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg border border-cyan-500/10">
      <div className="text-cyan-400 font-mono text-xs font-bold min-w-[5rem]">
        {item.date}
      </div>
      <div className={`w-3 h-3 rounded-full ${
        item.type === 'planning' ? 'bg-blue-400' :
        item.type === 'sales' ? 'bg-green-400' :
        item.type === 'milestone' ? 'bg-yellow-400' :
        item.type === 'preparation' ? 'bg-purple-400' :
        'bg-red-400'
      }`}></div>
      <div className="flex-1">
        <div className="text-gray-300 font-mono text-sm">{item.event}</div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* 感情スコア */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-mono font-bold text-cyan-300 mb-6 tracking-wide flex items-center">
                <Heart className="w-6 h-6 mr-3 text-pink-500" />
                EMOTION ANALYSIS
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <EmotionMeter emotion={experience.emotions.primary} size="large" />
                <EmotionMeter emotion={experience.emotions.secondary} />
                <EmotionMeter emotion={experience.emotions.tertiary} />
              </div>
            </div>

            {/* 基本情報と見どころ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-mono font-bold text-cyan-300 mb-6 tracking-wide">
                  EXPERIENCE INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-mono flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location:
                    </span>
                    <span className="text-cyan-300 font-mono">{experience.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-mono flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Participants:
                    </span>
                    <span className="text-cyan-300 font-mono">{experience.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-mono flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Duration:
                    </span>
                    <span className="text-cyan-300 font-mono">{experience.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-mono">Status:</span>
                    <span className="text-green-400 font-mono font-bold animate-pulse">{experience.status}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-mono font-bold text-cyan-300 mb-6 tracking-wide">
                  HIGHLIGHTS
                </h3>
                <div className="space-y-3">
                  {experience.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 font-mono text-sm leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 詳細説明 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-mono font-bold text-cyan-300 mb-4 tracking-wide">
                DESCRIPTION
              </h3>
              <p className="text-gray-300 font-mono leading-relaxed text-sm">
                {experience.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {experience.tags.map((tag, index) => (
                  <span key={index} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'emotibers':
        return (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-mono font-bold text-cyan-300 mb-6 tracking-wide flex items-center">
              <Crown className="w-6 h-6 mr-3 text-yellow-400" />
              TOP EMOTIBERS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topEmotibers.map(emotiber => (
                <EmotiberCard key={emotiber.rank} emotiber={emotiber} />
              ))}
            </div>
            <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <div className="text-cyan-300 font-mono text-sm mb-2">💡 Emotiber System:</div>
              <p className="text-gray-400 font-mono text-xs leading-relaxed">
                Scores are calculated based on the quality and depth of emotional experiences, determining your ranking. The stronger your emotional responses, the higher you rank on the leaderboard.
              </p>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-mono font-bold text-cyan-300 mb-6 tracking-wide">
              EVENT HISTORY
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {experience.history.map((item, index) => (
                <HistoryItem key={index} item={item} />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative border-b border-cyan-500/20 bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center font-mono">
                <ArrowLeft className="w-5 h-5 mr-2" />
                BACK TO FEED
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-mono font-bold text-cyan-400 tracking-wider">
                  EXPERIENCE DETAIL
                </h1>
              </div>
            </div>
            
            <div className="text-cyan-300 font-mono text-sm">
              {currentTime.toLocaleString('en-US')}
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Video Section */}
        <div className="mb-8">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-cyan-500/30">
            <img 
              src={experience.thumbnail} 
              alt={experience.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-cyan-400/20 backdrop-blur-sm border-2 border-cyan-400/60 rounded-full p-6 hover:bg-cyan-400/30 hover:border-cyan-400/80 transition-all duration-300 group"
              >
                <Play className="w-12 h-12 text-cyan-400 fill-current group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-mono font-bold text-white mb-2 tracking-wide">
                    {experience.title}
                  </h2>
                  <p className="text-cyan-300 font-mono text-lg">
                    {experience.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/40 rounded-lg px-4 py-2 mb-2">
                    <div className="text-cyan-300 font-mono text-sm">Duration</div>
                    <div className="text-white font-mono text-lg font-bold">{experience.duration}</div>
                  </div>
                  <div className={`text-center py-1 px-3 rounded font-mono text-xs font-bold animate-pulse ${
                    experience.status === 'LIVE' ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-300'
                  }`}>
                    ● {experience.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: 'overview', name: 'OVERVIEW', icon: Heart },
            { id: 'emotibers', name: 'EMOTIBERS', icon: Crown },
            { id: 'history', name: 'HISTORY', icon: Calendar }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-mono font-bold text-sm rounded-lg transition-all duration-200 border ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black border-cyan-400 shadow-lg shadow-cyan-500/30' 
                  : 'bg-gray-800/50 text-cyan-300 hover:bg-gray-700/50 border-cyan-500/30 backdrop-blur-sm'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="tracking-wider">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EmoterrainEventDetail;
