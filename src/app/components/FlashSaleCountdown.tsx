import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { getFlashSaleEndDate } from '../data/flashSale';

// Daily sale — always counts down to tonight's 23:59:59 ICT, then rolls
// over to the next day automatically, so it never shows "ended".
function getTimeLeft() {
  const diff = Math.max(0, getFlashSaleEndDate().getTime() - Date.now());
  const days = 0;
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function FlashSaleCountdown({ size = 'default' }: { size?: 'default' | 'small' }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const boxClass = size === 'small'
    ? 'bg-black text-white text-xs font-bold rounded px-1.5 py-1 min-w-[24px] text-center'
    : 'bg-black text-white text-sm md:text-base font-bold rounded-md px-2 py-1.5 min-w-[32px] md:min-w-[36px] text-center';

  return (
    <div className="flex items-center gap-1">
      <span className={`text-neutral-500 font-semibold mr-1 ${size === 'small' ? 'text-[11px]' : 'text-xs'}`}>Kết thúc sau</span>
      <span className={boxClass}>{pad(timeLeft.hours)}</span>
      <span className="text-neutral-400 font-bold">:</span>
      <span className={boxClass}>{pad(timeLeft.minutes)}</span>
      <span className="text-neutral-400 font-bold">:</span>
      <span className={boxClass}>{pad(timeLeft.seconds)}</span>
    </div>
  );
}

export function FlashSaleHeading({ size = 'default' }: { size?: 'default' | 'small' }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <Zap className="text-[#F16C10] fill-[#F16C10]" size={size === 'small' ? 18 : 24} />
        <span className={`font-extrabold italic text-[#F16C10] ${size === 'small' ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
          FLASH SALE
        </span>
      </div>
      <FlashSaleCountdown size={size} />
    </div>
  );
}
