'use client'

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations, getCities, getExperiences, getSkills, getEmploymentTypes } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompleteSelect from "@/components/AutoCompleteSelect"
import { useRouter } from "next/navigation"


export default function SearchVacancyAdvanced(){
  const router = useRouter()
  const dispatch = useDispatch();
  const cities = useSelector(state => state.vacancy.cities)
  const experiences = useSelector(state => state.vacancy.experiences)
  const empTypes = useSelector(state => state.vacancy.employmentTypes)

  const [q, setQ] = useState('')
  const [specializationId, setSpecialization] = useState()
  const [specializationName, setSpecializationName] = useState()
  const [isSpecModalOpen, setSpecModalOpen] = useState(false)
  const [cityId, setCity] = useState()
  const [salary, setSalary] = useState('')
  const [salary_type, setSalaryType] = useState('KZT')
  const [experienceId, setExperience] = useState()
  const [employmentTypeId, setEmploymentType] = useState()
  const closeSpecModal = () => {
    setSpecModalOpen(false)
  }

  useEffect(() => {
    dispatch(getSpecializations())
    dispatch(getCities())
    dispatch(getExperiences())
    dispatch(getSkills())
    dispatch(getEmploymentTypes())
  }, [])


  const handleOnSpecChange = (e) => {
    setSpecialization(e.target.value)
    setSpecializationName(e.target.dataset.name)
    closeSpecModal()
  }
  const handleChangeExp = (e) => {
    setExperience(e.target.value * 1)
  }


  const handleSearch = () => {
    let queryString = "?"

    if(q) queryString += `q=${q}&`
    if(specializationId) queryString += `specializationId=${specializationId}&`
    if(cityId) queryString += `cityId=${cityId}&`
    if(salary) queryString += `salary=${salary}&`
    if(salary_type) queryString += `salary_type=${salary_type}&`
    if(experienceId) queryString += `experienceId=${experienceId}&`
    if(employmentTypeId) queryString += `employmentTypeId=${employmentTypeId}&`

    router.push(`/search/vacancy${queryString}`)
  }

  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Поиск вакансии</h1>

        <fieldset className="fieldset-vertical"> 
          <label>Ключевые слова</label>
          <input className="input" placeholder="Название" type="text" value={q} onChange={(e) => setQ(e.target.value)}  />
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Указать специализацию</label>
         {specializationName && <p>{specializationName}</p>}
          <p className="link" onClick={() => setSpecModalOpen(true)}>Указать специализацию</p>
        </fieldset>

        {isSpecModalOpen && <ModalSelectSpec close={closeSpecModal} onChange={handleOnSpecChange} value={specializationId * 1} />}

        <AutoCompleteSelect placeholder="" type="text" label="Город проживание" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(`${data.id}`)}/>

          <fieldset className="fieldset-vertical"> 
            <label>Предполагаемый уровень дохода в месяц</label>
            <div className="input-group fieldset-md">
              <input className="input" placeholder="От" type="text" value={salary} onChange={(e) => setSalary(e.target.value)}  />
              <select className="input" name="salary_type" value={salary_type} onChange={e => setSalaryType(e.target.value)}>
                <option value={'KZT'}>KZT</option>
                <option value={'USD'}>USD</option>
                <option value={'RUB'}>RUB</option>
              </select>
            </div>
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

        <fieldset className="fieldset-vertical"> 
          <label>Тип занятости</label>
          <div>
            {empTypes.map(et => <div key={et.id} className="radio">
              <input type="radio" value={et.id} onChange={(e) => setEmploymentType(e.target.value)} name="et" />
              <label>{et.name}</label>
            </div>)}
            
          </div>
        </fieldset>
        
        <button className="button button-primary" onClick={handleSearch}>Поиск</button>
      </div>
    </main>
  )
}