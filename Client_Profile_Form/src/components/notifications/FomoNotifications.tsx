import React, { useState, useEffect } from 'react';

interface FomoProps {
  city: string;
  action: string;
  id: string;
  onRemove: (id: string) => void;
}

const FomoNotification: React.FC<FomoProps> = ({ city, action, id, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 50);
    
    // Auto remove notification after 6 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(id), 400); // Wait for fade out animation
    }, 6000);
    
    return () => clearTimeout(timeout);
  }, [id, onRemove]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(id), 400); // Wait for fade out animation
  };
  
  return (
    <div 
      className={`magnolia-fomo-notification bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-400 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
    >
      <div className="magnolia-fomo-content flex items-center flex-grow">
        <div className="magnolia-fomo-icon flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
          👤
        </div>
        <div className="magnolia-fomo-message">
          <span className="text-sm text-gray-700">
            Someone from <strong className="text-gray-900 font-semibold">{city}</strong> {action}.
          </span>
          <span className="magnolia-fomo-time block text-xs text-gray-400 mt-0.5">
            a few moments ago
          </span>
        </div>
      </div>
      <button
        className="magnolia-fomo-close ml-3 text-gray-400 hover:text-gray-700 text-xl font-bold p-1 bg-transparent border-none transition-colors duration-200"
        onClick={handleClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

const FomoNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{id: string, city: string, action: string}>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  const notifications_data = [
    { city: "New York, USA", action: "just completed their profile" },
    { city: "London, UK", action: "just scheduled a demo" },
    { city: "Austin, USA", action: "just started their AI implementation" },
    { city: "Paris, France", action: "just received their custom AI roadmap" },
    { city: "Sydney, AUS", action: "just completed their profile" },
    { city: "Berlin, DE", action: "is exploring AI solutions" },
    { city: "Toronto, CAN", action: "just upgraded their AI plan" }
  ];
  
  useEffect(() => {
    let intervalId: number;
    let currentIndex = 0;
    
    // Start FOMO cycle after initial delay
    const timeoutId = setTimeout(() => {
      // Check if any modal is open before showing notification
      if (!document.body.classList.contains('modal-open')) {
        addNotification(notifications_data[currentIndex]);
        currentIndex = (currentIndex + 1) % notifications_data.length;
      }
      
      // Set interval for subsequent notifications
      intervalId = window.setInterval(() => {
        // Check if any modal is open before showing notification
        if (!document.body.classList.contains('modal-open')) {
          addNotification(notifications_data[currentIndex]);
          currentIndex = (currentIndex + 1) % notifications_data.length;
        }
      }, 40000); // Show a notification every 40 seconds
    }, 20000); // Initial delay of 20 seconds
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [modalOpen]);
  
  const addNotification = (data: {city: string, action: string}) => {
    const newNotification = {
      id: Date.now().toString(),
      city: data.city,
      action: data.action
    };
    setNotifications(prev => [...prev, newNotification]);
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  // Track modal state to pause notifications when modals are open
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const modalOpen = document.body.classList.contains('modal-open');
          setModalOpen(modalOpen);
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div id="magnoliaFomoContainer" className="fixed bottom-4 left-4 md:left-5 z-40 flex flex-col items-start gap-3">
      {notifications.map(notification => (
        <FomoNotification 
          key={notification.id}
          id={notification.id}
          city={notification.city}
          action={notification.action}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default FomoNotifications;