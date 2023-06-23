export default (_, inject) => {
  inject('formatDate', (date) => {
    if (!date) return;
    const [ano, mes, dia] = date.split('-')
    return `${dia}/${mes}/${ano}`
  })
}
