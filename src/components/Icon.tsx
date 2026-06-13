import type { SVGProps } from 'react'

type IconName =
  | 'building'
  | 'sparkles'
  | 'cpu'
  | 'shield'
  | 'brain'
  | 'globe'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'menu'

const paths: Record<IconName, JSX.Element> = {
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
      <path d="M13 9h5a1 1 0 0 1 1 1v11" />
      <path d="M8 8h1M8 12h1M8 16h1M16 13h1M16 17h1" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M5 12H3M21 12h-2" />
      <path d="M12 7l1.6 3.4L17 12l-3.4 1.6L12 17l-1.6-3.4L7 12l3.4-1.6L12 7z" />
      <path d="M18 4l.7 1.5L20 6l-1.3.5L18 8l-.7-1.5L16 6l1.3-.5L18 4z" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  brain: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A2.5 2.5 0 0 0 6.5 18 2.5 2.5 0 0 0 9 20.5V4z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A2.5 2.5 0 0 1 17.5 18 2.5 2.5 0 0 1 15 20.5V4z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17L17 7M8 7h9v9" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
  size?: number
}

export function Icon({ name, size = 22, ...rest }: IconProps) {
  const content = paths[(name as IconName)] ?? paths.sparkles
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {content}
    </svg>
  )
}
