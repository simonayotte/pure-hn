export default function StoryCardSkeleton() {
  return (
    <div className="relative flex flex-col bg-white dark:bg-neutral-800 shadow-sm border hover:bg-stone-100 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-700 rounded-lg w-full transition-colors duration-200 hover:shadow-lg hover:cursor-pointer mb-2">
      <div className="flex p-4">
        <div className="flex-col flex-1 h-28">
          <div>
            <div className="text-sm flex items-center pb-1">
              <span className="text-slate-600">
                <div className="h-4 w-8 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
              </span>
              <span className="text-blue-600 font-medium pl-2">
                <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
              </span>
            </div>
            <h5 className="mb-2 text-slate-800 dark:text-slate-100 text-xl font-semibold">
              <div className="h-6 w-96 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
            </h5>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 font-medium pb-2">
            <div className="h-4 w-48 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-28 h-28 ml-4 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-neutral-700 animate-pulse" />
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center font-medium mx-3 border-t border-slate-200 dark:border-neutral-700 pb-3 pt-2 px-1">
        <div className="h-4 w-4 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
        <span className="pl-2">
          <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse" />
        </span>
      </div>
    </div>
  );
}
