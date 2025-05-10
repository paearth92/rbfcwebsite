import { motion } from "framer-motion";
import { TimelineEvent } from "../data/timeline";

interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
  isEven: boolean;
}

const TimelineEventItem = ({ event, index, isEven }: TimelineEventProps) => {
  return (
    <motion.div 
      className="relative z-10 mb-12"
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center">
        {isEven ? (
          <>
            <div className="md:w-5/12 pr-10 md:pr-16 text-right">
              <TimelineContent event={event} />
            </div>
            <TimelineMarker />
            <div className="hidden md:block w-5/12"></div>
          </>
        ) : (
          <>
            <div className="hidden md:block w-5/12"></div>
            <TimelineMarker />
            <div className="md:w-5/12 pl-10 md:pl-16">
              <TimelineContent event={event} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const TimelineMarker = () => (
  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
    <div className="w-4 h-4 rounded-full bg-white"></div>
  </div>
);

const TimelineContent = ({ event }: { event: TimelineEvent }) => (
  <div className="bg-light-gray p-6 rounded-lg shadow-md">
    <span className="text-primary font-semibold">{event.year}</span>
    <h4 className="text-lg font-poppins font-semibold mb-2">{event.title}</h4>
    <p className="text-gray-700">{event.description}</p>
  </div>
);

export default TimelineEventItem;
