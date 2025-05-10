import { motion } from "framer-motion";
import CoreValueCard from "../components/CoreValueCard";
import TimelineEventItem from "../components/TimelineEvent";
import { values } from "../data/values";
import { timeline } from "../data/timeline";

const About = () => {
  return (
    <section id="about" className="pt-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">About RB First Connect</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From our humble beginnings to our expanding network across 5 states, we've always put our customers first.
          </p>
        </motion.div>
        
        {/* Company Overview */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-light-gray rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-poppins font-semibold mb-4">Who We Are</h2>
                <p className="text-gray-700 mb-4">
                  RB First Connect is an authorized dealer of Boost Mobile with over 80 retail locations across Texas, Florida, Georgia, North Carolina, and South Carolina. Since our founding, we've been dedicated to connecting communities through accessible mobile technology.
                </p>
                <p className="text-gray-700">
                  We pride ourselves on exceptional customer service, competitive pricing, and our commitment to the communities we serve. Our knowledgeable staff is always ready to help you find the perfect device and plan to fit your needs and budget.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="RBFC retail store" 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Core Values Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-poppins font-semibold mb-10 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <CoreValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-poppins font-semibold mb-10 text-center">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {timeline.map((event, index) => (
              <TimelineEventItem 
                key={index} 
                event={event} 
                index={index}
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </div>
        
        {/* Community Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-poppins font-semibold mb-10 text-center">Community Involvement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-light-gray rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469571486292-b5df6d8638ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Community outreach event" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">Local Partnerships</h3>
                <p className="text-gray-700">
                  We partner with local businesses and organizations to strengthen the communities we serve and create a positive impact through technology.
                </p>
              </div>
            </div>
            
            <div className="bg-light-gray rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1565803974275-dccd2f933cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Charity event" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">Giving Back</h3>
                <p className="text-gray-700">
                  Through our community initiatives, we provide technology resources, education, and support to underserved communities across our service areas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
