'use client'

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations, getCities, getExperiences, getSkills, getEmploymentTypes, createVacancy } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompleteSelect from "@/components/AutoCompleteSelect"
import { useRouter } from "next/navigation"


export default function SearchVacancyAdvanced(){
  const router = useRouter()
  const dispatch = useDispatch();
  const cities = useSelector(state => state.vacancy.cities)
  const experiences = useSelector(state => state.vacancy.experiences)
  console.log(experiences)
  const [q, setQ] = useState('')
  const [specializationId, setSpecialization] = useState()
  const [specializationName, setSpecializationName] = useState()
  const [isSpecModalOpen, setSpecModalOpen] = useState(false)
  const [cityId, setCity] = useState()
  const [salary, setSalary] = useState('')
  const [salary_type, setSalaryType] = useState('KZT')
  const [experienceId, setExperience] = useState()
  
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
    dispatch(createVacancy({
      name,
      specializationId,
      cityId, 
      description,
      employmentTypeId,
      salary_from,
      salary_to,
      salary_type,
      address,
      skills,
      experienceId,
      about_company: ''

    }, router))
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

        
        <button className="button button-primary" onClick={handleSearch}>Поиск</button>
      </div>
    </main>
  )
}