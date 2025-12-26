import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Factory, 
  Wrench, 
  Cog, 
  Package, 
  Microscope, 
  Shield,
  Settings,
  Truck,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: Factory,
      title: 'Injection Molding',
      description: 'High-precision injection molding services using state-of-the-art machinery. We handle projects of all sizes, from prototypes to high-volume production runs.',
      features: [
        'Multi-cavity molds',
        'Insert molding',
        'Overmolding',
        'Micro-molding capabilities',
        'High-volume production'
      ]
    },
    {
      icon: Wrench,
      title: 'Tool Design & Engineering',
      description: 'Expert mold design and engineering services. Our team creates optimized tooling solutions that maximize efficiency and part quality.',
      features: [
        'CAD/CAM design',
        '3D modeling & simulation',
        'DFM analysis',
        'Prototype tooling',
        'Production tooling'
      ]
    },
    {
      icon: Cog,
      title: 'Precision Tooling',
      description: 'Advanced tooling solutions with tight tolerances for complex manufacturing needs. We specialize in intricate geometries and demanding specifications.',
      features: [
        'CNC machining',
        'EDM services',
        'Tight tolerance work',
        'Complex geometries',
        'Tool maintenance'
      ]
    },
    {
      icon: Package,
      title: 'Assembly Services',
      description: 'Complete assembly and packaging solutions to streamline your supply chain. From simple assemblies to complex multi-component products.',
      features: [
        'Sub-assembly',
        'Final assembly',
        'Packaging solutions',
        'Kitting services',
        'Custom labeling'
      ]
    },
    {
      icon: Microscope,
      title: 'Quality Testing',
      description: 'Rigorous quality control and testing protocols ensuring every part meets your specifications. Advanced inspection equipment and documented processes.',
      features: [
        'CMM inspection',
        'First article inspection',
        'Statistical process control',
        'Material testing',
        'Documentation'
      ]
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'ISO-certified processes with comprehensive documentation and traceability. We maintain the highest standards throughout production.',
      features: [
        'ISO 9001:2015 certified',
        'Full traceability',
        'Process validation',
        'Continuous improvement',
        'Customer audits welcome'
      ]
    },
    {
      icon: Settings,
      title: 'Secondary Operations',
      description: 'Value-added secondary operations to complete your parts. From finishing to decoration, we provide comprehensive solutions.',
      features: [
        'Pad printing',
        'Hot stamping',
        'Ultrasonic welding',
        'Heat staking',
        'Surface finishing'
      ]
    },
    {
      icon: Truck,
      title: 'Logistics & Fulfillment',
      description: 'Streamlined logistics and fulfillment services. We manage inventory and shipping to ensure on-time delivery to your facilities.',
      features: [
        'Inventory management',
        'JIT delivery',
        'Drop shipping',
        'Global logistics',
        'Custom packaging'
      ]
    }
  ]

  const industries = [
    'Automotive',
    'Medical Devices',
    'Consumer Electronics',
    'Industrial Equipment',
    'Aerospace',
    'Consumer Products'
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stac-charcoal to-stac-red-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="text-stac-orange font-semibold uppercase tracking-wider text-sm mb-4 block animate-fade-in">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
              Capabilities & Services
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Comprehensive plastic molding solutions from concept to delivery, 
              backed by decades of manufacturing expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              What We Offer
            </span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle mx-auto">
              End-to-end manufacturing solutions tailored to your specific requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-stac-gray rounded-lg p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-stac-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-stac-red transition-colors duration-300">
                    <service.icon 
                      size={32} 
                      className="text-stac-red group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-stac-charcoal mb-3 group-hover:text-stac-red transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-stac-red flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-stac-red">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our expertise spans multiple industries, delivering specialized solutions 
              for diverse manufacturing needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white font-semibold">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              How We Work
            </span>
            <h2 className="section-title">Our Process</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your requirements and project goals.' },
              { step: '02', title: 'Design', desc: 'Our engineers create optimized tooling designs.' },
              { step: '03', title: 'Production', desc: 'Precision manufacturing with quality controls.' },
              { step: '04', title: 'Delivery', desc: 'On-time delivery with full documentation.' }
            ].map((item, index) => (
              <div key={index} className="animate-on-scroll text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stac-red text-white flex items-center justify-center">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-stac-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stac-charcoal">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Contact us today to discuss your requirements and get a customized quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-stac-red hover:bg-stac-red-light">
                Request a Quote
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/interactive" className="btn-outline-white">
                Try Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
