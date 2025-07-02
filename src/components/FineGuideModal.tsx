
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ban, Shield, Info } from 'lucide-react';

interface FineGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FineGuideModal: React.FC<FineGuideModalProps> = ({ isOpen, onClose }) => {
  const fineCategories = [
    {
      title: '고액 과태료 (10만원)',
      icon: Ban,
      color: 'bg-red-600',
      cases: [
        '소방서, 병원 등 응급시설 앞 주차',
        '소방차 통행로 방해',
        '응급차량 진입로 차단'
      ]
    },
    {
      title: '일반 과태료 (5만원)',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      cases: [
        '지하철 출구 앞 주차',
        '버스정류장 앞 주차',
        '인도 위 주차',
        '도로 가장자리 주차',
        '차량 통행 방해'
      ]
    },
    {
      title: '경미 과태료 (3만원)',
      icon: Info,
      color: 'bg-yellow-500',
      cases: [
        '점자블록 침범',
        '보행자 전용도로 주차',
        '자전거 도로 주차'
      ]
    },
    {
      title: '안전 구역 (과태료 없음)',
      icon: Shield,
      color: 'bg-green-500',
      cases: [
        '정부 지정 킥보드 주차구역',
        '관리소 허가 받은 주차구역',
        '공원 내 지정 구역',
        '상업시설 허가 구역'
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            전동 킥보드 과태료 부과 기준
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            실제 과태료 사례를 기반으로 한 위험 구역 분류 기준입니다
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {fineCategories.map((category, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{category.title}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.cases.map((caseItem, caseIndex) => (
                    <li key={caseIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>{caseItem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">📌 주의사항</p>
              <ul className="space-y-1 text-xs">
                <li>• 지자체별로 과태료 금액이 다를 수 있습니다</li>
                <li>• 동일 위치에서 반복 위반 시 가중 처벌될 수 있습니다</li>
                <li>• 안전 구역이라도 시간대별 제한이 있을 수 있으니 현장 안내판을 확인하세요</li>
                <li>• 실제 단속 기준은 관할 지자체 조례를 따릅니다</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FineGuideModal;
