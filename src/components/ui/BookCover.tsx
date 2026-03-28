import * as React from 'react'
import { cn } from '../../lib/utils'

interface BookCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isbn?: string;
  size?: 'S' | 'M' | 'L';
}

export function BookCover({ title, isbn, size = 'M', className, ...props }: BookCoverProps) {
  const [imgError, setImgError] = React.useState(false);

  // Hash simples para gerar matizes constantes pelo título
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  
  const words = title.replace(/^(O|A|Os|As|Um|Uma) /i, '').split(' ').filter(w => w.length > 0);
  const initials = words.slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const coverUrl = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg` : undefined;

  return (
    <div 
      className={cn(
        "relative rounded overflow-hidden shadow-sm flex-shrink-0 border border-slate-200/50 bg-slate-100 flex flex-col items-center justify-center",
        className
      )}
      style={{
        background: imgError || !coverUrl 
          ? `linear-gradient(135deg, hsl(${hue}, 40%, 30%), hsl(${(hue + 40) % 360}, 60%, 15%))`
          : undefined
      }}
      {...props}
    >
      {(coverUrl && !imgError) ? (
        <img 
          src={coverUrl} 
          alt={title} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      ) : (
        <>
          <span className="text-white/80 font-serif font-bold text-2xl tracking-widest drop-shadow-md z-10">{initials}</span>
          <div className="absolute inset-0 bg-black/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-0" />
        </>
      )}
    </div>
  )
}
