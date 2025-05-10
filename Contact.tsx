import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="pt-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you stay connected.
          </p>
        </motion.div>
        
        {/* Contact Cards Section - Mobile First Design */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Location</h3>
              <p className="text-center text-gray-600">
                123 Business Park Drive<br />
                Houston, TX 77056
              </p>
              <Button variant="link" className="mt-3 text-primary">
                View on Map
              </Button>
            </motion.div>
            
            {/* Phone Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Phone Number</h3>
              <p className="text-center text-gray-600">
                Customer Service<br />
                (800) 555-7890
              </p>
              <Button variant="link" className="mt-3 text-primary">
                Call Now
              </Button>
            </motion.div>
            
            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Address</h3>
              <p className="text-center text-gray-600">
                support@rbfirstconnect.com<br />
                info@rbfirstconnect.com
              </p>
              <Button variant="link" className="mt-3 text-primary">
                Email Us
              </Button>
            </motion.div>
            
            {/* Hours Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
              <p className="text-center text-gray-600">
                Mon-Fri: 9:00 AM - 6:00 PM<br />
                Sat: 10:00 AM - 4:00 PM
              </p>
              <Button variant="link" className="mt-3 text-primary">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-poppins font-semibold">Send Us a Message</h2>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="customer-service">Customer Service</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Inquiries</SelectItem>
                          <SelectItem value="store-info">Store Information</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto btn-primary" 
                  disabled={isSubmitting}
                >
                  <span>Send Message</span>
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
        
        {/* Social Media Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            <SocialIcon icon={<Facebook className="h-5 w-5" />} />
            <SocialIcon icon={<Twitter className="h-5 w-5" />} />
            <SocialIcon icon={<Instagram className="h-5 w-5" />} />
            <SocialIcon icon={<Linkedin className="h-5 w-5" />} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default Contact;
