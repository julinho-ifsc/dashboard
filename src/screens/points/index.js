import navbar from '../../containers/navbar'
import table from '../../components/table'
import container from '../../components/container'
import {listPoints} from '../../services/points'

const cols = [
  {
    name: '#',
    acessor: 'id'
  },
  {
    name: 'Nome',
    acessor: 'name'
  },
  {
    name: 'RFID',
    acessor: 'rfid'
  }
]

export default async function () {
  const wrapper = document.createElement('div')
  wrapper.appendChild(await navbar())
  const points = await listPoints()
  wrapper.appendChild(
    container([
      table({
        data: points,
        cols
      })
    ])
  )

  return wrapper
}
