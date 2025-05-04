import styles from "./Button.module.css"

type ButtonProps = {
  semanticType?: "submit" | "reset" | "button" | undefined
  type?: ButtonType
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}

export enum ButtonType {
  PRIMARY = 0,
  SECONDARY = 1,
  DESTRUCTIVE = 2,
  SUCCESS = 3,
}

const Button: React.FC<ButtonProps> = ({
  semanticType = "submit",
  type = ButtonType.PRIMARY,
  text,
  onClick,
  disabled = false,
  loading = false,
  loadingText,
}) => {
  switch (type) {
    case ButtonType.SECONDARY:
      return (
        <button
          type={semanticType}
          onClick={onClick}
          disabled={disabled || loading}
          className={`${styles.button} ${styles.secondary} ${disabled || loading ? styles.disabled : ""}`}
        >
          {loading ? loadingText : text}
        </button>
      )
    case ButtonType.DESTRUCTIVE:
      return (
        <button
          type="submit"
          onClick={onClick}
          disabled={disabled || loading}
          className={`${styles.button} ${styles.destructive} ${disabled || loading ? styles.disabled : ""}`}
        >
          {loading ? loadingText : text}
        </button>
      )
    case ButtonType.SUCCESS:
      return (
        <button
          type="submit"
          onClick={onClick}
          disabled={disabled || loading}
          className={`${styles.button} ${styles.success} ${disabled || loading ? styles.disabled : ""}`}
        >
          {loading ? loadingText : text}
        </button>
      )
    default:
      return (
        <button
          type={semanticType}
          onClick={onClick}
          disabled={disabled || loading}
          className={`${styles.button} ${disabled || loading ? styles.disabled : ""}`}
        >
          {loading ? loadingText : text}
        </button>
      )
  }
}

export default Button
