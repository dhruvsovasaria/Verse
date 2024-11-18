const BlogsSkeleton = () => {
  return (
    <div
      role="status"
      className="h-screen w-screen p-6 space-y-6  border border-gray-200 divide-y divide-gray-200 animate-pulse"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between py-4">
          <div>
            <div className="h-4 bg-gray-300 rounded-full w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-64"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded-full w-20"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BlogsSkeleton;
