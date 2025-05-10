import { MapPin } from "lucide-react";

export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  image: string;
}

export const stores: Store[] = [
  {
    id: 1,
    name: "RBFC Houston - Westheimer",
    address: "1234 Westheimer Rd, Houston, TX 77098",
    city: "Houston",
    state: "TX",
    zip: "77098",
    phone: "(713) 555-1234",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1613317447829-eea2ed59640f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "RBFC Miami - Brickell",
    address: "789 Brickell Ave, Miami, FL 33131",
    city: "Miami",
    state: "FL",
    zip: "33131",
    phone: "(305) 555-6789",
    hours: "Mon-Sat: 9AM-9PM, Sun: 11AM-7PM",
    image: "https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "RBFC Atlanta - Buckhead",
    address: "3456 Peachtree Rd NE, Atlanta, GA 30326",
    city: "Atlanta",
    state: "GA",
    zip: "30326",
    phone: "(404) 555-3456",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1614614327029-3e789355984a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "RBFC Charlotte - Uptown",
    address: "222 S Church St, Charlotte, NC 28202",
    city: "Charlotte",
    state: "NC",
    zip: "28202",
    phone: "(704) 555-2222",
    hours: "Mon-Sat: 9AM-8PM, Sun: 11AM-6PM",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "RBFC Austin - Downtown",
    address: "555 Congress Ave, Austin, TX 78701",
    city: "Austin",
    state: "TX",
    zip: "78701",
    phone: "(512) 555-5555",
    hours: "Mon-Sat: 10AM-9PM, Sun: 12PM-7PM",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "RBFC Orlando - Lake Eola",
    address: "123 E Central Blvd, Orlando, FL 32801",
    city: "Orlando",
    state: "FL",
    zip: "32801",
    phone: "(407) 555-1234",
    hours: "Mon-Sat: 9AM-9PM, Sun: 11AM-7PM",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "RBFC Columbia - Main Street",
    address: "1234 Main St, Columbia, SC 29201",
    city: "Columbia",
    state: "SC",
    zip: "29201",
    phone: "(803) 555-4321",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1567275272868-433d3a685912?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "RBFC Dallas - Uptown",
    address: "2222 McKinney Ave, Dallas, TX 75201",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    phone: "(214) 555-2222",
    hours: "Mon-Sat: 9AM-9PM, Sun: 11AM-7PM",
    image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "RBFC Raleigh - Glenwood",
    address: "400 Glenwood Ave, Raleigh, NC 27603",
    city: "Raleigh",
    state: "NC",
    zip: "27603",
    phone: "(919) 555-4000",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1591361277787-1d3595ce82d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];
