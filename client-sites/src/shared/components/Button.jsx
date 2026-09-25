export default function Button({ children, type = 'button', className = '' }) {
  return (
    <button type={type} className={`w-full rounded-lg bg-court py-3 font-semibold text-white hover:brightness-110 ${className}`}>
      {children}
    </button>
  )
}
