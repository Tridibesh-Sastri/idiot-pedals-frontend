import React, { Suspense, lazy, useState } from 'react';
import { Box } from 'lucide-react';
import { buildImageKitSrcSet, optimizeImageKitUrl } from '../../lib/media';

const Deferred3DViewer = lazy(() => import('./Deferred3DViewer'));

interface ProductMediaStageProps {
  posterUrl?: string;
  glbUrl?: string;
  alt: string;
  fallback: React.ReactNode;
}

/**
 * CWV-optimized media stage:
 * - Renders a dimensions-locked (`aspect-[4/3]`) ImageKit WebP/AVIF poster immediately
 *   with `fetchPriority="high"` for fast LCP and zero CLS.
 * - Defers 3D `.glb` loading behind an explicit user tap ("Inspect in 3D") using
 *   `React.lazy` + `<Suspense>` inside the exact same aspect-locked viewport.
 */
export const ProductMediaStage: React.FC<ProductMediaStageProps> = ({
  posterUrl,
  glbUrl,
  alt,
  fallback,
}) => {
  const [show3D, setShow3D] = useState(false);

  const optimizedPoster = posterUrl
    ? optimizeImageKitUrl(posterUrl, { width: 900, quality: 82 })
    : undefined;
  const posterSrcSet = posterUrl ? buildImageKitSrcSet(posterUrl, [480, 900], 82) : undefined;

  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#FFF8F1]">
      {show3D && glbUrl ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#0B0E14] text-xs font-mono-tech text-[#8E98A8]">
              <Box size={24} className="text-[#FF5E1E] animate-pulse" />
              <span>Loading 3D Enclosure…</span>
            </div>
          }
        >
          <Deferred3DViewer
            modelUrl={glbUrl}
            posterUrl={posterUrl}
            alt={alt}
            onClose={() => setShow3D(false)}
          />
        </Suspense>
      ) : (
        <>
          {optimizedPoster ? (
            <img
              src={optimizedPoster}
              srcSet={posterSrcSet}
              sizes="(max-width: 1024px) 100vw, 58vw"
              alt={alt}
              width={900}
              height={675}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
            />
          ) : (
            <div className="relative my-2 sm:my-4">{fallback}</div>
          )}

          {glbUrl && (
            <button
              type="button"
              onClick={() => setShow3D(true)}
              className="absolute bottom-3 right-3 px-4 py-2 rounded-full bg-[#121722]/90 hover:bg-[#121722] text-white text-[11px] font-mono-tech font-bold uppercase tracking-wider border border-white/20 shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
            >
              <Box size={13} className="text-[#FF5E1E]" />
              <span>Inspect in 3D</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};
