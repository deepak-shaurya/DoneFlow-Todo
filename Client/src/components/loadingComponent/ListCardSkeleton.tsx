const ListCardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl bg-gray-700 rounded-2xl p-6 shadow-xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-1/3 bg-gray-600 rounded" />
        <div className="h-4 w-4 bg-gray-600 rounded-full" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-600 rounded" />
        <div className="h-4 w-11/12 bg-gray-600 rounded" />
        <div className="h-4 w-5/6 bg-gray-600 rounded" />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="h-4 w-4 bg-gray-600 rounded-full" />
        <div className="h-4 w-20 bg-gray-600 rounded" />
      </div>
    </div>
  )
}

export default ListCardSkeleton
