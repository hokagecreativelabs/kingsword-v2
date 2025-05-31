"use client"
import { useEffect, useState } from "react";
import { Play, Share2, ExternalLink, Calendar, Eye, Clock } from "lucide-react";

const YTPage = () => {
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeShare, setActiveShare] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
  const CHANNEL_ID = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;
  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12`
        );
        if (!response.ok) throw new Error("Failed to fetch videos");

        const data = await response.json();
        setVideos(data.items);
        setFeaturedVideo(data.items[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const generateShareLink = (platform, videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    switch (platform) {
      case "whatsapp":
        return `https://wa.me/?text=${encodeURIComponent(videoUrl)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
      default:
        return "#";
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading some amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-black text-6xl mb-4">⚠️</div>
          <p className="text-gray-900 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Watch Our
                  <span className="block text-white border-b-4 border-white inline-block">
                    Latest Services
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Experience powerful worship, inspiring messages, and life-changing moments. 
                  Never miss a service with our complete video library.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border-2 border-white"
                >
                  <Play className="w-5 h-5" />
                  Subscribe Now
                </a>
                <a
                  href="https://kingswordcalgary.pic-time.com/portfolio"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-none font-bold transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Photo Gallery
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-none overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {featuredVideo && (
                  <iframe
                    src={`https://www.youtube.com/embed/${featuredVideo.id.videoId}?autoplay=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={featuredVideo.snippet.title}
                  />
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full opacity-10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Details */}
      {featuredVideo && (
        <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
          <div className="bg-white rounded-none shadow-2xl p-8 border-4 border-black">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-black mb-3 uppercase tracking-wide">
                  {featuredVideo.snippet.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {truncateText(featuredVideo.snippet.description, 200)}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredVideo.snippet.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setActiveShare(activeShare === featuredVideo.id.videoId ? null : featuredVideo.id.videoId)}
                  className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-none transition-all duration-300 flex items-center gap-2 border-2 border-black font-bold uppercase tracking-wide"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                
                {activeShare === featuredVideo.id.videoId && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-none shadow-2xl border-2 border-black p-4 z-50 min-w-48">
                    <div className="space-y-2">
                      <a
                        href={generateShareLink("whatsapp", featuredVideo.id.videoId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={generateShareLink("facebook", featuredVideo.id.videoId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                      >
                        Facebook
                      </a>
                      <a
                        href={generateShareLink("twitter", featuredVideo.id.videoId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4 uppercase tracking-wide">Recent Messages</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Catch up on the latest teachings and worship experiences from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos
            .filter((v) => v.id.videoId !== featuredVideo?.id.videoId)
            .map((video, index) => (
              <div
                key={video.id.videoId}
                className="group bg-white rounded-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-black hover:border-gray-600"
              >
                <div className="relative aspect-video overflow-hidden border-b-2 border-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    frameBorder="0"
                    allowFullScreen
                    title={video.snippet.title}
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black mb-3 group-hover:text-gray-700 transition-colors line-clamp-2 uppercase tracking-wide">
                    {truncateText(video.snippet.title, 80)}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </div>
                    
                    <button
                      onClick={() => setActiveShare(activeShare === video.id.videoId ? null : video.id.videoId)}
                      className="p-2 hover:bg-gray-100 rounded-none transition-colors relative border border-black"
                    >
                      <Share2 className="w-4 h-4" />
                      
                      {activeShare === video.id.videoId && (
                        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-none shadow-2xl border-2 border-black p-3 z-50 min-w-40">
                          <div className="space-y-1">
                            <a
                              href={generateShareLink("whatsapp", video.id.videoId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-xs text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                            >
                              WhatsApp
                            </a>
                            <a
                              href={generateShareLink("facebook", video.id.videoId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-xs text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                            >
                              Facebook
                            </a>
                            <a
                              href={generateShareLink("twitter", video.id.videoId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-xs text-black hover:bg-gray-100 rounded-none transition-colors font-medium"
                            >
                              Twitter
                            </a>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white border-t-4 border-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-wide">Never Miss a Service</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Subscribe to our channel and get notified whenever we upload new content. 
            Join our growing community of believers!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-none font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white uppercase tracking-wide"
            >
              <Play className="w-5 h-5" />
              Subscribe & Ring the Bell
            </a>
            <a
              href="https://kingswordcalgary.pic-time.com/portfolio"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-none font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <ExternalLink className="w-5 h-5" />
              Explore Photo Gallery
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YTPage;