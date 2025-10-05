import { Lightbulb } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    solutions: [
      { name: "Idea Sharing", href: "#" },
      { name: "Community Voting", href: "#" },
      { name: "Trending Ideas", href: "#" },
      { name: "Categories", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    learn: [
      { name: "Blog", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Resources", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                IdeaBoard
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Where ideas meet community feedback and innovation thrives.
            </p>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Learn</h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            ©IdeaBoard 2025. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-sm font-medium mr-2">
              Follow us on
            </span>
            <a
              href="#"
              className="w-10 h-10 bg-slate-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
            >
              <svg
                className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
            >
              <svg
                className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
            >
              <svg
                className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
