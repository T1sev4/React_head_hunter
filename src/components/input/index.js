
export default function Input({label, placeholder, type, onChange, size, value}){
  return(
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <input value={value} className="input" placeholder={placeholder} type={type} onChange={onChange} />
    </fieldset>
  )
}