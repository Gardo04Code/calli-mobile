# CALLI — Pruebas manuales de contacto

Inicio del registro: 16 de septiembre de 2026.

Las pruebas se realizarán una por una. Cada resultado funcional lo confirmará el usuario; las verificaciones de código no cuentan como pruebas en dispositivo.

## Configuración temporal

- Número de pruebas: **+52 231 226 2218**.
- Número productivo: **+52 231 124 2221**. No utilizarlo para estas pruebas.
- Configuración compartida: `constants/contact.ts`.
- Antes de publicar: restaurar el número productivo y revisar los destinos de la release.
- La política de privacidad conserva el contacto productivo; no se ha publicado ni se ha cambiado su número por el temporal.
- Modalidad confirmada por el usuario durante C09a: Expo Go. Dispositivo y versión de Android pendientes de confirmar. Las pruebas funcionales informadas no sustituyen su verificación en una release instalada.
- Usar datos ficticios al probar postulaciones.

## Seguimiento

| ID | Prueba | Estado | Resultado informado |
|---|---|---|---|
| C01 | Inicio: botón Llamar abre el marcador con el número de pruebas | Aprobada por el usuario | Abrió el número correcto en la aplicación de llamadas. El usuario también pulsó Llamar y confirmó que la llamada se realiza correctamente. |
| C02 | Inicio: WhatsApp abre el destinatario de pruebas y el mensaje general | Aprobada por el usuario | Chat, número y texto correctos; el usuario confirmó envío y recepción del mensaje. |
| C03a | Contáctanos: llamada | Aprobada por el usuario | El usuario confirmó la apertura correcta de la aplicación de llamadas y que pudo realizar la llamada. |
| C03b | Contáctanos: WhatsApp | Aprobada por el usuario | El usuario confirmó que replicó la prueba, el mensaje se genera correctamente y el envío es efectivo. |
| C04a | Inicio: WhatsApp desde una tarjeta de servicio, con el servicio correcto | Aprobada por el usuario | Confirmó que la prueba de Construcción salió correcta en su totalidad: servicio, destinatario, texto, envío y recepción. |
| C04b | Inicio: llamada desde una tarjeta de servicio | Aprobada por el usuario | Confirmó que la llamada se realiza con éxito en el escenario solicitado. |
| C05a | Servicios: WhatsApp desde un resultado del buscador | Aprobada por el usuario | Confirmó búsqueda, selección de la tarjeta y envío de WhatsApp correctos en el escenario solicitado para Plomería y fontanería. |
| C05b | Servicios: llamada desde una tarjeta | Aprobada por el usuario | Confirmó que abrió el número correcto y que la llamada se realizó correctamente. |
| C05c | Servicios: selección por categoría y correspondencia del servicio al contactar | Aprobada por el usuario | Confirmó que pasó el escenario solicitado de Remodelación: filtro, servicio correcto y envío del mensaje. |
| C06a | Trabaja: intento de envío con todos los campos vacíos | Aviso de validación confirmado por el usuario | Confirmó el popup Faltan datos y la indicación de completar los campos. No indicó expresamente si WhatsApp permaneció cerrado ni el comportamiento al cerrar el aviso. |
| C06b | Trabaja: intento de envío con solo el teléfono vacío | Aviso corregido confirmado por el usuario | Tras repetir la prueba, confirmó que el popup menciona solo el campo vacío. No confirmó expresamente conservación de valores ni ausencia de apertura de WhatsApp. |
| C06c | Trabaja: campo obligatorio con solo espacios | Detección de espacios confirmada por el usuario | Introdujo tres espacios en Nombre y recibió el aviso de completar ese campo. No confirmó expresamente ausencia de apertura de WhatsApp. |
| C06d | Trabaja: aviso con dos campos vacíos | Aviso de ambos campos confirmado por el usuario | Confirmó que pide completar ambos campos. Conservación de valores y ausencia de apertura de WhatsApp no confirmadas expresamente. |
| C07 | Trabaja: mensaje completo con datos ficticios y recepción en WhatsApp de pruebas | Aprobada por el usuario | Confirmó precarga, número correcto, envío y recepción de los cuatro datos completos. |
| C08 | Cancelar apertura/envío y regresar a CALLI | Aprobada por el usuario para retorno, conservación y ausencia de envío | Confirmó que al regresar el formulario mantiene los datos y que el mensaje no llegó al destinatario. |
| C09a | Sin conexión: navegación y consulta del catálogo ya cargado | Parcial en Expo Go; repetir en release instalada | Navegación sin conexión confirmada; imágenes ausentes al desconectar y recuperadas al reconectar. Falta validar funcionamiento offline en APK release. |
| C09b | Fallos de apertura y ausencia de aplicación compatible | Pendiente | — |
| C10 | Redes sociales: perfiles reales y apertura | Pendiente de enlaces reales | — |
| C11 | Servicios: búsqueda sin resultados y recuperación al limpiar | Aprobada por el usuario | Confirmó el aviso sin coincidencias, la recuperación de las tarjetas al limpiar y la apertura de una tarjeta. |
| C12 | Servicios: cerrar ventana de contacto con Atrás de Android | Aprobada por el usuario | Confirmó cierre con Atrás y que otra tarjeta muestra el nombre del servicio y los botones Llamar y WhatsApp. |
| G01 | Galería: abrir una foto y cerrar su vista previa con Atrás | Aprobada por el usuario | Confirmó que abrió correctamente la vista previa y que Atrás la cierra correctamente. |
| G02 | Galería: filtrar por Remodelación y volver a Recientes | Filtro y retorno confirmados por el usuario | Confirmó cambio de título, siete fotos y regreso a Recientes. No contó por separado las fotos del catálogo restablecido. |
| G03 | Galería: cerrar vista previa con X y al tocar el fondo exterior | Aprobada por el usuario | Confirmó que la vista previa se cierra correctamente de ambas formas. |
| U01 | Trabaja: acceso a campos y botón con el teclado abierto | Aprobada por el usuario después de la corrección | Confirmó que puede ver y alcanzar el botón con el teclado abierto y que el texto se conserva al cerrarlo. Falta repetir en release instalada. |
| U02 | Trabaja: primer toque en Enviar Postulación con teclado abierto | Respuesta al primer toque confirmada por el usuario | Confirmó que al primer toque aparece el aviso para completar Teléfono. No confirmó expresamente ausencia de apertura de WhatsApp. |
| U03 | Trabaja: formulario con tamaño de texto aumentado | Aprobada por el usuario | Confirmó que todo sigue legible y que el botón es accesible con la fuente aumentada. |
| E1-01 a E1-17 | Etapa 1: formulario, elementos ocultos, consentimiento y contacto | Aprobadas por el usuario en Expo Go | Ver la sección «Etapa 1 — Pruebas manuales en Expo Go». |
| E1-18 | Etapa 1: aviso cuando no se puede abrir el marcador | No ejecutada | Sin dispositivo para reproducir el fallo. Relacionada con C09b, que sigue pendiente. |

## Primera prueba: C01

1. Abrir una versión que incluya el cambio de número. En Expo, recargar el proyecto; un APK ya instalado no cambia por editar el código fuente y necesita una versión actualizada.
2. En Inicio, tocar el botón Llamar del bloque Contáctanos.
3. Comprobar que abre el marcador del teléfono con **+52 231 226 2218** (el formato visual puede variar).
4. Informar si abre correctamente, qué número aparece y si hay un error.

No hace falta iniciar la llamada para completar C01: esta prueba verifica la apertura y el destino del marcador. La conexión y recepción efectiva de una llamada, si se prueban, se registrarán por separado.

### Resultado de C01

El usuario confirmó el 16 de septiembre de 2026 que se abrió el número correcto y que, al pulsar Llamar en la aplicación de llamadas, la llamada se realizó correctamente. No se informó por separado de la recepción en el teléfono destinatario ni de una conversación con audio bidireccional. Modalidad de ejecución y dispositivo aún pendientes de identificar.

## Segunda prueba: C02

1. Regresar a CALLI y abrir Inicio.
2. Pulsar WhatsApp en el bloque Contáctanos.
3. Comprobar que abre el chat del número de pruebas **+52 231 226 2218**.
4. Comprobar que prepara el texto: «Hola, me gustaría recibir información sobre los servicios de CALLI.»
5. Enviar ese mensaje de prueba y verificar su recepción en el WhatsApp destinatario.

Registrar por separado apertura, destinatario, texto preparado, envío y recepción. No dar por confirmada la recepción solo porque WhatsApp se abra.

### Resultado de C02

El usuario confirmó el 16 de septiembre de 2026 que el botón abre WhatsApp hacia el número de pruebas y precarga correctamente «Hola, me gustaría recibir información sobre los servicios de CALLI.». Posteriormente confirmó que envió el mensaje y que llegó correctamente al destinatario. C02 aprobada según el resultado informado por el usuario.

## Tercera prueba: C03a

1. Abrir la pestaña Contáctanos de la barra inferior, distinta al bloque de contacto de Inicio.
2. Pulsar Llamar.
3. Comprobar que abre el marcador con **+52 231 226 2218**.
4. Realizar la llamada y comunicar el resultado.

La prueba de WhatsApp de esta pestaña se realizará por separado como C03b.

### Resultado de C03a

