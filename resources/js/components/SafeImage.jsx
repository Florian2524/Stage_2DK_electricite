import { useEffect, useState } from 'react'

const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
     <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
       <stop offset='0%' stop-color='#0f172a'/><stop offset='100%' stop-color='#1f2937'/></linearGradient></defs>
     <rect width='1200' height='900' fill='url(#g)'/>
     <g fill='#1d4ed8' opacity='0.9'><polygon points='640,140 360,520 520,520 480,760 840,320 660,320'/></g>
   </svg>`
)}`

export default function SafeImage({
  src,
  alt = '',
  wrapperClass = 'aspect-[16/9] rounded-2xl overflow-hidden',
  imgClass = 'h-full w-full object-cover',
  lazy = true,
  timeoutMs = 2500,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!src) return
    const t = setTimeout(() => { if (!loaded) setFailed(true) }, timeoutMs)
    return () => clearTimeout(t)
  }, [src, loaded, timeoutMs])

  const effectiveSrc = failed || !src ? PLACEHOLDER : src

  return (
    <div className={`relative ${wrapperClass}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-700" />}
      <img
        src={effectiveSrc}
        alt={alt}
        className={`${imgClass} transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={lazy ? 'lazy' : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
