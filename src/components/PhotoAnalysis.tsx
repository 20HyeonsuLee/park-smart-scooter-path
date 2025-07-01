
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PhotoAnalysisProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PhotoAnalysis: React.FC<PhotoAnalysisProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    isSafe: boolean;
    risk: string;
    fine?: string;
    description: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  };

  const analyzePhoto = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Mock 분석 로직 - 실제로는 AI 모델을 사용
    setTimeout(() => {
      // 랜덤하게 안전/위험 판정
      const scenarios = [
        {
          isSafe: true,
          risk: '안전',
          description: '지정된 킥보드 주차구역으로 확인됩니다. 안전하게 주차하세요.'
        },
        {
          isSafe: false,
          risk: '위험',
          fine: '과태료 5만원',
          description: '지하철 출구 인근 주차 금지구역입니다. 다른 곳에 주차해주세요.'
        },
        {
          isSafe: false,
          risk: '위험',
          fine: '과태료 3만원',
          description: '보도 위 주차로 인한 보행자 통행 방해가 예상됩니다.'
        },
        {
          isSafe: true,
          risk: '안전',
          description: '공원 입구 지정 주차구역으로 무료 주차 가능합니다.'
        }
      ];
      
      const result = scenarios[Math.floor(Math.random() * scenarios.length)];
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            주차 사진 분석
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!previewUrl ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">주차한 위치의 사진을 업로드하세요</p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button className="gap-2">
                  <Upload className="w-4 h-4" />
                  사진 선택
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="업로드된 주차 사진"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {!analysisResult ? (
                <Button
                  onClick={analyzePhoto}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? '분석 중...' : '주차 안전도 분석'}
                </Button>
              ) : (
                <Card className={`border-2 ${analysisResult.isSafe ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {analysisResult.isSafe ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      <Badge variant={analysisResult.isSafe ? "default" : "destructive"}>
                        {analysisResult.risk}
                      </Badge>
                      {analysisResult.fine && (
                        <Badge variant="destructive">
                          {analysisResult.fine}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      {analysisResult.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoAnalysis;
