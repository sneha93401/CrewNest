'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Briefcase, MessageCircle, Phone, Building, Calendar, Check, GraduationCap, Heart } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '@/../convex/_generated/api';

interface FormData {
  age: string;
  contact: string;
  profession: string;
  organization: string;
  bio: string;
}

interface Step {
  id: keyof FormData | 'welcome' | 'complete';
  question: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'welcome' | 'complete';
  options?: string[];
  icon: React.ReactNode;
  validation?: (value: string) => string | null;
}

export default function UserDetailsForm() {
  const router = useRouter();
  const user = useQuery(api.users.current);
  const createProfile = useMutation(api.profiles.createProfile);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    contact: '',
    profession: '',
    organization: '',
    bio: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  // Get user's name from the signup/signin
  const userName = user?.name || 'there';

  const getOrganizationQuestion = () => {
    switch (formData.profession) {
      case 'Student':
        return "Which college or institute are you studying at? 🎓";
      case 'Developer':
      case 'Professional':
        return "Which company do you work for? 🏢";
      case 'Freelancer':
        return "What's your freelancing specialty or main service? 💼";
      default:
        return "Where do you work or study? 🏢";
    }
  };

  const getOrganizationPlaceholder = () => {
    switch (formData.profession) {
      case 'Student':
        return "e.g., MIT, Stanford University, Local College";
      case 'Developer':
      case 'Professional':
        return "e.g., Google, Microsoft, Startup Inc.";
      case 'Freelancer':
        return "e.g., Web Development, Graphic Design, Consulting";
      default:
        return "Enter your organization";
    }
  };

  const steps: Step[] = [
    {
      id: 'welcome',
      question: `Hey ${userName}! 🎉 Let's start to complete your profile`,
      type: 'welcome',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 'age',
      question: "How old are you? We need to verify you're 18 or older",
      placeholder: "Enter your age",
      type: 'number',
      icon: <Calendar className="w-5 h-5" />,
      validation: (value: string) => {
        const age = parseInt(value);
        if (isNaN(age) || age < 1) return "Please enter a valid age";
        if (age < 18) return "You can't access our workspace. You must be 18 or older.";
        return null;
      }
    },
    {
      id: 'contact',
      question: "What's your contact number? 📱",
      placeholder: "Enter your 10-digit phone number",
      type: 'text',
      icon: <Phone className="w-5 h-5" />,
      validation: (value: string) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) return "Please enter exactly 10 digits only";
        return null;
      }
    },
    {
      id: 'profession',
      question: "What best describes you? Choose your path! ✨",
      type: 'select',
      options: ['Student', 'Developer', 'Professional', 'Freelancer'],
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 'organization',
      question: getOrganizationQuestion(),
      placeholder: getOrganizationPlaceholder(),
      type: 'text',
      icon: formData.profession === 'Student' ? <GraduationCap className="w-5 h-5" /> : <Building className="w-5 h-5" />
    },
    {
      id: 'bio',
      question: "Tell us about yourself! What makes you awesome? 🌟",
      placeholder: "Share your story, interests, goals, or anything you'd like your team to know...",
      type: 'textarea',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: 'complete',
      question: "Thanks for completing your profile! 🎉 We really appreciate you giving your valuable time to us. Welcome to our amazing workspace! 🚀",
      type: 'complete',
      icon: <Heart className="w-5 h-5 text-red-500" />
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = currentStep === 0 ? 0 : ((currentStep) / (steps.length - 1)) * 100;

  // Typing animation when going forward
  useEffect(() => {
    if (isGoingBack) return;

    setIsTyping(true);
    setIsAnimating(true);
    setIsTypingComplete(false);
    setDisplayedText('');
    setShowInputs(false);

    const fullText = currentStepData.question;
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 50);
      } else {
        setIsTypingComplete(true);
        setIsTyping(false);
        setIsAnimating(false);
        setTimeout(() => {
          setShowInputs(true);
        }, 200);
      }
    };

    const startDelay = setTimeout(typeWriter, 300);
    return () => clearTimeout(startDelay);
  }, [currentStepData.question]);

  // Immediate display when going back
  useEffect(() => {
    if (!isGoingBack) return;

    setDisplayedText(currentStepData.question);
    setIsTypingComplete(true);
    setIsTyping(false);
    setIsAnimating(false);
    setShowInputs(true);
    setIsGoingBack(false);
  }, [isGoingBack, currentStepData.question]);

  const handleInputChange = (value: string) => {
    setError('');
    setFormData(prev => ({
      ...prev,
      [currentStepData.id]: value
    }));
  };

  const validateCurrentStep = (): boolean => {
    if (currentStepData.validation) {
      const validationError = currentStepData.validation(formData[currentStepData.id as keyof FormData]);
      if (validationError) {
        setError(validationError);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (currentStep < steps.length - 2) {
      if (!validateCurrentStep()) return;
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === steps.length - 2) {
      handleSubmit();
    } else {
      // Final completion step
      router.push('/');
    }
  };

  const handleSubmit = async () => {
    if (!user?._id) {
      alert('User not found!');
      return;
    }

    setIsSubmitting(true);
    try {
      await createProfile({
        userId: user._id,
        name: user.name || '',
        age: formData.age,
        contact: formData.contact,
        bio: formData.bio,
        company: formData.organization,
      });

      setCurrentStep(steps.length - 1); // Move to completion step
    } catch (err) {
      console.error('Profile creation error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 0 || currentStep === steps.length - 1) return true;
    const value = formData[currentStepData.id as keyof FormData];
    return value && value.trim().length > 0;
  };

  if (!user) {
    return <div className="text-center py-10">Loading profile-form...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4">
    {/* <div className="min-h-screen bg-[#004030] flex items-center justify-center p-4"> */}
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {steps.length - 2}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                // className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                className="bg-gradient-to-r from-[#43b446] via-[#248D27] to-[#056608] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-[#296a52] rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

          {/* Character Avatar */}
          <div className={`flex justify-center mb-6 transition-all duration-500 ${showCharacter ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative">
              <div className={`w-20 h-20 bg-gradient-to-br bg-[#296a52]  flex items-center justify-center text-white text-2xl font-bold  transition-all duration-500 ${isAnimating ? 'animate-bounce' : ''}`}>
                {/* {currentStep === steps.length - 1 ? '🎉' : '🤖'} */}
                {currentStep === steps.length - 1 ? '🎉' : (
                  <img
                    src="/robotic.gif"
                    alt="robot gif"
                    className="w-30 h-30"
                  />
                )}
              </div>
              {isTyping && currentStep < steps.length - 1 && (
                <div className="absolute -bottom-2 -right-2 bg-[#f2f0EB] rounded-full p-2 shadow-lg animate-bounce">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question */}
          <div className={`text-center mb-8 transition-all duration-500 ${!isTypingComplete ? 'opacity-90' : 'opacity-100'}`}>
            <h2 className="text-2xl font-semibold text-white mb-2 leading-relaxed min-h-[3.5rem] flex items-center justify-center">
              <span className="inline-block">
                {displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-0.5 h-6 bg-purple-500 ml-1 animate-pulse"></span>
                )}
              </span>
            </h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Input Field */}
          {currentStep > 0 && currentStep < steps.length - 1 && isTypingComplete && (
            <div className={`space-y-6 transition-all duration-500  ease-out transform ${showInputs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <div className="relative">
                <div>
                  {/* {currentStepData.icon} */}
                </div>

                {currentStepData.type === 'select' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {currentStepData.options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleInputChange(option)}
                        className={`p-4 border-2 rounded-xl bg-[#f2f0EB] transition-all duration-300 text-left hover:scale-105 ${formData[currentStepData.id as keyof FormData] === option
                            ? 'border-[#000]  shadow-lg'
                            : 'border-gray-200 hover:border-[#000]'
                          }`}
                      >
                        <div className="font-semibold text-gray-800 ">{option}</div>
                        <div>
                          {option === 'Student'}
                          {option === 'Developer'}
                          {option === 'Professional'}
                          {option === 'Freelancer'}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : currentStepData.type === 'textarea' ? (
                  <textarea
                    value={formData[currentStepData.id as keyof FormData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    className="w-full pl-12 pr-4 py-4 border-2 bg-[#f2f0EB] border-gray-200 rounded-xl focus:border-[#000] focus:outline-none transition-all duration-300 resize-none h-32 text-gray-700"
                    autoFocus
                    required
                  />
                ) : (
                  <input
                    type={currentStepData.type}
                    value={formData[currentStepData.id as keyof FormData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    className="w-full pl-12 pr-4 py-4 border-2 bg-[#f2f0EB] border-gray-200 rounded-xl focus:border-[#000] focus:outline-none transition-all duration-300 text-gray-700"
                    autoFocus
                    required
                    onKeyPress={(e) => e.key === 'Enter' && canProceed() && !error && handleNext()}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => {
                    setIsGoingBack(true);
                    setCurrentStep(prev => Math.max(0, prev - 1));
                    setError('');
                  }}
                  disabled={currentStep <= 1}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${currentStep <= 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-white hover:bg-gray-100 hover:text-gray-800 cursor-pointer'
                    }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting || !!error}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center cursor-pointer space-x-2 ${canProceed() && !isSubmitting && !error
                      // ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      ? 'bg-white text-gray-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <span>
                    {isSubmitting ? 'Creating Profile...' :
                      currentStep === steps.length - 2 ? 'Complete Profile!' : 'Continue'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Welcome and Complete Steps */}
          {(currentStep === 0 || currentStep === steps.length - 1) && isTypingComplete && (
            <div className={`text-center transition-all duration-500 ease-out transform ${showInputs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <button
                onClick={handleNext}
                className="px-12 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
              >
                <span>{currentStep === 0 ? "Let's Start!" : "Go to Workspace"}</span>
                {currentStep === 0 ? <ChevronRight className="w-6 h-6" /> : <Check className="w-6 h-6" />}
              </button>
            </div>
          )}

          {/* Profile Preview */}
          {/* {formData.age && currentStep > 1 && currentStep < steps.length - 1 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border-l-4 border-purple-500">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Profile Preview</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{userName}</p>
                  {formData.profession && <p className="text-sm text-gray-600">{formData.profession}</p>}
                  {formData.age && <p className="text-xs text-gray-500">Age: {formData.age}</p>}
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* Encouragement text */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="text-center mt-6">
            <p className="text-gray-900 text-sm animate-pulse">
              🔒 Your information is secure and will only be visible to your team members
            </p>
          </div>
        )}
      </div>
    </div>
  );
}