import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  Leaf,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
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

      // Timeline animation
      gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every part we produce meets exacting standards with tolerances measured in microns.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'ISO-certified processes ensure consistent excellence in every project we undertake.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We work alongside our clients as true partners, invested in their success.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to environmentally responsible manufacturing practices.'
    }
  ]

  const timeline = [
    {
      year: '1992',
      title: 'Foundation',
      description: 'STAC began its journey with humble beginnings in a 380 sq.ft. rented shed, driven by a passion for precision manufacturing.'
    },
    {
      year: '2005-06',
      title: 'New Integrated Facility',
      description: 'Established a new integrated facility spanning 5,000 sq.ft., combining tool room and production capabilities under one roof.'
    },
    {
      year: '2007-08',
      title: 'ISO 9001 Certification',
      description: 'Achieved ISO 9001 certification, marking our commitment to international quality standards and process excellence.'
    },
    {
      year: '2011',
      title: 'Revenue Milestone',
      description: 'Doubled our sales revenue from ₹1.5 Cr to ₹3 Cr, reflecting growing customer trust and market expansion.'
    },
    {
      year: '2013',
      title: 'New Plant at Kunigal',
      description: 'Inaugurated a new manufacturing plant with over 9,000 sq.ft. at Kunigal to meet increasing production demands.'
    },
    {
      year: '2016-17',
      title: 'Turnover Milestone',
      description: 'Achieved a significant turnover of ₹5 Cr INR, establishing STAC as a trusted name in the industry.'
    },
    {
      year: '2022',
      title: '30th Anniversary',
      description: 'Celebrated our 30th anniversary on November 13th, commemorating three decades of precision engineering excellence.'
    },
    {
      year: '2023',
      title: 'Corporate Transformation',
      description: 'Transformed into STAC MoldTech Private Limited on April 22nd, marking a new chapter in our corporate journey.'
    },
    {
      year: '2024-25',
      title: 'Future Expansion',
      description: 'Embarking on an ambitious expansion project, growing our plant capacity from 9,000 sq.ft. to over 24,500 sq.ft.'
    }
  ]

  const certifications = [
    'ISO 9001:2015 Certified',
    'Quality Management System',
    'Environmental Compliance',
    'Safety Standards Certified'
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
              Our Story
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Decades of precision engineering, innovation, and unwavering commitment 
              to excellence in plastic molding.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <img
                src={`${import.meta.env.BASE_URL}images/facility-1.jpg`}
                alt="STAC MoldTech Facility"
                className="rounded-lg shadow-2xl w-full"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-8">
              <div className="animate-on-scroll">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-stac-red/10 flex items-center justify-center">
                    <Target size={24} className="text-stac-red" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-stac-charcoal">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To deliver precision plastic molding solutions that exceed expectations, 
                  combining cutting-edge technology with decades of expertise to help our 
                  clients succeed in their markets.
                </p>
              </div>

              <div className="animate-on-scroll">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-stac-red/10 flex items-center justify-center">
                    <Eye size={24} className="text-stac-red" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-stac-charcoal">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted name in precision plastic molding, recognized 
                  globally for our quality, innovation, and commitment to sustainable 
                  manufacturing practices.
                </p>
              </div>

              <div className="animate-on-scroll">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-stac-red/10 flex items-center justify-center">
                    <Heart size={24} className="text-stac-red" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-stac-charcoal">Our Promise</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Every project receives our full attention and expertise. We stand behind 
                  our work with comprehensive quality guarantees and responsive support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              What Drives Us
            </span>
            <h2 className="section-title">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="animate-on-scroll bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stac-red/10 flex items-center justify-center">
                  <value.icon size={32} className="text-stac-red" />
                </div>
                <h3 className="font-heading font-bold text-xl text-stac-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              Our Journey
            </span>
            <h2 className="section-title">Company Timeline</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-stac-red/20 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`timeline-item relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <span className="text-stac-red font-bold text-lg">{item.year}</span>
                      <h3 className="font-heading font-bold text-xl text-stac-charcoal mt-2 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-stac-red rounded-full border-4 border-white shadow hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              Our Facility
            </span>
            <h2 className="section-title">Manufacturing Excellence</h2>
            <p className="section-subtitle mx-auto">
              A glimpse into our state-of-the-art manufacturing facility at Kunigal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: `${import.meta.env.BASE_URL}images/facility-1.jpg`, alt: 'STAC Manufacturing Floor' },
              { src: `${import.meta.env.BASE_URL}images/facility-2.jpg`, alt: 'Injection Molding Machines' },
              { src: `${import.meta.env.BASE_URL}images/facility-3.jpg`, alt: 'Quality Control Area' },
              { src: `${import.meta.env.BASE_URL}images/facility-4.jpg`, alt: 'Tool Room' }
            ].map((image, index) => (
              <div 
                key={index}
                className="animate-on-scroll overflow-hidden rounded-lg shadow-lg group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-stac-charcoal text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="text-stac-orange font-semibold uppercase tracking-wider text-sm mb-4 block">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                The People Behind STAC
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our team combines decades of experience with fresh perspectives, creating 
                a dynamic environment where innovation thrives. From skilled engineers to 
                dedicated quality specialists, every team member is committed to excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={18} className="text-stac-orange flex-shrink-0" />
                    <span className="text-sm text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary bg-stac-orange hover:bg-orange-600">
                Join Our Team
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            <div className="animate-on-scroll">
              <img
                src={`${import.meta.env.BASE_URL}images/facility-2.jpg`}
                alt="STAC MoldTech Team"
                className="rounded-lg shadow-2xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stac-red">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Discover how our expertise can help bring your projects to life.
            </p>
            <Link to="/contact" className="btn-outline-white">
              Get in Touch
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
