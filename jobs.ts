export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Store Manager",
    location: "Multiple Locations",
    type: "Full-Time",
    description: "Lead a team of sales associates, manage store operations, and drive sales performance while providing exceptional customer service."
  },
  {
    id: 2,
    title: "Sales Associate",
    location: "Multiple Locations",
    type: "Full-Time / Part-Time",
    description: "Help customers find the right mobile devices and plans, process transactions, and provide excellent service in a fast-paced retail environment."
  },
  {
    id: 3,
    title: "District Manager",
    location: "Regional Positions",
    type: "Full-Time",
    description: "Oversee multiple store locations, develop store managers, implement company strategies, and drive regional performance."
  },
  {
    id: 4,
    title: "Customer Service Representative",
    location: "Corporate Office",
    type: "Full-Time",
    description: "Support customers via phone and email, resolve service issues, and ensure positive customer experiences with our products and services."
  }
];
