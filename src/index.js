import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { deleteStudent, insertStudent, listStudents, searchStudent, updateStudent } from './controllers/studentController.js';
import { titleMessage } from './helpers/message.js';

titleMessage("¡Hola, bienvenido a la aplicación de estudiantes!");

yargs(hideBin(process.argv))
  .command(
    "insert",
    "Comando para insertar un nuevo estudiante",
    {
      nombre: {
        describe: "Nombre del estudiante",
        demand: true,
        alias: "n",
      },
      rut: {
        describe: "Rut del estudiante",
        demand: true,
        alias: "r",
      },
      curso:{
        describe: "Curso del estudiante",
        demand: true,
        alias: "c",
      },
      nivel:{
        describe: "Nivel del estudiante",
        demand: true,
        alias: "l",
      }
    },
    (args) => {
      insertStudent(args);
    }
  )
  .command(
    "delete",
    "Comando para eliminar un estudiante",
    {
      rut: {
        describe: "Rut del estudiante",
        demand: true,
        alias: "r",
      },
    },
    (args) => {
      deleteStudent(args);
    }
  )
  .command(
    "update",
    "Comando para actualizar un estudiante",
    {
      rut: {
        describe: "Rut del estudiante",
        demand: true,
        alias: "r",
      },
      nombre: {
        describe: "Nombre del estudiante",
        demand: true,
        alias: "n",
      },
      curso:{
        describe: "Curso del estudiante",
        demand: true,
        alias: "c",
      },
      nivel:{
        describe: "Nivel del estudiante",
        demand: true,
        alias: "l",
      }
    },
    (args) => {
      updateStudent(args);
    }
  )
  .command(
    "list",
    "Comando para listar los estudiantes",
    {},
    () => {
      listStudents();
    }
  )
  .command(
    "search",
    "Comando para buscar un estudiante",
    {
      rut: {
        describe: "Rut del estudiante",
        demand: true,
        alias: "r",
      },
    },
    (args) => {
      searchStudent(args);
    }
  )
  .help().argv;