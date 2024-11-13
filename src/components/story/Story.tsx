import { useStory } from "./StoryContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import CommentList from "@/components/comment/CommentList";

interface LinkProps {
  url: string;
}

function Link({ url }: LinkProps) {
  return (
    <div className="flex items-center pb-2">
      <img
        src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(
          url ?? ""
        )}`}
        alt=""
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="pl-2 text-blue-600 hover:underline"
      >
        {url
          ? new URL(url).hostname.replace(/^www\./, "")
          : "news.ycombinator.com"}
      </a>
    </div>
  );
}

export default function Story() {
  const { selectedStory } = useStory();
  return (
    <div className="px-4 lg:px-6 py-4 flex flex-col bg-white dark:bg-neutral-800 shadow-sm border border-slate-200 dark:border-neutral-700 rounded-lg transitions-colors duration-200 flex-1 h-[calc(100vh-theme(spacing.16))] overflow-y-auto">
      {selectedStory && (
        <>
          <div className="flex flex-col lg:flex-row pb-4">
            <div className="flex flex-col flex-grow">
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 pb-2">
                {selectedStory.title}
              </h1>

              {selectedStory.url && <Link url={selectedStory.url} />}

              <div className="flex items-center pt-2 mt-auto text-sm lg:text-md text-slate-600 dark:text-slate-300">
                <ArrowUpIcon className="size-4" />
                <span className="pl-1 pr-1">{selectedStory.score}</span>
                <span>&nbsp;•&nbsp;</span>
                <span>{selectedStory.by}&nbsp;•&nbsp;</span>
                {formatDistanceToNow(selectedStory.time * 1000)}
              </div>
            </div>

            {selectedStory.image && (
              <div className="mt-4 lg:mt-0 lg:ml-auto lg:pl-6">
                <div className="w-full lg:w-96 h-48 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={selectedStory.image}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    alt={selectedStory.title}
                    onClick={() =>
                      window.open(
                        selectedStory.url,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    onError={(e) => {
                      e.currentTarget.parentElement?.parentElement?.remove();
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {selectedStory.text && (
            <div
              className="prose dark:prose-invert max-w-none text-sm lg:text-base"
              dangerouslySetInnerHTML={{ __html: selectedStory.text }}
            />
          )}

          <CommentList ids={selectedStory.kids} storyId={selectedStory.id} />
        </>
      )}
    </div>
  );
}
