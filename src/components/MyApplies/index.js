
import MyApply from "./apply"
import { useSelector } from "react-redux"
export default function MyApplies(){
  const applies = useSelector((state) => state.apply.applies)
  const showApplies = applies.map(item => (<MyApply item={item} key={item.id} />))
  
  return(
    <div className="table">
      <div className="row row-header flex">
        <div className="col">
          Статус
        </div>
        <div className="col">
          Вакансия
        </div>
        <div className="col">
          Дата
        </div>
      </div>
      {showApplies}
    </div>
  )
}