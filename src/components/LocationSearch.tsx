
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
    onChange(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
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
        />
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-2 shadow-lg border-gray-200">
          <div className="max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">{suggestion}</span>
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
