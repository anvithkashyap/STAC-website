import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from '../components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [
        'STAC MoldTech Facility',
        'Industrial Area, Bangalore',
        'Karnataka, India'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [
        '+91 98765 43210',
        '+91 80 1234 5678'
      ],
      isLink: true,
      linkType: 'tel'
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [
        'info@stacmoldtech.com',
        'sales@stacmoldtech.com'
      ],
      isLink: true,
      linkType: 'mailto'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      lines: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 1:00 PM'
      ]
    }
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
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Have a project in mind? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2 animate-on-scroll">
              <div className="bg-stac-gray rounded-lg p-8 md:p-10">
                <h2 className="font-heading font-bold text-2xl text-stac-charcoal mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="animate-on-scroll bg-stac-gray rounded-lg p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-stac-red/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} className="text-stac-red" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-stac-charcoal mb-2">
                        {info.title}
                      </h3>
                      {info.lines.map((line, idx) => (
                        info.isLink ? (
                          <a
                            key={idx}
                            href={`${info.linkType}:${line.replace(/\s/g, '')}`}
                            className="block text-gray-600 hover:text-stac-red transition-colors text-sm"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={idx} className="text-gray-600 text-sm">
                            {line}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-stac-gray">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452149498!3d12.954517008640543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="STAC MoldTech Location"
        />
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-stac-red font-semibold uppercase tracking-wider text-sm mb-4 block">
              FAQ
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'What is your typical lead time for new projects?',
                a: 'Lead times vary based on project complexity. Simple projects may take 4-6 weeks, while complex tooling can take 8-12 weeks. We provide detailed timelines during the quotation process.'
              },
              {
                q: 'Do you offer prototype services?',
                a: 'Yes, we offer rapid prototyping services including 3D printing and soft tooling for low-volume prototype runs before committing to production tooling.'
              },
              {
                q: 'What materials do you work with?',
                a: 'We work with a wide range of thermoplastics including ABS, PC, PP, PE, Nylon, POM, and engineering-grade materials. We can recommend the best material for your application.'
              },
              {
                q: 'What is your minimum order quantity?',
                a: 'We handle projects of all sizes, from prototype quantities to high-volume production runs of millions of parts. Contact us to discuss your specific requirements.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="animate-on-scroll bg-stac-gray rounded-lg p-6"
              >
                <h3 className="font-heading font-bold text-lg text-stac-charcoal mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
