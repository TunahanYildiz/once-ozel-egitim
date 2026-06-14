"use client";

const PHONE = "905535575515";
const MESSAGE = encodeURIComponent(
  "Merhaba, size web sitenizden ulaşıyorum, detaylı bilgi verebilir misiniz?"
);
const WA_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float-btn"
      aria-label="WhatsApp ile İletişime Geçin"
      className="whatsapp-float fixed z-[9999] bottom-7 right-7 w-[60px] h-[60px] rounded-full flex items-center justify-center decoration-transparent"
      style={{
        background: "linear-gradient(135deg, #25d366 60%, #128c7e 100%)",
        boxShadow: "0 4px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s",
        animation: "wa-pulse 2.4s ease-in-out infinite",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.13)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px rgba(37,211,102,0.6), 0 4px 16px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)";
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.003 2C8.28 2 2 8.278 2 15.998c0 2.478.66 4.8 1.81 6.814L2 30l7.393-1.781A13.944 13.944 0 0016.003 30C23.722 30 30 23.722 30 16.003 30 8.28 23.722 2 16.003 2zm0 25.545a11.534 11.534 0 01-5.874-1.607l-.42-.25-4.388 1.057 1.09-4.274-.278-.44A11.501 11.501 0 014.455 16c0-6.373 5.179-11.545 11.548-11.545 6.37 0 11.543 5.172 11.543 11.545 0 6.37-5.172 11.545-11.543 11.545zm6.354-8.646c-.348-.173-2.059-1.014-2.379-1.13-.318-.115-.55-.172-.78.173-.232.347-.896 1.13-1.099 1.363-.202.231-.404.26-.752.087-.348-.174-1.47-.542-2.799-1.726-1.034-.923-1.733-2.062-1.936-2.41-.203-.348-.022-.536.152-.709.156-.155.348-.404.521-.607.173-.202.23-.347.348-.578.115-.232.057-.434-.029-.607-.087-.172-.78-1.878-1.069-2.572-.282-.675-.567-.584-.78-.595l-.665-.011c-.231 0-.607.087-.925.434-.318.347-1.212 1.184-1.212 2.888 0 1.705 1.241 3.352 1.414 3.584.173.231 2.443 3.73 5.918 5.23.827.357 1.47.571 1.973.731.829.264 1.583.227 2.179.138.664-.1 2.059-.842 2.349-1.657.29-.815.29-1.514.203-1.657-.086-.144-.318-.23-.666-.405z"/>
      </svg>

      {/* Ripple pulse ring */}
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 4px 24px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.35); }
          60%  { box-shadow: 0 4px 24px rgba(37,211,102,0.45), 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 4px 24px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </a>
  );
}
