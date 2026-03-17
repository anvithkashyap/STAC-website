import { useEffect, useState } from 'react'
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
  CheckCircle,
  ChevronDown
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null)

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

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const services = [
    {
      icon: Factory,
      title: 'Injection Moulding',
      summary: 'High-precision injection molding services using state-of-the-art machinery for projects of all sizes.',
      details: [
        'State-of-the-art machinery designed for accuracy, consistency, and efficiency',
        'Support for prototypes to large-scale, high-volume manufacturing runs',
        'Multi-cavity molds for simultaneous production of multiple components',
        'Insert molding to integrate metal or other components directly into plastic parts',
        'Over molding for enhanced functionality and durability',
        'Micro-molding capabilities for extremely small and intricate components'
      ]
    },
    {
      icon: Wrench,
      title: 'Tool Design & Engineering',
      summary: 'Expert mold design and engineering services focused on optimized tooling solutions.',
      details: [
        'Advanced CAD/CAM design technologies for highly accurate mold structures',
        'Detailed 3D modeling and simulation to visualize mold performance',
        'Design for Manufacturing (DFM) analysis for cost-effectiveness and durability',
        'Prototype tooling for testing and validation of product concepts',
        'Production tooling for consistent, high-volume manufacturing',
        'Superior dimensional accuracy and performance'
      ]
    },
    {
      icon: Cog,
      title: 'Precision Tooling',
      summary: 'Advanced tooling solutions for complex manufacturing with precision and tight tolerances.',
      details: [
        'Advanced CNC machining for highly accurate components',
        'EDM (Electrical Discharge Machining) for intricate shapes and fine details',
        'Tight tolerance work ensuring strict dimensional specifications',
        'Specialization in complex geometries for demanding applications',
        'Comprehensive tool maintenance to extend tool life',
        'Reliable performance throughout repeated production cycles'
      ]
    },
    {
      icon: Package,
      title: 'Assembly Services',
      summary: 'Complete assembly and packaging solutions to streamline your supply chain.',
      details: [
        'Sub-assembly processes for pre-assembled components',
        'Final assembly ensuring accurate integration into finished products',
        'Comprehensive packaging solutions for storage and transportation',
        'Kitting services organizing components into ready-to-use sets',
        'Custom labeling for clear identification and traceability',
        'Support from simple assemblies to complex multi-component products'
      ]
    },
    {
      icon: Microscope,
      title: 'Quality Testing',
      summary: 'Rigorous quality control and testing protocols ensuring every component meets specifications.',
      details: [
        'CMM (Coordinate Measuring Machine) inspection for precise dimensional verification',
        'First article inspection to validate initial production samples',
        'Statistical Process Control (SPC) to monitor production data',
        'Material testing to verify integrity and performance of raw materials',
        'Detailed documentation ensuring traceability and compliance',
        'Advanced inspection equipment and well-documented quality procedures'
      ]
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      summary: 'ISO-certified processes ensuring consistent quality, reliability, and accountability.',
      details: [
        'ISO 9001:2015 certification demonstrating quality management practices',
        'Full traceability for materials, components, and production steps',
        'Process validation to confirm consistent results',
        'Continuous improvement initiatives for efficiency and performance',
        'Customer audits welcomed with transparency and confidence',
        'Complete visibility and control across manufacturing process'
      ]
    },
    {
      icon: Settings,
      title: 'Secondary Operations',
      summary: 'Value-added secondary operations to complete molded components.',
      details: [
        'Pad printing for precise application of logos and graphics',
        'Hot stamping for durable decorative finishes',
        'Ultrasonic welding to securely join plastic components',
        'Heat staking for reliable assembly with embedded components',
        'Surface finishing techniques to improve texture and appearance',
        'Transform raw molded parts into fully finished products'
      ]
    },
    {
      icon: Truck,
      title: 'Logistics & Fulfilment',
      summary: 'Streamlined logistics and fulfillment services for efficient supply chain management.',
      details: [
        'Effective inventory management systems to monitor stock levels',
        'Just-in-Time (JIT) delivery to reduce storage costs',
        'Drop shipping services for direct delivery to end users',
        'Global logistics capabilities for international coordination',
        'Custom packaging solutions meeting regulatory requirements',
        'Timely delivery of products to customer facilities'
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-stac-red"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}stac-office.png)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stac-red/95 via-stac-red-dark/90 to-stac-charcoal/95" />
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

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {services.map((service, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-stac-gray rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-auto"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-stac-red/10 flex items-center justify-center flex-shrink-0">
                      <service.icon size={28} className="text-stac-red" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-stac-charcoal mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleCard(index)}
                    className="w-full flex items-center justify-between text-stac-red font-semibold text-sm mt-4 hover:text-stac-red-dark transition-colors"
                  >
                    <span>{expandedCard === index ? 'Show Less' : 'Learn More'}</span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${expandedCard === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedCard === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 bg-white">
                    <ul className="space-y-2.5">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-stac-red flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{detail}</span>
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
              Contact us today to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-stac-red hover:bg-stac-red-light">
                Contact Us
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/about" className="btn-outline-white">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
