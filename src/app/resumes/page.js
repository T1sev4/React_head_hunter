'use client'
import Header from '../../components/header'
import UserLogin from '../../components/auth/user'
import MyResumes from '@/components/myresumes'
import { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getMyResumes } from '@/app/store/slices/resumeSlice'

export default function ResumePage() {
  const dispatch = useDispatch()
  const resumes = useSelector((state) => state.resume.resumes)
  console.log(resumes, "resume page");
  const didMount = () => {
    dispatch(getMyResumes())
  }

  useEffect(didMount, [])

  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>Мои резюме</h1>
          <button className='button button_secondary_bordered'>Создать резюме</button>
        </div>

        <MyResumes resumes={resumes} />

      </div>
    </main>
  )
}
