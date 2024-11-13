"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { Story as StoryModel } from "@/lib/api/types";

interface StoryContextType {
  selectedStory: StoryModel | null;
  setSelectedStory: (story: StoryModel | null) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

function StoryProvider({ children }: { children: ReactNode }) {
  const [selectedStory, setSelectedStory] = useState<StoryModel | null>(null);

  return (
    <StoryContext.Provider value={{ selectedStory, setSelectedStory }}>
      {children}
    </StoryContext.Provider>
  );
}

function useStory() {
  const context = useContext(StoryContext);
  if (context == undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}

export { StoryProvider, useStory };
