import React, { useEffect, useState } from 'react';
import { Box, Image as ImageIcon } from 'lucide-react';
import { optimizeImageKitUrl } from '../../lib/media';

interface Deferred3DViewerProps {
  modelUrl: string;
  posterUrl?: string;
  alt: string;
  onClose: () => void;
}

const MODEL_VIEWER_SCRIPT_ID = 'idiot-model-viewer-script';
const MODEL_VIEWER_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';

/**
 * Code-split 3D enclosure viewer loaded strictly on user intent ("Inspect in 3D").
 * Keeps WebGL / 3D viewer code and `.glb` downloads completely off the initial
 * page load so mobile LCP and INP stay fast.
 */
export default function Deferred3DViewer({
  modelUrl,
  posterUrl,
  alt,
  onClose,
}: Deferred3DViewerProps) {
  const [viewerReady, setViewerReady] = useState(
    () => typeof window !== 'undefined' && Boolean(window.customElements?.get('model-viewer'))
  );
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (viewerReady || typeof document === 'undefined') return;

    const existing = document.getElementById(MODEL_VIEWER_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      const onLoad = () => setViewerReady(true);
      const onError = () => setLoadFailed(true);
      existing.addEventListener('load', onLoad, { once: true });
      existing.addEventListener('error', onError, { once: true });
      return () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };
    }

    const script = document.createElement('script');
    script.id = MODEL_VIEWER_SCRIPT_ID;
    script.type = 'module';
    script.src = MODEL_VIEWER_SRC;
    script.onload = () => setViewerReady(true);
    script.onerror = () => setLoadFailed(true);
    document.head.appendChild(script);
  }, [viewerReady]);

  const optimizedPoster = posterUrl
    ? optimizeImageKitUrl(posterUrl, { width: 900, quality: 82 })
    : undefined;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0B0E14] rounded-xl sm:rounded-2xl overflow-hidden">
      {loadFailed ? (
        <div className="text-center px-6 space-y-3">
          <Box size={28} className="mx-auto text-[#FF5E1E]" />
          <p className="text-xs font-mono-tech text-[#F6F4EE]">
            3D viewer could not be initialized on this connection.
          </p>
          <a
            href={modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-full bg-[#FF5E1E] text-white text-[11px] font-mono-tech font-bold uppercase"
          >
            Download 3D Model (.glb)
          </a>
        </div>
      ) : !viewerReady ? (
        <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono-tech text-[#8E98A8]">
          <Box size={24} className="text-[#FF5E1E] animate-pulse" />
          <span>Loading 3D Enclosure…</span>
        </div>
      ) : (
        React.createElement('model-viewer', {
          src: modelUrl,
          poster: optimizedPoster,
          alt: `${alt} 3D enclosure model`,
          'camera-controls': true,
          'auto-rotate': true,
          'shadow-intensity': '1',
          loading: 'eager',
          style: { width: '100%', height: '100%', display: 'block' },
        })
      )}

      <button
        type="button"
        onClick={onClose}
        className="absolute bottom-3 right-3 px-3.5 py-2 rounded-full bg-[#0B0E14]/85 hover:bg-[#0B0E14] text-white text-[11px] font-mono-tech font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
      >
        <ImageIcon size={13} className="text-[#FF5E1E]" />
        <span>Back to Photo</span>
      </button>
    </div>
  );
}
