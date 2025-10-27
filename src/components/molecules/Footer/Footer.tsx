/**
 * Footer Component
 * 
 * Application footer with copyright and links.
 */

import { FooterProps } from './Footer.types';

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const footerClasses = [
    'bg-gray-900 text-gray-400 mt-auto',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={footerClasses}>
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
          {/* Copyright */}
          <p>© 2025 ProductHub. All rights reserved.</p>

          {/* Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors focus:outline-none focus:underline"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors focus:outline-none focus:underline"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors focus:outline-none focus:underline"
              onClick={(e) => e.preventDefault()}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
