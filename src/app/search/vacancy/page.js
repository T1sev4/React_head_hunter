'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchedVacancies, getSpecializations, getCities, getExperiences, getSkills, getEmploymentTypes } from '@/app/store/slices/vacancySlice'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompleteSelect from "@/components/AutoCompleteSelect"
import MyVacancies from '@/components/myvacancies'
export default function SearchVacancy() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  // const vacancies = useSelector(state => state.vacancy.vacancies)
  const cities = useSelector(state => state.vacancy.cities)
  const experiences = useSelector(state => state.vacancy.experiences)
  const empTypes = useSelector(state => state.vacancy.employmentTypes)

  // console.log(vacancies)
  
  const [q, setQ] = useState(searchParams.get('q'))
  const [specializationId, setSpecialization] = useState(searchParams.get('specializationId'))
  const [cityId, setCityId] = useState(searchParams.get('cityId'))
  const [experienceId, setExperienceId] = useState(searchParams.get('experienceId'))
  const [employmentTypeId, setEmploymentTypeId] = useState(searchParams.get('employmentTypeId'))
  const [salary, setSalary] = useState(searchParams.get('salary'))
  const [salary_type, setSalary_type] = useState(searchParams.get('salary_type'))
  
  const [specializationName, setSpecializationName] = useState()
  const [isSpecModalOpen, setSpecModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getSearchedVacancies({
      q,
      specializationId,
      cityId,
      experienceId,
      employmentTypeId,
      salary,
      salary_type
    }))

    dispatch(getSpecializations())
    dispatch(getCities())
    dispatch(getExperiences())
    dispatch(getSkills())
    dispatch(getEmploymentTypes())

  }, [])
  

  const handleChangeExp = (e) => {
    setExperience(e.target.value * 1)
  }

  const handleOnSpecChange = (e) => {
    setSpecialization(e.target.value)
    setSpecializationName(e.target.dataset.name)
    closeSpecModal()
  }

  const closeSpecModal = () => {
    setSpecModalOpen(false)
  }

  return (
    <main className=''>
      <Header />
      <div className='container mt-8'>
        <div className='flex'> 
          <fieldset className="fieldset-vertical" style={{width: '100%'}}> 
            <input className="input" placeholder="Название" type="text" value={q} onChange={(e) => setQ(e.target.value)}  />
          </fieldset>
          <button className='button button-primary'>Найти</button>
        </div>
      
        <div className='flex'>
          <div style={{width: '20%'}}>
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
          </div>
          <div style={{width: '80%', paddingLeft: '40px'}}>
            <MyVacancies />
          </div>
        </div>
               

      </div>
    </main>
  )
}
