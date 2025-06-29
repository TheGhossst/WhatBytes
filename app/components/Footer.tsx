import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-blue-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="space-y-2">
            <div className="text-sm hover:text-blue-200 cursor-pointer">
              All
            </div>
            <div className="text-sm hover:text-blue-200 cursor-pointer">
              Electronic
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <div className="space-y-2">
            <div className="text-sm hover:text-blue-200 cursor-pointer">
              About Us
            </div>
            <div className="text-sm hover:text-blue-200 cursor-pointer">
              Contact
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-blue-800">
        <p className="text-sm text-blue-200">© 2024 American</p>
      </div>
    </div>
  );
}
