const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "w-full py-3 rounded-full font-semibold transition-all duration-300"
    const variants = {
      primary: "bg-[#4B0082] text-white hover:opacity-90",
      outline: "bg-white border-2 border-[#4B0082] text-[#4B0082] hover:bg-purple-50"
    }
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  export default Button
