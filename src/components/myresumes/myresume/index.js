import Link from "next/link";

export default function MyResume({item}){
  return(
    <div className="card mtb4">
      <Link href={`/resumes/${item.id}`} className="h3 link">{item.position}</Link>
      <p className="mtb2">Создан {item.createdAt}</p>
      <h3>Статистика</h3>
      <div className="flex">
        <a className="p3">{0} показов</a>
        <a className="p3">{0} просмотров</a>
        <a className="p3">{0} приглашений</a>
      </div>
    </div>
  )
}