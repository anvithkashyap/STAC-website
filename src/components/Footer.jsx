import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stac-charcoal text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Precision Plastic Molding Specialists. Delivering excellence in injection molding, 
              tooling design, and manufacturing solutions for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/products', label: 'Products' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-stac-blue transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Injection Molding',
                'Tool Design',
                'Precision Tooling',
                'Assembly Services',
                'Quality Testing',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-stac-blue transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-stac-blue flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">
                  2nd Phase, KIADB Industrial Area,<br />
                  Plot no 8, Road, Kunigal,<br />
                  Kallanaikanahalli, Karnataka 572130
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-stac-blue flex-shrink-0" />
                <a
                  href="tel:+919148771815"
                  className="text-gray-400 hover:text-stac-blue transition-colors text-sm"
                >
                  +91 91487 71815 (Shankar C V)
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-stac-blue flex-shrink-0" />
                <a
                  href="mailto:Admin@stacmoldtech.in"
                  className="text-gray-400 hover:text-stac-blue transition-colors text-sm"
                >
                  Admin@stacmoldtech.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} STAC MoldTech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-stac-blue transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-stac-blue transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
