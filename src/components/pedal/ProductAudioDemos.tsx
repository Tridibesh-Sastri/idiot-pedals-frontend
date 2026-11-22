import React from 'react';
import { Volume2 } from 'lucide-react';

export interface ProductAudioTrack {
  name: string;
  url: string;
}

interface ProductAudioDemosProps {
  tracks: ProductAudioTrack[];
  productName: string;
}

/**
 * Studio audio demo cards with `preload="none"` so multi-megabyte `.mp3`/`.wav`
 * files never download until the visitor presses Play, and fixed-height card
 * layout to prevent Cumulative Layout Shift (CLS).
 */
export const ProductAudioDemos: React.FC<ProductAudioDemosProps> = ({ tracks, productName }) => {
  if (tracks.length === 0) return null;

  return (
    <section className="mt-8 bg-white border border-[#F0D3B8] rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-2 pb-4 border-b border-[#F0D3B8]">
        <Volume2 size={16} className="text-[#FF5E1E]" />
        <h2 className="text-xl font-editorial font-bold uppercase tracking-tight text-[#2A1A12]">
          Studio Audio Demos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
        {tracks.map((track, index) => (
          <div
            key={`${track.url}-${index}`}
            className="min-h-[96px] p-4 bg-[#FFF8F1] border border-[#F0D3B8] rounded-2xl flex flex-col justify-between gap-2.5"
          >
            <div className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#2A1A12] truncate">
              {track.name || `${productName} Demo ${index + 1}`}
            </div>
            <audio
              controls
              preload="none"
              src={track.url}
              aria-label={track.name || `${productName} audio demo ${index + 1}`}
              className="w-full h-10"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
