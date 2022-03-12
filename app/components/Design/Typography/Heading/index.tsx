import { TypographyProps } from "../interface"

interface HeadingProps extends TypographyProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h4" | "h5" | "h6"
}

const Heading = ({
  font = "default",
  className = "",
  variant,
  weight = "regular",
  size,
  children,
  ...props
}: HeadingProps) => {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[48px]"} ${
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

    case "h2":
      return (
        <h2
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[36px]"} ${
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

    case "h3":
      return (
        <h3
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[32px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </h3>
      )

    case "h4":
      return (
        <h4
          className={`${
            font === "karla"
              ? "font-karla"
              : font === "nunito"
              ? "font-nunito"
              : ""
          } ${size ?? "text-[28px]"} ${
            weight === "bold"
              ? "font-bold"
              : weight === "light"
              ? "font-light"
              : "font-normal"
          } ${className}`}
          {...props}
        >
          {children}
        </h4>
      )

    case "h5":
      return (
        <h5
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
        </h5>
      )

    case "h6":
      return (
        <h6
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
        </h6>
      )
  }
}

export { Heading }
