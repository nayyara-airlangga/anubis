import { TypographyProps } from "../interface"

interface DisplayProps extends TypographyProps {
  variant: "d1" | "d2"
}

const Display = ({
  font = "default",
  className = "",
  variant,
  weight = "regular",
  children,
  size,
  ...props
}: DisplayProps) => {
  switch (variant) {
    case "d1":
      return (
        <h1
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[72px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </h1>
      )

    case "d2":
      return (
        <h2
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[60px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </h2>
      )
  }
}

export { Display }
