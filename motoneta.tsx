<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emoterrain - 体験詳細画面</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #1f2937 0%, #000000 50%, #1f2937 100%);
            color: white;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        /* Animated background particles */
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(34, 211, 238, 0.2);
            border-radius: 50%;
            animation: float 4s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { 
                opacity: 0.2; 
                transform: translateY(0px); 
            }
            50% { 
                opacity: 0.8; 
                transform: translateY(-20px); 
            }
        }

        @keyframes pulse {
            0%, 100% { 
                opacity: 1; 
            }
            50% { 
                opacity: 0.5; 
            }
        }

        /* Header */
        .header {
            border-bottom: 1px solid rgba(34, 211, 238, 0.2);
            background: rgba(17, 24, 39, 0.8);
            backdrop-filter: blur(20px);
            position: relative;
            z-index: 1000;
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #22d3ee;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.9rem;
            transition: color 0.3s;
        }

        .back-btn:hover {
            color: #67e8f9;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #22d3ee, #3b82f6);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: bold;
            color: #22d3ee;
            letter-spacing: 0.1em;
        }

        .current-time {
            color: #67e8f9;
            font-size: 0.9rem;
        }

        /* Main content */
        .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }

        /* Title section */
        .title-section {
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
            border: 1px solid rgba(34, 211, 238, 0.2);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
            backdrop-filter: blur(10px);
        }

        .title-content {
            display: flex;
            align-items: end;
            justify-content: space-between;
            gap: 2rem;
        }

        .title-left h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            letter-spacing: 0.05em;
        }

        .title-left p {
            color: #67e8f9;
            font-size: 1.1rem;
        }

        .title-right {
            text-align: right;
            flex-shrink: 0;
        }

        .duration-card {
            background: rgba(34, 211, 238, 0.2);
            border: 1px solid rgba(34, 211, 238, 0.4);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.5rem;
            backdrop-filter: blur(10px);
        }

        .duration-card .label {
            color: #67e8f9;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }

        .duration-card .value {
            font-size: 1.1rem;
            font-weight: bold;
        }

        .status-badge {
            background: #ef4444;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            animation: pulse 2s infinite;
        }

        /* Tabs */
        .tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }

        .tab {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgba(31, 41, 55, 0.5);
            color: #67e8f9;
            border: 1px solid rgba(34, 211, 238, 0.3);
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: bold;
            letter-spacing: 0.1em;
            transition: all 0.2s;
            backdrop-filter: blur(10px);
        }

        .tab:hover {
            background: rgba(55, 65, 81, 0.5);
        }

        .tab.active {
            background: linear-gradient(to right, #22d3ee, #3b82f6);
            color: black;
            border-color: #22d3ee;
            box-shadow: 0 8px 25px rgba(34, 211, 238, 0.3);
        }

        /* Content sections */
        .content-section {
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
            border: 1px solid rgba(34, 211, 238, 0.2);
            border-radius: 1rem;
            padding: 2rem;
            backdrop-filter: blur(10px);
            margin-bottom: 2rem;
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: #67e8f9;
            margin-bottom: 1.5rem;
            letter-spacing: 0.05em;
        }

        /* Emotion meters */
        .emotion-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 1.5rem;
        }

        .emotion-meter {
            text-align: center;
        }

        .meter-circle {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
            position: relative;
        }

        .meter-circle.large {
            width: 96px;
            height: 96px;
        }

        .meter-bg, .meter-progress {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
        }

        .meter-bg {
            background: conic-gradient(from 0deg, rgba(55, 65, 81, 0.3) 0deg, transparent 360deg);
        }

        .meter-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .meter-icon {
            font-size: 1.5rem;
            margin-bottom: 0.25rem;
        }

        .meter-value {
            font-weight: bold;
            font-size: 0.9rem;
        }

        .meter-label {
            color: #d1d5db;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.1em;
        }

        /* Info grid */
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 0;
        }

        .info-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #9ca3af;
        }

        .info-value {
            color: #67e8f9;
            font-weight: bold;
        }

        /* Highlights */
        .highlights-list {
            list-style: none;
        }

        .highlights-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            line-height: 1.5;
        }

        .highlight-dot {
            width: 8px;
            height: 8px;
            background: #22d3ee;
            border-radius: 50%;
            margin-top: 0.5rem;
            flex-shrink: 0;
        }

        /* Description */
        .description {
            color: #d1d5db;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: rgba(34, 211, 238, 0.2);
            color: #67e8f9;
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            border: 1px solid rgba(34, 211, 238, 0.3);
            font-size: 0.75rem;
        }

        /* Emotibers */
        .emotibers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }

        .emotiber-card {
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
            border: 1px solid rgba(34, 211, 238, 0.3);
            border-radius: 12px;
            padding: 1rem;
            backdrop-filter: blur(10px);
            transition: border-color 0.3s;
        }

        .emotiber-card:hover {
            border-color: rgba(34, 211, 238, 0.5);
        }

        .emotiber-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }

        .emotiber-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .emotiber-avatar {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(139, 92, 246, 0.2));
            border: 1px solid rgba(34, 211, 238, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            position: relative;
        }

        .rank-icon {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
        }

        .emotiber-name {
            color: #67e8f9;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .emotiber-level {
            color: #9ca3af;
            font-size: 0.75rem;
        }

        .emotiber-rank {
            color: #22d3ee;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .badge {
            background: linear-gradient(to right, #fbbf24, #f59e0b);
            color: black;
            text-align: center;
            padding: 0.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.75rem;
            font-weight: bold;
        }

        .emotiber-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            font-size: 0.75rem;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .stat-label {
            color: #9ca3af;
        }

        /* History */
        .history-list {
            max-height: 400px;
            overflow-y: auto;
        }

        .history-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            background: rgba(31, 41, 55, 0.3);
            border: 1px solid rgba(34, 211, 238, 0.1);
            border-radius: 8px;
            margin-bottom: 0.75rem;
        }

        .history-date {
            color: #22d3ee;
            font-size: 0.75rem;
            font-weight: bold;
            min-width: 5rem;
        }

        .history-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .history-event {
            color: #d1d5db;
            font-size: 0.9rem;
        }

        .info-note {
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(34, 211, 238, 0.1);
            border: 1px solid rgba(34, 211, 238, 0.3);
            border-radius: 8px;
        }

        .info-note-title {
            color: #67e8f9;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .info-note-text {
            color: #9ca3af;
            font-size: 0.75rem;
            line-height: 1.5;
        }

        /* Hidden content */
        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .header-content {
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;
            }

            .title-content {
                flex-direction: column;
                align-items: flex-start;
            }

            .title-left h1 {
                font-size: 1.8rem;
            }

            .emotion-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .tabs {
                flex-wrap: wrap;
            }

            .main-content {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Background particles -->
    <div id="particles"></div>

    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="header-left">
                <button class="back-btn">
                    <i data-feather="arrow-left"></i>
                    BACK TO FEED
                </button>
                <div class="logo">
                    <div class="logo-icon">
                        <i data-feather="heart"></i>
                    </div>
                    <h1 class="logo-text">EXPERIENCE DETAIL</h1>
                </div>
            </div>
            <div class="current-time" id="currentTime"></div>
        </div>
    </header>

    <!-- Main content -->
    <div class="main-content">
        <!-- Title section -->
        <div class="title-section">
            <div class="title-content">
                <div class="title-left">
                    <h1>Awa Odori Festival Experience</h1>
                    <p>Traditional Japanese Dance Festival - 400 Years of Cultural Heritage</p>
                </div>
                <div class="title-right">
                    <div class="duration-card">
                        <div class="label">Duration</div>
                        <div class="value">3h 30m</div>
                    </div>
                    <div class="status-badge">● LIVE</div>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab active" data-tab="overview">
                <i data-feather="heart"></i>
                <span>OVERVIEW</span>
            </button>
            <button class="tab" data-tab="emotibers">
                <i data-feather="award"></i>
                <span>EMOTIBERS</span>
            </button>
            <button class="tab" data-tab="history">
                <i data-feather="calendar"></i>
                <span>HISTORY</span>
            </button>
        </div>

        <!-- Tab content -->
        <div id="overview" class="tab-content active">
            <!-- Emotion Analysis -->
            <div class="content-section">
                <h3 class="section-title">
                    <i data-feather="heart" style="color: #ec4899;"></i>
                    EMOTION ANALYSIS
                </h3>
                <div class="emotion-grid">
                    <div class="emotion-meter">
                        <div class="meter-circle large">
                            <div class="meter-content">
                                <div class="meter-icon">🔥</div>
                                <div class="meter-value" style="color: #f59e0b;">96%</div>
                            </div>
                        </div>
                        <div class="meter-label">EXCITEMENT</div>
                    </div>
                    <div class="emotion-meter">
                        <div class="meter-circle">
                            <div class="meter-content">
                                <div class="meter-icon">🤝</div>
                                <div class="meter-value" style="color: #8b5cf6;">91%</div>
                            </div>
                        </div>
                        <div class="meter-label">UNITY</div>
                    </div>
                    <div class="emotion-meter">
                        <div class="meter-circle">
                            <div class="meter-content">
                                <div class="meter-icon">🏮</div>
                                <div class="meter-value" style="color: #10b981;">88%</div>
                            </div>
                        </div>
                        <div class="meter-label">TRADITION</div>
                    </div>
                </div>
            </div>

            <!-- Info and Highlights -->
            <div class="info-grid">
                <div class="content-section">
                    <h3 class="section-title">EXPERIENCE INFO</h3>
                    <div class="info-item">
                        <span class="info-label">
                            <i data-feather="map-pin"></i>
                            Location:
                        </span>
                        <span class="info-value">🇯🇵 Tokushima City Center</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">
                            <i data-feather="users"></i>
                            Participants:
                        </span>
                        <span class="info-value">8,450</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">
                            <i data-feather="calendar"></i>
                            Duration:
                        </span>
                        <span class="info-value">3h 30m</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value" style="color: #10b981;">LIVE</span>
                    </div>
                </div>

                <div class="content-section">
                    <h3 class="section-title">HIGHLIGHTS</h3>
                    <ul class="highlights-list">
                        <li>
                            <div class="highlight-dot"></div>
                            <span>Experience 400-year-old traditional performing arts up close</span>
                        </li>
                        <li>
                            <div class="highlight-dot"></div>
                            <span>Powerful performances by famous Ren (dance groups)</span>
                        </li>
                        <li>
                            <div class="highlight-dot"></div>
                            <span>Interactive dance experience for audience participation</span>
                        </li>
                        <li>
                            <div class="highlight-dot"></div>
                            <span>Live performances of traditional musical instruments</span>
                        </li>
                        <li>
                            <div class="highlight-dot"></div>
                            <span>Rich variety of local Tokushima gourmet food stalls</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Description -->
            <div class="content-section">
                <h3 class="section-title">DESCRIPTION</h3>
                <p class="description">
                    Experience the enchanting world of Awa Odori, one of Japan's three great traditional Bon festivals that colors Tokushima's summer. Following the spirit of "Fools who dance and fools who watch, if both are fools, you might as well dance!", spectators can join the dancing circle alongside performers. Enjoy the spectacular sight of colorfully dressed yukata-clad dancers parading through the streets, accompanied by live traditional instruments including taiko drums, shamisen, and flutes.
                </p>
                <div class="tags">
                    <span class="tag">Traditional Dance</span>
                    <span class="tag">Japanese Culture</span>
                    <span class="tag">Festival</span>
                    <span class="tag">Community</span>
                    <span class="tag">Heritage</span>
                </div>
            </div>
        </div>

        <div id="emotibers" class="tab-content">
            <div class="content-section">
                <h3 class="section-title">
                    <i data-feather="crown" style="color: #fbbf24;"></i>
                    TOP EMOTIBERS
                </h3>
                <div class="emotibers-grid">
                    <div class="emotiber-card">
                        <div class="emotiber-header">
                            <div class="emotiber-info">
                                <div class="emotiber-avatar">
                                    🏮
                                    <i data-feather="crown" class="rank-icon" style="color: #fbbf24;"></i>
                                </div>
                                <div>
                                    <div class="emotiber-name">AwaOdoriKing</div>
                                    <div class="emotiber-level">Level 25</div>
                                </div>
                            </div>
                            <div class="emotiber-rank">#1</div>
                        </div>
                        <div class="badge">LEGEND</div>
                        <div class="emotiber-stats">
                            <div class="stat">
                                <div class="stat-value" style="color: #22d3ee;">9,847</div>
                                <div class="stat-label">SCORE</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #8b5cf6;">142</div>
                                <div class="stat-label">EXP</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #10b981;">EXCITEMENT</div>
                                <div class="stat-label">PRIMARY</div>
                            </div>
                        </div>
                    </div>

                    <div class="emotiber-card">
                        <div class="emotiber-header">
                            <div class="emotiber-info">
                                <div class="emotiber-avatar">
                                    🥁
                                    <i data-feather="award" class="rank-icon" style="color: #d1d5db;"></i>
                                </div>
                                <div>
                                    <div class="emotiber-name">TokushimaSoul</div>
                                    <div class="emotiber-level">Level 23</div>
                                </div>
                            </div>
                            <div class="emotiber-rank">#2</div>
                        </div>
                        <div class="badge" style="background: linear-gradient(to right, #8b5cf6, #ec4899);">MASTER</div>
                        <div class="emotiber-stats">
                            <div class="stat">
                                <div class="stat-value" style="color: #22d3ee;">9,123</div>
                                <div class="stat-label">SCORE</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #8b5cf6;">98</div>
                                <div class="stat-label">EXP</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #10b981;">UNITY</div>
                                <div class="stat-label">PRIMARY</div>
                            </div>
                        </div>
                    </div>

                    <div class="emotiber-card">
                        <div class="emotiber-header">
                            <div class="emotiber-info">
                                <div class="emotiber-avatar">
                                    💃
                                    <i data-feather="award" class="rank-icon" style="color: #f97316;"></i>
                                </div>
                                <div>
                                    <div class="emotiber-name">DanceSpirit</div>
                                    <div class="emotiber-level">Level 21</div>
                                </div>
                            </div>
                            <div class="emotiber-rank">#3</div>
                        </div>
                        <div class="badge" style="background: linear-gradient(to right, #3b82f6, #06b6d4);">EXPERT</div>
                        <div class="emotiber-stats">
                            <div class="stat">
                                <div class="stat-value" style="color: #22d3ee;">8,654</div>
                                <div class="stat-label">SCORE</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #8b5cf6;">87</div>
                                <div class="stat-label">EXP</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" style="color: #10b981;">TRADITION</div>
                                <div class="stat-label">PRIMARY</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="info-note">
                    <div class="info-note-title">💡 Emotiber System:</div>
                    <p class="info-note-text">
                        Scores are calculated based on the quality and depth of emotional experiences, determining the rankings. Higher emotional responses lead to higher rankings.
                    </p>
                </div>
            </div>
        </div>

        <div id="history" class="tab-content">
            <div class="content-section">
                <h3 class="section-title">EVENT HISTORY</h3>
                <div class="history-list">
                    <div class="history-item">
                        <div class="history-date">2024-11-01</div>
                        <div class="history-dot" style="background: #3b82f6;"></div>
                        <div class="history-event">Partnership with Awa Odori Ren established</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2024-12-15</div>
                        <div class="history-dot" style="background: #3b82f6;"></div>
                        <div class="history-event">Event planning officially approved</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2025-01-10</div>
                        <div class="history-dot" style="background: #10b981;"></div>
                        <div class="history-event">Participant registration opened</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2025-02-20</div>
                        <div class="history-dot" style="background: #fbbf24;"></div>
                        <div class="history-event">Capacity reached - registration closed</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2025-03-01</div>
                        <div class="history-dot" style="background: #8b5cf6;"></div>
                        <div class="history-event">Pre-festival practice sessions held</div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">2025-03-15</div>
                        <div class="history-dot" style="background: #ef4444;"></div>
                        <div class="history-event">Festival commenced</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Initialize Feather icons
        feather.replace();

        // Update current time
        function updateTime() {
            const now = new Date();
            document.getElementById('currentTime').textContent = now.toLocaleString('en-US');
        }
        updateTime();
        setInterval(updateTime, 1000);

        // Generate background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.animationDuration = (2 + Math.random() * 6) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        createParticles();

        // Tab functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Smooth scroll for back button
        document.querySelector('.back-btn').addEventListener('click', () => {
            // In a real app, this would navigate back
            console.log('Navigating back to feed...');
        });

        // Add hover effects to cards
        document.querySelectorAll('.emotiber-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 8px 25px rgba(34, 211, 238, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });

        // Animate emotion meters on scroll
        function animateMeters() {
            const meters = document.querySelectorAll('.meter-circle');
            meters.forEach(meter => {
                const rect = meter.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    meter.style.opacity = '1';
                    meter.style.transform = 'scale(1)';
                }
            });
        }

        window.addEventListener('scroll', animateMeters);
        animateMeters(); // Initial call
    </script>
</body>
</html>