import { Calendar, Clock, Star, Wifi } from 'lucide-react'

interface RoomCardProps {
  name: string
  capacity: number
  image: string
  available: boolean
  price: number
  rating: number
  amenities: string[]
  onBook: () => void
}

export function RoomCard({ 
  name, 
  capacity, 
  image, 
  available, 
  price,
  rating,
  amenities,
  onBook 
}: RoomCardProps) {
  return (
    <div className="card">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{name}</h3>
          <div className="flex items-center gap-2 text-white/90">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-600">${price}/hour</span>
          </div>
          <div className="text-sm text-pink-600">{capacity} people</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map(amenity => (
            <span key={amenity} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
        
        <button
          onClick={onBook}
          disabled={!available}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            available 
              ? 'btn-primary'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {available ? 'Book Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  )
}
