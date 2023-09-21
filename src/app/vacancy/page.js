'use client'
import Header from '@/components/header'
import Link from 'next/link'
import MyVacancies from '@/components/myvacancies'
import { useDispatch } from 'react-redux'
import { getMyVacancies } from '@/app/store/slices/vacancySlice'
import { useEffect } from 'react'
export default function Vacancy() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyVacancies())
  }, [])
  
  return (
    <main className=''>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>Мои вакансии</h1>
          <Link href="/create-vacancy" className='button button_secondary_bordered'>Создать вакансию</Link>
        </div>
        <MyVacancies />

      </div>
      


    

    </main>
  )
}
