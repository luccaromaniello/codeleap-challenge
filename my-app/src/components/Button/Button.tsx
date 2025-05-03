import styles from "./Button.module.css"

type ButtonProps = {
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {loading ? "Creating" : text}
    </button>
  )
}

export default Button
