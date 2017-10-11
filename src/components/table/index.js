import style from './style.css'

const createCell = text => {
  const cell = document.createElement('td')
  cell.classList.add(style.cell)
  cell.textContent = text
  return cell
}

const createRowBody = ({acessors, value}) => {
  const row = document.createElement('tr')
  row.classList.add(style.rowBody)

  return acessors.reduce((row, acessor) => {
    const cell = createCell(value[acessor])
    row.appendChild(cell)
    return row
  }, row)
}

const createRowHead = names => {
  const row = document.createElement('tr')
  row.classList.add(style.rowHead)

  return names.reduce((row, name) => {
    const cell = createCell(name)
    row.appendChild(cell)
    return row
  }, row)
}

export default ({data, cols}) => {
  const acessors = cols.map(col => col.acessor)
  const names = cols.map(col => col.name)

  const table = document.createElement('table')
  table.classList.add(style.table)

  const thead = document.createElement('thead')
  thead.classList.add(style.thead)
  thead.appendChild(createRowHead(names))

  const tbody = document.createElement('tbody')
  tbody.classList.add(style.tbody)

  data.forEach(value => {
    tbody.appendChild(
      createRowBody({
        value,
        acessors
      })
    )
  })

  table.appendChild(thead)
  table.appendChild(tbody)

  return table
}
