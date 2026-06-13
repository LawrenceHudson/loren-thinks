import Link from 'next/link'

interface FooterProps {
  logoText: string
  tagline: string
  subscribeUrl: string
}

export function Footer({ logoText, tagline, subscribeUrl }: FooterProps) {
  const dotIndex = logoText.lastIndexOf('.')
  const head = dotIndex >= 0 ? logoText.slice(0, dotIndex) : logoText
  const tail = dotIndex >= 0 ? logoText.slice(dotIndex) : ''
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">
            {head}
            <span className="dot">{tail}</span>
          </div>
          <p className="footer-tagline">{tagline}</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Read</h4>
            <Link href="/writing">Writing</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/signals">Signals</Link>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <Link href="/about">About</Link>
            <a href={subscribeUrl || '#'} target="_blank" rel="noopener noreferrer">
              Subscribe
            </a>
            <Link href="/studio">Studio</Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {logoText}. Written from the deployment side.</span>
        <span>Predictions graded in public.</span>
      </div>
    </footer>
  )
}
