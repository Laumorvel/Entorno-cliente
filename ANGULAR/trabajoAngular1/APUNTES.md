#--IDEA DEL PROYECTO --
Crear una aplicación con la que se puedan registrar usuarios, haciendo uso de servicios (crear carpeta para servicios). 
Usar formularios y practicar manejando los valores almacenados en los inputs para asignárselos a objetos (usuarios). 
Usar directivas angular: for, if al menos.
Crear un componente hijo para que contenga el array de usuarios con los usuarios predefinidos. --> @Input() --> se usa para pasar información entre componentes.
Enviar datos de el hijo al padre con @Output

--A TENER EN CUENTA -- 
--POSIBLES FALLITOS --

1- Cuando llamamos a una función en un (click)= funcion(), esta función debe llevar los '()'

2- Lo que tengamos dentro de una función en un componente debe instanciarse con 'let'. Fuera no es necesario puesto que constituyen atributos del componente. 

3- Para crear un POJO o BEAN lo que necesitamos es crear un module.ts dentro de app con sus atributos. 

4- A la hora de importar el eventEmitter me autoimporta uno erroneo (from stream) y debe ser from @angular/core o dará error. Con 'from events' tampoco funciona.
