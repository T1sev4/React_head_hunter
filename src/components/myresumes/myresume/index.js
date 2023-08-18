export default function MyResume({item}){
  return(
    <div className="card mtb4">
      <a className="h3">{item.position}</a>
      <p className="mtb2">Создан {item.createdAt}</p>
      <h3>Статистика</h3>
      <div className="flex">
        <a className="p3">{item.stats.views} показов</a>
        <a className="p3">{item.stats.show} просмотров</a>
        <a className="p3">{item.stats.applies} приглашений</a>
      </div>
    </div>
  )
}