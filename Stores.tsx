import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Search, MapPin, Phone, Clock, ArrowRight, X, Filter, Map as MapIcon, 
  ChevronDown, ChevronUp, ChevronRight, List 
} from "lucide-react";
import { stores, Store } from "../data/stores";
import ParticleNetwork from "../components/animations/ParticleNetwork";
import MagneticButton from "../components/animations/MagneticButton";
import ParallaxCard from "../components/animations/ParallaxCard";
import ScrollTriggerAnimation from "../components/animations/ScrollTriggerAnimation";
import SplitTextReveal from "../components/animations/SplitTextReveal";

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [visibleStores, setVisibleStores] = useState(6);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [hoveredStoreId, setHoveredStoreId] = useState<number | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const storeListRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Get unique states
  const states = Array.from(new Set(stores.map(store => store.state))).sort();
  
  // Group stores by state
  const storesByState = states.reduce((acc, state) => {
    acc[state] = stores.filter(store => store.state === state);
    return acc;
  }, {} as Record<string, typeof stores>);

  // Filter stores based on search and state filter
  const filteredStores = stores.filter(store => {
    const matchesSearch = searchTerm === "" || 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === "" || 
      store.state === selectedState;
    
    return matchesSearch && matchesState;
  });
  
  // Handle loading more stores
  const handleLoadMore = () => {
    setVisibleStores(prev => Math.min(prev + 6, filteredStores.length));
  };
  
  // Handle store selection
  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId === selectedStoreId ? null : storeId);
    
    // Scroll to selected store
    if (storeId !== selectedStoreId && storeListRef.current) {
      setTimeout(() => {
        const element = document.getElementById(`store-${storeId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
  };
  
  // Toggle filters on mobile
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <>
      {/* Hero section with minimalist header */}
      <section className="relative pt-24 bg-white">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold">
              {filteredStores.length} Locations Found
            </h1>
            
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg shadow-sm">
              <button 
                className={`px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
                <span className="text-sm">List</span>
              </button>
              
              <button 
                className={`px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setViewMode('map')}
              >
                <MapIcon size={18} />
                <span className="text-sm">Map</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Store listings section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Filters section styled to match the mobile UI */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}  
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button 
                className="w-full flex items-center justify-between px-4 py-3"
                onClick={toggleFilters}
              >
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-primary" />
                  <span className="font-medium">Filters</span>
                </div>
                <motion.div
                  animate={{ rotate: isFiltersOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isFiltersOpen && (
                  <motion.div 
                    className="px-4 pb-4 border-t border-gray-100"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search stores..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          {searchTerm && (
                            <button 
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setSearchTerm("")}
                              aria-label="Clear search"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          style={{ 
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "1rem"
                          }}
                        >
                          <option value="">All States</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      
                      {(searchTerm || selectedState) && (
                        <div className="flex justify-end">
                          <button 
                            className="text-primary font-medium flex items-center"
                            onClick={clearFilters}
                          >
                            <X size={16} className="mr-1" />
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {filteredStores.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-medium mb-2">No stores found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search or filter to find stores near you.
              </p>
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                View All Stores
              </button>
            </motion.div>
          ) : (
            <>
              {viewMode === 'list' ? (
                <div ref={storeListRef}>
                  {/* Store list view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStores.slice(0, visibleStores).map((store) => (
                      <motion.div 
                        key={store.id}
                        id={`store-${store.id}`}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold">{store.name}</h3>
                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">{store.state}</span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-start gap-3">
                              <MapPin className="text-primary shrink-0 h-5 w-5 mt-0.5" />
                              <p className="text-gray-700 text-sm">
                                {store.address}, {store.city}, {store.state} {store.zip}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Phone className="text-primary shrink-0 h-5 w-5" />
                              <p className="text-gray-700 text-sm">{store.phone}</p>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <Clock className="text-primary shrink-0 h-5 w-5 mt-0.5" />
                              <p className="text-gray-700 text-sm">{store.hours}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <a 
                              href={`https://maps.google.com/?q=${encodeURIComponent(store.address + ', ' + store.city + ', ' + store.state + ' ' + store.zip)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                            >
                              Get Directions
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                    
                  {/* Load More Button */}
                  {visibleStores < filteredStores.length && (
                    <div className="mt-10 text-center">
                      <button 
                        className="px-6 py-3 bg-primary text-white rounded-md flex items-center justify-center mx-auto"
                        onClick={handleLoadMore}
                      >
                        <span>View More Locations</span>
                        <ChevronDown className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Map view (placeholder)
                <div className="bg-gray-100 rounded-lg h-[70vh] overflow-hidden p-4 relative">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapIcon size={64} className="mx-auto mb-6 text-gray-400" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">Interactive Map</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        The interactive map feature would display all store locations with pins.
                        Users could click on pins to see store details.
                      </p>
                      <button 
                        onClick={() => setViewMode('list')}
                        className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
                      >
                        <List className="mr-2" size={18} />
                        Switch to List View
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* State Grouping Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Locations By State</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have over 80 stores across 5 states, making it easy to find a location near you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((state) => (
              <div
                key={state}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{state}</h3>
                  <div className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                    {storesByState[state].length} Stores
                  </div>
                </div>
                
                <div className="space-y-3">
                  {storesByState[state].slice(0, 3).map(store => (
                    <div key={store.id} className="flex items-start gap-3">
                      <MapPin className="text-primary shrink-0 h-5 w-5 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{store.name}</p>
                        <p className="text-sm text-gray-600">{store.city}</p>
                      </div>
                    </div>
                  ))}
                  
                  {storesByState[state].length > 3 && (
                    <p className="text-sm text-gray-500 italic">
                      And {storesByState[state].length - 3} more locations...
                    </p>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setSelectedState(state);
                      setSearchTerm("");
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center text-sm"
                  >
                    View All {state} Stores
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark">
          <ParticleNetwork 
            color="rgba(255, 255, 255, 0.5)" 
            lineColor="rgba(255, 255, 255, 0.2)"
            particleCount={40}
            speed={0.2}
            particleSize={2}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Need More Information?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
            If you have any questions about our stores or services, our team is ready to help you.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="tel:+18005551234" 
              className="bg-white text-primary hover:bg-gray-100 font-medium py-4 px-8 rounded-md transition-colors flex items-center justify-center text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Call Us</span>
            </a>
            
            <a 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white/10 font-medium py-4 px-8 rounded-md transition-colors flex items-center justify-center text-lg"
            >
              <span>Contact Us</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stores;