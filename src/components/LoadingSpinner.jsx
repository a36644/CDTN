
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center absolute left-[50%] top-[50%]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;