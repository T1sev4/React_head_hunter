'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../app/images/hh_logo.svg'
// import Image from 'next/image';

export default function Header(){
  return(
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <div className="header_left">
            <img src='/images/hh_logo.svg'/>
            {/* <Image src={logo} alt=""/> */}
            <a>Работодателям</a>
            <a>Помощь</a>
          </div>
          <div className="header_right">
            <button className="header_search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />              Поиск
            </button>
            <button className="header_button header_button_green">
              Создать резюме
            </button>
            <button className="header_button">
              Войти
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}