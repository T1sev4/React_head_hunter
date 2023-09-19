'use client'
import Header from '@/components/header'
import MyResumes from '@/components/myresumes'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResumeById } from '@/app/store/slices/resumeSlice'
import { useParams } from 'next/navigation'

export default function ResumePage() {
  const dispatch = useDispatch()
  const {id} = useParams();
  console.log(id)
  const resume = useSelector(state => state.resume.resume)
  const didMount = () => {
    dispatch(getResumeById(id))
  }

  useEffect(didMount, []);

  const birthday = new Date(resume.birthday)


  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  const months2 = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ];

  let age = 0

  age = new Date().getTime() - birthday.getTime()
  age = parseInt(age / (1000 * 60 * 60 * 24 * 365))


  const showPhone = phone => {
    let res = ''
    if(phone[0] === '8'){
      phone = "+7" + phone.slice(1, phone.length)
    }
    res = `${phone.slice(0, 2)} (${phone.slice(2, 5)}) ${phone.slice(5, 8)}- ${phone.slice(8, 10)}-${phone.slice(10, 12)} `

    return res
  }

  let skills = []
  if(resume.skills) skills = resume.skills.split(',');
  

  console.log(resume)
  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Link className='link' href="/resumes">К списку резюме</Link>
          <Link href="/edit-resume" className='button button_secondary_bordered'>Редактировать</Link>
        </div>
        <h1>{resume.first_name} {resume.last_name}</h1>
        <p> {resume.gender} {age} лет  {birthday.getDate()} {months[birthday.getMonth()]} {birthday.getFullYear()}</p>

        <p className='secondary'>Контакты</p>
        <p> {resume.phone && showPhone(resume.phone)}</p>
        <p>{resume.email}</p>
        <p>Место проживание: {resume.city && resume.city.name}</p>
        <div className='flex'>
          <div className='mr-4'>
            <h2>{resume.position}</h2>
            {resume.employmentTypes && resume.employmentTypes.length > 0 && <p>Занятость: {resume.employmentTypes.map((et, index) => (`${et.name} `))}</p>}
          </div>
          <div>
            <h2> {resume.salary} {resume.salary_type} </h2>
          </div>
        </div>
        
        <h3>Опыт работы</h3>
        {resume.workingHistories && resume.workingHistories.map(job => {
          let start = new Date(job.start_date)
          let end = new Date(job.end_date)


          return (
            <div key={job.id} className='flex working-history'>
              <div className='working-history-date'>
                {months2[start.getMonth()]} {start.getFullYear()} - {months2[end.getMonth()]} {end.getFullYear()}
              </div>
              <div className='working-history-info'>
                <h4>{job.company_name}</h4>
                <h4>{job.company_description}</h4>
                <h4>{job.responsibilities}</h4>
              </div>
            </div>
          )
        })}

        <h3>Ключевые навыки</h3>

        {skills.map((skill, index) => (<span key={index} className='tag mr-4'>{skill}</span>))}


        <h3>Обо мне</h3>
        <p>{resume.about}</p>

        <h3>Высшее образование</h3>

        {resume.education && resume.education.map(ed => {
         
          let end = new Date(ed.end_date)
          return (
            <div key={ed.id} className='flex working-history'>
              <div className='working-history-date'>
                {end.getFullYear()}
              </div>
              <div className='working-history-info'>
                <h4>{ed.level}</h4>
                <h4>{ed.university_name}</h4>
                <p>{ed.major}</p>
              </div>
            </div>
          )
        })}

        <h3>Знание языков</h3>
        
        {resume.foreignLanguages && resume.foreignLanguages.map((fl, index) => (<p key={index} className='tag mr-4'>{fl.name} - {fl.level}</p>))}
        
        <h3>Гражданство</h3>

        <p>{resume.citizenshipObj && resume.citizenshipObj.name}</p>
      </div>
    </main>
  )
}
