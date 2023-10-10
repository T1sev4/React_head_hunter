'use client'
import Header from '@/components/header'
import Link from 'next/link'
import MyVacancies from '@/components/myvacancies'
import { useDispatch, useSelector } from 'react-redux'
import { getMyVacancies } from '@/app/store/slices/vacancySlice'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getVacancyApplies } from '@/app/store/slices/applySlice'

export default function VacancyApplies() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const applies = useSelector(state => state.apply.applies)

  const [status, setStatus] = useState("NEW")

  useEffect(() => {
    dispatch(getVacancyApplies(id))
  }, [])

  
  
  return (
    <main className=''>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'>
          <h1>Отклики {applies.length}</h1>
        </div>
        <div className='flex flex-jc-sb'>
          <div className='list'>
            <div className={`list-item ${status === 'NEW' ? 'active' : '' }`} onClick={() => setStatus("NEW")}>Все неразобранные</div>
            <div className={`list-item ${status === 'INVITATION' ? 'active' : '' }`} onClick={() => setStatus("INVITATION")}>Приглашенные</div>
            <div className={`list-item ${status === 'DECLINED' ? 'active' : '' }`} onClick={() => setStatus("DECLINED")}>Отказы</div>
          </div>
          <div>резюме</div>
        </div>
        
      </div>
    </main>
  )
}