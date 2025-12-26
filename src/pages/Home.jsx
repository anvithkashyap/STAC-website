import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import { 
  Cog, 
  Wrench, 
  Shield, 
  Package, 
  Microscope, 
  Factory,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Clock
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const statsRef = useRef(null)

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

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number')
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.dataset.target)
          gsap.fromTo(stat, 
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: Factory,
      title: 'Injection Molding',
      description: 'High-precision injection molding with state-of-the-art machinery for consistent, quality parts production.'
    },
    {
      icon: Wrench,
      title: 'Tool Design',
      description: 'Expert mold design and engineering services tailored to your specific product requirements.'
    },
    {
      icon: Cog,
      title: 'Precision Tooling',
      description: 'Advanced tooling solutions with tight tolerances for complex manufacturing needs.'
    },
    {
      icon: Package,
      title: 'Assembly Services',
      description: 'Complete assembly and packaging solutions to streamline your supply chain.'
    },
    {
      icon: Microscope,
      title: 'Quality Testing',
      description: 'Rigorous quality control and testing protocols ensuring every part meets specifications.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'ISO-certified processes with comprehensive documentation and traceability.'
    }
  ]

  const stats = [
    { number: 50, suffix: '+', label: 'Years Experience', icon: Clock },
    { number: 500, suffix: '+', label: 'Projects Completed', icon: Award },
    { number: 100, suffix: '+', label: 'Happy Clients', icon: Users },
    { number: 99, suffix: '%', label: 'Quality Rate', icon: CheckCircle }
  ]

  const features = [
    'ISO 9001:2015 Certified',
    'State-of-the-art Machinery',
    'Expert Engineering Team',
    'On-time Delivery',
    'Competitive Pricing',
    'Custom Solutions'
  ]

  return (
    <>
      <HeroSection />

      {/* Core Capabilities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              What We Do
            </span>
            <h2 className="section-title">Core Capabilities</h2>
            <p className="section-subtitle mx-auto">
              Comprehensive plastic molding solutions from concept to delivery, 
              backed by decades of manufacturing expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <Link to="/services" className="btn-primary">
              View All Services
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stac-red relative overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
                About STAC MoldTech
              </span>
              <h2 className="section-title mb-6">
                Engineering Excellence Since Day One
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                STAC MoldTech has been at the forefront of precision plastic molding for decades. 
                Our commitment to quality, innovation, and customer satisfaction has made us a 
                trusted partner for businesses across industries.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With state-of-the-art facilities and a team of experienced engineers, we deliver 
                solutions that meet the most demanding specifications while maintaining competitive 
                pricing and on-time delivery.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={20} className="text-stac-red flex-shrink-0" />
                    <span className="text-sm font-medium text-stac-charcoal">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-secondary">
                Learn More About Us
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            <div className="animate-on-scroll relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/Images/stac-office.png"
                  alt="STAC MoldTech Facility"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stac-charcoal/30 to-transparent" />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-stac-red rounded-lg flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-xs uppercase tracking-wider">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stac-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-stac-red/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-stac-red/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how STAC MoldTech can bring your vision to life with precision 
              molding solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-stac-red hover:bg-stac-red-light">
                Get a Free Quote
              </Link>
              <Link to="/interactive" className="btn-outline-white">
                Try Our Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
