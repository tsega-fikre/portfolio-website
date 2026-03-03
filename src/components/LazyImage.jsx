import { useState, useEffect, useRef } from 'react'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%230a0a0a" width="400" height="300"/%3E%3C/svg%3E',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  // Generate WebP source if available
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const hasWebP = src.match(/\.(jpg|jpeg|png)$/i)

  useEffect(() => {
    let observer
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        }
      )
      
      observer.observe(imgRef.current)
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  // Use picture element for WebP support with fallback
  if (hasWebP && imageSrc !== placeholder) {
    return (
      <picture ref={imgRef}>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
          {...props}
        />
      </picture>
    )
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}

export default LazyImage
