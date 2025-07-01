import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, MapPin, Navigation, Clock, DollarSign, Camera } from 'lucide-react';

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

interface ParkingInfoProps {
  selectedZone: ParkingZone | null;
}

const ParkingInfo: React.FC<ParkingInfoProps> = ({ selectedZone }) => {
  const getZoneTypeInfo = (type: string) => {
    switch (type) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: '안전 주차 구역',
          recommendation: '추천'
        };
      case 'prohibited':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: '주차 금지 구역',
          recommendation: '위험'
        };
      case 'paid':
        return {
          icon: DollarSign,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: '유료 주차 구역',
          recommendation: '주의'
        };
      case 'scooter-station':
        return {
          icon: Navigation,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: '킥보드 대여소',
          recommendation: '대여 가능'
        };
      default:
        return {
          icon: MapPin,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: '일반 구역',
          recommendation: '확인 필요'
        };
    }
  };

  const mockNearbyScooters = [
    { brand: '킥고', count: 5, distance: '50m' },
    { brand: '라임', count: 3, distance: '120m' },
    { brand: '지쿠터', count: 8, distance: '200m' }
  ];

  const mockRecentReports = [
    { time: '10분 전', user: '이현우', status: '주차 완료', location: '홍대 놀이터 앞' },
    { time: '25분 전', user: '김지후', status: '과태료 위험', location: '홍대입구역 2번 출구' },
    { time: '1시간 전', user: '박서연', status: '주차 가능', location: '홍대 공원 입구' }
  ];

  return (
    <div className="space-y-6">
      {/* Selected Zone Info */}
      {selectedZone ? (
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selectedZone.name}</CardTitle>
              <Badge 
                variant={selectedZone.type === 'safe' ? 'default' : selectedZone.type === 'prohibited' ? 'destructive' : 'secondary'}
                className="font-semibold"
              >
                {getZoneTypeInfo(selectedZone.type).recommendation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-4 rounded-xl ${getZoneTypeInfo(selectedZone.type).bgColor} ${getZoneTypeInfo(selectedZone.type).borderColor} border-2`}>
              <div className="flex items-center gap-3 mb-3">
                {React.createElement(getZoneTypeInfo(selectedZone.type).icon, {
                  className: `w-6 h-6 ${getZoneTypeInfo(selectedZone.type).color}`
                })}
                <span className={`font-semibold ${getZoneTypeInfo(selectedZone.type).color}`}>
                  {getZoneTypeInfo(selectedZone.type).title}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                {selectedZone.info.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {selectedZone.info.fee && (
                  <Badge variant="outline" className="gap-1">
                    <DollarSign className="w-3 h-3" />
                    {selectedZone.info.fee}
                  </Badge>
                )}
                {selectedZone.info.risk && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {selectedZone.info.risk}
                  </Badge>
                )}
                {selectedZone.info.availability && (
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedZone.info.availability}대 이용 가능
                  </Badge>
                )}
              </div>
            </div>

            {selectedZone.type !== 'prohibited' && (
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Navigation className="w-4 h-4 mr-2" />
                  길찾기
                </Button>
                <Button variant="outline" size="icon">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">지도에서 주차 구역을 선택해보세요</p>
          </CardContent>
        </Card>
      )}

      {/* Nearby Scooters */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            주변 킥보드 현황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockNearbyScooters.map((scooter, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">{scooter.brand}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{scooter.count}대</div>
                <div className="text-xs text-gray-600">{scooter.distance}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            실시간 제보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockRecentReports.map((report, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                report.status === '주차 완료' ? 'bg-green-500' : 
                report.status === '과태료 위험' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{report.user}</span>
                  <span className="text-xs text-gray-500">{report.time}</span>
                </div>
                <div className="text-sm text-gray-700 mb-1">{report.status}</div>
                <div className="text-xs text-gray-600 truncate">{report.location}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ParkingInfo;
