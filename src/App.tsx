import { useState } from 'react'
import { RoomCard } from './components/RoomCard'
import { TimeSlotPicker } from './components/TimeSlotPicker'
import { BookingModal } from './components/BookingModal'

const rooms = [
  {
    id: 1,
    name: 'Executive Suite',
    capacity: 8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    available: true,
    price: 45,
    rating: 4.8,
    amenities: ['WiFi', 'Projector', 'Whiteboard']
  },
  {
    id: 2,
    name: 'Conference Room A',
    capacity: 12,
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    available: true,
    price: 60,
    rating: 4.9,
    amenities: ['WiFi', 'TV', 'Coffee']
  },
  {
    id: 3,
    name: 'Creative Space',
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    available: false,
    price: 35,
    rating: 4.7,
    amenities: ['WiFi', 'Whiteboard']
  },
  {
    id: 4,
    name: 'Boardroom',
    capacity: 10,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    available: true,
    price: 55,
    rating: 4.9,
    amenities: ['WiFi', 'TV', 'Conference Phone']
  }
]

export default function App() {
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null)
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

  const handleBookRoom = (room: typeof rooms[0]) => {
    setSelectedRoom(room)
  }

  const handleConfirmBooking = (details: { name: string, email: string }) => {
    console.log('Booking confirmed:', {
      room: selectedRoom,
      hour: selectedHour,
      userDetails: details
    })
    setIsBookingConfirmed(true)
    setSelectedRoom(null)
  }

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">21 Times Lodge</h1>
          <p className="text-lg text-pink-500">Book hourly spaces for your perfect meeting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Search locations..." 
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <button className="btn-primary px-6 py-3">
                  Search
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  name={room.name}
                  capacity={room.capacity}
                  image={room.image}
                  available={room.available}
                  price={room.price}
                  rating={room.rating}
                  amenities={room.amenities}
                  onBook={() => handleBookRoom(room)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <TimeSlotPicker 
                selected={selectedHour} 
                onSelect={setSelectedHour} 
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-medium text-pink-700 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Price Range</label>
                  <input type="range" className="w-full accent-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Amenities</label>
                  <div className="space-y-2">
                    {['WiFi', 'Projector', 'TV', 'Whiteboard', 'Coffee'].map(item => (
                      <label key={item} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-pink-500" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedRoom && selectedHour !== null && (
        <BookingModal
          room={selectedRoom}
          selectedHour={selectedHour}
          onClose={() => setSelectedRoom(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {isBookingConfirmed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-pink-600" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-pink-700">Booking Confirmed!</h3>
            <p className="text-pink-600 mb-4">Your room has been successfully booked.</p>
            <button
              onClick={() => setIsBookingConfirmed(false)}
              className="w-full py-2 btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
