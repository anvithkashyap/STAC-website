import { useEffect, useState } from 'react'
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
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Quote,
  Building2,
  Cog,
  Warehouse,
  Sun,
  Droplets,
  TreePine
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const testimonials = [
    {
      quote: "STAC - A Legacy business partner of over 30 Years!! STAC has been our trusted business partner and one-stop solution for delivering high-precision, intricate components with an unwavering commitment to excellence. What sets STAC apart? Right First Time (RFT) quality, Affordable solutions without compromising on accuracy, Short lead times that keep our projects on track. When it comes to reliability, craftsmanship, and speed — STAC delivers every time.",
      name: "C.P. Navneeth Kumar",
      title: "Executive Advisor",
      company: "MAL Group"
    },
    {
      quote: "STAC is an excellent Company with matured management & technical Team. This company is a one stop solution for critical plastic parts design & Manufacturing. Quality of Moulds/Plastic parts produced are in Par with best in automotive industry.",
      name: "Ganesh Naidu GN",
      title: "General Manager - Cable Technology",
      company: "Suprajit Automotive Private Limited"
    },
    {
      quote: "We've been working with the STAC MoldTech Private Limited for several years, and their commitment to excellence has been outstanding. Their precision in plastic parts tooling & manufacturing, top-notch setup, and consistent on-time delivery make them a reliable partner. Their collaborative approach and eagerness to go the extra mile for customer satisfaction truly set them apart.",
      name: "Vaibhav Deshmukh",
      title: "Engineering Manager",
      company: "Medical Gas Solutions (MGS) Division"
    },
    {
      quote: "We, Cummins Generator Technologies India Pvt. Ltd. (CGT India) have the privilege of working with STAC for over 30 years, and their partnership has been nothing short of exceptional. Throughout our association, they have consistently delivered excellent service, demonstrating a deep understanding of our business needs and operational goals.",
      name: "Dinesh S Zapake",
      title: "Operations Leader",
      company: "CGT India, Cummins Inc."
    },
    {
      quote: "We have been associated with STAC for more than 15 years now and value their consistent quality, reliability, and support. Their team is responsive, technically sound especially in tool building and committed to excellence, making them a trusted and long-term partner in our supply chain.",
      name: "S. Mahesh Hegde",
      title: "VP-Operations",
      company: "Suprajit Automotive Private Limited"
    },
    {
      quote: "It is a great experience working with your company. Till date there are billions of plastic parts supplied from your company that are running on our customer car brands like BMW Group, VW Group, Renault, Nissan, Suzuki & many more world class automotive companies. The quality of your parts & moulding tools is great.",
      name: "Ravi A G",
      title: "Plant Head",
      company: "Suprajit Automotive Private Limited"
    }
  ]

  const engineeringPlastics = [
    'Nylon 66 33% GF - Zytel 70G33I BK031 from Celanese',
    'Nylon 66 UF - Zytel 101 LBK from Celanese',
    'Nylon 66 GF 30% - Zytel 70G30HSL BK from Celanese',
    'POM - Delrin 500P BK from Dupont',
    'Nylon 6 30% GF - Akulon K224 HG6 from DSM Polymers',
    'Nylon 66 UF - Zytel MT409AHS from Celanese',
    'ABS FR AN450N from Bhansali Polymers',
    'Nylon 66 25% FR - Zytel FR50 BK505 from Celanese',
    'PP GF 30% - Thermofil GPP 1630 from Sumika Polymers',
    'ABS-PC Blend - Cycoly C1200HF-1001 from Sabic Engineering Polymers',
    'Nylon 66 Carbon + Glass fiber filled - RTP 299 X 131721 BLK from RTP Singapore',
    'Antimicrobial additive - Biomaster 966 from Admaster UK',
    'PPS GF 40% - Torelina A504X90 from Toray Industries, Japan',
    'PPA 33%GF - Amodel AS-4133 L from Solvay Speciality Polymers, USA'
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const carouselImages = [
    '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', 
    '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg',
    '11.jpeg', '12.jpeg', '13.jpeg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

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
      year: '2013',
      title: 'New Plant at Kunigal',
      description: 'Inaugurated a new manufacturing plant with over 9,000 sq.ft. at Kunigal to meet increasing production demands.'
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
                  At STAC, we are moulded to <span className="italic font-semibold text-stac-red">"exceed Customer Delight"</span> — delivering beyond expectations in every project we undertake.
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
                  Through <span className="font-semibold text-stac-red">"SMART</span> team effort" and "delighted customers," we pave our path to the summit of excellence in products, services, and inclusive growth.
                </p>
              </div>

              <div className="animate-on-scroll">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-stac-red/10 flex items-center justify-center">
                    <Heart size={24} className="text-stac-red" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-stac-charcoal">Our Motivation</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Quality, Consistency, Commitment
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
            <div className="text-left max-w-4xl mx-auto">
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-stac-red mr-3 mt-1">•</span>
                  <span>The manufacturing plant has taken significant steps toward sustainability and operational resilience by integrating modern infrastructure and environmental practices.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stac-red mr-3 mt-1">•</span>
                  <span>It has implemented a rainwater harvesting system along with groundwater recharge mechanisms to conserve and replenish water resources.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stac-red mr-3 mt-1">•</span>
                  <span>To reduce dependence on conventional energy, solar panels have been installed to generate clean electricity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stac-red mr-3 mt-1">•</span>
                  <span>The facility is supported by a UPS-backed power infrastructure, ensuring uninterrupted operations even during outages.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-stac-red mr-3 mt-1">•</span>
                  <span>Additionally, a comprehensive fire compliance system has been established to enhance safety standards and protect both personnel and assets.</span>
                </li>
              </ul>
            </div>
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

      {/* ISO Certification Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <img
                src={`${import.meta.env.BASE_URL}images/iso/42518967-ebfe-4cbd-82f0-99ef006c8df4.png`}
                alt="ISO 9001:2015 Certificate"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                loading="lazy"
              />
            </div>

            <div className="animate-on-scroll">
              <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
                Quality Assurance
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stac-charcoal mb-6">
                ISO Certified Excellence
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                STAC is ISO certified since 2007, demonstrating our unwavering commitment to 
                quality management and continuous improvement in all our processes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 p-4 bg-stac-gray rounded-lg">
                  <CheckCircle size={20} className="text-stac-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stac-charcoal">ISO 9001:2015 Certified</h4>
                    <p className="text-sm text-gray-600">Quality Management System certification by TÜV NORD</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-stac-gray rounded-lg">
                  <CheckCircle size={20} className="text-stac-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stac-charcoal">IATF 16949:2016 Program</h4>
                    <p className="text-sm text-gray-600">Automotive Quality Management System program started, planning certification audit in next 6 months</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-stac-gray rounded-lg">
                  <CheckCircle size={20} className="text-stac-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-stac-charcoal">Precision Manufacturing</h4>
                    <p className="text-sm text-gray-600">Manufacture and Supply of Precision Plastic Injection Moulded Components and Assemblies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Memorial Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stac-charcoal mb-4">
                Remembering Late Sri. Chandrashekar C V
              </h2>
            </div>

            <div className="animate-on-scroll">
              <div className="bg-stac-gray rounded-2xl p-6 shadow-xl">
                <div className="flex justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}images/Remember.jpeg`}
                    alt="Late Sri. Chandrashekar C V"
                    className="rounded-lg shadow-2xl w-64 h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
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

      {/* Customer Testimonials Carousel */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              Testimonials
            </span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-stac-gray rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <Quote size={60} className="absolute top-6 left-6 text-stac-red/10" />
              
              <div className="relative z-10">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-stac-charcoal text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].title}
                    </p>
                    <p className="text-stac-red font-semibold text-sm">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-stac-red hover:text-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-stac-red hover:text-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-stac-red' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Expansion Section */}
      <section className="section-padding bg-stac-charcoal text-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="text-stac-orange font-semibold uppercase tracking-wider text-sm mb-4 block">
              Growth & Expansion
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Future Ready</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Investing in tomorrow with expanded facilities, new equipment, and enhanced capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-lg bg-stac-red/20 flex items-center justify-center mb-6">
                <Building2 size={28} className="text-stac-orange" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">New Building</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The new building, adjacent to our existing shopfloor, is completed and partially operational. 
                13,200 sq.ft. of floor space on the ground floor with goods lift for easy material movement 
                and about 11,300 sq.ft. on the Mezzanine, 1st & 2nd Floors with a passenger lift for staff.
              </p>
            </div>

            <div className="animate-on-scroll bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-lg bg-stac-red/20 flex items-center justify-center mb-6">
                <Cog size={28} className="text-stac-orange" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">New Equipment</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                STAC has a planned expansion program split over multiple phases over the next 2 years to add 
                new equipment as per customer/project requirements. These include equipment for production, 
                vertical and horizontal injection moulding machines, automation, inspection, toolroom machineries.
              </p>
            </div>

            <div className="animate-on-scroll bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-lg bg-stac-red/20 flex items-center justify-center mb-6">
                <Warehouse size={28} className="text-stac-orange" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">New Facilities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ground floor includes Moulding Shop-Floor, Inspection, Tool Room, Goods Receiving and Dispatch area, 
                Raw Material & FG storage, Packing Area & Reception. Upper floors house Assembly Section, 
                Office Spaces, Training room, Conferencing Facilities, and UV curing area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Plastics Section */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              Materials Expertise
            </span>
            <h2 className="section-title">Engineering Plastics Processed at STAC</h2>
            <p className="section-subtitle mx-auto">
              We work with a wide range of high-performance engineering plastics from leading global suppliers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {engineeringPlastics.map((plastic, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-3"
              >
                <CheckCircle size={18} className="text-stac-red flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{plastic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment Consciousness Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
                Sustainability
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stac-charcoal mb-6">
                Environment Consciousness
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At STAC, we are committed to sustainable manufacturing practices and reducing our environmental footprint. 
                Our initiatives reflect our dedication to a greener future.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Sun, text: 'Planning to install 135 KVA Solar roof top panels' },
                  { icon: Leaf, text: 'Environmentally friendly plant operations' },
                  { icon: Droplets, text: 'Rain water harvesting system installed' },
                  { icon: TreePine, text: 'Supporting the GREEN revolution with lush green lung space in our premises' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-stac-gray rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll">
              <img
                src={`${import.meta.env.BASE_URL}images/facility-3.jpg`}
                alt="STAC Green Initiative"
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
