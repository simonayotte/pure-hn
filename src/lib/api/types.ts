// Base type for common properties
interface BaseItem {
  id: number;
  deleted?: boolean;
  by?: string;
  time: number;
  dead?: boolean;
  kids?: number[];
}

// Story type
interface Story extends BaseItem {
  type: "story";
  title: string;
  url?: string;
  score?: number;
  descendants?: number;
  text?: string;
  image?: string;
}

// Comment type
interface Comment extends BaseItem {
  type: "comment";
  text: string;
  parent: number;
}

// Job type
interface Job extends BaseItem {
  type: "job";
  title: string;
  url?: string;
  score?: number;
  text?: string;
}

// Poll type
interface Poll extends BaseItem {
  type: "poll";
  title: string;
  text?: string;
  score?: number;
  parts?: number[];
  descendants?: number;
}

// Poll Option type
interface PollOption extends BaseItem {
  type: "pollopt";
  text: string;
  poll: number;
  score?: number;
}

// Union type for all possible item types
type Item = Story | Comment | Job | Poll | PollOption;

export type { Item, Story, Comment, Job, Poll, PollOption, BaseItem };
