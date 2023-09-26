'use client'
import { useEffect, useState } from "react"
import Spec from "./Spec"
export default function SpecType({specType, onChange, value}){
  const [active, setActive] = useState(false)
  useEffect(() => {
    specType.specialization.map(spec => spec.id === value ? setActive(true) : null)
  }, [])
  return(
    <div>
      <div className={`specTypes${active ? ' active' : ''}`} onClick={() => setActive(!active)}>
        <img src="/images/angle-right.svg" />
        {specType.name}
      </div>
      {
        active && specType.specialization.map(spec => (<Spec key={spec.id} spec={spec} onChange={onChange} value={value} />))
      }
    </div>
   
  )

}