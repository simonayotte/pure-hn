"use client";

import StoryCard from "./StoryCard";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import StoryCardSkeleton from "./StoryCardSkeleton";

const STORIES_CHUNK_SIZE = 10;

interface StoryFeedProps {
  stories: number[];
}

export default function StoryFeed({ stories }: StoryFeedProps) {
  const [visibleStories, setVisibileStories] =
    useState<number>(STORIES_CHUNK_SIZE);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && stories && visibleStories < stories.length) {
      setVisibileStories((prev) => Math.min(prev + 10, stories.length));
    }
  }, [inView, stories]);

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-y-auto overflow-x-hidden">
      <div className="w-full px-4">
        {stories.slice(0, visibleStories).map((id, index) => {
          return <StoryCard index={index + 1} key={id} id={id} />;
        })}

        {visibleStories < stories.length && (
          <div ref={ref} className="w-full py-4">
            <StoryCardSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
