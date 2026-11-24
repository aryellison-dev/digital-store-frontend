import { useState } from 'react';

type GalleryImage = { src: string; alt?: string };

type GalleryProps = {
  images: GalleryImage[];
  showThumbs?: boolean;
  className?: string;
  width?: number;
  height?: number;
  radius?: string;
};

export default function Gallery({
  images,
  showThumbs = false,
  className = '',
  width,
  height,
  radius = '4px',
}: GalleryProps) {
  const [active, setActive] = useState(0);
  const currentIndex = Math.min(active, Math.max(0, images.length - 1));

  return (
    <div className={`gallery ${className}`} style={{ maxWidth: width }}>
      <div className="gallery-stage" style={{ maxHeight: height, borderRadius: radius }}>
        <div className="gallery-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div className="gallery-slide" key={`${image.src}-${index}`}>
              <img src={image.src} alt={image.alt ?? `Imagem ${index + 1}`} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-arrow--prev"
              disabled={currentIndex === 0}
              onClick={() => setActive(index => Math.max(index - 1, 0))}
              aria-label="Imagem anterior"
            >
              <img src="/assets/arrow-left.svg" alt="" />
            </button>
            <button
              type="button"
              className="gallery-arrow gallery-arrow--next"
              disabled={currentIndex === images.length - 1}
              onClick={() => setActive(index => Math.min(index + 1, images.length - 1))}
              aria-label="Próxima imagem"
            >
              <img src="/assets/arrow-right.svg" alt="" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (showThumbs ? (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              className={`gallery-thumb ${currentIndex === index ? 'gallery-thumb--active' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-pressed={currentIndex === index}
              style={{ borderRadius: radius }}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-dots">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : undefined}
              onClick={() => setActive(index)}
              className={currentIndex === index ? 'dot dot--active' : 'dot'}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
