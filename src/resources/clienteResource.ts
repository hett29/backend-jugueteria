export default class ClienteResource {
  private cliente: any;

  constructor(cliente: any) {
    this.cliente = cliente;
  }

  item() {
    return {
      id: this.cliente._id,
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      correo: this.cliente.correo,
      telefono: this.cliente.telefono,
      direccion: this.cliente.direccion,
      departamento: this.cliente.departamento ?? "",
      ciudad: this.cliente.ciudad ?? "",
      rol: this.cliente.rol ?? "USUARIO",
      createdAt: this.cliente.createdAt,
      updatedAt: this.cliente.updatedAt,
    };
  }
}
