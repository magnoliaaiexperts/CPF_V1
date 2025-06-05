import React, { useState, useEffect, useRef } from 'react';

interface NotificationProps {
  message: string;
  id: string;
  onRemove: (id: string) => void;
}

const SaveNotification: React.FC<NotificationProps> = ({ message, id, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 50);
    
    // Auto remove notification after 4 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(id), 400); // Wait for fade out animation
    }, 4000);
    
    return () => clearTimeout(timeout);
  }, [id, onRemove]);
  
  return (
    <div 
      className={`magnolia-save-confirm bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-400 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
    >
      <div className="magnolia-save-icon text-xl text-green-500 mr-3">💾</div>
      <div className="magnolia-save-message">
        <p className="text-sm font-medium text-gray-800 mb-1">{message}</p>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{id: string, message: string}>>([]);
  
  // Create a custom event for showing save notifications
  useEffect(() => {
    const handleSaveEvent = (e: CustomEvent) => {
      addNotification('Progress saved!');
    };
    
    // Use type assertion to access CustomEvent
    window.addEventListener('saveProgress' as any, handleSaveEvent as EventListener);
    
    return () => {
      window.removeEventListener('saveProgress' as any, handleSaveEvent as EventListener);
    };
  }, []);
  
  const addNotification = (message: string) => {
    const newNotification = {
      id: Date.now().toString(),
      message
    };
    setNotifications(prev => [...prev, newNotification]);
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <div id="magnolia-notification-area" className="fixed bottom-4 right-4 md:right-5 z-40 flex flex-col items-end gap-3">
      {notifications.map(notification => (
        <SaveNotification 
          key={notification.id}
          id={notification.id}
          message={notification.message}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default Notifications;