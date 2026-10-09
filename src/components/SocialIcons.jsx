export default function SocialIcons({ gradientId }) {
  return (
    <>
      <a href="#" aria-label="Facebook">
        <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
      </a>
      <a href="#" aria-label="X">
        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a href="#" aria-label="Instagram">
        <svg viewBox="0 0 24 24">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#fec053" />
              <stop offset=".3" stopColor="#fd5949" />
              <stop offset=".65" stopColor="#d6249f" />
              <stop offset="1" stopColor="#833ab4" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
          <g fill="none" stroke="#fff" strokeWidth="1.8">
            <rect x="5" y="5" width="14" height="14" rx="4" />
            <circle cx="12" cy="12" r="3.3" />
          </g>
          <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
        </svg>
      </a>
      <a href="#" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
      </a>
    </>
  )
}
