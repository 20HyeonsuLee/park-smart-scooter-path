
import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, Info, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FineBlockMap from '@/components/FineBlockMap';
import FineGuideModal from '@/components/FineGuideModal';

const Index = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          setLocationError('위치 정보를 가져올 수 없습니다. 수동으로 위치를 확인해주세요.');
          // 홍대 지역으로 기본 설정
          setUserLocation({
            lat: 37.5563,
            lng: 126.9238
          });
        }
      );
    } else {
      setLocationError('위치 서비스가 지원되지 않습니다.');
      setUserLocation({
        lat: 37.5563,
        lng: 126.9238
      });
    }
  }, []);

  const mockStats = [
    { label: '과태료 예방률', value: '94%', icon: Shield, color: 'text-green-600' },
    { label: '위험 지역 수', value: '28개', icon: AlertTriangle, color: 'text-red-600' },
    { label: '안전 반납률', value: '97%', icon: MapPin, color: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-red-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FineBlock</h1>
                <p className="text-sm text-gray-600">과태료 걱정 없는 킥보드 반납</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => setShowGuideModal(true)}
            >
              <Info className="w-4 h-4" />
              과태료 부과 기준
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              과태료 걱정 없이
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"> 안전하게 반납</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              실제 과태료 발생 사례를 기반으로 위험 지역을 미리 확인하고, 
              안전한 장소에 킥보드를 반납하세요.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mockStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location Status */}
        {locationError && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm">{locationError}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Current Location */}
        {userLocation && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Navigation className="w-5 h-5" />
                  <span className="text-sm">현재 위치: 홍대 주변 (위도: {userLocation.lat.toFixed(4)}, 경도: {userLocation.lng.toFixed(4)})</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map Section */}
        <section className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">실시간 과태료 위험 지역</h3>
            <p className="text-gray-600">빨간 마커는 과태료 발생 사례가 있는 위험 지역입니다</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <FineBlockMap userLocation={userLocation} />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              실제 과태료 사례를 기반으로 한 위험 지역 안내 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: '과태료 사례 기반',
                desc: '실제 발생한 과태료 사례를 지도에 표시',
                color: 'from-red-500 to-orange-500'
              },
              {
                icon: Shield,
                title: '안전 지역 안내',
                desc: '과태료 위험이 낮은 안전한 반납 구역 추천',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: MapPin,
                title: '위치 기반 서비스',
                desc: '현재 위치 기준 주변 위험 지역 즉시 확인',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Info,
                title: '과태료 기준 안내',
                desc: '어떤 경우에 과태료가 부과되는지 상세 정보 제공',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">FineBlock</span>  
          </div>
          <p className="text-gray-400">과태료 걱정 없는 안전한 킥보드 반납을 위한 서비스</p>
        </div>
      </footer>

      {/* Fine Guide Modal */}
      <FineGuideModal 
        isOpen={showGuideModal} 
        onClose={() => setShowGuideModal(false)} 
      />
    </div>
  );
};

export default Index;
