import { TypographyProps } from "../interface"

interface BodyProps extends TypographyProps {
  variant: "b1" | "b2" | "b3" | "b4"
}

const Body = ({
  font = "default",
  className = "",
  variant,
  weight = "regular",
  size,
  children,
  ...props
}: BodyProps) => {
  switch (variant) {
    case "b1":
      return (
        <p
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[24px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </p>
      )

    case "b2":
      return (
        <p
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[20px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </p>
      )

    case "b3":
      return (
        <p
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[16px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </p>
      )

    case "b4":
      return (
        <p
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[14px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </p>
      )
  }
}

export { Body }
