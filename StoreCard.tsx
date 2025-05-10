import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Store } from "../data/stores";

interface StoreCardProps {
  store: Store;
  index: number;
}

const StoreCard = ({ store, index }: StoreCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img 
        src={store.image} 
        alt={`RBFC Store in ${store.name}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-poppins font-semibold text-lg mb-2">{store.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2 text-primary" />
          <span>{store.address}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Phone size={16} className="mr-2 text-primary" />
          <span>{store.phone}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Clock size={16} className="mr-2 text-primary" />
          <span>{store.hours}</span>
        </div>
        
        <div className="flex justify-between">
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/90 font-medium transition-colors"
          >
            Get Directions
          </a>
          <a 
            href="#" 
            className="text-accent-blue hover:text-blue-700 font-medium transition-colors"
          >
            View Details <ArrowRight size={16} className="inline ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default StoreCard;
