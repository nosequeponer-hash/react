# Arquitectura final - React con TypeScript

## Genéricos en componentes React

El componente `DataTable<T>` usa un genérico con restricción (`T extends { id: string | number }`) para garantizar que cualquier tipo de dato que se le pase tenga al menos una propiedad `id`. Esto permite reutilizar el mismo componente para mostrar estudiantes, asignaturas o cualquier otra entidad, sin sacrificar la seguridad de tipos.

Sin genéricos, habría que crear un componente distinto para cada tipo de dato, violando el principio DRY.

## Partial\<T\> para el estado de edición

Cuando el usuario edita una fila, el estado temporal usa `Partial<T>` porque el formulario puede estar incompleto: el usuario podría haber rellenado solo algunos campos. Si usáramos `T` directamente, TypeScript nos obligaría a tener todos los campos rellenos desde el primer momento, lo que no es realista en una edición progresiva.

## Uniones Discriminadas en el módulo 2

El tipo `EstadoMatricula` es una unión discriminada con la propiedad `tipo` como discriminante. Esto permite que TypeScript estreche el tipo de forma 100% segura dentro de cada rama del `switch`, eliminando la necesidad de castings o comprobaciones manuales. Si se añade un nuevo estado en el futuro, el compilador obliga a manejarlo.

## Tipo `never` y análisis exhaustivo

En la función `generarReporte` del módulo 2, el bloque `default` asigna el valor no manejado a una variable de tipo `never`. Esto garantiza que si en el futuro se añade un nuevo estado a `EstadoMatricula` y el desarrollador olvida añadir su caso en el `switch`, el compilador lanzará un error en tiempo de compilación, no en producción.

## Tipos de utilidad

- `Partial<T>`: usado en el estado de edición de `DataTable` para permitir ediciones parciales.
- `keyof T`: usado en la definición de `Columna<T>` para garantizar que la clave de cada columna es una propiedad válida de `T`.

## Reducción de errores en runtime vs JavaScript

En JavaScript estándar, errores como pasar una columna con una clave inexistente, olvidar manejar un estado de matrícula, o acceder a una propiedad en un objeto nulo solo aparecen en producción. Con TypeScript y `strict: true`, estos errores se detectan durante el desarrollo, antes de que lleguen al usuario.
