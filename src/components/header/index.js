'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
// import logo from '../../app/images/hh_logo.svg'
// import Image from 'next/image';

export default function Header(){
  return(
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <div className="header_left">
            <Link href="/">
              <img src='/images/hh_logo.svg'/>
            </Link>
            {/* <Image src={logo} alt=""/> */}
            <Link href="/resumes">Мои резюме</Link>
            <a>Помощь</a>
          </div>
          <div className="header_right">
            <button className="header_search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />              Поиск
            </button>
            <Link href="/create-resume" className="header_button header_button_green">
              Создать резюме
            </Link>
            <Link href="/login" className="header_button">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}