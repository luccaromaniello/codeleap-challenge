import styles from "./Button.module.css"

type ButtonProps = {
  type?: ButtonType
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
}

enum ButtonType {
  PRIMARY = 0,
  SECONDARY = 1,
}

const Button: React.FC<ButtonProps> = ({
  type = ButtonType.PRIMARY,
  text,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return type == ButtonType.PRIMARY ? (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${disabled || loading ? styles.disabled : ""}`}
    >
      {loading ? "Creating" : text}
    </button>
  ) : (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${styles.text} ${disabled || loading ? styles.disabled : ""}`}
    >
      {loading ? "Creating" : text}
    </button>
  )
}

export default Button
