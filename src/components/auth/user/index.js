'use client'
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { authorize, sendVerificationEmail } from "@/app/store/slices/authSlice";


export default function UserLogin(){
  const isAuth = useSelector((state) => state.auth.isAuth)
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const dispatch = useDispatch()

  const sendVerifyEmail = () => {
    dispatch(sendVerificationEmail(email))
    setStep(2);
  }

  return (
    <section className="login_page">
      {isAuth ? "true" : "false"}
      {step === 1 && <div className="card">
        <h2>Поиск работы</h2>
        <form>
          <input 
            className="input" 
            type="" 
            placeholder="Электронная почта или телефон" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
          <button onClick={sendVerifyEmail} className="button button-primary">Продолжить</button>
        </form>
      </div>}

     {step === 1 && <div className="card">
        <h2>Поиск сотрудников</h2>
        <p>Размещение вакансий и доступ к базе резюме</p>
        <button className="button button-primary-bordered">Я ищу сотрудников</button>
      </div>}

      {step === 2 && <div className="card">
        <h2>Отправили код на ...</h2>
        <p>Напишите его чтобы подтвердить что это вы, а не кто-то другой</p>
        <form>
          <input className="input" type="" placeholder="Введите код"/>
          <p>Повторить можно через 00:48 </p>
          <button onClick={() => setStep(3)} className="button button-primary">Продолжить</button>
          <button onClick={() => setStep(1)} className="button button-primary-bordered">Назад</button>
        </form>
      </div>}

      {step === 3 && <div className="card">
        <h2>Давайте познакомимся</h2>
        <form>
          <input className="input" type="" placeholder="Имя"/>
          <input className="input" type="" placeholder="Фамилия"/>
          <button className="button button-primary" type="button" onClick={() => dispatch(authorize())}>Продолжить</button>
          <button onClick={() => setStep(2)} className="button button-primary-bordered">Назад</button>
        </form>
      </div>}



    </section>
  )
}