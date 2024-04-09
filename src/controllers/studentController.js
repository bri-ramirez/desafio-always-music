import chalk from 'chalk';

import { pool } from "../configs/database.js";
import { errorMessage, successMessage, tableMessage, titleMessage } from '../helpers/message.js';

export const insertStudent = async (args) => {

  try {
    const { nombre, rut, curso, nivel } = args;

    // verifica si existe
    const exist = await pool.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
    if(exist.rowCount > 0) {
      errorMessage(`¡Ya existe un estudiante con rut ${rut}!`);
      return;
    }
  
    const result = await pool.query(`INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES (
      '${nombre}',
      '${rut}',
      '${curso}',
      '${nivel}'
    )`);
  
    if(result.rowCount === 0) {
      console.log('¡No se ha podido insertar el estudiante!');
      return;
    }
    
    successMessage(`¡Se ha insertado un nuevo estudiante!`);

    tableMessage([{
      nombre: nombre,
      rut: rut,
      curso: curso,
      nivel: nivel
    }])

  } catch (error) {
    //console.log(chalk.bgRedBright.bold('¡No se ha podido insertar el estudiante!'));
    errorMessage('¡No se ha podido insertar el estudiante!')
  }
}

export const deleteStudent = async (args) => {
  
  try {
    const { rut } = args;
    const result = await pool.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);

    if(result.rowCount === 0) {
      errorMessage(`¡No se ha encontrado el estudiante con rut ${rut}!`);
      return;
    }

    await pool.query(`DELETE FROM estudiantes WHERE rut = '${rut}'`);

    successMessage(`¡Se ha eliminado el estudiante con rut ${rut}!`);
  } catch (error) {
    errorMessage(`¡No se ha podido eliminar el estudiante con rut ${rut}!`);
  }
}

export const updateStudent = async (args) => {
  try {
    const { rut } = args;

    const exist = await pool.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);
    if(exist.rowCount === 0) {
      errorMessage(`¡No se ha encontrado el estudiante con rut ${rut}!`);
      return;
    }


    await pool.query(`UPDATE estudiantes SET nombre = '${args.nombre}', curso = '${args.curso}', nivel = '${args.nivel}' WHERE rut = '${rut}'`);
    
    successMessage(`¡Se ha actualizado el estudiante con rut ${rut}!`);
  } catch (error) {
    errorMessage(`¡No se ha podido actualizar el estudiante con rut ${rut}!`);
  }
}

export const listStudents = async () => {
  try {
    const results =  await pool.query(`SELECT * FROM estudiantes`);
    titleMessage('Lista de estudiantes');
    tableMessage(results.rows);
  } catch (error) {
    errorMessage('¡No se ha podido listar los estudiantes!');
  }
}

// buscar por rut
export const searchStudent = async (args) => {
  try {
    const { rut } = args;
    const result = await pool.query(`SELECT * FROM estudiantes WHERE rut = '${rut}'`);

    if(result.rowCount === 0) {
      errorMessage(`¡No se ha encontrado el estudiante con rut ${rut}!`);
      return;
    }

    titleMessage('Estudiante encontrado');
    tableMessage(result.rows);
  } catch (error) {
    errorMessage(`¡No se ha podido encontrar el estudiante con rut ${rut}!`);
  }
}