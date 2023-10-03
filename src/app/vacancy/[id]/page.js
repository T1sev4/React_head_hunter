'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'

export default function VacancyPage() {
  const dispatch = useDispatch()
  const {id} = useParams();
  console.log(id)
  const vacancy = useSelector(state => state.vacancy.vacancy)
  const currentUser = useSelector(state => state.auth.currentUser)
  const didMount = () => {
    dispatch(getVacancyById(id))
  }
  console.log('vacancy', vacancy)
  useEffect(didMount, []);

 
  let skills = []
  if(vacancy.skills) skills = vacancy.skills.split(',');
  


  return (
    <main>
      <Header />
      <div className='container'>
      {currentUser && currentUser.id === vacancy.userId &&  <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Link href={`/edit-vacancy/${vacancy.id}`} className='button button_secondary_bordered'>Редактировать</Link>
        </div>}
        <div className='card mt-8'>
          <h1>{vacancy.name}</h1>
          <p>{vacancy.salary_from &&  `от ${vacancy.salary_from}`}{vacancy.salary_to &&  `до ${vacancy.salary_to}`} {vacancy.salary_type}</p>
          {vacancy.experience && <p>требуемый опыт работы: {vacancy.experience.duration}</p>}
          {vacancy.employmentType && <p> тип занятости {vacancy.employmentType.name}</p>}
          {currentUser && currentUser.id !== vacancy.userId && <button className='button button-primary'>Откликнуться</button>}
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
