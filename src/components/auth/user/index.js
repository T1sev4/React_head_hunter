'use client'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { authorize, sendVerificationEmail, verifyCode } from "@/app/store/slices/authSlice";
import Link from "next/link";


export default function UserLogin(){
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(119)


  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()
  const router = useRouter()

  const sendVerifyEmail = () => {
    dispatch(sendVerificationEmail(email))
    setStep(2);
  }

  const verifyCodeFunc = () => {
    dispatch(verifyCode(email, code))

  }

  useEffect(() => {
    let interval
    if(step === 2){
      interval = setInterval(() => {
        if(time !== 0){
          setTime(time => time - 1)
        }
      }, 1000)
    }else if(interval){
      clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if(isAuth) router.push('/resumes')
  }, [isAuth])

  const min = parseInt(time / 60)
  const sec = time % 60  

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
        <Link href="/employer/signin" className="button button-primary-bordered">Я ищу сотрудников</Link>
      </div>}

      {step === 2 && <div className="card">
        <h2>Отправили код на ...</h2>
        <p>Напишите его чтобы подтвердить что это вы, а не кто-то другой</p>
        <form>
          <input className="input" type="" placeholder="Введите код" value={code} onChange={(e) => setCode(e.target.value)}/>
          <p>Повторить можно через {min}:{sec} </p>
          <button className="button button-primary" type="button" onClick={verifyCodeFunc}>Продолжить</button>
          <button onClick={() => setStep(1)} className="button button-primary-bordered">Назад</button>
        </form>
      </div>}

    </section>
  )
}