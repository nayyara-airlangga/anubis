import { useRef, useState } from "react"

import ArrowDropdownIcon from "@icons/arrow_drop_down.svg"

interface DropdownOption {
  value: string
  label: string
}

interface InputFieldProps {
  className?: string

  required?: boolean
  type:
    | "email"
    | "file"
    | "number"
    | "password"
    | "dropdown"
    | "text"
    | "textarea"
  padding?: string
  borderRadius?: string
  name: string
  rows?: number
  label?: string
  value?: string | number
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
  placeholder?: string
  dropdownOptions?: DropdownOption[]
  caption?: string
  errorMessage?: string
  leftIcon?: React.SVGAttributes<SVGElement>
  rightIcon?: React.SVGAttributes<SVGElement>

  isDisabled?: boolean
  isError?: boolean
  isSuccess?: boolean
  [props: string]: any
}
const Input = ({
  type,
  className = "",
  rows = 0,
  placeholder = "",
  dropdownOptions,
  isError,
  isSuccess,
  isDisabled,
  leftIcon,
  rightIcon,
  padding = "",
  ...props
}: InputFieldProps) => {
  const [filename, setFilename] = useState<string | undefined>()
  const fileInput = useRef<HTMLInputElement>(null)

  switch (type) {
    case "dropdown":
      return (
        <div className="inline-block relative w-full">
          {leftIcon && (
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2">
              {leftIcon}
            </div>
          )}
          <select
            className={`${padding} dark:text-neutral-200 ${
              leftIcon && "pl-10"
            } ${rightIcon && "pr-10"} ${className}`}
            {...props}
          >
            <option className="max-w-full">{placeholder}</option>
            {dropdownOptions?.map((o) => (
              <option className="max-w-full" key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none flex absolute top-1/2 -translate-y-1/2 right-2">
            {rightIcon && <div className="inline-block">{rightIcon}</div>}
            <ArrowDropdownIcon
              className={`inline-block ${
                !isDisabled ? "dark:fill-neutral-200" : "dark:fill-neutral-300"
              } w-6 h-6`}
            />
          </div>
        </div>
      )
    case "textarea":
      return (
        <div className="inline-block relative w-full">
          {leftIcon && <div className="absolute top-2 left-2">{leftIcon}</div>}
          <textarea
            className={`${padding} hide-scrollbar select-text ${
              leftIcon && "pl-10"
            } ${rightIcon && "pr-10"} ${className}`}
            placeholder={placeholder}
            rows={rows}
            {...props}
          ></textarea>
          {rightIcon && (
            <div className="absolute top-2 right-2">{rightIcon}</div>
          )}
        </div>
      )
    case "file":
      const handleClick = () => {
        fileInput.current?.click()
      }
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFilename(file?.name)
        if (props.onChange) {
          props.onChange(e)
        }
      }
      return (
        <div className={`${padding} inline-block relative w-full`}>
          <button
            disabled={isDisabled}
            className={`text-left ${className}`}
            onClick={handleClick}
          >
            {filename || placeholder}
          </button>
          <input
            disabled={isDisabled}
            className="hidden"
            type="file"
            ref={fileInput}
            onChange={handleChange}
          />
        </div>
      )
    default:
      return (
        <div className="inline-block relative w-full">
          {leftIcon && (
            <div className="absolute top-1/2 -translate-y-1/2 left-2">
              {leftIcon}
            </div>
          )}
          <input
            className={`${padding} select-text ${leftIcon && "pl-10"} ${
              rightIcon && "pr-10"
            } ${className}`}
            type={type}
            placeholder={placeholder}
            {...props}
          />
          {rightIcon && (
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              {rightIcon}
            </div>
          )}
        </div>
      )
  }
}
const InputField = ({
  required,
  isDisabled = false,
  isError = false,
  isSuccess = false,
  borderRadius = "",
  ...props
}: InputFieldProps) => {
  const inputElement = (
    <Input
      {...props}
      isDisabled={isDisabled}
      disabled={isDisabled}
      isError={isError}
      isSuccess={isSuccess}
      className={`dark:text-neutral-200 dark:placeholder:text-neutral-300 dark:disabled:text-neutral-500 dark:disabled:placeholder:text-neutral-500 appearance-none w-full px-3 py-2 ${borderRadius} rounded leading-tight focus:outline-none
  ${
    isDisabled
      ? "dark:bg-neutral-600 border dark:border-neutral-500"
      : isError
      ? "dark:bg-neutral-600 border border-red-500 ring-1 ring-red-500"
      : isSuccess
      ? "dark:bg-neutral-600 border border-green-500 ring-1 ring-green-500"
      : "dark:bg-neutral-600 border dark:border-neutral-400 dark:focus:border-neutral-200 focus:ring-1 focus:shadow-inner"
  }`}
    />
  )

  const labelText = props.label && (
    <label
      htmlFor={props.name}
      className="dark:text-neutral-200 block font-medium mb-2"
    >
      {props.label}
      {required && <span className="text-red-500">*</span>}
    </label>
  )

  const helperText =
    isError && props.errorMessage ? (
      <p className="mt-2 dark:text-neutral-200 text-xs">{props.errorMessage}</p>
    ) : props.caption ? (
      <p className="mt-2 dark:text-neutral-200 text-xs">{props.caption}</p>
    ) : (
      ""
    )

  return (
    <div className={`${props.className} flex flex-col w-full font-normal mb-4`}>
      {labelText}
      {inputElement}
      {helperText}
    </div>
  )
}
export { InputField }
