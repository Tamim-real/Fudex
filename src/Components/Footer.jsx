import React from "react";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <Phone size={18} /> +880 1234 567 890
          </p>
          <p className="flex items-center gap-2 mb-2">
            <Mail size={18} /> support@fudex.com
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={18} /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-400"><Facebook size={22} /></a>
            <a href="#" className="hover:text-red-400"><Instagram size={22} /></a>
            <a href="#" className="hover:text-red-400"><Twitter size={22} /></a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Working Hours</h3>
          <p className="flex items-center gap-2 mb-1">
            <Clock size={18} /> Mon – Fri: 10 AM – 10 PM
          </p>
          <p className="flex items-center gap-2">
            <Clock size={18} /> Sat – Sun: 12 PM – 11 PM
          </p>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} <span className="text-red-400 font-semibold">Fudex</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
