import { Home, Shield, TrendingUp, Users } from "lucide-react";
import React from "react";

export interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const values: Value[] = [
  {
    title: "Family",
    description: "We treat our customers and employees like family, with respect and care.",
    icon: React.createElement(Home, { className: "h-6 w-6" })
  },
  {
    title: "Integrity",
    description: "We're committed to honesty, transparency, and doing what's right in all our dealings.",
    icon: React.createElement(Shield, { className: "h-6 w-6" })
  },
  {
    title: "Growth",
    description: "We continuously evolve to bring the best technology and service to our communities.",
    icon: React.createElement(TrendingUp, { className: "h-6 w-6" })
  },
  {
    title: "Community",
    description: "We're dedicated to making a positive impact in the communities we serve.",
    icon: React.createElement(Users, { className: "h-6 w-6" })
  }
];
