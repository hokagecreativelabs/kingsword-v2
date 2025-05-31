"use client"
import { useState, useEffect } from 'react';

const VolunteerForm = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    team: ''
  });

  // Fix hydration error by only rendering random elements on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !selectedTeam) {
      setErrorMessage("Please fill in all required fields and select a team.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage("Thank you for volunteering! We will reach out to you shortly.");
      setErrorMessage("");
      // Reset form
      setFormData({ name: '', email: '', phone: '', team: '' });
      setSelectedTeam('');
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit the form. Please try again.");
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const teams = [
    { value: "Choir", icon: "🎵" },
    { value: "Ushering", icon: "🚪" },
    { value: "Protocol", icon: "📋" },
    { value: "Communications", icon: "📢" },
    { value: "Media", icon: "🎥" },
    { value: "Hospitality", icon: "☕" },
    { value: "Prayer", icon: "🙏" },
    { value: "Admin", icon: "💼" },
    { value: "Facility", icon: "🏢" },
    { value: "Children's Ministry", icon: "👶" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-black to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-white to-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-gray-200 to-white rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-12 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles - Only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float 6s ease-in-out infinite alternate`
              }}
            ></div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(360deg); }
        }
      `}</style>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Content */}
            <div className="text-white space-y-8 lg:pr-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Volunteer
                  <span className="block bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">
                    With Us
                  </span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  1 Peter 4:10 - As each one has received a gift, minister it to one another, as good stewards of the manifold grace of God.
                </p>
                <p className="text-lg text-gray-300">
                  Join our church community and share your talents to help us grow together. Whether you're drawn to teaching children, organizing events, or leading worship, there's a place for you here.
                </p>
              </div>

              {/* Stats or Features */}
              <div className="grid grid-cols-3 gap-4">
                {/* <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Active Volunteers</div>
                </div> */}
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-300">Ministry Teams</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-300">Community Impact</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              {/* Glass Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Get Started Today</h2>
                  <p className="text-gray-200">Fill out the form below and we'll connect you with the perfect team.</p>
                </div>

                <div className="space-y-6">
                      {/* Success/Error Messages */}
                      {successMessage && (
                        <div className="p-4 bg-white/20 border border-white/40 rounded-xl text-black text-sm backdrop-blur-sm">
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div className="p-4 bg-black/60 border border-gray-500 rounded-xl text-white text-sm backdrop-blur-sm">
                          {errorMessage}
                        </div>
                      )}

                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-white font-medium">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-white font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-white font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      {/* Team Selection */}
                      <div className="space-y-3">
                        <label className="block text-white font-medium">
                          Choose Your Ministry Team
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {teams.map((team) => (
                            <button
                              key={team.value}
                              type="button"
                              onClick={() => {
                                setSelectedTeam(team.value);
                                setFormData(prev => ({ ...prev, team: team.value }));
                              }}
                              className={`p-3 rounded-xl border transition-all duration-300 text-left hover:scale-105 ${
                                selectedTeam === team.value
                                  ? 'bg-white/30 border-white text-black font-medium'
                                  : 'bg-white/5 border-white/30 text-gray-200 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{team.icon}</span>
                                <span className="text-sm font-medium">{team.value}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                        {!selectedTeam && <div className="text-gray-300 text-sm">Please select a team</div>}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg border border-white/20"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          'Join Our Mission'
                        )}
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;