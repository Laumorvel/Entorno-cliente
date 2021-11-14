let listaProvincias = document.getElementById("listaProvincias"); //select
let listaMunicipios = document.getElementById("listaMunicipios"); //select

fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio4/servidor/cargaProvinciasXML.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "application/xml");
        let provincias = xml.getElementsByTagName('provincia'); //array con las provincias
        for (let i = 0; i < provincias.length; i++) {
            const provincia = provincias[i];
            let nombreProvincia = provincia.getElementsByTagName("nombre")[0].textContent;
            let codigoProvincia = provincia.getElementsByTagName("codigo")[0].textContent;
            let opcion = document.createElement("option");
            opcion.value = codigoProvincia;
            opcion.text = nombreProvincia;
            listaProvincias.addEventListener("change", listarMunicipios); //hay que asociarlo a la lista, no a las opciones de la misma
            listaProvincias.appendChild(opcion);
        }
    })

/*<option value="1">Windows Vista</option>  */

function listarMunicipios(e) {
    //Para eliminar todos los municipios que se hayan creado (de otra forma, se irán acumulando):
    while (listaMunicipios.firstChild) {
        listaMunicipios.removeChild(listaMunicipios.firstChild);
    }

    let codigoProvinciaSelec = e.target[e.target.selectedIndex].value; //extraer el código de la provincia seleccionada
    let formData = new FormData();
    formData.append("provincia", codigoProvinciaSelec);

    fetch("https://intranetjacaranda.es/Ejercicios/Ejercicio4/servidor/cargaMunicipiosXML.php", { //devuelve solo los municipios con el código de provincia que pasamos
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
            const parser = new DOMParser();
            const xml = parser.parseFromString(datos, "application/xml");
            let municipios = xml.getElementsByTagName("municipio");
            for (let i = 0; i < municipios.length; i++) {
                const municipio = municipios[i];
                let opcion = document.createElement("option");
                opcion.text = municipio.getElementsByTagName("nombre")[0].textContent;
                opcion.value = municipio.getElementsByTagName("codigo")[0].value;
                listaMunicipios.appendChild(opcion);
            }
        })
}