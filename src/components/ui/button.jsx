import React from 'react';

const Button = ({
  as: Component = 'button',
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'hover:bg-gray-100',
    link: 'text-blue-600 underline underline-offset-4 hover:text-blue-800',
  };
  
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-10 px-6',
    icon: 'h-9 w-9',
  };
  
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;
  
  return (
    <Component
      className={`${baseStyles} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Button };
