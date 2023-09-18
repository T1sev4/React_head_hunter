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

  console.log(resume)

  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <Link className='link' href="/resumes">К списку резюме</Link>
          <Link href="/edit-resume" className='button button_secondary_bordered'>Редактировать</Link>
        </div>

      </div>
    </main>
  )
}
