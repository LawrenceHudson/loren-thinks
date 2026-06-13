import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </span>
        <h1 className="page-title" style={{ marginTop: 14 }}>
          This page wandered off
        </h1>
        <p className="page-sub" style={{ margin: '16px auto 28px' }}>
          The thought you were looking for is not here. Try the writing index.
        </p>
        <Link href="/writing" className="btn btn-amber">
          Browse the writing
        </Link>
      </div>
    </section>
  )
}
