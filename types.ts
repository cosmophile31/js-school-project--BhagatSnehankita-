// src/types.ts

export type EventCategory = "History" | "Culture" | "Trends" | "Environment";

export interface TimelineEvent {
  year: string;          // keep as string to match your JSON (e.g., "1900")
  title: string;
  description: string;
  imageURL: string;
  category: EventCategory;
}
