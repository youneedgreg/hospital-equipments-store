export function LogoIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/biosystems logo.jpeg" alt="BIOSYSTEMS Logo" className={className} />
  )
}

export function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" className="fill-secondary/20 stroke-secondary" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-6"
        className="stroke-secondary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        className="fill-primary/10 stroke-primary"
        strokeWidth="2"
      />
      <path d="M9 12l2 2 4-4" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="15" height="13" rx="2" className="fill-secondary/10 stroke-secondary" strokeWidth="2" />
      <path
        d="M16 8h4l3 3v5h-7V8z"
        className="fill-secondary/10 stroke-secondary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="18.5" r="2.5" className="fill-secondary stroke-secondary" strokeWidth="2" />
      <circle cx="18.5" cy="18.5" r="2.5" className="fill-secondary stroke-secondary" strokeWidth="2" />
    </svg>
  )
}

export function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="3" className="fill-primary/10 stroke-primary" strokeWidth="2" />
      <path d="M2 10h20" className="stroke-primary" strokeWidth="2" />
      <path d="M6 15h4" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        className="fill-chart-4 stroke-chart-4"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        className="fill-destructive/20 stroke-destructive"
        strokeWidth="2"
      />
      <path
        d="M3 12h3l2-3 4 6 2-3h3"
        className="stroke-destructive"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.78 0l-8-4A2 2 0 0 1 2 16.76V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"
        className="fill-primary/10 stroke-primary"
        strokeWidth="2"
      />
      <path d="M2.32 6.16L12 11l9.68-4.84M12 22.76V11" className="stroke-primary" strokeWidth="2" />
    </svg>
  )
}

export function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="4" className="fill-secondary/20 stroke-secondary" strokeWidth="2" />
      <path
        d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"
        className="stroke-secondary"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="17" cy="7" r="3" className="fill-secondary/20 stroke-secondary" strokeWidth="2" />
      <path d="M22 21v-2a3 3 0 0 0-2-2.83" className="stroke-secondary" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="20" r="2" className="fill-primary stroke-primary" strokeWidth="2" />
      <circle cx="17" cy="20" r="2" className="fill-primary stroke-primary" strokeWidth="2" />
      <path d="M3 3h2l3 12h10l3-8H6" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ToolIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.7 6.3a4 4 0 1 0-5.6 5.6l8 8 4-4-8-8z"
        className="stroke-secondary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 10l1.5-1.5" className="stroke-secondary" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function UserCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" className="fill-primary/20 stroke-primary" strokeWidth="2" />
      <path
        d="M4 21v-2a6 6 0 0 1 12 0v2"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M16 11l2 2 4-4" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
