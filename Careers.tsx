import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import JobCard from "../components/JobCard";
import LottieAnimation from "../components/animations/LottieAnimation";
import { jobs } from "../data/jobs";

const Careers = () => {
  const benefits = [
    "Competitive Salaries",
    "Healthcare Benefits",
    "Paid Time Off",
    "Career Growth",
    "Employee Discounts",
    "401(k) Matching"
  ];

  return (
    <section id="careers" className="pt-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Be part of a dynamic team that's passionate about technology and connecting communities.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-poppins font-semibold mb-4">Why Work With Us</h2>
            <p className="text-lg mb-6 text-gray-700">
              At RB First Connect, we believe in empowering our employees to grow, innovate, and make a difference. We offer competitive benefits, career advancement opportunities, and a collaborative team environment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                >
                  <div className="flex-shrink-0 h-6 w-6 text-primary">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LottieAnimation 
              animationPath="https://assets10.lottiefiles.com/packages/lf20_pzptmqgs.json"
              className="h-64 w-full"
            />
          </motion.div>
        </div>
        
        {/* Career Growth Section */}
        <motion.div 
          className="mb-16 bg-light-gray rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Career growth" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="text-2xl font-poppins font-semibold mb-4">Grow With Us</h2>
              <p className="text-gray-700 mb-4">
                We're proud of our track record of promoting from within. Many of our store managers and district leaders started as sales associates and grew with the company.
              </p>
              <p className="text-gray-700 mb-4">
                We provide comprehensive training programs and ongoing development opportunities to help you build your career in retail management, customer service, or technology.
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Learn about our career paths</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Open Positions */}
        <div>
          <h2 className="text-2xl font-poppins font-semibold mb-8 text-center">Current Openings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="btn-primary">
              <span>View All Positions</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
