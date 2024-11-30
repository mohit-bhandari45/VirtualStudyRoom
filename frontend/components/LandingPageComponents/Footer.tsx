import { FC } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#features" className="hover:text-gray-400">Features</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
              <li><a href="#terms" className="hover:text-gray-400">Terms of Service</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#help" className="hover:text-gray-400">Help Center</a></li>
              <li><a href="#blog" className="hover:text-gray-400">Blog</a></li>
              <li><a href="#privacy" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-gray-400">FAQ</a></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Stay Connected</h3>
            <p className="text-gray-400">Follow us on our social media platforms for the latest updates!</p>
            <div className="flex space-x-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaLinkedin /></a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-gray-400">Sign up for our newsletter to get the latest updates directly in your inbox.</p>
            <form className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              <button type="submit" className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Virtual Study Room. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
