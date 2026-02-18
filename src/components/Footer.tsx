import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a6 6 0 00-6 6v2H6v4h3v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
  </svg>
);

const YouTubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M23 7s-.2-1.7-.8-2.4C21.1 4 19.6 4 19.6 4H4.4s-1.5 0-2.6.6C1.2 5.3 1 7 1 7S1 9.1 1 11.2 1.2 15 1.2 15s.2 1.7.8 2.4C3 18.8 4.4 19 4.4 19h15.2s1.5-.2 2.6-.6c.6-.4.8-2.1.8-2.1S23 13.3 23 11.2 23 7 23 7z" />
    <path d="M9.8 15.5V7.5l6.2 4-6.2 4z" fill="white" />
  </svg>
);

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect width="24" height="24" rx="5" fill="#000"/>
    <path d="M17.53 6.47a.75.75 0 0 0-1.06 0l-4.47 4.47-4.47-4.47a.75.75 0 1 0-1.06 1.06l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.06 1.06l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.06-1.06l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.06z" fill="#fff"/>
  </svg>
);

const PinterestIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#E60023" />
    <path d="M12 6.5c-2.97 0-4.6 2.12-4.6 3.89 0 1.07.41 2.01 1.29 2.36.14.06.27 0 .31-.15.03-.11.09-.39.12-.5.04-.15.02-.2-.09-.33-.26-.31-.47-.89-.47-1.43 0-1.38 1.04-2.7 2.81-2.7 1.53 0 2.37.94 2.37 2.19 0 1.64-.73 3.03-1.81 3.03-.6 0-1.05-.5-.91-1.1.17-.7.5-1.45.5-1.95 0-.45-.24-.83-.74-.83-.59 0-1.07.61-1.07 1.43 0 .52.18.87.18.87s-.61 2.59-.72 3.06c-.21.89-.03 2.01-.02 2.12.01.08.11.1.16.04.07-.09.97-1.28 1.27-2.46.09-.33.52-2.04.52-2.04.26.5 1.01.94 1.81.94 2.38 0 3.99-2.16 3.99-4.52C16.6 8.13 14.7 6.5 12 6.5z" fill="#fff"/>
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z" />
  </svg>
);

const Footer = () => {
  const navigationLinks = [
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/aipowersense/", target: "_blank" },
    { label: "YouTube", icon: YouTubeIcon, href: "https://www.youtube.com/@AIPowerSense", target: "_blank" },
    { label: "X", icon: XIcon, href: "https://x.com/aipowersense", target: "_blank" },
    { label: "Pinterest", icon: PinterestIcon, href: "https://www.pinterest.com/aipowersense/", target: "_blank" },
    { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/ai-powersense/", target: "_blank" },
  ];
  return (
    <footer className="relative pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Navigation and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 pb-8 sm:pb-10 md:pb-12 border-b border-white/5">
          {/* Navigation Links */}
          <div>
            <h3 className="font-display font-black text-white uppercase mb-6 tracking-wider">Navigation</h3>
            <div className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-muted-foreground font-tech text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-display font-black text-white uppercase mb-6 tracking-wider">Legal</h3>
            <div className="space-y-3">
              <Link
                to="/privacy-policy"
                className="block text-muted-foreground font-tech text-sm hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="block text-muted-foreground font-tech text-sm hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="font-display font-black text-white uppercase mb-6 tracking-wider">Follow Us</h3>
            <div className="flex gap-4 mt-8">
              {socialLinks.map(({ label, icon: Icon, href, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-transform duration-200 hover:scale-110"
                  style={{
                    color:
                      label === "Facebook" ? "#1877F3" :
                      label === "YouTube" ? "#FF0000" :
                      label === "X" ? "#000" :
                      label === "Pinterest" ? "#E60023" :
                      label === "LinkedIn" ? "#0077B5" :
                      undefined
                  }}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground font-tech text-xs tracking-widest uppercase">
            © 2026 AIPOWERSENSE — Advanced Energy Intelligence Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
