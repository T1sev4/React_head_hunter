
export default function ModalAddExp({close}){

  const onChangeMonth = () => {

  }
  const onChangeYear = () => {

  }
  const onChangeMonthEnd = () => {

  }
  const onChangeYearEnd = () => {

  }

  return(
   <div className="modal">
    <div className="modal-backdrop" onClick={close}></div>
      <div className="modal-inner">
        <h2>Опыт работы</h2>

        <h4>Начало работы</h4>

          <div className="selectdate selectdate-noday">
            <select onChange={onChangeMonth} placeholder="Месяц" className="input">
              <option>январь</option>
              <option>февраль</option>
              <option>март</option>
              <option>апрель</option>
              <option>май</option>
              <option>июнь</option>
              <option>июль</option>
              <option>август</option>
              <option>сентябрь</option>
              <option>октябрь</option>
              <option>ноябрь</option>
              <option>декабрь</option>
            </select>
            <input className="input" placeholder="Год" type="text" onChange={onChangeYear} />
          </div>

          <h4>Конец работы</h4>

          <div className="selectdate selectdate-noday">
            <select onChange={onChangeMonthEnd} placeholder="Месяц" className="input">
              <option>январь</option>
              <option>февраль</option>
              <option>март</option>
              <option>апрель</option>
              <option>май</option>
              <option>июнь</option>
              <option>июль</option>
              <option>август</option>
              <option>сентябрь</option>
              <option>октябрь</option>
              <option>ноябрь</option>
              <option>декабрь</option>
            </select>
            <input className="input" placeholder="Год" type="text" onChange={onChangeYearEnd} />
          </div>

          <h4>Организация</h4>
          <input className="input" placeholder="Название компании" type="text"  />
          
          <h4>Должность</h4>
          <input className="input" placeholder="Должность" type="text"  />
          
          <h4>Обязанности на рабочем месте</h4>
          <textarea placeholder="Опишите что вы делали на работе" className="textarea"></textarea>

          <div className="modal-actions">
            <button className="button button-primary-bordered" onClick={close}>Отменить</button>
            <button className="button button-primary">Сохранить</button>
          </div>
      </div>
    </div>
  )
}