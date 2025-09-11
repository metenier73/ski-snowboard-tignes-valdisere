import React from 'react';

const Card = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
));

const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 pb-2 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = '', children, ...props }) => (
  <h3 
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className = '', children, ...props }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardAction = ({ className = '', children, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter
};
