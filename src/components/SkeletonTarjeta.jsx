import '../styles/skeleton.css'

export default function SkeletonTarjeta() {
  return (
    <div className="skeleton-tarjeta">
      <div className="skeleton-tarjeta__img skeleton-pulse" />
      <div className="skeleton-tarjeta__body">
        <div className="skeleton-line skeleton-pulse" style={{ width: '60%', height: '14px' }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '85%', height: '20px', marginTop: '8px' }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '100%', height: '13px', marginTop: '8px' }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '75%', height: '13px', marginTop: '6px' }} />
        <div className="skeleton-tarjeta__footer">
          <div className="skeleton-line skeleton-pulse" style={{ width: '60px', height: '13px' }} />
          <div className="skeleton-line skeleton-pulse" style={{ width: '80px', height: '13px' }} />
        </div>
      </div>
    </div>
  )
}