"use client"
import { useState, useEffect, useCallback, useMemo } from "react";
import { Play, Share2, MessageCircle, Facebook, Twitter, Instagram, Copy, Check, Clock, Eye, X, Menu } from "lucide-react";

// Move constants outside component to prevent re-renders
const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;


const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});
  const [showVideoList, setShowVideoList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized fetch function to prevent unnecessary re-creations
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setVideos(data.items);
        setSelectedVideo(data.items[0]);
      } else {
        setError("No videos found.");
      }
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setError("Unable to load videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Memoized video URL to prevent recalculation
  const selectedVideoUrl = useMemo(() => {
    if (!selectedVideo) return '';
    return `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`;
  }, [selectedVideo]);

  // Enhanced sharing functions
  const shareToWhatsApp = useCallback((url, title) => {
    const text = encodeURIComponent(`Check out this video: ${title}\n${url}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    
    // Try to open WhatsApp app, fallback to web
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(`whatsapp://send?text=${text}`, '_blank');
      // Fallback after 2 seconds if app doesn't open
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);
    } else {
      window.open(whatsappUrl, '_blank');
    }
  }, []);

  const shareToFacebook = useCallback((url) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  }, []);

  const shareToTwitter = useCallback((url, title) => {
    const text = encodeURIComponent(`Check out: ${title}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    
    // Try to open Twitter app on mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`twitter://post?message=${text} ${encodeURIComponent(url)}`, '_blank');
      setTimeout(() => {
        window.open(twitterUrl, '_blank');
      }, 1500);
    } else {
      window.open(twitterUrl, '_blank', 'width=600,height=400');
    }
  }, []);

  const shareToInstagram = useCallback(() => {
    // Instagram doesn't allow direct link sharing, so we copy the link
    copyToClipboard(selectedVideoUrl, 'instagram');
    alert('Link copied! Open Instagram and paste the link in your story or post.');
  }, [selectedVideoUrl]);

  const copyToClipboard = useCallback(async (text, platform = 'general') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [platform]: true }));
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [platform]: false }));
      }, 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopiedStates(prev => ({ ...prev, [platform]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [platform]: false }));
      }, 3000);
    }
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const truncateText = useCallback((text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }, []);

  const handleVideoSelect = useCallback((video) => {
    setSelectedVideo(video);
    setShowShareMenu(false);
    if (isMobile) {
      setShowVideoList(false);
    }
  }, [isMobile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-black mb-2">Unable to Load Videos</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchVideos}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 lg:mb-4 tracking-tight">
            Latest Videos
          </h1>
        </div>

        {/* Mobile Video List Toggle */}
        {isMobile && (
          <div className="mb-6">
            <button
              onClick={() => setShowVideoList(!showVideoList)}
              className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <span className="font-semibold text-black">Browse Videos</span>
              <Menu className="w-5 h-5 text-black" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo && (
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-t-2xl lg:rounded-t-3xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title={selectedVideo.snippet.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* Video Info */}
                <div className="p-4 lg:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4 lg:mb-6">
                    <div className="flex-1">
                      <h2 className="text-xl lg:text-3xl font-bold text-black mb-2 lg:mb-3 leading-tight">
                        {selectedVideo.snippet.title}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-500 mb-2 lg:mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatDate(selectedVideo.snippet.publishedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Share Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 lg:p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors group"
                      >
                        <Share2 className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Share Menu */}
                      {showShareMenu && (
  <div
    className="absolute top-12 right-4 z-50 bg-white shadow-xl rounded-xl p-2 flex gap-3"
    onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
  >
    <button
      onClick={() => shareToFacebook(selectedVideoUrl)}
      className="hover:bg-gray-100 p-2 rounded-lg"
      aria-label="Share to Facebook"
    >
      <Facebook className="w-5 h-5 text-blue-600" />
    </button>

    <button
      onClick={() => shareToTwitter(selectedVideoUrl, selectedVideo.snippet.title)}
      className="hover:bg-gray-100 p-2 rounded-lg"
      aria-label="Share to Twitter"
    >
      <Twitter className="w-5 h-5 text-sky-500" />
    </button>

    <button
      onClick={() => shareToWhatsApp(selectedVideoUrl, selectedVideo.snippet.title)}
      className="hover:bg-gray-100 p-2 rounded-lg"
      aria-label="Share to WhatsApp"
    >
      <MessageCircle className="w-5 h-5 text-green-600" />
    </button>

    <button
      onClick={() => shareToInstagram()}
      className="hover:bg-gray-100 p-2 rounded-lg"
      aria-label="Share to Instagram"
    >
      <Instagram className="w-5 h-5 text-pink-500" />
    </button>

    <button
      onClick={() => copyToClipboard(selectedVideoUrl)}
      className="hover:bg-gray-100 p-2 rounded-lg"
      aria-label="Copy link"
    >
      {copiedStates.general ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <Copy className="w-5 h-5 text-gray-600" />
      )}
    </button>
  </div>
)}


                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {selectedVideo.snippet.description || 'No description available.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Video List - Desktop */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-6">
                <h3 className="text-2xl font-bold text-black mb-6">Recent Videos</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {videos.map((video) => (
                    <div
                      key={video.id.videoId}
                      onClick={() => handleVideoSelect(video)}
                      className={`group cursor-pointer p-4 rounded-2xl transition-all duration-300 ${
                        selectedVideo?.id.videoId === video.id.videoId
                          ? 'bg-black text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="w-20 h-14 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-5 h-5 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm mb-1 line-clamp-2 leading-tight ${
                            selectedVideo?.id.videoId === video.id.videoId ? 'text-white' : 'text-black'
                          }`}>
                            {truncateText(video.snippet.title, 60)}
                          </h4>
                          <p className={`text-xs ${
                            selectedVideo?.id.videoId === video.id.videoId ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {formatDate(video.snippet.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Video List Modal */}
        {isMobile && showVideoList && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="bg-white w-full max-h-[70vh] rounded-t-3xl overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">Recent Videos</h3>
                <button
                  onClick={() => setShowVideoList(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
                <div className="p-4 space-y-3">
                  {videos.map((video) => (
                    <div
                      key={video.id.videoId}
                      onClick={() => handleVideoSelect(video)}
                      className={`group cursor-pointer p-4 rounded-2xl transition-all duration-300 ${
                        selectedVideo?.id.videoId === video.id.videoId
                          ? 'bg-black text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="w-24 h-16 object-cover rounded-lg"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-6 h-6 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm mb-2 leading-tight ${
                            selectedVideo?.id.videoId === video.id.videoId ? 'text-white' : 'text-black'
                          }`}>
                            {video.snippet.title}
                          </h4>
                          <p className={`text-xs ${
                            selectedVideo?.id.videoId === video.id.videoId ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {formatDate(video.snippet.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close share menu */}
        {showShareMenu && !isMobile && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          />
        )}
      </div>
    </div>
  );
};

export default YouTubeVideos;