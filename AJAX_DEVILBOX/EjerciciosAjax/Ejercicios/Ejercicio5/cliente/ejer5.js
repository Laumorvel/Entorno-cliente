let listaProvincias = document.getElementById("listaProvincias");
let listaMunicipios = document.getElementById("listaMunicipios");

fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio5/servidor/cargaProvinciasJSON.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        let datoObject = JSON.parse(datos);
        let keys = Object.keys(datoObject); //como devuelve un objetos, conseguimos todas las claves
        let values = Object.values(datoObject); //por otro lado, todos los valores

        for (let i = 0; i < keys.length; i++) { //asociamos las claves con sus valores dentro de un option cada par(ambas tienen el mismo número de elementos)
            const codigo = keys[i];
            const nombre = values[i];
            let opcion = document.createElement("option");
            opcion.value = codigo;
            opcion.text = nombre;
            listaProvincias.addEventListener("change", listarMunicipios);
            listaProvincias.appendChild(opcion);
        }
    })


function listarMunicipios(e) {
    //Para eliminar todos los municipios que se hayan creado (de otra forma, se irán acumulando):
    while (listaMunicipios.firstChild) {
        listaMunicipios.removeChild(listaMunicipios.firstChild);
    }

    let codigoProvinciaSelec = e.target[e.target.selectedIndex].value; //extraer el código de la provincia seleccionada
    let formData = new FormData();
    formData.append("provincia", codigoProvinciaSelec);

    fetch("https://intranetjacaranda.es/Ejercicios/Ejercicio5/servidor/cargaMunicipiosJSON.php", { //devuelve solo los municipios con el código de provincia que pasamos
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response);
        })
        .then(datos => {
            let datosObject = JSON.parse(datos);
            let keys = Object.keys(datosObject);
            let values = Object.values(datosObject);
            for (let i = 0; i < keys.length; i++) {
                const valor = keys[i];
                const nombre = values[i];
                let opcion = document.createElement("option");
                opcion.text = nombre;
                opcion.value = valor;
                listaMunicipios.appendChild(opcion);
            }
        })
}