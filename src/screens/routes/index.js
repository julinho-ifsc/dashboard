import navbar from '../../containers/navbar'
import {listRoutes} from '../../services/routes'
import style from './style.css'

const dataList = () => {
  const dl = document.createElement('dl')
  dl.classList.add(style.list)
  return dl
}

const dataTitle = text => {
  const dt = document.createElement('dt')
  dt.textContent = text
  return dt
}
const dataText = text => {
  const dd = document.createElement('dd')
  dd.textContent = text
  return dd
}

export default async function () {
  const wrapper = document.createElement('div')
  wrapper.appendChild(await navbar())
  const routes = await listRoutes()

  const list = dataList()
  list.classList.add(style.wrapper)

  for (const route of routes) {
    list.appendChild(dataTitle('Nome'))
    list.appendChild(dataText(route.name))
    list.appendChild(dataTitle('id'))
    list.appendChild(dataText(route.id))
    list.appendChild(dataTitle('Pontos'))

    for (const point of route.points) {
      const pointsList = dataList()
      pointsList.appendChild(dataTitle('Nome'))
      pointsList.appendChild(dataText(point.name))
      pointsList.appendChild(dataTitle('RFID'))
      pointsList.appendChild(dataText(point.rfid))
      pointsList.appendChild(dataTitle('Direção'))
      pointsList.appendChild(dataText(point.action))
      list.appendChild(pointsList)
    }
    list.appendChild(document.createElement('hr'))
  }

  wrapper.appendChild(list)

  return wrapper
}
