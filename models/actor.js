//Se define el modelo que exportara el archivo.
module.exports = (sequelize, type) => {
    //Se crea una constante con el nombre deseado y se 
    //definen las caracteristicas del objeto.
    const Actor = sequelize.define('actors', {
        //id es un entero, que a la ves es la llave primaria y se
        //va a autoincrementar.
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING
    });
    return Actor;
};