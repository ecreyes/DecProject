"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario_sesion = sequelize.define("usuario_sesion", {

    }, {

        timestamps: false
    });
    return Usuario_sesion;
};
