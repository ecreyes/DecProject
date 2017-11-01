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
##Selecionar la bd en mysql
Una vez abierto el command line se tiene que ingresar la passsword luego para crear la bd:
```
create database proyecto;
```
una vez dentro para seleccionar la bd:
```
use proyecto;
```
si todo funciona bien se deberian mostrar las tablas con:
```
show tables;
```
## Crear administrador del sitio.
Actualmente solo se permite registrar usuarios sin permisos de adminisitrador,para crear el primer usuario admin por consola:
```=
insert into admin values(1,'dec','111','00:00:00','00:00:00');
```
El beneficio de esto es que en la barra de navegación aparece una rueda, si uno inicia sesion como administrador puede entrar a esa pestaña y agregar más decisiones de las que estan en la plantilla de excel.

##Invitación por correo.
La invitación por correo demora unos 3 seg en enviarse, cuando esta listo aparece una notificación en la ventana.

##Timer
El timer tiene un problema al ingresar el 00 de seg, aun no se soluciona eso pero funciona bien en otro sentido.

##Creación de sesiones o salas.
Todas las sesiones son creadas en la bd y mostradas con angular,hubo un mal entendido con objetivo y escenario que se penso que era distinto, pero los objetivos se pueden crear dentro de la sala.