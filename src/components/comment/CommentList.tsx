import Comment from "./Comment";

interface CommentListProps {
  storyId: number;
  ids?: number[];
}

export default function CommentList({ ids, storyId }: CommentListProps) {
  if (!ids || ids.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500 dark:text-gray-400">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 pt-2">
      {ids.map((id) => (
        <Comment key={id} id={id} storyId={storyId} />
      ))}
    </div>
  );
}
