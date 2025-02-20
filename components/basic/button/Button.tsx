/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, useMemo } from 'react'
import { type VariantProps } from 'tailwind-variants'
import { ImSpinner2 } from 'react-icons/im'
import { outlineButton, solidButton, ghostButton } from './ButtonStyles'

// define all the button attributes
type BaseButtonAttributes = React.ComponentPropsWithoutRef<'button'>

// define the ref type
type Ref = HTMLButtonElement

// extend the base button attributes
interface ButtonProps extends BaseButtonAttributes {
	isLoading?: boolean
	disabled?: boolean
	leftIcon?: React.ReactElement
	rightIcon?: React.ReactElement
	buttonStyle?: VariantProps<
		typeof solidButton | typeof outlineButton | typeof ghostButton
	>
	className?: string
	buttonVariant?: 'solid' | 'outline' | 'ghost'
}

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
	// destructure necessary props
	const {
		type,
		children,
		buttonStyle,
		buttonVariant,
		disabled,
		isLoading,
		leftIcon,
		rightIcon,
		className,
		...rest
	} = props

	// determine icon placement
	const { newIcon: icon, iconPlacement } = useMemo(() => {
		let newIcon = rightIcon || leftIcon

		if (isLoading) {
			newIcon = <ImSpinner2 className='animate-spin' size={25} />
		}

		return {
			newIcon,
			iconPlacement: rightIcon ? ('right' as const) : ('left' as const),
		}
	}, [isLoading, leftIcon, rightIcon])

	// const renderButtonVariant = () => {
	// 	if (buttonVariant === 'solid') {
	// 		return solidButton({ ...buttonStyle, className })
	// 	}
	// }

	const renderButtonVariant = () => {
		const buttonVariants = {
			solid: solidButton,
			outline: outlineButton,
			ghost: ghostButton,
		}

		const ButtonComponent = buttonVariants[buttonVariant ?? 'solid']

		return ButtonComponent
			? ButtonComponent({
					...buttonStyle,
					disabled: disabled || isLoading,
					className,
				} as any)
			: null
	}

	return (
		<button
			className={renderButtonVariant() || undefined}
			{...rest}
			type={type ? 'submit' : 'button'}
			ref={ref}
			disabled={disabled || isLoading}
		>
			{/** render icon before */}
			{icon && iconPlacement === 'left' ? (
				<span
					className={`inline-flex shrink-0 self-center ${
						children && !isLoading && 'mr-2'
					}`}
				>
					{icon}
				</span>
			) : null}

			{/** hide button text during loading state */}
			{!isLoading && children}

			{/** render icon after */}
			{icon && iconPlacement === 'right' ? (
				<span
					className={`inline-flex shrink-0 self-center  ${
						children && !isLoading && 'ml-2'
					}`}
				>
					{icon}
				</span>
			) : null}
		</button>
	)
})

// set default props
Button.defaultProps = {
	buttonStyle: {},
	buttonVariant: 'solid',
	isLoading: false,
	disabled: false,
	leftIcon: undefined,
	rightIcon: undefined,
}

export default Button
