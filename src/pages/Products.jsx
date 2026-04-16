import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, X, ZoomIn } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'moulds', label: 'Moulds & Dies' },
    { id: 'components', label: 'Plastic Components' },
    { id: 'mechanical', label: 'Mechanical Parts' },
    { id: 'electronics', label: 'Electronic Enclosures' },
    { id: 'industrial', label: 'Industrial Parts' }
  ]

  const products = [
    {
      id: 1,
      name: '3D CAD Industrial Contactor',
      category: 'electronics',
      image: 'Product/3d_cad_industrial_electromagnetic_contactor.png',
      description: 'Precision 3D CAD design for industrial electromagnetic contactors'
    },
    {
      id: 2,
      name: 'Analog Pressure Gauge',
      category: 'mechanical',
      image: 'Product/analog_pressure_gauge__exploded_view__internal_mechanism.png',
      description: 'Exploded view showing internal mechanism of analog pressure gauges'
    },
    {
      id: 3,
      name: 'Electromechanical Relays',
      category: 'electronics',
      image: 'Product/electromechanical_relays__assorted_modules__flat_lay.png',
      description: 'Assorted electromechanical relay modules for industrial applications'
    },
    {
      id: 4,
      name: 'Flashlight Internal Components',
      category: 'components',
      image: 'Product/flashlight_torch__exploded_view__internal_components.png',
      description: 'Exploded view of flashlight torch internal components'
    },
    {
      id: 5,
      name: 'Handheld Flashlight',
      category: 'components',
      image: 'Product/flashlight_torch__handheld_device__product_render.png',
      description: 'Product render of handheld flashlight torch device'
    },
    {
      id: 6,
      name: 'Electronic Device Enclosure',
      category: 'electronics',
      image: 'Product/handheld_electronic_device__enclosure_design__top_view.png',
      description: 'Top view of handheld electronic device enclosure design'
    },
    {
      id: 7,
      name: 'POS Terminal Components',
      category: 'electronics',
      image: 'Product/handheld_pos_terminal__internal_components__exploded_view.png',
      description: 'Exploded view of handheld POS terminal internal components'
    },
    {
      id: 8,
      name: 'Industrial Contactor Assembly',
      category: 'industrial',
      image: 'Product/industrial_contactor__exploded_view__enclosure_and_internal_modules.png',
      description: 'Industrial contactor with enclosure and internal modules'
    },
    {
      id: 9,
      name: 'Multi-Module Contactor Array',
      category: 'industrial',
      image: 'Product/industrial_contactors__multi_module_array__rack_mounted.png',
      description: 'Rack-mounted multi-module industrial contactor array'
    },
    {
      id: 10,
      name: 'Control Panel Parts',
      category: 'industrial',
      image: 'Product/industrial_control_panel_parts__assorted_modules__flat_lay.png',
      description: 'Assorted industrial control panel parts and modules'
    },
    {
      id: 11,
      name: 'Injection Mold Tool',
      category: 'moulds',
      image: 'Product/injection_mold_tool__precision_metal_die__assembled.png',
      description: 'Precision metal injection mold tool fully assembled'
    },
    {
      id: 12,
      name: 'Injection Molded Housing',
      category: 'components',
      image: 'Product/injection_molded_housing_parts__device_frame_components__top_view.png',
      description: 'Device frame components from injection molded housing'
    },
    {
      id: 13,
      name: 'Small Plastic Components',
      category: 'components',
      image: 'Product/injection_molded_plastic_parts__small_mechanical_components__flat_lay.png',
      description: 'Small mechanical components from injection molded plastic'
    },
    {
      id: 14,
      name: 'Machined Metal Shafts',
      category: 'mechanical',
      image: 'Product/machined_metal_shafts__small_mechanical_components__flat_lay.png',
      description: 'Precision machined metal shafts and mechanical components'
    },
    {
      id: 15,
      name: 'Panel Mount Push Button',
      category: 'industrial',
      image: 'Product/panel_mount_push_button__exploded_view__switch_components.png',
      description: 'Exploded view of panel mount push button switch components'
    },
    {
      id: 16,
      name: 'Plastic Actuator Housings',
      category: 'components',
      image: 'Product/plastic_actuator_housings__mechanical_module_bodies__top_view.png',
      description: 'Mechanical module bodies for plastic actuator housings'
    },
    {
      id: 17,
      name: 'Assorted Plastic Parts',
      category: 'components',
      image: 'Product/plastic_mechanical_parts__assorted_components__flat_lay.png',
      description: 'Assorted plastic mechanical parts and components'
    },
    {
      id: 18,
      name: 'Plastic Rotary Component',
      category: 'mechanical',
      image: 'Product/plastic_rotary_component__pulley_or_cam_part__top_view.png',
      description: 'Plastic rotary component - pulley or cam part'
    },
    {
      id: 19,
      name: 'Precision Brass Inserts',
      category: 'mechanical',
      image: 'Product/precision_machined_metal_parts__brass_inserts__flat_lay.png',
      description: 'Precision machined brass inserts and metal parts'
    },
    {
      id: 20,
      name: 'Smart Display Device',
      category: 'electronics',
      image: 'Product/smart_display_device__angled_desktop_unit__speaker_ports.png',
      description: 'Angled desktop smart display device with speaker ports'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openLightbox = (product) => {
    setSelectedImage(product)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

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
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-slide-up">
              Products
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              
            </p>
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'WhatsApp Image 2026-04-14 at 10.32.09 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.09 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.10 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.10 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.11 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.11 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.11 PM (3).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.11 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.12 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.12 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.12 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.13 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.13 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.13 PM (3).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.13 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.14 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.14 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.14 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.15 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.15 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.15 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.16 PM (1).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.16 PM (2).jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.16 PM.jpeg',
              'WhatsApp Image 2026-04-14 at 10.32.17 PM.jpeg'
            ].map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={`${import.meta.env.BASE_URL}Products Images/${image}`}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default Products
