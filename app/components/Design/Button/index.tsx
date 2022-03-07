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
  bgColor = "bg-red-500 dark:bg-blue-500",
  hoverBgColor = "hover:bg-red-600 dark:hover:bg-blue-600",
  clickedBgColor = "active:bg-red-700 dark:active:bg-blue-700",
  disabledBgColor = "disabled:bg-neutral-500 dark:disabled:bg-neutral-600",
  textColor = "text-neutral-200 dark:text-neutral-200",
  hoverTextColor = "",
  clickedTextColor = "",
  disabledTextColor = "disabled:text-neutral-300 dark:disabled:text-neutral-400",
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
