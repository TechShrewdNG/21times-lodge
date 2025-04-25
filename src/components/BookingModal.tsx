import { useState } from 'react'
import { X, Clock, User, Star, Users } from 'lucide-react'

interface BookingModalProps {
  room: {
    name: string
    image: string
    price: number
    capacity: number
    rating: number
  }
  selectedHour: number
  onClose: () => void
  onConfirm: (details: { name: string, email: string }) => void
}

export function BookingModal({ room, selectedHour, onClose, onConfirm }: BookingModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-500 hover:text-pink-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-pink-700">Confirm Booking</h2>
        
        <div className="flex gap-4 mb-6">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium">{room.name}</h3>
            <div className="flex items-center gap-2 text-pink-600 mt-1">
              <Clock className="w-4 h-4" />
              <span>{selectedHour}:00 - {selectedHour + 1}:00</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-pink-600">
                <Star className="w-4 h-4 fill-pink-400 text-pink-400" />
                <span>{room.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-pink-600">
                <Users className="w-4 h-4 text-pink-400" />
                <span>{room.capacity} people</span>
              </div>
            </div>
            <div className="mt-2 text-lg font-bold text-pink-700">
              ${room.price}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-1">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-1">Email</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-pink-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-pink-600">Total (1 hour)</span>
              <span className="font-bold text-pink-700">${room.price}</span>
            </div>
            <button
              onClick={() => onConfirm({ name, email })}
              disabled={!name || !email}
              className="w-full btn-primary py-3 disabled:bg-pink-400 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
