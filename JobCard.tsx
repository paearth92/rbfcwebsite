import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Job } from "../data/jobs";

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <motion.div 
      className="bg-light-gray rounded-xl p-6 transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h4 className="text-xl font-poppins font-semibold mb-2">{job.title}</h4>
      
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin size={16} className="mr-2 text-primary" />
        <span>{job.location}</span>
        <span className="mx-3">|</span>
        <Briefcase size={16} className="mr-2 text-primary" />
        <span>{job.type}</span>
      </div>
      
      <p className="text-gray-700 mb-4">
        {job.description}
      </p>
      
      <a 
        href="#" 
        className="text-primary hover:text-primary/90 font-medium transition-colors flex items-center"
      >
        Apply Now <ArrowRight size={16} className="ml-1" />
      </a>
    </motion.div>
  );
};

export default JobCard;
