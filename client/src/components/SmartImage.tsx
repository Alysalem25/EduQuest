import { useState } from 'react';
import { ImageOff } from 'lucide-react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: 'eager' | 'lazy';
};

export default function SmartImage({ src, alt, className, fallbackClassName, loading = 'lazy' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-eqraa-beige to-eqraa-beige-dark/60 ${fallbackClassName ?? className ?? ''}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="text-eqraa-brown/40" size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