El usuario confirmó el 16 de septiembre de 2026 que realizó la prueba desde la pestaña Contáctanos, que se abrió correctamente la aplicación de llamadas y que al marcar se realizó la llamada. C03a aprobada según el resultado informado.

## Cuarta prueba: C03b

1. Regresar a la pestaña Contáctanos de la barra inferior.
2. Pulsar WhatsApp.
3. Comprobar el destinatario **+52 231 226 2218** y el texto «Hola, me gustaría recibir información sobre los servicios de CALLI.».
4. Enviar el mensaje de prueba y verificar su recepción en el WhatsApp destinatario.

Registrar apertura, destinatario, texto, envío y recepción según lo que confirme el usuario.

### Resultado de C03b

El usuario confirmó el 16 de septiembre de 2026 que replicó la prueba, que el mensaje de WhatsApp se genera correctamente y que el envío es efectivo. C03b aprobada según su confirmación del escenario solicitado.

## Quinta prueba: C04a

1. En Inicio, desplazarse a Nuestros Servicios y tocar Construcción.
2. Comprobar que el cuadro de contacto muestra Construcción.
3. Pulsar WhatsApp y verificar el destinatario **+52 231 226 2218**.
4. Comprobar el texto: «Hola, me gustaría solicitar el servicio de "Construcción" en CALLI. ¿Me pueden brindar atención?».
5. Enviar el mensaje de prueba y comprobar su recepción.

Esta prueba verifica el servicio elegido dentro del mensaje, además del destino y del envío. La llamada desde la tarjeta se revisará por separado como C04b.

### Resultado de C04a

El usuario confirmó el 16 de septiembre de 2026 que realizó la prueba y salió correcta en su totalidad. C04a aprobada según su confirmación del escenario solicitado para Construcción; esto no acredita todavía el resto de las tarjetas.

## Sexta prueba: C04b

1. Regresar a Inicio y tocar Construcción en Nuestros Servicios.
2. Pulsar Llamar en la ventana de contacto del servicio.
3. Comprobar que abre el marcador con **+52 231 226 2218**.
4. Realizar la llamada y comunicar si funciona correctamente.

### Resultado de C04b

El usuario confirmó el 16 de septiembre de 2026 que la llamada se realizó con éxito. C04b aprobada según su confirmación del escenario solicitado.

## Séptima prueba: C05a

1. Abrir la pestaña Servicios y seleccionar Todos.
2. Escribir «plomería» en el buscador y seleccionar la sugerencia correspondiente.
3. Tocar la tarjeta del servicio que aparece en los resultados para abrir su ventana de contacto.
4. Pulsar WhatsApp y verificar el número de pruebas **+52 231 226 2218**.
5. Comprobar que el mensaje incluye exactamente el nombre del servicio elegido, en lugar del servicio Construcción probado anteriormente.
6. Enviar el mensaje y comprobar su recepción.

Esperar la confirmación del usuario sobre búsqueda, selección, destinatario, texto y recepción antes de aprobar el escenario.

### Resultado de C05a

El usuario confirmó que realizó la prueba y que la búsqueda, la selección de la tarjeta y el envío de WhatsApp salieron correctamente. C05a aprobada según su confirmación del escenario solicitado para Plomería y fontanería.

## Octava prueba: C05b

1. Regresar a la pestaña Servicios y abrir la tarjeta Plomería y fontanería.
2. Pulsar Llamar en la ventana del servicio.
3. Verificar que el marcador muestra **+52 231 226 2218**.
4. Realizar la llamada y comunicar el resultado.

Esta prueba corresponde al botón de llamada de Servicios, distinto del probado previamente en Inicio.

### Resultado de C05b

El usuario confirmó que se abrió el número correcto y que la llamada se realizó de manera eficaz. C05b aprobada según su confirmación del escenario solicitado.

## Novena prueba: C05c

1. Regresar a Servicios y borrar la búsqueda anterior con la X del buscador.
2. Seleccionar la categoría Remodelación.
3. Comprobar que los resultados corresponden a esa categoría y abrir la tarjeta Remodelaciones.
4. Comprobar que la ventana muestra Remodelaciones y pulsar WhatsApp.
5. Verificar el destinatario **+52 231 226 2218** y el mensaje «Hola, me gustaría solicitar el servicio de "Remodelaciones" en CALLI. ¿Me pueden brindar atención?».
6. Enviar el mensaje y comprobar su recepción.

Confirmar que el mensaje usa Remodelaciones y no conserva Plomería y fontanería de la prueba anterior. El resultado cubre esta categoría y este servicio; no acredita todas las categorías del catálogo.

### Resultado de C05c

El usuario confirmó que la prueba pasó con eficacia. C05c aprobada según su confirmación del escenario solicitado para Remodelación / Remodelaciones.

## Décima prueba: C06a

