import './styles.css'

export const TextInput = ({ searchValue, handleChange }) => (
    <input
        value={searchValue}
        onChange={handleChange}
        type='search'
        className='text-input'
        placeholder='Type your search'
    />
)