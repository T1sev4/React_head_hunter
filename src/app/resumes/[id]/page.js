'use client'
import Header from '@/components/header'
import MyResumes from '@/components/myresumes'
import Link from 'next/link'

export default function ResumePage() {
 

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
