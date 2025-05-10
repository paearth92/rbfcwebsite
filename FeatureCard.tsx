import { motion } from "framer-motion";
import { Feature } from "../data/features";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-primary text-3xl mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-poppins font-semibold mb-3">{feature.title}</h3>
      <p className="text-gray-700">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
