'use client'
import Header from '../../components/header'
import UserLogin from '../../components/auth/user'
import MyResumes from '@/components/myresumes'
import { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { getMyResumes } from '@/app/store/slices/resumeSlice'
import Link from 'next/link'
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
          <Link href="/create-resume" className='button button_secondary_bordered'>Создать резюме</Link>
        </div>

        <MyResumes resumes={resumes} />

      </div>
    </main>
  )
}
