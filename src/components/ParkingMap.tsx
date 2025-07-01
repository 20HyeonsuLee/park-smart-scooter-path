import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, CheckCircle, Navigation, Zap } from 'lucide-react';

interface ParkingZone {
  id: string;
  name: string;
  type: 'safe' | 'prohibited' | 'paid' | 'scooter-station';
  position: { x: number; y: number };
  info: {
    fee?: string;
    risk?: string;
    description: string;
    availability?: number;
  };
}

interface ScooterLocation {
  id: string;
  type: 'kick' | 'lime' | 'beam';
  position: { x: number; y: number };
  battery: number;
  available: boolean;
}

interface ParkingMapProps {
  onZoneSelect: (zone: ParkingZone | null) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ onZoneSelect }) => {
  const [selectedZone, setSelectedZone] = useState<ParkingZone | null>(null);

  const mockZones: ParkingZone[] = [
    {
      id: '1',
      name: '홍대 놀이터 앞',
      type: 'safe',
      position: { x: 25, y: 30 },
      info: {
        fee: '무료',
        description: '지정된 킥보드 주차구역으로 안전합니다',
        availability: 8
      }
    },
    {
      id: '2',
      name: '홍대입구역 2번 출구',
      type: 'prohibited',
      position: { x: 45, y: 45 },
      info: {
        risk: '과태료 5만원',
        description: '지하철 출구 인근 주차 금지구역입니다'
      }
    },
    {
      id: '3',
      name: '홍대 주차타워',
      type: 'paid',
      position: { x: 70, y: 25 },
      info: {
        fee: '시간당 2,000원',
        description: '유료 주차구역이지만 안전하게 보관됩니다'
      }
    },
    {
      id: '4',
      name: '킥보드 대여소',
      type: 'scooter-station',
      position: { x: 60, y: 70 },
      info: {
        description: '킥고, 라임 대여 가능 지점',
        availability: 12
      }
    },
    {
      id: '5',
      name: '홍대 공원 입구',
      type: 'safe',
      position: { x: 30, y: 65 },
      info: {
        fee: '무료',
        description: '공원 입구 지정 주차구역',
        availability: 5
      }
    },
    {
      id: '6',
      name: '버스정류장 앞',
      type: 'prohibited',
      position: { x: 85, y: 55 },
      info: {
        risk: '과태료 5만원',
        description: '대중교통 정류장 인근 주차 금지'
      }
    }
  ];

  // 킥보드 위치 데이터 추가
  const scooterLocations: ScooterLocation[] = [
    {
      id: 'kick-1',
      type: 'kick',
      position: { x: 20, y: 40 },
      battery: 85,
      available: true
    },
    {
      id: 'kick-2', 
      type: 'kick',
      position: { x: 35, y: 25 },
      battery: 92,
      available: true
    },
    {
      id: 'lime-1',
      type: 'lime',
      position: { x: 50, y: 60 },
      battery: 67,
      available: true
    },
    {
      id: 'lime-2',
      type: 'lime',
      position: { x: 75, y: 40 },
      battery: 43,
      available: false
    },
    {
      id: 'beam-1',
      type: 'beam',
      position: { x: 40, y: 80 },
      battery: 78,
      available: true
    },
    {
      id: 'kick-3',
      type: 'kick',
      position: { x: 80, y: 30 },
      battery: 56,
      available: true
    }
  ];

  const handleZoneClick = (zone: ParkingZone) => {
    setSelectedZone(zone);
    onZoneSelect(zone);
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'safe': return 'bg-green-500 hover:bg-green-600';
      case 'prohibited': return 'bg-red-500 hover:bg-red-600';
      case 'paid': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'scooter-station': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  const getZoneIcon = (type: string) => {
    switch (type) {
      case 'safe': return CheckCircle;
      case 'prohibited': return AlertTriangle;
      case 'paid': return MapPin;
      case 'scooter-station': return Navigation;
      default: return MapPin;
    }
  };

  const getScooterColor = (type: string, available: boolean) => {
    if (!available) return 'bg-gray-400';
    switch (type) {
      case 'kick': return 'bg-orange-500';
      case 'lime': return 'bg-green-400';
      case 'beam': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          홍대 주변 주차 정보 & 킥보드 위치
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1 text-green-700 border-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            안전 구역
          </Badge>
          <Badge variant="outline" className="gap-1 text-red-700 border-red-300">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            금지 구역
          </Badge>
          <Badge variant="outline" className="gap-1 text-yellow-700 border-yellow-300">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            유료 구역
          </Badge>
          <Badge variant="outline" className="gap-1 text-blue-700 border-blue-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            대여소
          </Badge>
          <Badge variant="outline" className="gap-1 text-orange-700 border-orange-300">
            <Zap className="w-3 h-3" />
            킥보드
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-gray-200 overflow-hidden">
          {/* Mock street pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-0 right-0 h-8 bg-gray-300 opacity-30"></div>
            <div className="absolute bottom-1/3 left-0 right-0 h-8 bg-gray-300 opacity-30"></div>
            <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-gray-300 opacity-30"></div>
            <div className="absolute top-0 bottom-0 right-1/3 w-8 bg-gray-300 opacity-30"></div>
          </div>

          {/* Parking zones */}
          {mockZones.map((zone) => {
            const Icon = getZoneIcon(zone.type);
            return (
              <div
                key={zone.id}
                className={`absolute w-8 h-8 rounded-full ${getZoneColor(zone.type)} cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center ${
                  selectedZone?.id === zone.id ? 'ring-4 ring-white ring-opacity-60 scale-125' : ''
                }`}
                style={{
                  left: `${zone.position.x}%`,
                  top: `${zone.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleZoneClick(zone)}
                title={zone.name}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
            );
          })}

          {/* 킥보드 위치 표시 */}
          {scooterLocations.map((scooter) => (
            <div
              key={scooter.id}
              className={`absolute w-6 h-6 rounded-full ${getScooterColor(scooter.type, scooter.available)} cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-md flex items-center justify-center border-2 border-white ${
                !scooter.available ? 'opacity-50' : ''
              }`}
              style={{
                left: `${scooter.position.x}%`,
                top: `${scooter.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={`${scooter.type.toUpperCase()} - ${scooter.battery}% ${scooter.available ? '이용가능' : '이용불가'}`}
            >
              <Zap className="w-3 h-3 text-white" />
            </div>
          ))}

          {/* Selected zone info popup */}
          {selectedZone && (
            <div
              className="absolute bg-white p-3 rounded-lg shadow-xl border-2 border-gray-200 min-w-48 z-10"
              style={{
                left: `${selectedZone.position.x}%`,
                top: `${selectedZone.position.y - 15}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {selectedZone.name}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {selectedZone.info.description}
              </div>
              {selectedZone.info.fee && (
                <Badge variant="outline" className="text-xs">
                  {selectedZone.info.fee}
                </Badge>
              )}
              {selectedZone.info.risk && (
                <Badge variant="destructive" className="text-xs">
                  {selectedZone.info.risk}
                </Badge>
              )}
              {selectedZone.info.availability && (
                <Badge variant="secondary" className="text-xs ml-1">
                  {selectedZone.info.availability}대 가능
                </Badge>
              )}
            </div>
          )}

          {/* Destination marker */}
          <div className="absolute w-6 h-6 bg-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
               style={{left: '60%', top: '40%', transform: 'translate(-50%, -50%)'}}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="absolute text-xs font-semibold text-purple-600 whitespace-nowrap"
               style={{left: '60%', top: '32%', transform: 'translateX(-50%)'}}>
            목적지
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingMap;
