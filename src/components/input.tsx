interface InputProps {
	className?: string
	name?: string
	type?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	pattern?: string
	placeholder?: string
	value?: any
}

export default function Input({
	className = '',
	type = 'text',
	name = 'input',
	onChange,
	disabled,
	pattern,
	placeholder,
	value,
}: InputProps) {
	return (
		<input
			className={`input form-input ${className}`}
			type={type}
			onChange={onChange}
			disabled={disabled}
			name={name}
			pattern={pattern}
			placeholder={placeholder}
			value={value}
		/>
	)
}
