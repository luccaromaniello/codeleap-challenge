import styles from "./Textarea.module.css"

type TextareaProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={styles.textarea}
      />
    </div>
  )
}

export default Textarea
