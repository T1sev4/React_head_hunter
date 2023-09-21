'use client'
import Header from '@/components/header'
import UserLogin from '@/components/auth/user'
import { useState } from 'react'

export default function EmployerSignup() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [company_name, setCompany_name] = useState('')
  const [company_description, setCompanyDesc] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [company_address, setCompanyAdr] = useState('')
  const [company_logo, setCompanyLogo] = useState()
  
  const onLogoChange = (e) => {
    setCompanyLogo(e.target.files[0])
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
       {step === 1 && <div className="card">
          <h2>Регистрация для поиска сотрудников</h2>
          <p>В завершении на почту придёт пароль</p>
          <form>
            <input 
              className="input" 
              type="" 
              placeholder="Электронная почта" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
            <button className="button button-primary" onClick={() => setStep(2)}>Продолжить</button>
          </form>
        </div>}

        {step === 2 && <div className="card">
          <h2>Как вас зовут?</h2>
          <form>
            <input className="input" type="" placeholder="Имя" value={first_name} onChange={(e) => setFirst_name(e.target.value)}/>
            <input className="input" type="" placeholder="Фамилия" value={last_name} onChange={(e) => setLast_name(e.target.value)}/>
            <button className="button button-primary" type="button" onClick={() => setStep(3)}>Продолжить</button>
            <button onClick={() => setStep(1)} className="button button-primary-bordered">Назад</button>
          </form>
        </div>}
        
        {step === 3 && <div className="card">
          <h2>Введите название компании</h2>
          <form>
            <input className="input" type="" placeholder="Название компании" value={company_name} onChange={(e) => setCompany_name(e.target.value)}/>
            <textarea className="textarea" type="" placeholder="Описание" value={company_description} onChange={(e) => setCompanyDesc(e.target.value)}/>
            <input className="input" type="" placeholder="Адрес компании" value={company_address} onChange={(e) => setCompanyAdr(e.target.value)}/>
            <input className="input" type="file" placeholder="Лого компании" onChange={onLogoChange}/>
            
            <button className="button button-primary" type="button" onClick={() => setStep(4)}>Продолжить</button>
            <button onClick={() => setStep(2)} className="button button-primary-bordered">Назад</button>
          </form>
        </div>}
       
        {step === 4 && <div className="card">
          <h2>Введите пароль</h2>
          <form>
            <input className="input" type="" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input className="input" type="" placeholder="Повторите пароль" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            
            <button className="button button-primary" type="button" onClick={() => setStep(1)}>Продолжить</button>
            <button onClick={() => setStep(3)} className="button button-primary-bordered">Назад</button>
          </form>
        </div>}
      </section>
      </div>
    </main>
  )
}
