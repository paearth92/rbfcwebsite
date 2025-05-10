export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: "2007",
    title: "First Store Opening",
    description: "Launched our very first location with a commitment to customer service."
  },
  {
    year: "2012",
    title: "Expanded to 25 Stores",
    description: "Rapid growth led to expanding our presence across multiple states."
  },
  {
    year: "2018",
    title: "50th Store Milestone",
    description: "Celebrated our 50th store opening and introduced enhanced customer programs."
  },
  {
    year: "Today",
    title: "80+ Locations and Growing",
    description: "Now serving customers with over 80 stores across 5 states with plans for continued expansion."
  }
];
