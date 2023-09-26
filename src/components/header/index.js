'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
// import logo from '../../app/images/hh_logo.svg'
// import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/app/store/slices/authSlice';
export default function Header(){ 

  const isAuth = useSelector((state) => state.auth.isAuth)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  return(
    <header className="header">
      <div className="container">
        <div className="header_inner">
          <div className="header_left">
            <Link href="/">
              <img src='/images/hh_logo.svg'/>
            </Link>
            {/* <Image src={logo} alt=""/> */}

            {currentUser && currentUser.role && currentUser.role.name === "manager" && <Link href="/vacancy">Мои вакансии</Link>}
            {currentUser && currentUser.role && currentUser.role.name !== "manager" && <Link href="/resumes">Мои резюме</Link>}
            <a>Помощь</a>
          </div>
          <div className="header_right">
            <button className="header_search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />              Поиск
            </button>

            {currentUser && currentUser.role && currentUser.role.name === "manager" &&   <Link href="/create-vacancy" className="header_button header_button_green">
              Создать вакансию
            </Link>}
            {currentUser && currentUser.role && currentUser.role.name !== "manager" &&   <Link href="/create-resume" className="header_button header_button_green">
              Создать резюме
            </Link>}

          

            {!isAuth && <Link href="/login" className="header_button">
              Войти
            </Link>}

            {isAuth && <a className="header_button" onClick={() => dispatch(logOut())}>
              Выйти
            </a>}
          </div>
        </div>
      </div>
    </header>
  )
}