1. Abrir la pestaña Trabaja con nosotros.
2. Dejar vacíos nombre, dirección, teléfono y mensaje; borrar cualquier contenido previo.
3. Pulsar Enviar Postulación.
4. Comprobar que aparece el aviso «Faltan datos». Tras la corrección, el texto esperado es «Completa estos campos: Nombre, Dirección, Teléfono y Mensaje.».
5. Comprobar que no abre WhatsApp y que, al cerrar el aviso, se permanece en el formulario.

El campo actual sigue siendo Dirección: su sustitución por Ciudad o municipio forma parte de los cambios de privacidad pendientes. No se debe interpretar esta prueba como validación de esa modificación todavía no implementada.

### Resultado de C06a

El usuario confirmó que apareció un popup indicando que faltaban datos, que debía completar los campos y que mencionaba todos los campos que dejó vacíos. Confirmado el aviso de validación. La ausencia de apertura de WhatsApp y el retorno al formulario no se confirmaron expresamente; se comprobarán también en el siguiente escenario.

## Undécima prueba: C06b

1. Cerrar el aviso de la prueba anterior.
2. Introducir datos ficticios: Nombre «Prueba CALLI», Dirección «Zona de prueba, Puebla» y Mensaje «Postulación de prueba, sin datos reales».
3. Dejar únicamente Teléfono vacío.
4. Pulsar Enviar Postulación.
5. Verificar que aparece Faltan datos con el texto «Completa el campo Teléfono para continuar.» y que no se abre WhatsApp.
6. Cerrar el aviso y comprobar que se conservan los datos escritos.

### Incidencia y corrección de C06b

El usuario informó que el aviso original enumeraba todos los campos pese a dejar vacío únicamente Teléfono. Autorizó corregirlo para mencionar solo los campos pendientes.

Se modificó la validación de `app/(tabs)/trabaja.tsx`: detecta campos vacíos o con solo espacios y muestra sus etiquetas, con redacción singular o plural. Si hay datos faltantes, continúa bloqueando la apertura de WhatsApp y no borra los campos ya completados. No se modificó la validación del formato de teléfono ni el campo Dirección.

El usuario repitió C06b después del cambio y confirmó que el mensaje emergente solo marca el campo que todavía está vacío. La corrección de la redacción singular queda validada por el usuario. Conservación de valores y ausencia de apertura de WhatsApp no fueron confirmadas expresamente; se incluyen también en el siguiente escenario.

Pendiente comprobar dos campos pendientes (C06d), todos vacíos (regresión C06a), solo espacios (C06c) y envío con todos los campos completos (C07). La prueba previa del aviso genérico se conserva como resultado histórico, no como validación de la nueva redacción.

## Duodécima prueba: C06d

1. Dejar vacíos Nombre y Teléfono.
2. Completar Dirección con «Zona de prueba, Puebla» y Mensaje con «Postulación de prueba, sin datos reales».
3. Pulsar Enviar Postulación.
4. Comprobar que el aviso dice «Completa estos campos: Nombre y Teléfono.» y que no abre WhatsApp.
5. Cerrar el aviso y comprobar que se mantienen la dirección y el mensaje escritos.

Esta prueba valida el listado de varios campos pendientes y la conservación de los datos ya completados.

### Resultado de C06d

El usuario confirmó que el aviso le indica completar ambos campos. Queda validada la enumeración de los campos pendientes en el escenario solicitado (Nombre y Teléfono). No informó expresamente sobre conservación de valores ni apertura de WhatsApp; esos comportamientos no se dan por comprobados.

## Decimotercera prueba: C06c

1. En Nombre, borrar cualquier texto e introducir únicamente tres espacios.
2. Completar Dirección con «Zona de prueba, Puebla», Teléfono con «2312262218» (número de pruebas) y Mensaje con «Postulación de prueba, sin datos reales».
3. Pulsar Enviar Postulación.
4. Comprobar que el aviso dice «Completa el campo Nombre para continuar.» y que no abre WhatsApp.

Esta prueba verifica que los espacios no permiten eludir la validación de campo obligatorio. No acredita validación de formato del teléfono.

### Resultado de C06c

El usuario confirmó que introdujo tres espacios en Nombre y que la aplicación le indicó completar ese campo. Queda comprobada por el usuario la detección de un nombre compuesto solo por espacios; no confirmó expresamente si WhatsApp permaneció cerrado.

## Decimocuarta prueba: C07

1. Completar Nombre con «Prueba CALLI», Dirección con «Zona de prueba, Puebla», Teléfono con «2312262218» y Mensaje con «Postulación de prueba, sin datos reales».
2. Pulsar Enviar Postulación.
3. Comprobar que abre WhatsApp al número **+52 231 226 2218**, sin mostrar el aviso de campos pendientes.
4. Revisar que el mensaje contiene el encabezado Nueva postulación - CALLI y los cuatro campos con sus valores correctos.
5. Enviar el mensaje y comprobar que llega completo al destinatario.

