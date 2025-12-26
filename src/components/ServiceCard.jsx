import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ServiceCard = ({ icon: Icon, title, description, image, link = '/services' }) => {
  return (
    <div className="card group">
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stac-charcoal/60 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Icon */}
        {Icon && (
          <div className="w-14 h-14 rounded-lg bg-stac-red/10 flex items-center justify-center mb-4 group-hover:bg-stac-red transition-colors duration-300">
            <Icon 
              size={28} 
              className="text-stac-red group-hover:text-white transition-colors duration-300" 
            />
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-heading font-bold text-xl text-stac-charcoal mb-3 group-hover:text-stac-red transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Link */}
        <Link
          to={link}
          className="inline-flex items-center text-stac-red font-semibold text-sm uppercase tracking-wider group/link"
        >
          Learn More
          <ArrowRight 
            size={16} 
            className="ml-2 transition-transform group-hover/link:translate-x-1" 
          />
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard
