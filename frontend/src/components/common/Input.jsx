function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;