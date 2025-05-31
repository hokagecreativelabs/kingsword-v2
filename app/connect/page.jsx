"use client"
import { useState, useEffect } from 'react';

const groups = [
    { title: 'Small Groups', imageUrl: '/assets/conn1.webp', buttonText: 'Join now', link: '/small-groups' },
    { title: 'Service Teams', imageUrl: '/assets/conn2.webp', buttonText: 'Join now', link: '/service-teams' },
    { title: "Children's Ministry", imageUrl: '/assets/children.webp', buttonText: 'Get Involved', link: '/childrens-ministry' },
    { title: 'KMI Partners', imageUrl: '/assets/conn4.webp', buttonText: 'Get Involved', link: '/kmi-partners' },
    { title: "Men's Group", imageUrl: '/assets/conn5.webp', buttonText: 'Join now', link: '/mens-group' },
    { title: "Women's Group", imageUrl: '/assets/women.png', buttonText: 'Join now', link: '/womens-group' },
    { title: 'His & Hers', imageUrl: '/assets/conn7.webp', buttonText: 'More Details', link: '/his-hers' },
    { title: 'Mr. & Mrs.', imageUrl: '/assets/conn8.webp', buttonText: 'More Details', link: '/mr-mrs' },
    { title: 'Career Advocacy Network - CAN', imageUrl: '/assets/career.webp', buttonText: 'More Details', link: '/career-advocacy-network' },
    { title: 'Business Advocacy Network', imageUrl: '/assets/business.webp', buttonText: 'More Details', link: '/business-advocacy-network' },
    { title: 'Marriage Advocacy Network', imageUrl: '/assets/marriage.webp', buttonText: 'More Details', link: '/marriage-advocacy-network' },
    { title: 'Mental and Total Wholeness', imageUrl: '/assets/wholeness.png', buttonText: 'More Details', link: '/mental-total-wholeness' }
];

const ConnectPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formSuccess, setFormSuccess] = useState(null);
    const [isSubmittingGroupForm, setIsSubmittingGroupForm] = useState(false);
    const [isSubmittingMainForm, setIsSubmittingMainForm] = useState(false);
    const [mainFormData, setMainFormData] = useState({ name: '', email: '', details: '' });
    const [groupFormData, setGroupFormData] = useState({ name: '', email: '', phone: '' });

    const openModal = (group) => {
        setSelectedGroup(group);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedGroup(null);
        setGroupFormData({ name: '', email: '', phone: '' });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    const handleGroupFormSubmit = () => {
        setIsSubmittingGroupForm(true);
        setTimeout(() => {
            alert(`Thank you for joining ${selectedGroup.title}! We will be in touch shortly.`);
            closeModal();
            setIsSubmittingGroupForm(false);
        }, 1500);
    };

    const handleMainFormSubmit = () => {
        setIsSubmittingMainForm(true);
        setTimeout(() => {
            setFormSuccess("Thank you for your submission, we will reach out to you shortly.");
            setMainFormData({ name: '', email: '', details: '' });
            setIsSubmittingMainForm(false);
        }, 1500);
    };

    const handleMainFormChange = (e) => {
        setMainFormData({ ...mainFormData, [e.target.name]: e.target.value });
    };

    const handleGroupFormChange = (e) => {
        setGroupFormData({ ...groupFormData, [e.target.name]: e.target.value });
    };

    const SkeletonLoader = ({ className }) => (
        <div className={`animate-pulse bg-gray-300 ${className}`}></div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-black">
                {/* Animated Particles */}
                {/* <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 bg-white rounded-full opacity-60 animate-bounce particle-${i}`}
                        ></div>
                    ))}
                    <style jsx>{`
                        .particle-0 { left: 10%; top: 20%; animation-delay: 0s; animation-duration: 3s; }
                        .particle-1 { left: 25%; top: 60%; animation-delay: 0.5s; animation-duration: 2.5s; }
                        .particle-2 { left: 40%; top: 15%; animation-delay: 1s; animation-duration: 4s; }
                        .particle-3 { left: 60%; top: 40%; animation-delay: 1.5s; animation-duration: 3.5s; }
                        .particle-4 { left: 80%; top: 25%; animation-delay: 2s; animation-duration: 2s; }
                        .particle-5 { left: 15%; top: 70%; animation-delay: 0.3s; animation-duration: 3.2s; }
                        .particle-6 { left: 35%; top: 80%; animation-delay: 0.8s; animation-duration: 2.8s; }
                        .particle-7 { left: 55%; top: 10%; animation-delay: 1.3s; animation-duration: 4.2s; }
                        .particle-8 { left: 75%; top: 65%; animation-delay: 1.8s; animation-duration: 2.3s; }
                        .particle-9 { left: 90%; top: 45%; animation-delay: 2.3s; animation-duration: 3.8s; }
                        .particle-10 { left: 5%; top: 35%; animation-delay: 0.2s; animation-duration: 3.5s; }
                        .particle-11 { left: 45%; top: 85%; animation-delay: 0.7s; animation-duration: 2.7s; }
                        .particle-12 { left: 65%; top: 5%; animation-delay: 1.2s; animation-duration: 4.5s; }
                        .particle-13 { left: 85%; top: 75%; animation-delay: 1.7s; animation-duration: 2.2s; }
                        .particle-14 { left: 30%; top: 50%; animation-delay: 2.2s; animation-duration: 3.3s; }
                    `}</style>
                </div> */}

                <div className="relative px-6 py-32 text-center">
                    {isLoading ? (
                        <SkeletonLoader className="mx-auto w-96 h-16 rounded-lg" />
                    ) : (
                        <>
                            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                                Connect
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                                Join our vibrant community and find your place to grow, serve, and connect with others
                            </p>
                            <div className="mt-8 animate-bounce">
                                <div className="w-6 h-10 border-2 border-white rounded-full mx-auto">
                                    <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Groups Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-black mb-4">
                        Find Your Community
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover meaningful connections through our diverse range of ministries and groups
                    </p>
                </div>

                {/* Responsive Grid: 2 columns on tablet, 3+ on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groups.map((group, index) => (
                        <div
                            key={group.title}
                            className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-black"
                        >
                            {isLoading ? (
                                <div className="p-6">
                                    <SkeletonLoader className="w-full h-48 rounded-xl mb-4" />
                                    <SkeletonLoader className="w-3/4 h-6 rounded mb-2" />
                                    <SkeletonLoader className="w-1/2 h-10 rounded-lg" />
                                </div>
                            ) : (
                                <>
                                    {/* Black overlay on hover */}
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                                    
                                    {/* Content */}
                                    <div className="relative z-20">
                                        <div className="h-48 flex items-center justify-center p-6 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                                            <img
                                                src={group.imageUrl}
                                                alt={group.title}
                                                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        
                                        <div className="p-6">
                                            <h3 className="font-bold text-xl text-gray-800 group-hover:text-black transition-colors duration-300 mb-4">
                                                {group.title}
                                            </h3>
                                            <button
                                                onClick={() => openModal(group)}
                                                className="w-full py-3 px-6 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                {group.buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedGroup && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform scale-100 transition-transform duration-300 border-2 border-gray-200">
                        <div className="h-2 bg-black rounded-t-2xl"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-black mb-6">
                                Join {selectedGroup.title}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={groupFormData.name}
                                        onChange={handleGroupFormChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={groupFormData.email}
                                        onChange={handleGroupFormChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={groupFormData.phone}
                                        onChange={handleGroupFormChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button 
                                        onClick={closeModal} 
                                        className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-300"
                                        disabled={isSubmittingGroupForm}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleGroupFormSubmit}
                                        disabled={isSubmittingGroupForm}
                                        className={`flex-1 py-3 px-6 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${isSubmittingGroupForm ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
                                    >
                                        {isSubmittingGroupForm ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Submitting...
                                            </div>
                                        ) : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Contact Form */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
                            <div className="bg-black p-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Let's Connect
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    Need someone to pray with you, have a Bible question, or need to meet and talk?
                                </p>
                            </div>
                            
                            <div className="p-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={mainFormData.name}
                                            onChange={handleMainFormChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={mainFormData.email}
                                            onChange={handleMainFormChange}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Additional Details</label>
                                        <textarea
                                            name="details"
                                            value={mainFormData.details}
                                            onChange={handleMainFormChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors duration-300 resize-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleMainFormSubmit}
                                        disabled={isSubmittingMainForm}
                                        className={`w-full py-4 px-8 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isSubmittingMainForm ? 'opacity-50 cursor-not-allowed transform-none' : ''}`}
                                    >
                                        {isSubmittingMainForm ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                                Submitting...
                                            </div>
                                        ) : 'Send Message'}
                                    </button>
                                </div>
                                
                                {formSuccess && (
                                    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-xl">
                                        <p className="text-gray-800 font-semibold text-center">{formSuccess}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectPage;