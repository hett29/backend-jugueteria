import Cliente from "../database/models/cliente";
import bcrypt from "bcrypt";

export default class clienteRepository {

  async getById(id: string) {
    return await Cliente.findById(id);
  }

  async getAuthByCorreo(correo: string) {
    return await Cliente.findOne({ correo }).select("+contrasena");
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);

    return await Cliente.create({
      ...data,
      contrasena: hashedPassword,
    });
  }
}