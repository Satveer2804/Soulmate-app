import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const variantClasses = {
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded ${
        variantClasses[variant] || variantClasses.info
      }`}
      role="alert"
    >
      <p>{children}</p>
    </div>
  );
};

export default Message;
















































