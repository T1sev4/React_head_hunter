'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'
import { getMyResumes } from '@/app/store/slices/resumeSlice'
import { createApply, getEmployeeApplies, getVacancyApplies } from '@/app/store/slices/applySlice'

export default function VacancyPage() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const vacancy = useSelector(state => state.vacancy.vacancy)
  const currentUser = useSelector(state => state.auth.currentUser)
  const resumes = useSelector(state => state.resume.resumes)
  const applies = useSelector(state => state.apply.applies)
  
  const [resumeId, setResume] = useState()

  useEffect(() => {
    if(resumes[0]){
      setResume(resumes[0].id)
    }
  }, [resumes])

  const didMount = () => {
    dispatch(getVacancyById(id))
  
  }
  useEffect(() => {
    if(currentUser && currentUser.role.name === 'employee'){
      dispatch(getMyResumes())
      dispatch(getEmployeeApplies())
    }else if(currentUser && currentUser.role.name !== 'employee'){
      dispatch(getVacancyApplies(id))
    }
  }, [currentUser])

  useEffect(didMount, []);

 
  let skills = []
  if(vacancy.skills) skills = vacancy.skills.split(',');
  

  const handleApply = () => {
    dispatch(createApply({
      resumeId,
      vacancyId: id
    }))
  }
  
  let isApplied = applies.some(item => item.vacancyId === (id * 1) );
  return (
    <main>
      <Header />
      <div className='container'>
      {currentUser && currentUser.id === vacancy.userId &&  <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Link href={`/edit-vacancy/${vacancy.id}`} className='button button_secondary_bordered'>Редактировать</Link>
        </div>}
        <div className='card mt-8'>
          <Link href="/vacancy/2/applies" className='link' >{applies.length} соискателей</Link>
          <h1>{vacancy.name}</h1>
          <p>{vacancy.salary_from &&  `от ${vacancy.salary_from}`}{vacancy.salary_to &&  `до ${vacancy.salary_to}`} {vacancy.salary_type}</p>
          {vacancy.experience && <p>требуемый опыт работы: {vacancy.experience.duration}</p>}
          {vacancy.employmentType && <p> тип занятости {vacancy.employmentType.name}</p>}
          
          {
            currentUser && currentUser.role.name === "employee" && (
              <select style={{maxWidth: '200px'}} className='input mtb4' value={resumeId} onChange={e => setResume(e.target.value * 1)}>
                {resumes.map(item => (<option key={item.id} value={item.id} >{item.position}</option>))}
              </select>
            )
          }
          
          {currentUser && currentUser.id !== vacancy.userId && !isApplied && <button className='button button-primary' onClick={handleApply}>Откликнуться</button>}
          {currentUser && currentUser.id !== vacancy.userId && isApplied && <Link style={{maxWidth: '200px'}} href="/applies" className='button button-primary'>Смотреть отклик</Link>}
        </div>
       
        
       {vacancy.company && <p className='secondary'><b>{vacancy.company.name}</b> </p>}
       {vacancy.company && <p className='secondary' >{vacancy.company.description}</p>}

        <p className='secondary'  dangerouslySetInnerHTML={{ __html: vacancy.description }}></p>
        <p className='secondary'>{vacancy.address}</p>


       
        

        <h3 className='mt-8'>Ключевые навыки</h3>

        {skills.map((skill, index) => (<span key={index} className='tag mr-4'>{skill}</span>))}


      </div>
    </main>
  )
}
