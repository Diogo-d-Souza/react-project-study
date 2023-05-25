import './styles.css'

export const Button = ({ text, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="button"
    >
        {text}
    </button>
)