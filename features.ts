import { MapPin, Headset, Tag } from "lucide-react";
import React from "react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const features: Feature[] = [
  {
    title: "Convenient Locations",
    description: "With over 80 stores across 5 states, we're always close to home. Find your nearest RBFC store easily.",
    icon: React.createElement(MapPin, { className: "h-6 w-6" })
  },
  {
    title: "Expert Support",
    description: "Our knowledgeable staff provides personalized support to help you find the perfect plan and device.",
    icon: React.createElement(Headset, { className: "h-6 w-6" })
  },
  {
    title: "Exclusive Deals",
    description: "Access special promotions and deals available only through authorized Boost Mobile dealers like RBFC.",
    icon: React.createElement(Tag, { className: "h-6 w-6" })
  }
];
