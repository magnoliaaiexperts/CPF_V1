import React from 'react';

const ConfirmationScreen: React.FC = () => {
  const handleShareLinkedIn = () => {
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Check out Magnolia AI Solutions');
    const body = encodeURIComponent('I just found this company that specializes in AI implementation for businesses. You might find it useful: ' + window.location.href);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="magnolia-confirmation text-center py-8 px-4 animate-fadeIn">
      <div className="magnolia-confirmation-icon text-5xl md:text-6xl text-green-500 mb-4 md:mb-6">✅</div>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">
        Profile Created Successfully!
      </h2>
      
      <p className="magnolia-confirmation-message text-base md:text-lg font-medium text-gray-600 mb-4">
        Thank you for creating your client profile with Magnolia AI Solutions. Our team will review your information and contact you shortly to discuss your AI project needs.
      </p>
      
      <p className="text-sm md:text-base text-gray-500 mb-6">
        A confirmation email has been sent to your provided email address with a summary of your information.
      </p>
      
      <div className="magnolia-what-next bg-gray-50 rounded-lg p-5 md:p-6 text-left border border-gray-200 my-6 md:my-8">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          What Happens Next?
        </h3>
        <ol className="ml-5 space-y-2.5">
          <li className="text-sm md:text-base text-gray-600">
            <strong className="text-blue-900 font-semibold">Expert Review:</strong> Our team will analyze your requirements (typically within 1 business day).
          </li>
          <li className="text-sm md:text-base text-gray-600">
            <strong className="text-blue-900 font-semibold">Initial Call:</strong> We'll reach out via your preferred method to schedule a discovery call.
          </li>
          <li className="text-sm md:text-base text-gray-600">
            <strong className="text-blue-900 font-semibold">Custom Plan:</strong> Based on our discussion, you'll receive a tailored AI implementation strategy.
          </li>
        </ol>
      </div>
      
      <div className="magnolia-social-share mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <p className="text-sm md:text-base text-gray-600 font-medium mb-3 md:mb-4">
          Know someone who could benefit from AI solutions?
        </p>
        
        <div className="magnolia-share-buttons flex flex-col md:flex-row gap-3 justify-center mt-3 md:mt-4">
          <button 
            type="button" 
            className="magnolia-share-btn bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-5 rounded-md text-sm md:text-base font-semibold flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={handleShareLinkedIn}
          >
            Share on LinkedIn
          </button>
          
          <button 
            type="button" 
            className="magnolia-share-btn bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-5 rounded-md text-sm md:text-base font-semibold flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={handleShareEmail}
          >
            Share via Email
          </button>
        </div>
      </div>
      
      <a 
        href="#" 
        className="magnolia-btn-continue inline-block w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md mt-4 md:mt-6"
      >
        Go to Dashboard
      </a>
    </div>
  );
};

export default ConfirmationScreen;