'use client'

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations, getCities, getExperiences, getSkills, getEmploymentTypes, createVacancy } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompleteSelect from "@/components/AutoCompleteSelect"
import AutoCompleteTags from "@/components/AutoCompleteTags"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from "next/navigation"


export default function CreateVacancy(){
  const router = useRouter()
  const dispatch = useDispatch();
  const cities = useSelector(state => state.vacancy.cities)
  const experiences = useSelector(state => state.vacancy.experiences)
  const allSkills = useSelector(state => state.vacancy.skills)
  const empTypes = useSelector(state => state.vacancy.employmentTypes)

  const [name, setName] = useState('')
  const [specializationId, setSpecialization] = useState()
  const [specializationName, setSpecializationName] = useState()
  const [isSpecModalOpen, setSpecModalOpen] = useState(false)
  const [cityId, setCity] = useState()
  const [salary_from, setSalaryFrom] = useState('')
  const [salary_to, setSalaryTo] = useState('')
  const [salary_type, setSalaryType] = useState('KZT')
  const [address, setAddress] = useState('')
  const [experienceId, setExperience] = useState()
  const [description, setDescription] = useState('<h2>Обязанности</h2> <ul><li></li><li></li></ul> <h2>Требования</h2> <ul><li></li><li></li></ul> <h2>Условия</h2> <ul><li></li><li></li></ul> ')
  const [skills, setSelectedSkills] = useState([]);
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
  const onSkillsChange = (data) => {
    const arr = data.map(item => item.name)
    setSelectedSkills(arr.join(','))
  }

  const handleSave = () => {
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
        <h1>Создание вакансии</h1>

        <h2>Основная информация</h2>

        <fieldset className="fieldset-vertical"> 
          <label>Название вакансии</label>
          <input className="input" placeholder="Название" type="text" value={name} onChange={(e) => setName(e.target.value)}  />
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

        <fieldset className="fieldset-vertical"> 
          <label>Расскажите про вакансию</label>
          <div>
          <CKEditor
            editor={ ClassicEditor }
            data={description}
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            config={ {
              toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', 'redo' ]
          } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setDescription(data)
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
          />
            
          </div>
        </fieldset>
        
        <AutoCompleteTags placeholder="" type="text" label="Ключевые навыки" size="fieldset-md fieldset-vertical" items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(',').map(item => ({name: item})) : [] }/>
        
        <fieldset className="fieldset-vertical"> 
          <label>Опыт работы</label>
          <div>
            {empTypes.map(et => <div key={et.id} className="radio">
              <input type="radio" value={et.id} onChange={(e) => setEmploymentType(e.target.value)} name="et" />
              <label>{et.name}</label>
            </div>)}
            
          </div>
        </fieldset>
        
        <button className="button button-primary" onClick={handleSave}>Создать</button>
      </div>
    </main>
  )
}