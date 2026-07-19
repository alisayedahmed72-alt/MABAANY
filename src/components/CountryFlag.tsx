import React from 'react';

interface CountryFlagProps {
  countryCode: string; // e.g. '+966', '+20', '+218', '+971'
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, className = "w-5 h-3.5" }) => {
  const code = countryCode.trim();

  // Saudi Arabia (KSA) - Green with elegant stylized representation of the white sword
  if (code === '+966' || code === 'SA') {
    return (
      <span className="inline-flex items-center select-none shrink-0" aria-label="Saudi Arabia Flag">
        <svg 
          className={`${className} rounded-sm shadow-sm border border-emerald-800/10 object-cover`} 
          viewBox="0 0 24 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Field */}
          <rect width="24" height="16" fill="#006C35"/>
          
          {/* Stylized calligraphic inscriptions (shahada proxy) */}
          <path d="M5 5C6.2 5 7 4.2 8.5 4.2C10 4.2 11 5 12.5 5C14 5 15 4.2 16.5 4.2C18 4.2 18.8 5 20 5" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M6 6.5C7.2 6.5 8 5.7 9.5 5.7C11 5.7 12 6.5 13.5 6.5C15 6.5 16 5.7 17.5 5.7C18.5 5.7 19 6.5 20 6.5" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
          
          {/* Saber (Sword) pointing left as on the official flag */}
          <path d="M5.5 9.5H18.5" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
          {/* Sword hilt details */}
          <path d="M17.5 8.5V10.5" stroke="white" strokeWidth="0.9" strokeLinecap="round"/>
        </svg>
      </span>
    );
  }

  // Egypt - Red, White, Black tricolor with golden Eagle of Saladin
  if (code === '+20' || code === 'EG') {
    return (
      <span className="inline-flex items-center select-none shrink-0" aria-label="Egypt Flag">
        <svg 
          className={`${className} rounded-sm shadow-sm border border-neutral-200/50 object-cover`} 
          viewBox="0 0 24 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Red stripe */}
          <rect width="24" height="5.33" fill="#CE1126"/>
          {/* Middle White stripe */}
          <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
          {/* Bottom Black stripe */}
          <rect y="10.67" width="24" height="5.33" fill="#000000"/>
          
          {/* Eagle of Saladin in center */}
          <path d="M11 6.5L12 5.5L13 6.5L13.4 8H10.6L11 6.5Z" fill="#C09300"/>
          <path d="M10 7.2C9.5 7.6 9 8.3 9 9.1H15C15 8.3 14.5 7.6 14 7.2L12 7.6L10 7.2Z" fill="#C09300"/>
        </svg>
      </span>
    );
  }

  // Libya - Red, Black (double), Green with white crescent and star
  if (code === '+218' || code === 'LY') {
    return (
      <span className="inline-flex items-center select-none shrink-0" aria-label="Libya Flag">
        <svg 
          className={`${className} rounded-sm shadow-sm border border-neutral-900/10 object-cover`} 
          viewBox="0 0 24 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stripes */}
          <rect width="24" height="4" fill="#E70013"/>
          <rect y="4" width="24" height="8" fill="#000000"/>
          <rect y="12" width="24" height="4" fill="#009E49"/>
          
          {/* White Crescent */}
          <path d="M12.2 6.5C11.2 6.5 10.4 7.3 10.4 8.3C10.4 9.3 11.2 10.1 12.2 10.1C12.7 10.1 13.1 9.9 13.4 9.6C12.8 9.7 12.2 9.5 11.9 9.0C11.6 8.5 11.7 7.8 12.1 7.4C12.1 7.4 12.2 7.4 12.2 7.3C12.0 7.0 12.1 6.7 12.2 6.5Z" fill="white"/>
          
          {/* Five-pointed Star */}
          <path d="M13.6 7.6L13.8 8.1H14.3L13.9 8.4L14.0 8.9L13.6 8.6L13.2 8.9L13.3 8.4L12.9 8.1H13.4L13.6 7.6Z" fill="white"/>
        </svg>
      </span>
    );
  }

  // UAE - Vertical red stripe, three horizontal stripes (green, white, black)
  if (code === '+971' || code === 'AE') {
    return (
      <span className="inline-flex items-center select-none shrink-0" aria-label="UAE Flag">
        <svg 
          className={`${className} rounded-sm shadow-sm border border-neutral-200/50 object-cover`} 
          viewBox="0 0 24 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal bands */}
          <rect x="6" width="18" height="5.33" fill="#00732F"/>
          <rect x="6" y="5.33" width="18" height="5.34" fill="#FFFFFF"/>
          <rect x="6" y="10.67" width="18" height="5.33" fill="#000000"/>
          
          {/* Vertical Red band at the hoist */}
          <rect width="6" height="16" fill="#FF0000"/>
        </svg>
      </span>
    );
  }

  // Fallback text rendering if it's some other code
  return (
    <span className={`${className} bg-neutral-200 rounded-sm shadow-sm flex items-center justify-center text-[8px] font-mono font-bold text-neutral-600 uppercase select-none shrink-0`}>
      {code.replace('+', '')}
    </span>
  );
};
