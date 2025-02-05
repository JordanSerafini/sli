interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "rounded-lg font-medium transition-colors duration-200";
  
  const variants = {
    primary: "bg-main-color text-white hover:bg-opacity-90",
    secondary: "bg-secondary-color text-white hover:bg-opacity-90",
    outline: "border-2 border-main-color text-main-color hover:bg-main-color hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 