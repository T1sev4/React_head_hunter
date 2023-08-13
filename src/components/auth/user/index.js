'use client'
import { useState } from "react"



export default function UserLogin(){

  const [step, setStep] = useState(1);


  return (
    <section className="login_page">

      {step === 1 && <div className="card">
        <h2>Поиск работы</h2>
        <form>
          <input className="input" type="" placeholder="Электронная почта или телефон"/>
          <button onClick={() => setStep(2)} className="button button-primary">Продолжить</button>
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
          <button className="button button-primary">Продолжить</button>
          <button onClick={() => setStep(1)} className="button button-primary-bordered">Назад</button>
        </form>
      </div>}
    </section>
  )
}