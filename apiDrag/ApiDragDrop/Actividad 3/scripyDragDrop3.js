const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')
const doingTasks = document.getElementById('doing-tasks')
let idTask = 0;

//dataTransfer
//setData: Establece la información que queremos compartir
//getData: Establece la información que queremos obtener

//botón de crear tarea + botón de eliminar (opcional) + gestionarlo en el localStorage


//PENDINGTASKS-------------------------------------
pendingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})

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

//DOINGTASKS----------------------------------------
doingTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
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

//FINISHEDTASKS----------------------------------
//OBLIGATORIO, SI NO, NO FUNCIONA
finishedTasks.addEventListener('dragover', (e) => {
    e.preventDefault()
})
finishedTasks.addEventListener('dragstart', (e) => {
    console.log(e.dataTransfer)
    e.dataTransfer.setData('text/plain', e.target.id)
    console.log(e.dataTransfer.getData)
})

finishedTasks.addEventListener('drag', (e) => {
    e.target.classList.add('active')
})

finishedTasks.addEventListener('dragend', (e) => {
    e.target.classList.remove('active')
})


//FINISHEDTASKS
finishedTasks.addEventListener('drop', (e) => {
    e.preventDefault();
    const element = document.getElementById(e.dataTransfer.getData('text'));
    element.classList.remove('active');
    const padre = element.parentNode.id;
    let id = e.dataTransfer.getData("text");
    let destino = 'finishedTasks';
    cambiaColumna(id, destino);

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
    finishedTasks.appendChild(element);
})


//DOINGTASKS
doingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id;
    let id = e.dataTransfer.getData("text");
    let destino = 'doingTasks';
    cambiaColumna(id, destino);

    switch (padre) {
        case 'pending-tasks':
            console.log('pendingTasks');
            doingTasks.appendChild(pendingTasks.removeChild(element));
            break;
        case 'finished-tasks':
            console.log('finishedTasks');
            doingTasks.appendChild(finishedTasks.removeChild(element));
            break;
    }
    doingTasks.appendChild(element);
})

//PENDINGTASKS
pendingTasks.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    element.classList.remove('active')
    const padre = element.parentNode.id
    let id = e.dataTransfer.getData("text");
    let destino = 'pendingTasks'
    cambiaColumna(id, destino);

    switch (padre) {
        case 'doing-tasks':
            console.log('doingTasks');
            pendingTasks.appendChild(doingTasks.removeChild(element));
            break;
        case 'finished-tasks':
            console.log('finishedTasks');
            pendingTasks.appendChild(finishedTasks.removeChild(element));
            break;
    }
    pendingTasks.appendChild(element);
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
    //----------------------------------------------------------------------------------------------------------





//NUEVA TAREA
let texto = document.getElementById("text");
let boton = document.getElementById("boton").addEventListener("click", crearTarea); //al crear la tarea, automáticamente se irá a pendingTasks


function crearTarea() {
    const newTask = {
        text: texto.value,
        name: "Task" + idTask,
        columna: "pendingTasks"
    }
    localStorage.setItem(idTask, JSON.stringify(newTask));
    document.getElementById("text").value = ''; //una vez que lo hayamos almacenado para borrar el contenido
    anadirTarea(newTask, idTask);
    idTask++;
}

function anadirTarea(newTask, idTask) {
    let task = document.createElement("div");
    task.setAttribute("id", idTask);
    task.setAttribute("draggable", "true");
    task.setAttribute("class", "task");
    task.textContent = newTask.text;
    pendingTasks.appendChild(task);
}

function anadirTarea2(newTask, index) {
    let task = document.createElement("div");
    task.setAttribute("id", index);
    task.setAttribute("draggable", "true");
    task.setAttribute("class", "task");
    task.textContent = newTask.text;

    if (newTask.columna == "pendingTasks") {
        pendingTasks.appendChild(task);
    } else if (newTask.columna == "doingTasks") {
        doingTasks.appendChild(task);
    } else {
        finishedTasks.appendChild(task);
    }

}




//CARGAR TAREAS EN LAS COLUMNAS
window.addEventListener('load', cargar);

function cargar() {
    for (let index = 0; index < localStorage.length; index++) {
        const task = localStorage.getItem(index);
        let task1 = JSON.parse(task);
        anadirTarea2(task1, index);
    }
}



function cambiaColumna(id, destino) {
    let task = JSON.parse(localStorage.getItem(id));
    task.columna = destino;
    localStorage.setItem(id, JSON.stringify(task));

}