import { motion } from "framer-motion";
import { Value } from "../data/values";

interface CoreValueCardProps {
  value: Value;
  index: number;
}

const CoreValueCard = ({ value, index }: CoreValueCardProps) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-24 w-24 mx-auto mb-6 bg-light-gray rounded-full flex items-center justify-center">
        <span className="text-primary text-3xl">{value.icon}</span>
      </div>
      <h4 className="text-xl font-poppins font-semibold mb-2">{value.title}</h4>
      <p className="text-gray-700">
        {value.description}
      </p>
    </motion.div>
  );
};

export default CoreValueCard;
