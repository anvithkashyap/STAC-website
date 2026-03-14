import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-stac-red"
          style={{
            backgroundImage: 'url(./stac-office.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stac-red/95 via-stac-red-dark/90 to-stac-charcoal/95" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-stac-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

      </div>

      {/* Company Name Banner */}
      <div className="absolute top-20 left-0 right-0 z-20 bg-white py-4 animate-slide-up">
        <div className="container-custom text-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-nyala">
            <span className="text-stac-red font-bold">STAC</span> <span className="text-stac-blue">MoldTech Private Limited</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white pt-8">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            PRECISION PLASTIC
            <span className="block text-stac-orange">MOLDING SPECIALISTS</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Manufacturers of Precision Plastic Injection Moulding Tools, Supply of Precision Injection Moulded Parts and Allied Assemblies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/services" className="btn-outline-white">
              Explore Services
            </Link>
            <Link to="/contact" className="btn-primary bg-stac-orange hover:bg-orange-600">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  )
}

export default HeroSection
