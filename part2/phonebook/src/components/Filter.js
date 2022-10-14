const Filter = ({ search, handleChange }) => (
  <div>
    filter shown with <input
      value={search}
      onChange={handleChange}
    />
  </div >
)

export default Filter;