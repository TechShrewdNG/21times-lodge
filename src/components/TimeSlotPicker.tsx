import { useState } from 'react'
import { Clock } from 'lucide-react'

const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8AM to 7PM

export function TimeSlotPicker({ selected, onSelect }: { 
  selected: number | null
  onSelect: (hour: number) => void 
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-pink-700">
        <Clock className="w-5 h-5" />
        <h3 className="font-medium">Select Time Slot</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {hours.map(hour => (
          <button
            key={hour}
            onClick={() => onSelect(hour)}
            className={`py-2 rounded-lg border transition-colors ${
              selected === hour
                ? 'bg-pink-100 border-pink-500 text-pink-700'
                : 'border-pink-200 hover:bg-pink-50'
            }`}
          >
            {hour}:00
          </button>
        ))}
      </div>
    </div>
  )
}
