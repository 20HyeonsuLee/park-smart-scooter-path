
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, MapPin, Navigation } from 'lucide-react';

interface FineCase {
  id: string;
  name: string;
  type: 'high-risk' | 'medium-risk' | 'safe';
  position: { x: number; y: number };
  fineAmount: string;
  reason: string;
  description: string;
  caseDate: string;
}

interface FineBlockMapProps {
  userLocation: { lat: number; lng: number } | null;
}

const FineBlockMap: React.FC<FineBlockMapProps> = ({ userLocation }) => {
  const [selectedCase, setSelectedCase] = useState<FineCase | null>(null);

  const mockFineCases: FineCase[] = [
    {
      id: '1',
      name: '홍대입구역 2번 출구',
      type: 'high-risk',
      position: { x: 45, y: 45 },
      fineAmount: '5만원',
      reason: '지하철 출구 앞 주차',
      description: '대중교통 이용시설 앞 주차로 인한 과태료',
      caseDate: '2024.12.15'
    },
    {
      id: '2',
      name: '홍대 주점가 앞',
      type: 'high-risk',
      position: { x: 30, y: 60 },
      fineAmount: '5만원',
      reason: '인도 위 주차',
      description: '보행자 통행로 방해로 인한 과태료',
      caseDate: '2024.12.10'
    },
    {
      id: '3',
      name: '버스정류장 앞',
      type: 'high-risk',
      position: { x: 70, y: 30 },
      fineAmount: '5만원',
      reason: '버스정류장 앞 주차',
      description: '대중교통 이용시설 방해로 인한 과태료',
      caseDate: '2024.12.08'
    },
    {
      id: '4',
      name: '홍대 공원 앞',
      type: 'medium-risk',
      position: { x: 25, y: 35 },
      fineAmount: '3만원',
      reason: '점자블록 침범',
      description: '시각장애인 보행로 방해로 인한 과태료',
      caseDate: '2024.12.05'
    },
    {
      id: '5',
      name: '소방서 앞',
      type: 'high-risk',
      position: { x: 80, y: 70 },
      fineAmount: '10만원',
      reason: '소방차 통행로 방해',
      description: '응급차량 통행로 방해로 인한 고액 과태료',
      caseDate: '2024.12.01'
    },
    {
      id: '6',
      name: '홍대 놀이터 지정구역',
      type: 'safe',
      position: { x: 60, y: 50 },
      fineAmount: '과태료 없음',
      reason: '지정 주차구역',
      description: '정부 지정 킥보드 주차구역으로 안전',
      caseDate: '안전구역'
    },
    {
      id: '7',
      name: '공원 내 지정구역',
      type: 'safe',
      position: { x: 40, y: 25 },
      fineAmount: '과태료 없음',
      reason: '지정 주차구역',
      description: '관리소 허가 받은 안전한 주차구역',
      caseDate: '안전구역'
    }
  ];

  const handleCaseClick = (fineCase: FineCase) => {
    setSelectedCase(fineCase);
  };

  const getCaseColor = (type: string) => {
    switch (type) {
      case 'high-risk': return 'bg-red-500 hover:bg-red-600';
      case 'medium-risk': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'safe': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getCaseIcon = (type: string) => {
    switch (type) {
      case 'high-risk': return AlertTriangle;
      case 'medium-risk': return AlertTriangle;
      case 'safe': return Shield;
      default: return MapPin;
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="w-6 h-6 text-red-600" />
          홍대 주변 과태료 발생 현황
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1 text-red-700 border-red-300">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            고위험 (5만원 이상)
          </Badge>
          <Badge variant="outline" className="gap-1 text-yellow-700 border-yellow-300">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            중위험 (3만원)
          </Badge>
          <Badge variant="outline" className="gap-1 text-green-700 border-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            안전 구역
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 overflow-hidden">
          {/* Mock street pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-6 bg-gray-300 opacity-40"></div>
            <div className="absolute top-2/4 left-0 right-0 h-6 bg-gray-300 opacity-40"></div>
            <div className="absolute top-3/4 left-0 right-0 h-6 bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 bottom-0 left-1/4 w-6 bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 bottom-0 left-2/4 w-6 bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 bottom-0 left-3/4 w-6 bg-gray-300 opacity-40"></div>
          </div>

          {/* User current location */}
          {userLocation && (
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"
                 style={{left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            </div>
          )}
          {userLocation && (
            <div className="absolute text-xs font-semibold text-blue-600 whitespace-nowrap bg-white px-2 py-1 rounded shadow"
                 style={{left: '50%', top: '45%', transform: 'translateX(-50%)'}}>
              현재 위치
            </div>
          )}

          {/* Fine cases */}
          {mockFineCases.map((fineCase) => {
            const Icon = getCaseIcon(fineCase.type);
            return (
              <div
                key={fineCase.id}
                className={`absolute w-10 h-10 rounded-full ${getCaseColor(fineCase.type)} cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center ${
                  selectedCase?.id === fineCase.id ? 'ring-4 ring-white ring-opacity-60 scale-125' : ''
                }`}
                style={{
                  left: `${fineCase.position.x}%`,
                  top: `${fineCase.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleCaseClick(fineCase)}
                title={fineCase.name}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            );
          })}

          {/* Selected case info popup */}
          {selectedCase && (
            <div
              className="absolute bg-white p-4 rounded-lg shadow-2xl border-2 border-gray-200 min-w-64 z-10 max-w-xs"
              style={{
                left: `${selectedCase.position.x}%`,
                top: `${selectedCase.position.y - 20}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="text-sm font-bold text-gray-900 mb-2">
                {selectedCase.name}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={selectedCase.type === 'safe' ? 'default' : 'destructive'} 
                    className="text-xs"
                  >
                    {selectedCase.fineAmount}
                  </Badge>
                  <span className="text-xs text-gray-500">{selectedCase.caseDate}</span>
                </div>
                <div className="text-xs text-gray-800 font-semibold">
                  사유: {selectedCase.reason}
                </div>
                <div className="text-xs text-gray-600">
                  {selectedCase.description}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FineBlockMap;
