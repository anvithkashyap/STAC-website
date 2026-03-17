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
              Product Catalogue
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Explore our comprehensive range of precision-engineered moulds, 
              plastic components, and industrial parts.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-stac-red text-white'
                      : 'bg-stac-gray text-stac-charcoal hover:bg-stac-red/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full lg:w-80 rounded-lg border border-gray-200 focus:border-stac-blue focus:ring-2 focus:ring-stac-blue/20 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-stac-gray">
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-stac-charcoal">{filteredProducts.length}</span> products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  onClick={() => openLightbox(product)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-stac-charcoal/0 group-hover:bg-stac-charcoal/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                          <ZoomIn size={24} className="text-stac-charcoal" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stac-blue mb-2 block">
                      {categories.find(c => c.id === product.category)?.label || product.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-stac-charcoal mb-2 group-hover:text-stac-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
                className="mt-4 text-stac-blue font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-stac-orange transition-colors"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/${selectedImage.image}`}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-2xl font-heading font-bold mb-2">
                {selectedImage.name}
              </h3>
              <p className="text-white/70">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Products
