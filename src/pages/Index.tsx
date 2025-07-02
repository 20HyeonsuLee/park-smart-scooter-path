
import React, { useState } from 'react';
import { MapPin, Navigation, Search, Camera, AlertTriangle, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParkingMap from '@/components/ParkingMap';
import LocationSearch from '@/components/LocationSearch';
import ParkingInfo from '@/components/ParkingInfo';
import PhotoAnalysis from '@/components/PhotoAnalysis';

const Index = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showPhotoAnalysis, setShowPhotoAnalysis] = useState(false);

  const handleSearch = () => {
    if (departure && destination) {
      setShowMap(true);
    }
  };

  const mockStats = [
    { label: '과태료 방지', value: '98%', icon: CheckCircle, color: 'text-green-600' },
    { label: '평균 절약 시간', value: '15분', icon: Clock, color: 'text-blue-600' },
    { label: '평균 절약 비용', value: '8,000원', icon: DollarSign, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">스마트 주차 가이드</h1>
                <p className="text-sm text-gray-600">킥보드 · 자전거 주차 안내</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2" 
              onClick={() => setShowPhotoAnalysis(true)}
            >
              <Camera className="w-4 h-4" />
              사진 분석
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {!showMap ? (
          <>
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  킥보드 주차,
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> 이제 안전하게</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  과태료 걱정 없이 목적지 주변 주차 가능 구역을 미리 확인하고, 
                  최적의 경로로 안전하게 이동하세요.
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

            {/* Search Section */}
            <section className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-2xl font-bold text-gray-900">
                    경로 및 주차 정보 확인
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    출발지와 목적지를 입력하여 최적의 주차 공간을 찾아보세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <LocationSearch
                    placeholder="출발지를 입력하세요"
                    value={departure}
                    onChange={setDeparture}
                    icon={<Navigation className="w-5 h-5 text-blue-500" />}
                  />
                  <LocationSearch
                    placeholder="목적지를 입력하세요"
                    value={destination}
                    onChange={setDestination}
                    icon={<MapPin className="w-5 h-5 text-green-500" />}
                  />
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={!departure || !destination}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    주차 정보 확인하기
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Features Section */}
            <section className="py-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  스마트한 기술로 안전하고 경제적인 킥보드 이용을 도와드립니다
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: MapPin,
                    title: '실시간 주차 구역',
                    desc: '허용/금지 구역을 실시간으로 확인',
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    icon: AlertTriangle,
                    title: '과태료 방지',
                    desc: '위험 구역 경고로 과태료 예방',
                    color: 'from-red-500 to-orange-500'
                  },
                  {
                    icon: DollarSign,
                    title: '요금 정보',
                    desc: '주차 요금을 미리 확인하고 절약',
                    color: 'from-purple-500 to-pink-500'
                  },
                  {
                    icon: Camera,
                    title: '사진 분석',
                    desc: '현장 사진으로 주차 가능 여부 판단',
                    color: 'from-blue-500 to-cyan-500'
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
          </>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowMap(false)}
                className="gap-2"
              >
                ← 돌아가기
              </Button>
              <div className="text-sm text-gray-600">
                {departure} → {destination}
              </div>
            </div>

            {/* Map and Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ParkingMap onZoneSelect={setSelectedZone} />  
              </div>
              <div>
                <ParkingInfo selectedZone={selectedZone} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">스마트 주차 가이드</span>  
          </div>
          <p className="text-gray-400">안전하고 스마트한 킥보드 이용을 위한 최고의 파트너</p>
        </div>
      </footer>

      {/* Photo Analysis Modal */}
      <PhotoAnalysis 
        isOpen={showPhotoAnalysis} 
        onClose={() => setShowPhotoAnalysis(false)} 
      />
    </div>
  );
};

export default Index;
