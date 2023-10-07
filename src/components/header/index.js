'use client'
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
// import logo from '../../app/images/hh_logo.svg'
// import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, authorize } from '@/app/store/slices/authSlice';
import { useEffect } from 'react';
export default function Header(){ 

  const isAuth = useSelector((state) => state.auth.isAuth)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()


  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      let decodedToken = jwt_decode(token)
      if(decodedToken.exp * 1000 > Date.now()){
        dispatch(authorize({token}))
      }else{
        localStorage.removeItem("token");
      }
    }
    
  }, [])

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
            {currentUser && currentUser.role && currentUser.role.name !== "manager" &&   <Link href="/applies">Отклики</Link>}
            <a>Помощь</a>
          </div>
          <div className="header_right">
            <Link href="/search/vacancy/advanced" className="header_search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Поиск
            </Link>

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