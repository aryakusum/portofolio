import React from 'react';

const EditorialGrid = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 px-4 md:px-8 max-w-[1600px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default EditorialGrid;