No se prueba aquí la validez del formato de teléfono ni la privacidad del formulario, que conservan pendientes independientes. Usar exclusivamente los datos de prueba indicados.

### Resultado de C07

El usuario confirmó que se carga el mensaje, que al pulsar Enviar se manda y que el número es correcto. Después confirmó que llegaron completos los datos al destinatario. C07 aprobada según las confirmaciones del usuario.

## Decimoquinta prueba: C08

1. En Trabaja con nosotros, usar los datos de prueba anteriores y cambiar Mensaje por «PRUEBA DE CANCELACIÓN - NO ENVIAR».
2. Pulsar Enviar Postulación para abrir WhatsApp.
3. No pulsar Enviar en WhatsApp. Regresar inmediatamente a CALLI con Atrás o el selector de aplicaciones.
4. Comprobar que CALLI permanece utilizable, conserva los campos y no muestra una confirmación falsa de postulación enviada.
5. Verificar en el WhatsApp destinatario que no llegó el mensaje «PRUEBA DE CANCELACIÓN - NO ENVIAR».

El borrador puede permanecer en WhatsApp sin que eso implique envío. Esta prueba cubre el regreso inmediato desde WhatsApp; no evalúa cierre forzado de CALLI ni persistencia después de reiniciar la aplicación.

### Resultado de C08

El usuario confirmó que al regresar el formulario conserva los datos. Después confirmó que el mensaje no llegó al destino. Quedan comprobados por el usuario el regreso con conservación del formulario y la ausencia de envío. No se confirmó por separado la ausencia de una confirmación falsa en pantalla.

## Decimosexta prueba: C09a

1. Con internet, abrir CALLI y esperar a que cargue.
2. Desactivar Wi-Fi y datos móviles sin cerrar ni recargar la app.
3. Abrir Servicios, seleccionar Todos y buscar «plomería».
4. Comprobar que se muestran los resultados e imágenes y que se puede abrir la tarjeta Plomería y fontanería.
5. Cerrar la ventana del servicio y volver a Inicio.
6. Informar si funcionó la navegación y si hubo errores, bloqueos o contenido ausente. Reactivar la conexión al terminar.

No enviar mensajes ni realizar llamadas en este escenario. Esta prueba solo evalúa contenido local con la aplicación previamente cargada; no acredita arranque sin internet. Confirmar además si se usa Expo Go o un APK instalado para contextualizar el resultado.

### Resultado y contexto de C09a

El usuario pudo navegar sin conexión, pero informó que las imágenes no cargaban. Posteriormente confirmó que utiliza Expo Go.

Las imágenes de Servicios están referenciadas como assets locales mediante `require`. Según la documentación de Expo, los assets locales se sirven por HTTP durante el desarrollo y se incluyen en el binario al compilar para producción. Por ello, perder acceso al servidor de desarrollo es una explicación probable del resultado; no constituye por sí solo evidencia de un defecto de la release ni permite aprobar el funcionamiento sin conexión.

