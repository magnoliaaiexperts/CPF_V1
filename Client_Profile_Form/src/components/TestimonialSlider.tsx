import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Magnolia AI Solutions helped us streamline our operations by 45% in just three months. Their client onboarding process was smooth and professional.",
    author: "Jason Dawes",
    role: "CTO, TechVision Inc.",
    initials: "JD"
  },
  {
    quote: "Working with Magnolia AI Solutions saved us over $200K in our first year. Their team understood our unique challenges from day one.",
    author: "Sarah Miller",
    role: "COO, Precision Healthcare",
    initials: "SM"
  },
  {
    quote: "The client profile process helped Magnolia understand our goals perfectly. Within weeks we had a custom AI solution that transformed our customer experience.",
    author: "Robert Lee",
    role: "CEO, FlexRetail",
    initials: "RL"
  }
];

const TestimonialSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    
    return () => clearInterval(intervalId);
  }, [isAutoPlaying]);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    // Reset auto-play timer when manually changing slides
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  return (
    <div className="magnolia-social-proof mb-6 md:mb-9">
      <div 
        className="magnolia-testimonial-slider relative overflow-hidden bg-gray-100 p-5 md:p-7 rounded-lg mb-4"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`magnolia-testimonial-slide ${index === currentSlide ? 'block animate-fadeIn' : 'hidden'}`}
          >
            <div className="magnolia-testimonial-content bg-white rounded-lg p-5 md:p-7 shadow-sm text-center">
              <div className="magnolia-testimonial-quote relative italic mb-4 md:mb-6 text-gray-600 text-base leading-relaxed">
                "{testimonial.quote}"
              </div>
              
              <div className="magnolia-testimonial-author inline-flex items-center justify-center mt-4">
                <div className="magnolia-author-avatar w-10 h-10 md:w-12 md:h-12 bg-indigo-700 text-white rounded-full flex items-center justify-center font-semibold text-sm md:text-base mr-3">
                  {testimonial.initials}
                </div>
                
                <div className="magnolia-author-info text-left">
                  <div className="magnolia-author-name font-semibold text-gray-800 text-sm md:text-base">
                    {testimonial.author}
                  </div>
                  <div className="magnolia-author-role text-xs md:text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="magnolia-testimonial-dots flex justify-center">
        {testimonials.map((_, index) => (
          <span 
            key={index}
            className={`magnolia-dot w-2.5 h-2.5 md:w-3 md:h-3 rounded-full mx-1.5 transition-all duration-300 cursor-pointer ${
              index === currentSlide ? 'active bg-indigo-500 scale-110' : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;