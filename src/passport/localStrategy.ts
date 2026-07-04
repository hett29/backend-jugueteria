import { Strategy } from "passport-local";
import UsuarioRepository from "../repositories/clienteRepository";
import ApiError from "../errors/Apierror";
import UsuarioResource from "../resources/clienteResource";


const localStrategy = new Strategy(
  {
    usernameField: "correo", 
    passwordField: "password",
    session: false,
  },
  async (correo: string, password: string, done) => {
    try {
      const repository = new UsuarioRepository();
      const usuario = await repository.getAuthByCorreo(correo);


      if (!usuario || !usuario.contrasena) {
        throw new ApiError({
          name: "UNAUTHORIZED_ERROR",
          message: "Credenciales incorrectas",
          code: "ERR_UNAUTH",
          status: 401,
        });
      }


     


      const match = await repository.comparePassword(
        password,
        usuario.contrasena
      );


      if (!match) {
        throw new ApiError({
          name: "UNAUTHORIZED_ERROR",
          message: "Credenciales incorrectas",
          code: "ERR_UNAUTH",
          status: 401,
        });
      }


      const resource = new UsuarioResource(usuario);


      return done(null, resource.item());
    } catch (error) {
      return done(error);
    }
  }
);


export default localStrategy;
