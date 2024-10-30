# Compilador Web - 201901973


Este es un compilador robusto que implementa un lenguaje de programación fuertemente tipado con características modernas y manejo integral de errores. El compilador incluye análisis léxico, análisis sintáctico y soporta una amplia gama de construcciones de programación.

## Características Principales

### Tipos de Datos y Variables
- **Tipos Básicos**: `int`, `double`, `bool`, `char`, `string`, `null`
- **Declaración de Variables**: Usando la palabra clave `let` con anotaciones de tipo
- **Constantes**: Soporte para variables inmutables usando `const`
- **Seguridad de Tipos**: Sistema de verificación de tipos estricto
- **Casteo**: Conversión explícita de tipos usando la palabra clave `cast`

### Colecciones
- **Vectores**: Soporte para vectores unidimensionales y bidimensionales
- **Operaciones con Vectores**: 
  - Inicialización dinámica
  - Acceso y modificación de elementos
  - Funciones integradas para vectores

### Estructuras de Control
- **Sentencias Condicionales**:
  - Sentencias if-else
  - Switch-case con soporte para default
  - Operadores ternarios
- **Bucles**:
  - Bucles for
  - Bucles while
  - Bucles do-until
  - Construcción básica de loop
  - Control de bucles con `break` y `continue`

### Funciones
- **Declaración de Funciones**: Con tipos de parámetros y tipo de retorno
- **Soporte para Métodos**: Métodos void
- **Parámetros**: 
  - Parámetros opcionales y requeridos
  - Valores por defecto para parámetros
- **Sentencias de Retorno**: Tanto void como con valor

### Funciones Nativas
- **Manipulación de Texto**:
  - `lower()`: Conversión a minúsculas
  - `upper()`: Conversión a mayúsculas
  - `toString()`: Conversión a string
  - `toCharArray()`: Conversión a array de caracteres
  - `len()`: Obtención de longitud
- **Operaciones Numéricas**:
  - `round()`: Redondeo de números
  - `truncate()`: Truncamiento de decimales
- **Operaciones con Vectores**:
  - `reverse()`: Inversión de elementos
  - `min()`: Valor mínimo
  - `max()`: Valor máximo
  - `sum()`: Suma de elementos
  - `average()`: Promedio de elementos

### Características Especiales
- **Comprobación de Tipos**: Operador `is` para verificación de tipos
- **Comentarios**: Soporte para comentarios de una línea (//) y múltiples líneas (/* */)
- **Manejo de Errores**: 
  - Errores léxicos
  - Errores sintácticos
  - Sistema de reporte de errores detallado

### Operadores
- **Aritméticos**: `+`, `-`, `*`, `/`, `%`, `^`
- **Relacionales**: `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Lógicos**: `&&`, `||`, `!`
- **Incremento/Decremento**: `++`, `--`

## Características de Implementación
- Análisis léxico robusto
- Parser sintáctico detallado
- Sistema de tipos estático
- Manejo de ámbito de variables
- Evaluación de expresiones
- Soporte para funciones anidadas
