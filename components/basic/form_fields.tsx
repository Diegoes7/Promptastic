import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputFieldProps = {
	inputValue: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	label: string
	subTitle: string
	placeholder?: string
	name: string
	htmlFor: string
} & InputHTMLAttributes<HTMLInputElement>

export const InputField = ({
	handleChange,
	inputValue,
	label,
	subTitle,
	placeholder,
	name,
	htmlFor,
	...props
}: InputFieldProps) => {
	return (
		<label htmlFor={htmlFor}>
			<span className='font-satoshi font-semibold text-base text-[#020e10]'>
				{label} <span className='font-normal'>{subTitle}</span>
			</span>
			<input
				{...props}
				id={name}
				name={name}
				value={inputValue}
				onChange={handleChange}
				type='text'
				placeholder={placeholder}
				required
				className='form_input'
			/>
		</label>
	)
}

type TextAreaFieldProps = {
	label: string
	name: string
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	textareaValue: string
	placeholder: string
	htmlFor: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField = ({
	label,
	name,
	handleChange,
	textareaValue,
	placeholder,
	htmlFor,
	...props
}: TextAreaFieldProps) => {
	return (
		<label htmlFor={htmlFor}>
			<span className='font-satoshi font-semibold text-base text-[#020e10]'>
				{label}
			</span>
			<textarea
				{...props}
				id={name}
				name={name}
				value={textareaValue}
				onChange={handleChange}
				placeholder={placeholder}
				required
				className='form_textarea'
			/>
		</label>
	)
}

type StaticFieldProps = {
	label: string
	content: string | undefined | null
}

export const StaticField = ({ label, content }: StaticFieldProps) => {
	return (
		<div>
			<label className='flex items-center space-x-2 mb-2'>
				<span>{label}</span>
				<h4>{content}</h4>
			</label>
		</div>
	)
}
