'use client'

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations, getCities, getExperiences } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompleteSelect from "@/components/AutoCompleteSelect"
export default function CreateVacancy(){
  const dispatch = useDispatch();
  const cities = useSelector(state => state.vacancy.cities)
  const experiences = useSelector(state => state.vacancy.experiences)

  const [name, setName] = useState('')
  const [specializationId, setSpecialization] = useState()
  const [isSpecModalOpen, setSpecModalOpen] = useState(false)
  const [cityId, setCity] = useState()
  const [salary_from, setSalaryFrom] = useState('')
  const [salary_to, setSalaryTo] = useState('')
  const [salary_type, setSalaryType] = useState('KZT')
  const [address, setAddress] = useState('')
  const [experienceId, setExperience] = useState()

  const closeSpecModal = () => {
    setSpecModalOpen(false)
  }

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getCities())
    dispatch(getExperiences())
  }, [])


  const handleOnSpecChange = (e) => {
    setSpecialization(e.target.value * 1)
  }
  const handleChangeExp = (e) => {
    setExperience(e.target.value * 1)
  }

  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Создание вакансии</h1>

        <h2>Основная информация</h2>

        <fieldset className="fieldset-vertical"> 
          <label>Название вакансии</label>
          <input className="input" placeholder="Название" type="text" value={name} onChange={(e) => setName(e.target.value)}  />
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Указать специализацию</label>
          <p className="link" onClick={() => setSpecModalOpen(true)}>Указать специализацию</p>
        </fieldset>

        {isSpecModalOpen && <ModalSelectSpec close={closeSpecModal} onChange={handleOnSpecChange} value={specializationId} />}

        <AutoCompleteSelect placeholder="" type="text" label="Город проживание" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)}/>

          <fieldset className="fieldset-vertical"> 
            <label>Предполагаемый уровень дохода в месяц</label>
            <div className="input-group fieldset-md">
              <input className="input" placeholder="От" type="text" value={salary_from} onChange={(e) => setSalaryFrom(e.target.value)}  />
              <input className="input" placeholder="До" type="text" value={salary_to} onChange={(e) => setSalaryTo(e.target.value)}  />
              <select className="input" name="salary_type" value={salary_type} onChange={e => setSalaryType(e.target.value)}>
                <option value={'KZT'}>KZT</option>
                <option value={'USD'}>USD</option>
                <option value={'RUB'}>RUB</option>
              </select>
            </div>
          </fieldset>
        
        <fieldset className="fieldset-vertical"> 
          <label>Адрес</label>
          <input className="input" placeholder="Введите адрес" type="text" value={address} onChange={(e) => setAddress(e.target.value)}  />
        </fieldset>

        <fieldset className="fieldset-vertical"> 
          <label>Опыт работы</label>
          <div>
            {experiences.map(exp => <div key={exp.id} className="radio">
              <input type="radio" value={exp.id} onChange={handleChangeExp} name="exp" />
              <label>{exp.duration}</label>
            </div>)}
            
          </div>
        </fieldset>

      </div>
    </main>
  )
}