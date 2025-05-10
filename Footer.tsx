import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#15191E] text-gray-300 py-12">
      <div className="container mx-auto px-6">
        {/* Company description */}
        <div className="mb-10">
          <p className="text-lg font-light mb-8">
            An authorized Boost Mobile dealer providing mobile services, devices, and accessories across 5 states.
          </p>
        </div>
        
        {/* Simple navigation links */}
        <div className="space-y-4 mb-8">
          <FooterLink href="/" label="Home" />
          <FooterLink href="/about" label="About Us" />
          <FooterLink href="/stores" label="Find a Store" />
          <FooterLink href="/careers" label="Careers" />
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
          <p>&copy; {currentYear} RB First Connect. All rights reserved.</p>
        </div>
      </div>
      
      {/* Removed fixed chat button as it's now in the ChatWidget component */}
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <div>
    <Link href={href} className="text-gray-300 hover:text-white transition-colors text-lg">
      {label}
    </Link>
  </div>
);

export default Footer;
