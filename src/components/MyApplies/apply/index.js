'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteApply } from "@/app/store/slices/applySlice";
export default function MyApply({item}){
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  return(
    <div className="row flex">
      <div className="col">
        {item && item.status}
      </div>
      <div className="col">
        {item && item.vacancy.name}
        <div className="link mt2" onClick={() => dispatch(deleteApply(item.id))}>
          Удалить
        </div>
      </div>
      <div className="col">
        {item && item.updatedAt}
      </div>
    </div>
  )
}