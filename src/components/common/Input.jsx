const Input = ({ icon, ...props }) => {
    return (
      <div className="relative">
        <input
          className="w-full px-12 py-3 border rounded-full focus:outline-none focus:border-[#4B0082]"
          {...props}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    )
  }
  
  export default Input