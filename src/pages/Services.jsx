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
      summary: 'High-precision injection molding services are delivered using state-of-the-art machinery designed to ensure accuracy, consistency, and efficiency across every stage of production.',
      details: [
        'The process supports projects of all sizes, ranging from early-stage prototypes to large-scale, high-volume manufacturing runs.',
        'Advanced capabilities include multi-cavity molds that enable the simultaneous production of multiple components, improving productivity and reducing cycle time.',
        'Insert molding allows metal or other components to be integrated directly into plastic parts, while over molding provides enhanced functionality and durability by combining multiple materials into a single product.',
        'Micro-molding capabilities support the creation of extremely small and intricate components, ensuring precision even in complex designs, while maintaining reliable high-volume production standards.'
      ]
    },
    {
      icon: Wrench,
      title: 'Tool Design & Engineering',
      summary: 'Expert mold design and engineering services focus on delivering optimized tooling solutions that enhance manufacturing efficiency, precision, and overall part quality.',
      details: [
        'Using advanced CAD/CAM design technologies, tool engineers develop highly accurate mold structures that support reliable and repeatable production.',
        'Detailed 3D modeling and simulation allow the team to visualize mold performance, identify potential issues, and refine designs before manufacturing begins. Design for Manufacturing (DFM) analysis further ensures that each mold is engineered for cost-effectiveness, durability, and ease of production.',
        'The service also includes prototype tooling for testing and validation of product concepts, followed by robust production tooling capable of supporting consistent, high-volume manufacturing with superior dimensional accuracy and performance.'
      ]
    },

    {
      icon: Cog,
      title: 'Precision Tooling',
      summary: 'Advanced tooling solutions are developed to meet complex manufacturing requirements where precision, durability, and tight tolerances are essential.',
      details: [
        'Using advanced CNC machining technologies, highly accurate components and tooling structures are produced with consistent quality and efficiency.',
        'EDM (Electrical Discharge Machining) services enable the creation of intricate shapes and fine details that are difficult to achieve with conventional machining methods. The process supports tight tolerance work, ensuring that each component meets strict dimensional and performance specifications. Specialization in complex geometries allows the production of sophisticated tooling designs required for demanding applications.',
        'In addition, comprehensive tool maintenance services help extend tool life, maintain accuracy, and ensure reliable performance throughout repeated production cycles.'
      ]
    },

    {
      icon: Package,
      title: 'Assembly Services',
      summary: 'Complete assembly and packaging solutions are designed to streamline the supply chain and improve operational efficiency from production to delivery. These services support a wide range of requirements, from simple part assemblies to complex multi-component product configurations.',
      details: [
        'Sub-assembly processes allow individual components to be pre-assembled, reducing time and effort during final production stages.',
        'Final assembly services ensure that all parts are accurately integrated into a finished product that meets quality standards.',
        'Comprehensive packaging solutions protect products during storage and transportation while maintaining a professional presentation.',
        'Kitting services organize multiple components into ready-to-use sets, and custom labeling ensures clear identification, traceability, and compliance with customer or industry requirements.'
      ]
    },

    {
      icon: Microscope,
      title: 'Quality Testing',
      summary: 'Rigorous quality control and testing protocols are implemented to ensure that every component consistently meets precise specifications and industry standards. Using advanced inspection equipment and well-documented quality procedures, each stage of production is carefully monitored to maintain accuracy and reliability.',
      details: [
        'VMM (Video Measuring Machine) for precision dimensions measuring and verification provides highly precise dimensional verification of parts, ensuring they conform to design requirements.',
        'First article inspection is conducted to validate the initial production sample before full-scale manufacturing begins.',
        'Statistical Process Control (SPC) is used to monitor production data and maintain process stability.',
        'In addition, material testing verifies the integrity and performance of raw materials, while detailed documentation ensures traceability, compliance, and continuous quality improvement throughout the manufacturing process.'
      ]
    },

    {
      icon: Shield,
      title: 'Quality Assurance',
      summary: 'ISO-certified processes ensure consistent quality, reliability, and accountability throughout every stage of production.',
      details: [
        'With a strong focus on structured systems and comprehensive documentation, operations are aligned with the standards of ISO 9001:2015 certification, demonstrating a commitment to internationally recognized quality management practices. Full traceability is maintained for materials, components, and production steps, allowing complete visibility and control across the manufacturing process.',
        'Process validation procedures are implemented to confirm that each process consistently delivers results that meet required specifications. Continuous improvement initiatives drive ongoing enhancements in efficiency, quality, and performance.',
        'In addition, customer audits are welcomed, reflecting transparency and confidence in maintaining the highest standards of manufacturing excellence.'
      ]
    },

    {
      icon: Settings,
      title: 'Secondary Operations',
      summary: 'Value-added secondary operations are provided to complete molded components and enhance their functionality, durability, and visual appeal. These processes help transform raw molded parts into fully finished products ready for final use or assembly.',
      details: [
        'Pad printing enables precise application of logos, markings, and graphics on complex surfaces, while hot stamping adds durable decorative finishes such as metallic or coloured foils.',
        'Ultrasonic welding is used to securely join plastic components through high-frequency vibration, creating strong and clean bonds without adhesives. Heat staking allows the reliable assembly of plastic parts with embedded components.',
        'In addition, a range of surface finishing techniques improve texture, appearance, and product quality, delivering comprehensive solutions for finished components.'
      ]
    },

    {
      icon: Truck,
      title: 'Logistics & Fulfilment',
      summary: 'Streamlined logistics and fulfillment services are designed to support efficient supply chain management and ensure timely delivery of products to customer facilities.',
      details: [
        'Through effective inventory management systems, stock levels are carefully monitored and maintained to prevent shortages or excess inventory.',
        'Just-in-Time (JIT) delivery practices help synchronize production and delivery schedules, reducing storage costs and improving operational efficiency.',
        'Drop shipping services allow products to be shipped directly to end users or designated locations without additional handling.',
        'Global logistics capabilities enable reliable coordination of international transportation and distribution. In addition, custom packaging solutions are provided to protect products during transit while meeting specific customer, branding, and regulatory requirements.'
      ]
    }
  ]

  const industries = [
    'Automotive',
    'Medical Devices',
    'Consumer Electronics',
    'Industrial Equipment',
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
