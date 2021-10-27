const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')

//dataTransfer
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

//botón de crear tarea + botón de eliminar (opcional) + gestionarlo en el localStorage

pendingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

pendingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

doingTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

doingTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

doingTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})

//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id

    switch (padre) {
        case 'pending-tasks':
            console.log('pendingTasks');
            finishedTasks.appendChild(pendingTasks.removeChild(element));
            break;
        case 'doing-tasks':
            console.log('doingTasks');
            finishedTasks.appendChild(doingTasks.removeChild(element));
            break;
    }
})

doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    doingTasks.appendChild(pendingTasks.removeChild(element))
})