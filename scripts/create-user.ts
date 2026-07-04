import "dotenv/config";

import inquirer from "inquirer";
import chalk from "chalk";

import { connectDB } from "../src/database/connection";
import Cliente from "../src/database/models/cliente";

import bcrypt from "bcrypt";

// ===============================
// Crear Cliente
// ===============================

async function createClient() {
  try {
    // conectar mongo
    await connectDB();

    console.log(chalk.yellow("=== Crear Cliente ==="));

    // ===============================
    // Preguntas
    // ===============================

    const questions: any[] = [
      {
        type: "input",
        name: "nombre",
        message: "Nombre:",
      },
      {
        type: "input",
        name: "apellido",
        message: "Apellido:",
      },
      {
        type: "input",
        name: "correo",
        message: "Correo:",
      },
      {
        type: "input",
        name: "telefono",
        message: "Teléfono:",
      },
      {
        type: "input",
        name: "direccion",
        message: "Dirección:",
      },
      {
        type: "password",
        name: "contrasena",
        message: "Contraseña:",
        mask: "*",
      },
    ];

    const answers = await inquirer.prompt(questions);

    // ===============================
    // Verificar duplicado
    // ===============================

    const existe = await Cliente.findOne({
      correo: answers.correo,
    });

    if (existe) {
      console.log(
        chalk.red("❌ Ya existe un cliente con ese correo")
      );
      process.exit(1);
    }

    // ===============================
    // Encriptar contraseña
    // ===============================

    const hashedPassword = await bcrypt.hash(
      answers.contrasena,
      10
    );

    // ===============================
    // Crear cliente
    // ===============================

    const cliente = await Cliente.create({
      nombre: answers.nombre,
      apellido: answers.apellido,
      correo: answers.correo,
      telefono: answers.telefono,
      direccion: answers.direccion,
      contrasena: hashedPassword,
    });

    console.log(
      chalk.green(`✅ Cliente creado: ${cliente.nombre}`)
    );

    process.exit(0);
  } catch (error) {
    console.error(
      chalk.red("❌ Error creando cliente"),
      error
    );
    process.exit(1);
  }
}

createClient();