Fuente: [Expo — Assets](https://docs.expo.dev/develop/user-interface/assets/).

Siguiente comprobación: restablecer la conexión usada con Expo Go, volver al mismo servicio y comprobar si las imágenes cargan; recargar el proyecto si es necesario. Posteriormente repetir navegación y arranque sin conexión en un APK release independiente de Metro. No se modificó código ni se inició una compilación por este hallazgo.

### Recuperación de imágenes confirmada

El usuario confirmó que al restablecer la conexión las imágenes vuelven a cargar correctamente. Esto es consistente con la dependencia del servidor de desarrollo en Expo Go. El funcionamiento offline del APK release sigue pendiente; no se da por aprobado por esta recuperación.

## Decimoséptima prueba: C11

1. Con conexión activa, abrir Servicios y seleccionar Todos.
2. Escribir «zzzz9999» en el buscador.
3. Comprobar que no aparecen tarjetas ni sugerencias y que se muestra «No se encontraron servicios con esa búsqueda.».
4. Borrar la búsqueda con la X del buscador.
5. Comprobar que reaparecen las tarjetas y que se puede abrir una de ellas.

Esta prueba verifica el estado sin coincidencias y la recuperación del catálogo al limpiar la búsqueda.

### Resultado de C11

El usuario confirmó primero el aviso «No se encontraron servicios con esa búsqueda.» y después que las tarjetas reaparecen y puede abrir una de ellas. C11 aprobada según sus confirmaciones.

## Decimoctava prueba: C12

1. En Servicios, abrir la tarjeta de un servicio para mostrar la ventana de contacto.
2. Sin pulsar Llamar ni WhatsApp, usar Atrás del sistema Android (botón o gesto).
3. Comprobar que se cierra solo la ventana y se permanece en Servicios, sin salir de CALLI ni abrir otra aplicación.
4. Abrir otra tarjeta y comprobar que la ventana muestra el servicio recién elegido.

No usar la X de la ventana en esta prueba: se comprueba el manejo de Atrás del sistema. Si el dispositivo no es Android, registrar la plataforma y adaptar el escenario antes de evaluarlo.

### Resultado de C12

El usuario confirmó que Atrás cierra la ventana emergente de contacto. Al abrir otra tarjeta, confirmó que muestra el nombre del servicio y los botones de llamada y WhatsApp. C12 aprobada según sus confirmaciones.

## Decimonovena prueba: G01

1. Con conexión activa en Expo Go, abrir la pestaña Galería.
2. Tocar una foto de la cuadrícula Recientes.
3. Comprobar que abre la vista previa y que la foto corresponde a la seleccionada.
4. Usar el botón o gesto Atrás de Android.
5. Comprobar que se cierra la vista previa y se permanece en Galería.

Esta prueba no acredita aún filtros de galería, cierre con X ni cierre al tocar fuera; esos casos se registrarán por separado si se realizan.

### Resultado de G01

El usuario confirmó que la vista se abrió correctamente y que al usar Atrás se cierra correctamente. G01 aprobada según su confirmación del escenario solicitado.

## Vigésima prueba: G02

1. En Galería, tocar la categoría Remodelación del carrusel superior.
2. Comprobar que la categoría se marca, el título de la cuadrícula cambia a Remodelación y se muestran sus siete fotos.
3. Pulsar Ver recientes.
4. Comprobar que el título vuelve a Recientes, se desmarca la categoría y reaparece la cuadrícula completa.

Esta prueba cubre Remodelación y el restablecimiento del filtro. No se dan por probadas las demás categorías ni la clasificación real de las fotografías.

### Resultado de G02

El usuario confirmó que el título cambia y aparecen siete fotos al elegir Remodelación. Después confirmó que al pulsar Ver recientes vuelve a la página de Recientes. Quedan comprobados el filtro de Remodelación y el retorno; no se contó por separado el catálogo completo tras restablecerlo.

## Vigesimoprimera prueba: G03

1. En Galería, abrir una foto y pulsar la X de la ventana de vista previa.
2. Comprobar que se cierra la ventana y se permanece en Galería.
3. Abrir de nuevo una foto y tocar el fondo oscuro exterior a la tarjeta, sin tocar la propia foto ni la X.
4. Comprobar que también se cierra la ventana y que la galería sigue respondiendo.

Registrar por separado el resultado de la X y del toque en el fondo exterior. El cierre con Atrás ya fue confirmado en G01.

### Resultado de G03

El usuario confirmó que la vista previa se cierra correctamente tanto con la X como al tocar el fondo exterior. G03 aprobada según su confirmación del escenario solicitado.

## Vigesimosegunda prueba: U01

1. Con conexión activa, abrir Trabaja con nosotros.
2. Tocar Mensaje y escribir «Prueba de teclado».
3. Mantener el teclado abierto e intentar desplazar el formulario para ver el texto y alcanzar el botón Enviar Postulación.
4. Ocultar el teclado usando Atrás y comprobar que el formulario sigue respondiendo y conserva el texto.

No hace falta enviar una postulación en este escenario. Informar si el teclado tapa contenido o impide alcanzar el botón incluso desplazando el formulario. Si ocurre, registrar dispositivo y versión de Android para reproducir el problema antes de proponer una corrección.

### Incidencia U01 — botón oculto por el teclado

El usuario informó que con el teclado abierto puede desplazar el formulario, pero el botón de envío a WhatsApp permanece tapado. Resultado: fallida en el entorno actual de Expo Go. Modelo de dispositivo y versión del sistema pendientes.

La pantalla utiliza ScrollView sin un contenedor que adapte explícitamente su espacio al teclado. Propuesta: ajustar el área disponible y el espacio de desplazamiento al abrir el teclado para que sea posible alcanzar el botón; restaurar la distribución al cerrarlo y conservar los valores de los campos.

El usuario autorizó aplicar la corrección. Se envolvió el formulario en KeyboardAvoidingView (altura en Android, padding en iOS), se limitó el contenedor y el ScrollView al espacio disponible mediante flex y se añadió un margen inferior desplazable de 24 puntos. Se conserva keyboardShouldPersistTaps="handled" para que el botón pueda recibir toques con el teclado abierto. No se cambiaron los campos, sus valores ni la lógica de envío.

Referencia técnica: [React Native — KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview).

Pendiente repetir U01 en Expo Go: abrir el teclado en Mensaje, desplazar hasta Enviar Postulación, comprobar que sea visible y ocultar el teclado para verificar que se conserva el texto y se recupera la distribución. Posteriormente repetir en una release instalada. La corrección no se considera validada visualmente hasta recibir el resultado del usuario.

### Resultado de la repetición de U01

El usuario confirmó que puede ver y alcanzar el botón con el teclado abierto y que al cerrar el teclado se conserva el texto. La corrección queda validada en su entorno de Expo Go. TypeScript y ESLint pasaron tras el cambio. La comprobación en una release instalada sigue pendiente.

## Vigesimotercera prueba: U02

1. En Trabaja con nosotros, completar Nombre, Dirección y Mensaje con datos ficticios y dejar únicamente Teléfono vacío.
2. Tocar Mensaje para mantener el teclado abierto.
3. Desplazar hasta Enviar Postulación y pulsarlo una sola vez, sin ocultar previamente el teclado.
4. Comprobar que aparece «Completa el campo Teléfono para continuar.» con ese primer toque y que no se abre WhatsApp.

Esta prueba verifica que el botón recibe el toque con el teclado abierto después del ajuste de distribución, además de conservar el bloqueo por datos pendientes.

### Resultado de U02

El usuario confirmó que el mensaje para completar Teléfono aparece al primer toque. Queda comprobada la respuesta del botón con el teclado abierto después del ajuste. No informó por separado sobre apertura de WhatsApp.

## Vigesimocuarta prueba: U03

1. Anotar el tamaño de texto actual del teléfono para poder restaurarlo.
2. En los ajustes del teléfono, aumentar el tamaño de fuente del sistema uno o dos niveles.
3. Volver a CALLI y abrir Trabaja con nosotros.
4. Comprobar que las etiquetas, campos y el texto del botón Enviar Postulación se leen sin recortarse ni superponerse y que se puede llegar al botón desplazando el formulario.
5. Restaurar el tamaño original después de la prueba.

Registrar cualquier elemento cortado o inaccesible. Esta comprobación no sustituye pruebas con lector de pantalla ni con otras dimensiones de dispositivo.

### Resultado de U03

El usuario confirmó que con el texto aumentado todo sigue legible y el botón es accesible. U03 aprobada según su confirmación en el dispositivo actual; no se extrapola a otros tamaños o plataformas.

## Siguiente etapa propuesta: APK de pruebas

Se generó el APK con el perfil preview de EAS, configurado para distribución interna y formato APK, manteniendo el número temporal **+52 231 226 2218**. Build EAS: `d195f8cf-cd8d-470b-a135-e9547b1887f1` (finalizado correctamente el 17/09/2026). Artefacto: https://expo.dev/artifacts/eas/3MaYdbAx_79WvDzUzj0fnlL50AXXPau8OTIhyDcV7Po.apk

Una vez instalado, comprobar instalación/arranque, consulta e imágenes sin conexión sin depender de Expo Go, teclado y flujos principales de contacto. Registrar modelo del teléfono y versión de Android, todavía pendientes.

La ronda actual confirma únicamente los escenarios y observaciones registrados en Expo Go. Persisten, entre otros, la comprobación de fallos al abrir aplicaciones externas (C09b), redes reales (C10), validación del formato del teléfono, política de privacidad, materiales de tienda y verificaciones del AAB de producción.

## Prueba APK-01: instalación y arranque

### Resultado de APK-01

El usuario confirmó que el APK se instaló correctamente y que al abrirlo todo el contenido se visualiza de manera correcta. Queda aprobada esta prueba en el dispositivo utilizado; el modelo y la versión de Android aún no fueron informados.

## Prueba APK-02: funcionamiento sin conexión

### Resultado de APK-02

El usuario confirmó que la aplicación respondió bien a la navegación y que los componentes aparecieron correctamente aun sin conexión. Queda aprobada esta prueba en el dispositivo utilizado.

## Prueba APK-03: contacto desde el APK

### Resultado de APK-03

El usuario confirmó que los botones de llamada y WhatsApp funcionan correctamente desde el APK. Queda aprobada esta prueba en el dispositivo utilizado.

## Prueba APK-04: servicios y galería

### Resultado de APK-04

El usuario confirmó que los servicios, tarjetas, galería, fotografías y cierres de vista previa funcionaron correctamente desde el APK. Queda aprobada esta prueba en el dispositivo utilizado.

## Prueba APK-05: formulario de postulación y teclado

### Resultado de APK-05

El usuario confirmó que las validaciones de campos, detección de espacios, funcionamiento con el teclado abierto, accesibilidad del botón y envío completo por WhatsApp funcionan correctamente desde el APK. Queda aprobada esta prueba en el dispositivo utilizado.

## Prueba APK-06: regreso desde WhatsApp y cancelación

### Resultado de APK-06

El usuario confirmó que el formulario conserva los textos al regresar desde WhatsApp, que no se envía ningún mensaje al cancelar y que el envío posterior llega completo. Queda aprobada esta prueba en el dispositivo utilizado.

## Prueba APK-07: tamaño de texto y accesibilidad

### Resultado de APK-07

El usuario confirmó que con el tamaño de texto aumentado todo se ve legible y correcto. Queda aprobada esta prueba en el dispositivo utilizado.

### Estado de la ronda APK

APK-01 a APK-07 aprobadas según las comprobaciones realizadas por el usuario. Para cerrar el registro del dispositivo todavía conviene anotar modelo y versión de Android.

## Etapa 1 — Pruebas manuales en Expo Go

Fecha de registro: 22 de octubre de 2026.

Rama: `etapa1/ajustes-funcionales`, commits `0f45eb5` (ciudad o municipio y oficio), `175680a` (redes sociales y video ocultos), `a97b802` (consentimiento y aviso de privacidad) y `16d8f10` (avisos al fallar la apertura de llamadas, WhatsApp o enlaces).

Modalidad: Expo Go en un teléfono Android real, con el número de pruebas. Modelo del teléfono y versión de Android pendientes de informar. Los resultados son los confirmados por el usuario; las verificaciones de TypeScript y ESLint no cuentan como pruebas en dispositivo.

La ronda APK-01 a APK-07 se hizo con un APK del 17/09/2026, anterior a estos cambios, por lo que no los cubre.

| ID | Prueba | Estado |
|---|---|---|
| E1-01 | Trabaja: orden de campos (Nombre, Ciudad o municipio, Teléfono, Oficio, Mensaje) y ausencia de Dirección | Aprobada por el usuario |
| E1-02 | Trabaja: aviso con solo Oficio vacío; no abre WhatsApp | Aprobada por el usuario |
| E1-03 | Trabaja: aviso con Ciudad y Oficio vacíos | Aprobada por el usuario |
| E1-04 | Trabaja: Oficio, casillas y botón alcanzables con el teclado abierto | Aprobada por el usuario |
| E1-05 | Inicio: sin recuadro de video ni hueco en «¿Quiénes somos?» | Aprobada por el usuario |
| E1-06 | Inicio: Acciones Rápidas con dos tarjetas y sin «Visita nuestras redes» | Aprobada por el usuario |
| E1-07 | Inicio: las dos tarjetas navegan a Contáctanos y Galería | Aprobada por el usuario |
| E1-08 | Contáctanos: sin sección «Nuestras redes» | Aprobada por el usuario |
| E1-09 | Trabaja: recuadro «Cómo usamos tus datos» con WhatsApp, seis meses, derechos ARCO y correo | Aprobada por el usuario |
| E1-10 | Trabaja: sin casilla obligatoria aparece «Falta tu autorización»; no abre WhatsApp | Aprobada por el usuario |
| E1-11 | Trabaja: las casillas se marcan y desmarcan desde el cuadro y desde el texto | Aprobada por el usuario |
| E1-12 | Trabaja: mensaje con los cinco campos y «Acepta contacto por oportunidades futuras: No» | Aprobada por el usuario |
| E1-13 | Trabaja: datos conservados al regresar; con la opcional marcada el mensaje indica «Sí» | Aprobada por el usuario |
| E1-14 | Inicio: Llamar y WhatsApp | Aprobada por el usuario |
| E1-15 | Inicio: WhatsApp desde una tarjeta de servicio incluye el servicio | Aprobada por el usuario |
| E1-16 | Servicios: búsqueda «plomería», WhatsApp y Llamar desde la tarjeta | Aprobada por el usuario |
| E1-17 | Contáctanos: Llamar y WhatsApp | Aprobada por el usuario |
| E1-18 | Aviso «No se pudo abrir el marcador» en un dispositivo sin llamadas | **No ejecutada** |

Resumen: 18 casos; 17 aprobados, 0 fallidos y 1 no ejecutado.

### E1-18 — no ejecutada

No se contó con un dispositivo donde se pudiera reproducir el fallo del marcador, como una tablet sin línea o un teléfono sin SIM. No se registra como aprobada ni como fallida. El aviso solo está verificado por revisión de código; su comportamiento en un dispositivo real sigue pendiente, igual que C09b.

### Pendientes después de esta ronda

- E1-18 y C09b: fallos al abrir aplicaciones externas.
- Repetir los flujos de la Etapa 1 en una compilación de distribución (APK o AAB) generada con estos commits; Expo Go no la sustituye.
- C10: redes sociales, cuando existan enlaces reales.
- Modelo del teléfono y versión de Android usados en las pruebas.
