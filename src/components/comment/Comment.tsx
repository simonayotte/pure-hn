"use client";

import { Comment as CommentModel } from "@/lib/api/types";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/lib/api/api";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CommentProp {
  storyId: number;
  id: number;
  depth?: number;
}

export default function Comment({ id, storyId, depth = 0 }: CommentProp) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    isPending,
    error,
    data: comment,
    isFetching,
  } = useQuery({
    queryKey: ["getItem", id],
    queryFn: () => getItem(id) as Promise<CommentModel>,
  });

  if (isPending || isFetching) {
    return (
      <div className="py-2">
        <CommentSkeleton />
      </div>
    );
  }

  if (error)
    return (
      <div className="py-2 text-red-500">
        <p>Error loading comments: {error.message}</p>
      </div>
    );

  if (!comment)
    return (
      <div className="py-2 text-lg text-gray-500">
        <p>No comment found.</p>
      </div>
    );

  const hasReplies = comment.kids && comment.kids.length > 0;

  return (
    <div className="flex flex-col gap-1">
      {comment.parent === storyId && (
        <div className="w-full border-b-2 border-slate-200 dark:border-neutral-700" />
      )}
      <div
        className="flex flex-col gap-1"
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <div className="flex items-center">
          {hasReplies && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 -ml-6 hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-md transition-colors duration-200"
              aria-label={isCollapsed ? "Expand replies" : "Collapse replies"}
            >
              {isCollapsed ? (
                <ChevronRightIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </button>
          )}
          <span className="text-orange-600 font-semibold">{comment.by}</span>
          <span>&nbsp;•&nbsp;</span>
          {formatDistanceToNow(comment.time * 1000)} ago
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.text),
          }}
        />
      </div>

      {!isCollapsed &&
        comment.kids?.map((id) => (
          <Comment key={id} id={id} depth={depth + 1} storyId={storyId} />
        ))}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-1 animate-pulse">
      <div className="flex items-center">
        <div className="h-4 w-24 bg-slate-200 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-32 bg-slate-200 dark:bg-neutral-700 rounded ml-2" />
      </div>
      <div className="h-16 w-full bg-slate-200 dark:bg-neutral-700 rounded" />
      <div className="w-full border-b border-slate-200 dark:border-neutral-700 pt-2" />
    </div>
  );
}
