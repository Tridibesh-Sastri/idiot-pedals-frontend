import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'pedal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'stacked' | 'inline';
}

export const IdiotPedalsLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  layout = 'stacked',
}) => {
  const idiotColor = variant === 'light' ? '#2A1A12' : '#F6F4EE';
  const pedalsColor = variant === 'light' ? '#FF4D00' : '#FF7A1A';

  if (layout === 'inline') {
    const inlineSizes = {
      sm: { idiot: 'text-xl sm:text-2xl', pedals: 'text-xl sm:text-2xl' },
      md: { idiot: 'text-2xl sm:text-3xl', pedals: 'text-2xl sm:text-3xl' },
      lg: { idiot: 'text-3xl sm:text-4xl', pedals: 'text-3xl sm:text-4xl' },
      xl: { idiot: 'text-4xl sm:text-5xl', pedals: 'text-4xl sm:text-5xl' },
    }[size];

    return (
      <div className={`inline-flex items-baseline gap-1.5 select-none leading-none ${className}`}>
        <span
          className={`font-editorial font-bold tracking-tight uppercase leading-none ${inlineSizes.idiot}`}
          style={{ color: idiotColor }}
        >
          IDIOT
        </span>
        <span
          className={`font-script font-normal leading-none pr-0.5 ${inlineSizes.pedals}`}
          style={{
            color: pedalsColor,
            WebkitTextStroke: `0.2px ${pedalsColor}`,
          }}
        >
          Pedals
        </span>
      </div>
    );
  }

  const sizeClasses = {
    sm: {
      idiot: 'text-xl sm:text-2xl tracking-[0.16em]',
      pedals: 'text-lg sm:text-xl -mt-1 pr-0.5',
    },
    md: {
      idiot: 'text-3xl sm:text-4xl tracking-[0.16em]',
      pedals: 'text-2xl sm:text-3xl -mt-1.5 pr-1',
    },
    lg: {
      idiot: 'text-4xl sm:text-5xl tracking-[0.16em]',
      pedals: 'text-3xl sm:text-4xl -mt-2 pr-1',
    },
    xl: {
      idiot: 'text-5xl sm:text-6xl tracking-[0.16em]',
      pedals: 'text-4xl sm:text-5xl -mt-2.5 pr-1',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`inline-flex flex-col items-center select-none leading-none ${className}`}>
      <span
        className={`font-editorial font-bold uppercase leading-[0.85] ${currentSize.idiot}`}
        style={{ color: idiotColor }}
      >
        IDIOT
      </span>
      <span
        className={`font-script font-normal leading-[0.95] ${currentSize.pedals}`}
        style={{
          color: pedalsColor,
          WebkitTextStroke: `0.2px ${pedalsColor}`,
        }}
      >
        Pedals
      </span>
    </div>
  );
};
