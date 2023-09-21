'use client'
import Header from '@/components/header'
import UserLogin from '@/components/auth/user'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '@/app/store/slices/authSlice'
export default function EmployerSignin() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    return () => {
      dispatch(setError(null))
    }
  })

  

  const handleSignin = () => {
    
  }
  
  return (
    <main className='bg'>
      <div className='container'>
        <div className='auth-header'>
          <img src='/images/hh_logo.svg' alt='' />
          <p>Зарегистрируйтесь сейчас</p>
          <p>Ответы на ваши вопросы</p>
          <a href='tel:77272321313'>+7 727 232 13 13</a>
        </div>
      <section className="login_page">
       <div className="card">
          <h2>Вход для поиска сотрудников</h2>
          <form>
            <input 
              className="input" 
              type="" 
              placeholder="Электронная почта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
            <input 
              className="input" 
              type="password" 
              placeholder="Введите пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}/>
            <button className="button button-primary" onClick={handleSignin}>Войти</button>
          </form>
          {error && Object.keys(error).map(key => (<p key={key} className='error'>{error[key]}</p>))}
        </div>
      </section>
      </div>
    </main>
  )
}
