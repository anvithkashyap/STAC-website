import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/interactive', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/STAC-website/stac-logo.png"
              alt="STAC MoldTech"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading font-semibold text-sm uppercase tracking-wider transition-colors duration-300 relative group ${
                  isScrolled || location.pathname !== '/'
                    ? isActive(link.path)
                      ? 'text-stac-red'
                      : 'text-stac-charcoal hover:text-stac-red'
                    : isActive(link.path)
                    ? 'text-stac-red'
                    : 'text-white hover:text-stac-red-light'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-stac-red transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link to="/contact" className="btn-primary">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled || location.pathname !== '/'
                ? 'text-stac-charcoal'
                : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 bg-white rounded-lg mt-4 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-6 py-2 font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-stac-red bg-stac-gray'
                    : 'text-stac-charcoal hover:text-stac-red hover:bg-stac-gray'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-2">
              <Link to="/contact" className="btn-primary w-full text-center">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
