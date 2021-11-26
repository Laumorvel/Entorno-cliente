//Clase para crear los empleados. También podría ser una interfaz como la que hicimos en clase.
export class Empleado{

  nombre:String = "";
  apellidos:String = "";
  cargo:String = "";
  salario:number=0;

  constructor(nombre:String, apellidos:String, cargo:String, salario:number){
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.cargo = cargo;
    this.salario = salario;
  }

}
