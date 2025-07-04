
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailsGalleryProps {
  product: Product;
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
}

export const ProductDetailsGallery = ({ product }: ProductDetailsGalleryProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Simular múltiplas mídias (imagens e vídeos) para galeria
  const mediaItems: MediaItem[] = [
    { type: 'image', src: product.image },
    { type: 'video', src: '/placeholder-video.mp4', thumbnail: product.image },
    { type: 'image', src: product.image },
    { type: 'image', src: product.image },
    { type: 'video', src: '/placeholder-video-2.mp4', thumbnail: product.image },
    { type: 'image', src: product.image }
  ];

  const currentMedia = mediaItems[currentMediaIndex];

  const handleVideoToggle = () => {
    const videoElement = document.getElementById('product-video') as HTMLVideoElement;
    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mídia principal */}
      <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center relative overflow-hidden">
        {currentMedia.type === 'image' ? (
          <div className="text-gray-400 text-6xl">📸</div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              id="product-video"
              className="w-full h-full object-cover rounded-lg"
              poster={currentMedia.thumbnail}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={currentMedia.src} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            
            {/* Controles de vídeo */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleVideoToggle}
            >
              {isVideoPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>
        )}
        
        {product.discount && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      {/* Miniaturas */}
      <div className="grid grid-cols-6 gap-2">
        {mediaItems.map((media, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentMediaIndex(index);
              setIsVideoPlaying(false);
            }}
            className={`aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center text-2xl transition-all relative ${
              index === currentMediaIndex 
                ? 'ring-2 ring-pink-500 scale-105' 
                : 'hover:scale-105'
            }`}
          >
            {media.type === 'image' ? (
              <span>📸</span>
            ) : (
              <>
                <span>🎥</span>
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-pink-600" />
              </>
            )}
          </button>
        ))}
      </div>

      {/* Indicador de mídia atual */}
      <div className="text-center text-sm text-gray-600">
        {currentMedia.type === 'image' ? 'Imagem' : 'Vídeo'} {currentMediaIndex + 1} de {mediaItems.length}
      </div>
    </div>
  );
};
