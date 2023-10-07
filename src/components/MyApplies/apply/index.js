'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { deleteVacancy } from "@/app/store/slices/vacancySlice";
export default function MyApply({item}){
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  console.log(item)
  return(
    <div className="row flex">
      <div className="col">
        {item.status}
      </div>
      <div className="col">
        {item.vacancy.name}
        <div className="link mt2">
          Удалить
        </div>
      </div>
      <div className="col">
        {item.createdAt}
      </div>
    </div>
  )
}