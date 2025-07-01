
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LocationSearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ placeholder, value, onChange, icon }) => {
  console.log('LocationSearch rendering:', { placeholder, value });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Mock suggestions based on common Seoul locations
  const mockSuggestions = [
    '강남역 2번 출구',
    '홍대입구역 9번 출구',
    '신촌역 3번 출구',
    '이대앞역 2번 출구',
    '건대입구역 4번 출구',
    '잠실역 3번 출구',
    '종로3가역 15번 출구',
    '명동역 6번 출구'
  ];

  const filteredSuggestions = mockSuggestions.filter(location =>
    location.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('Input changed:', newValue);
    onChange(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log('Suggestion clicked:', suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" style={{ position: 'relative' }}>
      <div className="relative" style={{ position: 'relative' }}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
          {icon}
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(value.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-12 pr-4 py-3 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
          style={{ 
            paddingLeft: '3rem', 
            paddingRight: '1rem', 
            paddingTop: '0.75rem', 
            paddingBottom: '0.75rem', 
            fontSize: '1.125rem', 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.75rem',
            width: '100%'
          }}
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-2 shadow-lg border-gray-200" style={{ position: 'absolute', zIndex: 50, width: '100%', marginTop: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
          <div className="max-h-48 overflow-y-auto" style={{ maxHeight: '12rem', overflowY: 'auto' }}>
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ 
                  padding: '0.75rem 1rem', 
                  cursor: 'pointer', 
                  borderBottom: index < filteredSuggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9ca3af', borderRadius: '50%' }}></div>
                  <span className="text-gray-700" style={{ color: '#374151' }}>{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LocationSearch;
