import Link from "next/link"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  className?: string
  isDisabled?: boolean
  padding?: string
  margin?: string
  bgColor?: string
  hoverBgColor?: string
  clickedBgColor?: string
  disabledBgColor?: string
  textColor?: string
  hoverTextColor?: string
  clickedTextColor?: string
  disabledTextColor?: string
  borderColor?: string
  hoverBorderColor?: string
  clickedBorderColor?: string
  disabledBorderColor?: string
  borderWidth?: string
  borderRadius?: string
  href?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  leftIcon?: React.SVGAttributes<SVGElement>
  rightIcon?: React.SVGAttributes<SVGElement>
  children?: React.ReactNode
  [props: string]: any
}

const Button = ({
  type = "button",
  className = "",
  isDisabled = false,
  children,
  leftIcon,
  rightIcon,
  padding = "px-[22px] py-[11px]",
  margin = "",
  bgColor = "bg-secondary-300 dark:bg-primary-400",
  hoverBgColor = "hover:bg-secondary-500 dark:hover:bg-primary-500",
  clickedBgColor = "active:bg-secondary-600 dark:active:bg-primary-600",
  disabledBgColor = "disabled:bg-neutral-500 dark:disabled:bg-neutral-500",
  textColor = "text-neutral-50 dark:text-neutral-800",
  hoverTextColor = "",
  clickedTextColor = "",
  disabledTextColor = "disabled:text-neutral-300 dark:disabled:text-neutral-200",
  borderColor = "",
  hoverBorderColor = "",
  clickedBorderColor = "",
  disabledBorderColor = "",
  borderWidth = "",
  borderRadius = "rounded-[8px]",
  href,
  onClick = (event) => {},
  ...props
}: ButtonProps) => {
  return href ? (
    href.startsWith("/") ? (
      <Link href={href}>
        <a>
          <button
            type={type}
            className={`transition-all md:text-base text-sm flex justify-center items-center gap-2 ${padding} ${margin} ${bgColor} ${hoverBgColor} ${clickedBgColor} ${disabledBgColor} ${textColor} ${hoverTextColor} ${clickedTextColor} ${disabledTextColor} ${borderColor} ${hoverBorderColor} ${clickedBorderColor} ${disabledBorderColor} ${borderWidth} ${borderRadius} ${className}`}
            onClick={onClick}
            disabled={isDisabled}
            {...props}
          >
            {leftIcon && <>{leftIcon}</>}
            {children}
            {rightIcon && <>{rightIcon}</>}
          </button>
        </a>
      </Link>
    ) : (
      <a href={href}>
        <button
          type={type}
          className={`transition-all md:text-base text-sm flex justify-center items-center gap-2 ${padding} ${margin} ${bgColor} ${hoverBgColor} ${clickedBgColor} ${disabledBgColor} ${textColor} ${hoverTextColor} ${clickedTextColor} ${disabledTextColor} ${borderColor} ${hoverBorderColor} ${clickedBorderColor} ${disabledBorderColor} ${borderWidth} ${borderRadius}  ${className}`}
          onClick={onClick}
          disabled={isDisabled}
          {...props}
        >
          {leftIcon && <>{leftIcon}</>}
          {children}
          {rightIcon && <>{rightIcon}</>}
        </button>
      </a>
    )
  ) : (
    <button
      type={type}
      className={`transition-all md:text-base text-sm flex justify-center items-center gap-2 ${padding} ${margin} ${bgColor} ${hoverBgColor} ${clickedBgColor} ${disabledBgColor} ${textColor} ${hoverTextColor} ${clickedTextColor} ${disabledTextColor} ${borderColor} ${hoverBorderColor} ${clickedBorderColor} ${disabledBorderColor} ${borderWidth} ${borderRadius}  ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <>{rightIcon}</>}
    </button>
  )
}

export { Button }
