export default function Container({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) {
	return <div className={`mx-auto w-full max-w-6xl md:p-4 ${className}`}>{children}</div>
}
