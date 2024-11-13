"use client";
import Story from "@/components/story/Story";
import { StoryProvider } from "@/components/story/StoryContext";
import StoryFeed from "@/components/story/StoryFeed";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NavBar from "@/components/ui/NavBar";
import { getTopStories } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const {
    isPending,
    error,
    data: stories,
  } = useQuery({
    queryKey: ["topStories"],
    queryFn: getTopStories,
  });

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-100 dark:bg-neutral-900 text-gray-900 dark:text-gray-300 transition-colors duration-200">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-100 dark:bg-neutral-900 text-gray-900 dark:text-gray-300 transition-colors duration-200">
        <div>Error: {error.message}</div>
      </div>
    );
  if (!stories) return <div>No stories found</div>;

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-neutral-900 text-gray-900 dark:text-gray-300 transition-colors duration-200">
      <NavBar />
      <StoryProvider>
        <main className="container mx-auto p-4 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 lg:max-w-2xl">
            <StoryFeed stories={stories} />
          </div>
          <div className="w-full lg:w-2/3">
            <Story />
          </div>
        </main>
      </StoryProvider>
    </div>
  );
}
