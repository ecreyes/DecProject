# DECProject

Para iniciar el proyecto:
```=
npm install
```
Antes de arrancar el servidor se debe crear la bd con nombre "proyecto" y clave '12345' sin comillas.

Una vez configurada la bd, se inicia el servidor con:
```=
node app.js
```

Para crear un usuario admin por consola:
```=
insert into usuario (id,username,password,email,admin,createdAt,updatedAt) values (4,"dec",123,"dec@email.cl",true,0000-00-00,0000-00-00);
```