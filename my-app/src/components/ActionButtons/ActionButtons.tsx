import styles from "./ActionButtons.module.css"

type ActionButtonsProps = {
  children?: React.ReactNode
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  children,
}: ActionButtonsProps) => {
  return <div className={styles.actions}>{children}</div>
}

export default ActionButtons
