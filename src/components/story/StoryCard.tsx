"use client";

import { Story as StoryModel } from "@/lib/api/types";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/lib/api/api";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { getOgImage } from "@/lib/api/og";
import StoryCardSkeleton from "./StoryCardSkeleton";
import { useStory } from "./StoryContext";
import { useState } from "react";

interface StoryCardProps {
  id: number;
  index: number;
}

export default function StoryCard({ id, index }: StoryCardProps) {
  const { selectedStory, setSelectedStory } = useStory();
  const [imageError, setImageError] = useState(false);
  const {
    isPending,
    error,
    data: story,
    isFetching,
  } = useQuery({
    queryKey: ["getItem", id],
    queryFn: () => getItem(id) as Promise<StoryModel>,
  });

  const { data: ogImage, error: ogError } = useQuery({
    queryKey: ["ogImage", story?.url],
    queryFn: () => (story?.url ? getOgImage(story.url) : null),
    enabled: !!story?.url,
  });

  if (isPending || isFetching) return <StoryCardSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  if (!story) return <div>No story found</div>;

  const imageUrl = ogImage?.image && !ogError ? ogImage.image : undefined;
  const displayUrl = story.url
    ? new URL(story.url).hostname.replace(/^www\./, "")
    : "news.ycombinator.com";

  const isSelected = selectedStory?.id === story?.id;
  const shouldShowImage = imageUrl && !imageError && !ogError;

  return (
    <div
      onClick={() => story && setSelectedStory(story)}
      className="relative flex flex-col bg-white dark:bg-neutral-800 shadow-sm border hover:bg-stone-100 dark:hover:bg-neutral-900 border-slate-200 dark:border-neutral-700 rounded-lg w-full transition-colors duration-200 hover:shadow-lg hover:cursor-pointer mb-2"
    >
      <div className="flex p-4">
        <div className="flex-col flex-1 min-h-[7rem]">
          <div>
            <div className="text-sm flex items-center pb-1">
              <span className="text-slate-600">{index}. </span>
              <span className="text-blue-600 font-medium pl-2 truncate">
                {displayUrl}
              </span>
            </div>
            <h5 className="mb-2 text-slate-800 dark:text-slate-100 text-base lg:text-xl font-semibold line-clamp-2">
              {story.title}
            </h5>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 font-medium pb-2">
            {story.by} • {formatDistanceToNow(story.time * 1000)}
          </div>
        </div>
        {shouldShowImage && (
          <div className="w-24 h-24 md:w-28 md:h-28 ml-4 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              className="w-full h-full object-cover rounded-lg"
              alt=""
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center font-medium mx-3 border-t border-slate-200 dark:border-neutral-700 pb-3 pt-2 px-1">
        <ArrowUpIcon className="size-4" />
        <span className="pl-2">
          {story.score} • {story.descendants} comments
        </span>
      </div>

      {isSelected && (
        <div className="absolute left-0 top-0 w-1 h-full bg-black dark:bg-slate-200 rounded-l-lg" />
      )}
    </div>
  );
}
