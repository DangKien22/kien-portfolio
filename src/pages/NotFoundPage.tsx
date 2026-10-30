import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <p className="eyebrow"><span className="eyebrow-dot" /> 404 — PAGE NOT FOUND</p>
      <h1>You seem a little lost.<br /><span className="text-muted">It happens.</span></h1>
      <Link className="button button-primary" to="/">Back to home</Link>
    </section>
  )
}
