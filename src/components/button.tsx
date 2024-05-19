interface ButtonProps {
	children: React.ReactNode
	className?: string
	title?: string
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	disabled?: boolean
}

export default function Button({
	children,
	className = '',
	type = 'button',
	title = 'Click',
	onClick,
	disabled,
}: ButtonProps) {
	return (
		<button
			className={`btn ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
			title={title}
		>
			{children}
		</button>
	)
}
