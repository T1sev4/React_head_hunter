'use client'
import Header from '../../components/header'
import Input from '@/components/input'
import AutoCompleteSelect from '@/components/AutoCompleteSelect'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SelectDate from '@/components/SelectDate'
export default function CreateResume() {

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
   
    axios.get(`${END_POINT}/api/region/cities`).then(res => {
      setCities(res.data)
    })
    axios.get(`${END_POINT}/api/region/countries`).then(res => {
      setCountries(res.data)
    })
  }, [])

  const onSelect = (data) => {
    console.log("onSelect", data)
  }


  return (
    <main>
      <Header />
      <div className='container ptb7'>
        <h1>Ваше резюме</h1>
        
        <h3>Контактные данные</h3>
        <Input placeholder="" type="text" label="Имя" size="fieldset-md" />
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" />
        <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md" />
        <AutoCompleteSelect placeholder="" type="text" label="Город проживание" size="fieldset-md" items={cities} onSelect={onSelect}/>

        <h3>Основная информация</h3>

        <SelectDate size="fieldset-sm" label="Дата рождение" />


        <fieldset className="fieldset fieldset-sm">
          <label>Пол</label>
          <div className='radio-group'>
            <div className='radio'>
            <input  type="radio" name='gender' id='g1' />
            <label for="g1" >Мужской</label>
            </div>
            <div className='radio'>
            <input type="radio" name='gender' id='g2' />
            <label for="g2">Женский</label>
            </div>
           
            
          </div>
        </fieldset>

        <AutoCompleteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={onSelect}/>

      </div>
    </main>
  )
}
