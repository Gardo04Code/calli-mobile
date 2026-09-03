# Auditoría del código actual — CALLI Mobile

> **Alcance:** exclusivamente la **calidad técnica del código que ya existe** en el repositorio.
> No se evalúa completitud funcional, funcionalidades futuras, backend, ni preparación para publicación.
> Una funcionalidad aún no desarrollada **no baja la puntuación**.
> Fecha: 2026-08-28 · Rol: revisión de código · **No se modificó ningún archivo.**

Pregunta que responde este documento:

> Si congeláramos hoy el alcance funcional de CALLI y analizáramos solo el código ya escrito, ¿está bien desarrollado, organizado, es legible y usa correctamente React Native, Expo, TypeScript y expo-router?

---

## 1. Resumen ejecutivo

El código existente es **funcionalmente correcto en su mayor parte y técnicamente limpio en lo básico**: `tsc --noEmit` y `expo lint` pasan sin un solo aviso, no hay `any`, no hay `console.*`, no hay `@ts-ignore`, no hay código comentado abandonado, y el modelo de dominio de la pantalla de Servicios está bien tipado. La lógica que está implementada (filtro + buscador de Servicios, gestión de los dos modales, navegación entre pestañas) está **bien construida** y no necesita cambios de comportamiento.

Los problemas reales son de **organización y duplicación**, no de corrección:

1. **`styles/homeStyles.ts` es un archivo único de 1025 líneas** que concentra los estilos de las 5 pantallas y los 2 modales. Cada pantalla lo importa entero. Es el punto más débil del proyecto.
2. **`app/(tabs)/index.tsx` (476 líneas)** repite **20 bloques `<ImageBackground>` casi idénticos** a mano, y esos mismos datos ya existen como un array tipado en `servicios.tsx`. La misma información vive dos veces, en dos formatos incompatibles.
3. **Duplicación transversal:** el header "CALLI" está copiado literalmente en las 5 pantallas; `handleCall`/`handleWhatsApp` están duplicados en `index.tsx` y `contactanos.tsx`; el patrón de modal-tarjeta está implementado dos veces con estilos gemelos.
4. **Bug real:** las llamadas existentes a `Linking.openURL(...)` no capturan el rechazo de la promesa.
5. **Bug real (visual):** 7 `require` de imágenes de servicio apuntan hoy a un asset semánticamente incorrecto (parche previo por archivos ausentes), y afecta a Servicios e Inicio.
6. **Rendimiento:** imágenes de 1–2 MB renderizadas en miniaturas; `Logo.png` (1.09 MB) se decodifica en cada header.
7. **Restos de plantilla `create-expo-app`** (`components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js`) sin una sola referencia desde `app/`.

Ninguno de estos puntos requiere rediseñar nada ni cambiar comportamiento. Son **refactor, cleanup y consolidación** sobre código que ya funciona.

---

## 2. Puntuación (solo código existente)

```txt
Calidad general del código: 6/10

Arquitectura:        5/10
Legibilidad:         7/10
Mantenibilidad:      5/10
React Native:        6/10
TypeScript:          8/10
Navegación:          7/10
Estilos:             4/10
Rendimiento:         5/10
```

| Dimensión | Nota | Por qué |
|---|---|---|
| **Arquitectura** | 5/10 | Pantallas bien separadas por archivo y routing declarativo limpio; pero estilos monolíticos, sin componentes compartidos, datos duplicados y plantilla sin podar. |
| **Legibilidad** | 7/10 | Nombres claros (`activeCategory`, `filteredServices`, `handleWhatsApp`, `servicesMiniCard`), comentarios de sección útiles, formato consistente. Baja por el muro de 20 bloques repetidos en `index.tsx` y la sangría distinta en `trabaja.tsx`/`contactanos.tsx`. |
| **Mantenibilidad** | 5/10 | Duplicación en 4 ejes (header, modal, funciones de contacto, catálogo), archivo de estilos de 1025 líneas, literales de color/sombra repetidos. `tsc`/`lint` limpios ayudan. |
| **React Native** | 6/10 | `useState`, `Modal` (con `onRequestClose`), `Pressable` con corte de propagación y `key` correctas donde importa; sin efectos ni listeners que gestionar mal. Baja por promesas de `Linking` sin `catch`, `router.push` a pestañas, imágenes pesadas y 20 `ImageBackground` montados a la vez. |
| **TypeScript** | 8/10 | `strict: true`, sin `any`, uniones literales para `Category`, `Service` tipado, `useState` genérico. Margen: activar algunas flags extra. |
| **Navegación** | 7/10 | 5 pestañas ↔ 5 archivos, sin duplicados, rutas tipadas. Baja por `router.push` (en vez de `navigate`) hacia pestañas y `title` redundante junto a `tabBarLabel`. |
| **Estilos** | 4/10 | Un solo archivo para todo, ~6 estilos muertos, colores y sombras repetidos como literales, dimensiones rígidas, `isSmallScreen` congelado al cargar el módulo. La nomenclatura de las claves sí es razonable. |
| **Rendimiento** | 5/10 | Sin bucles de render ni cómputo síncrono pesado; pero assets de 1–2 MB en miniaturas, `Logo.png` de 1.09 MB por header y 20 `ImageBackground` simultáneos en Inicio. |

> No se puntúa completitud funcional ni preparación para producción, por diseño de esta auditoría.

---

## 3. Lo que está bien

Código ya implementado que **no necesita cambios de comportamiento** y está correctamente hecho:

- **Filtro + buscador de Servicios** (`servicios.tsx` l. 216-226). `matchesCategory` (`"Todos"` o igualdad exacta) `&&` `matchesSearch` (`includes` insensible a mayúsculas sobre título + descripción + categoría). Legible, correcto y sin casos borde rotos. El título de sección derivado (`"Servicios destacados"` vs `` `Servicios de ${activeCategory}` ``) y el estado vacío (`noServicesBox`) están bien resueltos.
- **Tipado de dominio** (`servicios.tsx` l. 14-28): `type Category` como unión literal de 6 valores, `type Service` con `image: ImageSourcePropType`, `categories` tipado, `useState<Category>("Todos")`, `useState<ImageSourcePropType | null>(null)`. Uso ejemplar de TypeScript para lo que hay.
- **Gestión de los dos modales** (`galeria.tsx` l. 109-139, `index.tsx` modal de redes): `transparent`, `animationType="fade"`, **`onRequestClose`** (botón atrás de Android cubierto), visibilidad dirigida por estado, overlay `Pressable` + `Pressable` interior con `onPress={() => {}}` para frenar la propagación. Es el patrón correcto.
- **Renderizado de listas**: `categories.map` con `key={category.name}`, `services.map` con `key={service.id}`, composición de estilos por estado con `[base, isActive && activo]`. Correcto.
- **`galeria.tsx`**: `recentImages` como array a nivel de módulo recorrido con `.map()` en vez de 6 bloques a mano. Es justo el patrón que le falta a `index.tsx`.
- **`_layout.tsx`**: estructura de pestañas declarativa y fácil de leer; sin rutas duplicadas.
- **Higiene general**: sin `any`, sin `console.*`, sin `@ts-ignore`, sin `TODO`/`FIXME`, sin código comentado muerto en `app/`. `tsc --noEmit` y `expo lint` **limpios**. `expo install --check` → dependencias alineadas.
- **`tsconfig.json`**: extiende `expo/tsconfig.base`, `strict: true`, alias `@/*`.
- **`contactanos.tsx`**: componente pequeño y enfocado (80 líneas).
- **Comentarios de sección** (`{/* HEADER */}`, `{/* CATEGORÍAS */}`, bloques `/* ===== */` en los estilos) que facilitan navegar los archivos largos.
- **`filteredServices` recalculado en cada render**: a 20 elementos el coste es imperceptible; **no** hace falta `useMemo`. Se menciona explícitamente para que no se "optimice" sin motivo.

---

## 4. Bugs reales

Comportamiento incorrecto de código **ya implementado**.

---

### BUG-1 — `Linking.openURL` sin manejo de error · Severidad: ALTA

**Tipo:** BUG
**Archivos:**
- `app/(tabs)/index.tsx` — `handleCall` (l. 32-34), `handleWhatsApp` (l. 36-42), `openSocialLink` (l. 28-30) usado en l. 436, 448, 460
- `app/(tabs)/contactanos.tsx` — `handleCall` (l. 16-18), `handleWhatsApp` (l. 20-26)

**Descripción:**
```tsx
const handleCall = () => {
  Linking.openURL(`tel:${PHONE_NUMBER}`);   // promesa sin await, sin .catch
};
```
`Linking.openURL` devuelve una `Promise` que **se rechaza** cuando no hay aplicación capaz de abrir el esquema (emulador sin marcador, dispositivo sin WhatsApp, sin navegador). Al no haber `catch` ni `try/await`, se produce un *unhandled promise rejection*.

**Cómo se reproduce:**
1. Emulador Android sin WhatsApp instalado.
2. Inicio o Contáctanos → botón **WhatsApp**.
3. En desarrollo: `Possible Unhandled Promise Rejection` (pantalla amarilla/roja). En release: el botón "no hace nada" sin ningún aviso.

**Causa:** no se comprueba `Linking.canOpenURL` ni se envuelve la llamada.

**Cómo consolidar:** una utilidad `openExternal(url, mensajeFallback)` con `canOpenURL` + `try/catch` + `Alert`, reutilizada en las 5 llamadas actuales (Inicio ×3, Contáctanos ×2). Elimina además la duplicación descrita en DUP-3.

---

### BUG-2 — 7 `require` de imágenes de servicio apuntan a un asset incorrecto · Severidad: ALTA (visual)

**Tipo:** BUG
**Archivos:** `app/(tabs)/servicios.tsx` (array `services`, l. 67-209) y `app/(tabs)/index.tsx` (grid, l. 120-346)

**Descripción:**
El código actual referencia, para 7 servicios, un archivo distinto al que corresponde por contenido (parche aplicado previamente porque los originales no existen — ver §16):

| Servicio | `require` actual | Imagen mostrada |
|---|---|---|
| Remodelaciones | `Servicio1.jpg` | construcción |
| Croquis para escrituración | `Servicio3.jpg` | planos |
| Herrería y balconería | `Servicio11.jpg` | albañilería |
| Impermeabilización | `Servicio12.jpg` | plomería |
| Aluminio y vidriería | `Servicio13.jpg` | electricidad |
| Jardinería y limpieza | `Servicio6.jpg` | topográfico |
| Carpintería | `Servicio14.jpg` | pintura |

El mismo mapeo incorrecto está replicado en el grid de `index.tsx` (agravado por DUP-1).

**Cómo se reproduce:** Servicios → categoría **Mantenimiento** → "Carpintería" muestra la foto de "Servicio de pintura". Ídem en Inicio → grid, tarjetas 16-20.

**Causa:** referencia a asset incorrecta introducida como solución temporal.

**Cómo consolidar:** cuando existan los archivos correctos, restaurar los `require` a su nombre real. Si se aplica REF-1 (catálogo único), la corrección se hace **una sola vez** en lugar de dos.
La **ausencia** de `Servicio2/8/16/17/18/19/20.jpg` es *pendiente de contenido* (§16), no un bug de programación; el bug es que el código vigente muestra una imagen que no corresponde.

---

### BUG-3 — `router.push` hacia pestañas puede apilar instancias duplicadas · Severidad: MEDIA

**Tipo:** BUG / React Native
**Archivo:** `app/(tabs)/index.tsx` l. 365 (`router.push("/contactanos")`), l. 379 (`router.push("/galeria")`)

**Descripción:**
"Contáctanos" y "Galería" son **pestañas**. `router.push` **apila** una nueva instancia de esa ruta encima de la pila actual en vez de cambiar de pestaña. Resultado: se monta una segunda copia de la pantalla de la pestaña, el indicador de pestaña activa puede no reflejar dónde está el usuario, y el gesto/botón atrás produce una transición que el usuario no espera (vuelve a Inicio "por encima" en lugar de simplemente estar en la pestaña).

**Cómo se reproduce:**
1. Inicio → "Mira Nuestros Proyectos".
2. Se abre Galería como pantalla apilada; la barra inferior puede seguir marcando "Inicio".
3. Atrás → vuelve a Inicio; ahora hay una instancia de Galería en el historial.

**Causa:** uso de `push` (apilar) cuando la intención es "ir a la pestaña".

**Cómo consolidar:** `router.navigate("/galeria")` / `router.navigate("/contactanos")` (navega a la ruta existente sin apilar duplicados). Cambio de una palabra por línea.

---

## 5. Arquitectura

### Fortalezas

- **Una pantalla por archivo** bajo `app/(tabs)/`, más `app/index.tsx` como redirect. Límites claros.
- **Routing declarativo** en un único `_layout.tsx`; rutas tipadas activas (`typedRoutes`).
- **`galeria.tsx`** ya demuestra el patrón deseable: datos en un array, vista con `.map()`.

### Problemas

| Problema | Tipo | Sev. | Evidencia |
|---|---|---|---|
| `styles/homeStyles.ts` concentra los estilos de las 5 pantallas + 2 modales en 1025 líneas; todas las pantallas lo importan completo | DEUDA TÉCNICA | ALTA | `styles/homeStyles.ts` (1 archivo, `import styles from "../../styles/homeStyles"` en las 5 pantallas) |
| `app/(tabs)/index.tsx` = 476 líneas; 20 `<ImageBackground>` escritos a mano (l. 120-346) que solo cambian imagen y texto | DEUDA TÉCNICA / REFACTOR | ALTA | `index.tsx` l. 120-346 |
| El catálogo de 20 servicios existe **dos veces**: array tipado en `servicios.tsx` (l. 67-209) y 20 bloques JSX en `index.tsx` | DUPLICACIÓN (datos) | ALTA | ver DUP-1 |
| No hay componentes compartidos: header, tarjeta de servicio y modal-tarjeta se reescriben en cada pantalla | REFACTOR | MEDIA | ver DUP-2, DUP-4 |
| Sin carpeta de constantes: colores, textos de contacto y categorías viven como literales dentro de las pantallas/estilos | DEUDA TÉCNICA | MEDIA | ver DUP-5 |
| Restos de `create-expo-app` sin usar (`components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js`) | CLEANUP | MEDIA | §14 |

### ¿Se puede organizar mejor sin tocar funcionalidad? Sí.

Reorganización mínima, todo mecánico y sin cambiar comportamiento:

```txt
components/
  AppHeader.tsx        ← el header CALLI que hoy está copiado ×5
  SheetModal.tsx       ← overlay + tarjeta + botón X (hoy duplicado: galería y redes)
  ServiceCard.tsx      ← la tarjeta de servicio (hoy repetida en Servicios e Inicio)
constants/
  services.ts          ← el array Service[] como única fuente
  contact.ts           ← PHONE / WHATSAPP / SOCIAL
  colors.ts            ← #0A1F44, #0f1f3d, #ff3b3b, #25D366, #f5f5f5, #666…
types/
  service.ts           ← Category, Service (hoy en servicios.tsx)
styles/
  <un archivo por pantalla/componente, en lugar del monolito>
```

No hace falta `hooks/`, `services/`, `utils/` más allá de un `utils/linking.ts` para BUG-1. Nada de capas adicionales para el tamaño real del proyecto.

---

## 6. Legibilidad y mantenibilidad

**A favor:**
- Nombres descriptivos y consistentes: `activeCategory`, `setActiveCategory`, `filteredServices`, `searchText`, `handleCall`, `handleWhatsApp`, `closePopup`, `openSocialLink`, `servicesMiniCardActive`.
- Comentarios de sección en JSX y en el `StyleSheet` que sirven de índice.
- Funciones cortas y de una sola responsabilidad donde existen (`closePopup`, `handleCall`).
- `servicios.tsx` separa razonablemente datos (arrays), lógica (`filter`) y vista.

**En contra:**

| Hallazgo | Tipo | Sev. | Evidencia |
|---|---|---|---|
| `index.tsx` es un componente de 476 líneas con un `return` gigante y 20 bloques repetidos; cuesta localizar nada | DEUDA TÉCNICA | ALTA | `app/(tabs)/index.tsx` |
| Sangría de imports a 4 espacios y estilo distinto al resto del proyecto | CLEANUP | BAJA | `trabaja.tsx` l. 3-14, `contactanos.tsx` l. 2-9 |
| `import React from "react"` sin uso (nuevo JSX transform) | CLEANUP | BAJA | `trabaja.tsx` l. 1 |
| Colores como literales hex repetidos por todo el código en vez de constantes con nombre | DEUDA TÉCNICA | MEDIA | `#0A1F44` ~30 apariciones en `homeStyles.ts` + JSX |
| Bloques de sombra (`shadowColor/Opacity/Radius/Offset` + `elevation`) repetidos ~15 veces con variaciones mínimas | DEUDA TÉCNICA | BAJA | `homeStyles.ts` (`section`, `contactSection`, `contactButton`, `serviceGridCard`, `card`, `socialModalCard`, `servicesMiniCard`, …) |
| `title` + `tabBarLabel` personalizado a la vez; `title` no aporta con `headerShown: false` | CLEANUP | BAJA | `_layout.tsx` l. 73/74, 98/99 |

---

## 7. Duplicación

---

### DUP-1 — Catálogo de servicios expresado dos veces · Severidad: ALTA

**Dónde:**
- `app/(tabs)/servicios.tsx` l. 67-209: `const services: Service[]` (20 objetos: `id`, `title`, `description`, `category`, `image`).
- `app/(tabs)/index.tsx` l. 120-346: 20 `<ImageBackground>` a mano con el título y la imagen embebidos en el JSX.

**Por qué es deuda técnica:** cualquier cambio de catálogo (texto, imagen, orden, alta/baja de un servicio) hay que hacerlo **en dos sitios y en dos formatos distintos**. Ya divergen: tras el parche de BUG-2, las imágenes coinciden por casualidad, pero los textos de Inicio ("Servicios de plomería en general y fontanería") y de Servicios ("Plomería y fontanería") **no** son iguales.

**Cómo consolidar:** `constants/services.ts` con el array como única fuente; `index.tsx` recorre un subconjunto con `.map()` (como ya hace `galeria.tsx` con `recentImages`); Servicios lo consume tal cual.

**¿Vale la pena?** Sí. Elimina 20 bloques JSX, evita divergencias y hace que BUG-2 se arregle una vez.

---

### DUP-2 — Header "CALLI" copiado en las 5 pantallas · Severidad: MEDIA

**Dónde:** `index.tsx` l. 48-57, `servicios.tsx` l. 235-244, `galeria.tsx` l. 36-45, `trabaja.tsx` l. 20-29, `contactanos.tsx` l. 30-39. Bloque idéntico:
```tsx
<View style={styles.header}>
  <View style={styles.logoContainer}>
    <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />
    <Text style={styles.logoText}>CALLI</Text>
  </View>
</View>
```

**Por qué es deuda técnica:** 5 copias del mismo markup + 5 `require` del mismo asset. Un cambio en el header (p. ej. añadir safe-area, ver RESP-1) obliga a tocar 5 archivos.

**Cómo consolidar:** `components/AppHeader.tsx`. Sustitución mecánica.

**¿Vale la pena?** Sí; es la duplicación más barata de eliminar y con más retorno.

---

### DUP-3 — `handleCall` / `handleWhatsApp` duplicados · Severidad: MEDIA

**Dónde:** `index.tsx` l. 32-42 y `contactanos.tsx` l. 16-26. Cuerpo prácticamente idéntico, incluyendo el mensaje de WhatsApp.

**Por qué es deuda técnica:** dos implementaciones del mismo comportamiento; al arreglar BUG-1 habría que arreglarlo en ambas.

**Cómo consolidar:** `utils/linking.ts` (`openExternal`) + `constants/contact.ts`. Mismo movimiento que resuelve BUG-1.

**¿Vale la pena?** Sí, y además es requisito natural para BUG-1.

---

### DUP-4 — Patrón de modal-tarjeta implementado dos veces · Severidad: MEDIA

**Dónde:**
- `galeria.tsx` l. 109-139 + estilos `galleryModalOverlay/Card/Header/Title/CloseButton/ImageContainer/Image` (`homeStyles.ts` l. 661-733).
- `index.tsx` modal de redes + estilos `socialModalOverlay/Card/Header/Title/CloseButton/…` (`homeStyles.ts` l. 358-462).

Ambos: overlay `Pressable` a pantalla completa + tarjeta centrada `Pressable` + cabecera con título y botón X circular. Los estilos son casi carbón: mismos radios, mismos colores (`#F4F6FA`, `#FFFFFF`, `#EEF1F6`, `#0A1F44`), misma sombra.

**Por qué es deuda técnica:** ~20 claves de estilo casi gemelas y dos JSX equivalentes. Divergen en detalles (`galleryModalOverlay` opacidad `0.94` vs `socialModalOverlay` `0.92`) probablemente por copia-pega, no por decisión.

**Cómo consolidar:** `components/SheetModal.tsx` con props `visible`, `title`, `onClose`, `children`. Las dos pantallas pasan su contenido.

**¿Vale la pena?** Sí, aunque tiene algo más de trabajo que DUP-2/DUP-3.

---

### DUP-5 — Literales de color repetidos · Severidad: MEDIA

**Dónde:** `#0A1F44` (~30×), `#0f1f3d`, `#ff3b3b`, `#fff`/`#FFFFFF`, `#f5f5f5`, `#666`, `#25D366`, `#EEF1F6`, `#F4F6FA` repartidos entre `homeStyles.ts`, `_layout.tsx` y JSX inline.

**Por qué es deuda técnica:** un ajuste de marca obliga a un buscar-y-reemplazar frágil; hay riesgo de inconsistencias (`#fff` vs `#FFFFFF`, `#0A1F44` vs `#0f1f3d` usados casi como sinónimos).

**Cómo consolidar:** `constants/colors.ts` y referenciar. **Sin cambiar ningún valor** — solo darles nombre.

**¿Vale la pena?** Sí, es de bajo riesgo y mejora la coherencia.

---

## 8. React Native

**Correcto en el código actual:**
- `useState` para todo el estado real (`activeCategory`, `searchText`, `selectedImage`, `socialModalVisible`); nada de estado derivable guardado por error.
- **Sin `useEffect`, sin listeners, sin timers, sin suscripciones** → no hay *cleanup* pendiente ni riesgo de *memory leak* en el código existente.
- `Modal` con `transparent` + `onRequestClose` (botón atrás Android) en las dos apariciones.
- `Pressable` overlay + `Pressable` interior con `onPress={() => {}}` para frenar la propagación: patrón correcto para "cerrar al tocar fuera".
- `key` estables donde importa (`category.name`, `service.id`).
- `ScrollView` para listas de ≤20 elementos estáticos: adecuado al volumen; no necesita `FlatList` por número de ítems (sí conviene por peso de imágenes, ver PERF-2).

**A revisar (código existente):**

| Hallazgo | Tipo | Sev. | Evidencia |
|---|---|---|---|
| Promesas de `Linking.openURL` sin `catch` | BUG | ALTA | BUG-1 |
| `router.push` hacia rutas que son pestañas | BUG | MEDIA | BUG-3 |
| `key={index}` en el grid de "Recientes" | BUENA PRÁCTICA | BAJA | `galeria.tsx` l. 94 — hoy inofensivo (lista fija); sería incorrecto si el grid pasa a ser dinámico |
| Funciones y objetos de estilo **inline** recreados en cada render del layout | BUENA PRÁCTICA | BAJA | `_layout.tsx` l. 74-91, 99-116 — impacto real nulo (el layout casi no re-renderiza y `react-compiler` está activo); solo legibilidad |
| 20 `<ImageBackground>` montados simultáneamente en una `ScrollView` | PERFORMANCE | ALTA | PERF-2 |

---

## 9. TypeScript

**Estado:** muy bueno. `npx tsc --noEmit` **sin errores**.

- `tsconfig.json`: `extends "expo/tsconfig.base"`, `strict: true`, alias `@/*`.
- **Sin `any`, sin `as any`, sin `@ts-ignore`/`@ts-expect-error`, sin `!` non-null** en todo el código de proyecto.
- Modelo de dominio bien tipado: `type Category` (unión literal de 6), `type Service`, `categories: {name: Category; icon: string; description: string}[]`, `useState<Category>`, `useState<ImageSourcePropType | null>`.
- Rutas tipadas: `router.push("/galeria")` está verificado contra `.expo/types/router.d.ts`.

**Mejoras razonables (para proteger mejor el código existente):**

| Sugerencia | Tipo | Sev. | Motivo |
|---|---|---|---|
| `recentImages` (`galeria.tsx` l. 15-22) se infiere como `number[]` | BUENA PRÁCTICA | BAJA | Tipar explícito `ImageSourcePropType[]` deja la intención clara y evita que `number` se propague si el array crece |
| Activar `noUnusedLocals` / `noUnusedParameters` en `tsconfig` | BUENA PRÁCTICA | BAJA | Detectaría el `import React` muerto de `trabaja.tsx` y futuros restos automáticamente |
| Activar `forceConsistentCasingInFileNames` | BUENA PRÁCTICA | MEDIA | El proyecto ya sufrió el problema `Servicio2.jpg` vs casing; esta flag lo convierte en error de compilación en vez de fallo en runtime de Metro |
| Considerar `noUncheckedIndexedAccess` | BUENA PRÁCTICA | BAJA | Fuerza a contemplar `undefined` al indexar; útil si aparece acceso por índice a los arrays de datos |

Ninguna de estas flags rompe el código actual (verificable: `tsc` ya pasa limpio y no hay accesos por índice problemáticos).

---

## 10. Navegación

**Correcto:**
- 5 `Tabs.Screen` ↔ 5 archivos reales (`index`, `servicios`, `galeria`, `trabaja`, `contactanos`). Sin `name` duplicados. Sin rutas huérfanas.
- `app/index.tsx` → `<Redirect href="/(tabs)" />`: redirección explícita y correcta hacia el grupo de pestañas.
- `headerShown: false` global coherente con los headers propios de cada pantalla.
- Rutas tipadas activas.

**A revisar:**

| Hallazgo | Tipo | Sev. | Evidencia |
|---|---|---|---|
| `router.push` en vez de `router.navigate` hacia pestañas | BUG | MEDIA | BUG-3 — `index.tsx` l. 365, 379 |
| `title` definido junto a un `tabBarLabel` personalizado | CLEANUP | BAJA | `_layout.tsx` l. 73/74 (`trabaja`), 98/99 (`contactanos`) — `title` es inerte con `headerShown: false` |
| Estilos/funciones de `tabBarLabel` inline en el layout | BUENA PRÁCTICA | BAJA | `_layout.tsx` l. 74-91, 99-116 — extraíbles a un pequeño componente `TabLabel` para legibilidad |

No se reportan "rutas que faltan": queda fuera del alcance.

---

## 11. Estilos

Es la dimensión más floja del código existente.

| Hallazgo | Tipo | Sev. | Evidencia |
|---|---|---|---|
| `homeStyles.ts` = 1025 líneas con los estilos de **todas** las pantallas + 2 modales; nombre engañoso ("home") | DEUDA TÉCNICA | ALTA | `styles/homeStyles.ts` |
| ~6 estilos **sin ninguna referencia** en `app/` | CLEANUP | BAJA | `filtersContainer` (l. 468), `filterItem` (l. 472), `activeFilter` (l. 480), `filterText` (l. 484), `sectionTitle` (l. 531), `filterCard` (l. 746) — verificado con grep en `app/` y `components/` |
| Colores y sombras como literales repetidos | DEUDA TÉCNICA | MEDIA | DUP-5 |
| `isSmallScreen` se calcula **una vez** al cargar el módulo (`Dimensions.get`) y queda congelado | RESPONSIVE / BUENA PRÁCTICA | BAJA | `homeStyles.ts` l. 3-4; único uso en l. 76 (`section`). No reacciona a rotación; mitigado por `orientation: "portrait"` en `app.json` |
| Dimensiones rígidas (`height`) en contenedores con texto | RESPONSIVE | MEDIA | RESP-2 |
| Nombres de claves: en general **claros** (`servicesMiniCardActive`, `contactButtonsContainer`), pero conviven dos familias de modal casi iguales (`galleryModal*` / `socialModal*`) | REFACTOR | MEDIA | DUP-4 |

**Cómo consolidar los estilos** (sin tocar valores): dividir por pantalla (`styles/home.ts`, `styles/servicios.ts`, …) o co-localizar `StyleSheet.create` en cada archivo de pantalla; extraer los estilos de modal al futuro `SheetModal`; mover colores a `constants/colors.ts`; borrar las 6 claves muertas.

---

## 12. Responsive

Riesgos derivados **de la implementación actual** (sin proponer pantallas nuevas ni rediseño):

---

### RESP-1 — Header con `paddingTop: 50` fijo, sin safe-area · Severidad: MEDIA

**Tipo:** RESPONSIVE
**Evidencia:** `homeStyles.ts` l. 23-34 (`header.paddingTop: 50`), usado por el header duplicado en las 5 pantallas. `app.json` tiene `android.edgeToEdgeEnabled: true`.

Con *edge-to-edge* en Android el contenido se dibuja **bajo** la barra de estado; `paddingTop: 50` es un valor fijo que no corresponde a la altura real del *inset* en todos los dispositivos (varía con notch / cámara perforada / barra de estado). En iPhone con Dynamic Island puede quedar corto o sobrar. No hay `SafeAreaView` ni `useSafeAreaInsets()` en ninguna pantalla.

**Cómo mitigar (sin rediseñar):** usar el *inset* superior real como padding base del header. Requiere un punto donde montar `SafeAreaProvider`; esa parte concreta se cruza con desarrollo futuro (§16) y no se puntúa aquí.

---

### RESP-2 — Alturas fijas en contenedores con texto · Severidad: MEDIA

**Tipo:** RESPONSIVE
**Evidencia:** `homeStyles.ts` — `contactButton.height: 54`, `serviceGridCard.height: 115`, `carouselCard.height: 130`, `socialModalHeader.height: 64`, `submitButtonText.fontSize: 22`. `servicesMiniCard.minHeight: 105` (este sí usa `minHeight`, bien).

Con la opción del sistema "Texto más grande" (font scaling), el texto dentro de contenedores con `height` fijo se recorta o desborda. `serviceGridTextLarge` (13 px) dentro de una tarjeta de 115 px con títulos largos ("Servicio de electricidad de alta, media y baja tensión 110 y 220, zonas industriales.") ya va justo a tamaño normal.

**Cómo mitigar:** `minHeight` en vez de `height` en los contenedores que envuelven texto (patrón que `servicesMiniCard` ya aplica).

---

### RESP-3 — `ScrollView` sin `paddingBottom` en 4 de 5 pantallas · Severidad: MEDIA

**Tipo:** RESPONSIVE
**Evidencia:** solo `servicios.tsx` pasa `contentContainerStyle={styles.scrollContent}` (l. 231; `scrollContent.paddingBottom: 40`). `index.tsx` (l. 46), `galeria.tsx` (l. 34), `trabaja.tsx` (l. 18), `contactanos.tsx` (l. 29) no lo pasan.

La barra de pestañas mide 82 px (`_layout.tsx` l. 16). Sin padding inferior, el último elemento de esas 4 pantallas queda pegado o parcialmente **bajo** la barra.

**Cómo mitigar:** aplicar el mismo `contentContainerStyle` con `paddingBottom` (idealmente `insets.bottom + 40`) en las 4 pantallas restantes. Encaja con `AppHeader`/refactor de estilos.

---

### RESP-4 — Barra de 5 pestañas apretada · Severidad: MEDIA

**Tipo:** RESPONSIVE
**Evidencia:** `_layout.tsx` — 5 `Tabs.Screen`, `tabBarStyle.height: 82`, `tabBarItemStyle.paddingHorizontal: 0`, label de `trabaja` a `fontSize: 9` / `lineHeight: 10.5` en 2 líneas ("Trabaja\ncon nosotros"), label de `contactanos` a `fontSize: 9.5`.

En pantallas de ~320-360 dp de ancho (frecuentes en Android de gama media/baja), 5 items con icono de 22 px + label de 2 líneas a 9 px van muy justos y el texto a 9 px roza el límite de legibilidad. Es consecuencia directa de la configuración actual, no de una pantalla futura.

**Cómo mitigar (sin cambiar el set de pestañas):** revisar en 320-360 dp; si no cabe, label de una línea más corto ("Trabajo" / "Contacto") o `fontSize` algo mayor con `tabBarLabelStyle` global. Decisión de texto visible = producto; el riesgo técnico sí se reporta aquí.

---

## 13. Rendimiento

Problemas **reales** del código y los assets existentes (sin micro-optimización):

---

### PERF-1 — Imágenes de 1–2 MB renderizadas en miniaturas · Severidad: ALTA

**Tipo:** PERFORMANCE
**Evidencia:**

| Asset | Peso | Se muestra a |
|---|---:|---|
| `Servicio11.jpg` | 1.96 MB | ~48% ancho / 115 px alto (Inicio), 75×75 (Servicios) |
| `Servicio15.jpg` | 1.27 MB | ídem |
| `Servicio10.jpg` | 1.17 MB | ídem |
| `Servicio13.jpg` | 1.05 MB | ídem |
| `img1.jpg`, `img4.jpg` | 1.83 MB c/u | ~180 px (carrusel/grid Galería) |
| `img2.jpg` / `img3.jpg` | 1.79 / 1.61 MB | ídem |

Ninguna imagen está redimensionada al tamaño de presentación. En Android de gama baja esto se traduce en consumo de memoria alto y *jank* al hacer scroll.

**Cómo consolidar:** redimensionar los originales a ~1000 px de ancho máximo y comprimir (calidad ~75 o WebP). Es trabajo sobre los archivos, no sobre el código.

---

### PERF-2 — 20 `ImageBackground` montados a la vez en Inicio · Severidad: ALTA

**Tipo:** PERFORMANCE
**Evidencia:** `index.tsx` l. 118-347: `<View style={styles.servicesGrid}>` con 20 `<ImageBackground>` hijos directos dentro de la `ScrollView` de la pantalla. Todos se montan y decodifican en el primer render, estén o no visibles. Sumado a PERF-1, son ~10-15 MB de imágenes decodificadas de golpe en una sola pantalla.

**Cómo consolidar:** aplicando REF-1 (catálogo en array + `.map()`), migrar ese grid a `FlatList` (virtualiza lo no visible) es directo. Además, `expo-image` (ya es dependencia, hoy sin usar) aporta *downsampling* y caché sin más configuración.

---

### PERF-3 — `Logo.png` de 1.09 MB decodificado en cada header · Severidad: MEDIA

**Tipo:** PERFORMANCE
**Evidencia:** `Logo.png` = 1 114 014 bytes, **idéntico byte a byte a `icon.png`** (mismo tamaño de archivo; es un PNG de 1536×1024). Se renderiza a 40×40 (`homeStyles.ts` `logo`) en el header de las 5 pantallas.

**Cómo consolidar:** generar un `Logo.png` propio de ~128×128 y pocos KB. Un solo asset, referenciado desde `AppHeader` (DUP-2).

> No se detectaron: renders en bucle, `setState` durante el render, cómputo síncrono pesado, ni animaciones costosas (Reanimated solo aparece en código muerto, §14).

---

## 14. Código muerto / cleanup

Verificado con búsqueda de referencias en `app/` y `components/` (grep): **0 imports** de lo siguiente desde el código vivo.

| Elemento | Tipo | Sev. | Nota |
|---|---|---|---|
| `components/` (9 archivos: `external-link`, `haptic-tab`, `hello-wave`, `parallax-scroll-view`, `themed-text`, `themed-view`, `ui/collapsible`, `ui/icon-symbol`, `ui/icon-symbol.ios`) | CLEANUP | MEDIA | Plantilla `create-expo-app`. Ninguna pantalla los usa |
| `hooks/` (`use-color-scheme.ts`, `use-color-scheme.web.ts`, `use-theme-color.ts`) | CLEANUP | MEDIA | Plantilla. Solo los usan los `components/` muertos |
| `constants/theme.ts` (`Colors`, `Fonts`) | CLEANUP | BAJA | Plantilla. Sin referencias |
| `scripts/reset-project.js` | CLEANUP | BAJA | Su propio comentario dice que puede borrarse tras el primer uso |
| `import React from "react"` | CLEANUP | BAJA | `trabaja.tsx` l. 1 — sin uso |
| Estilos `filtersContainer`, `filterItem`, `activeFilter`, `filterText`, `sectionTitle`, `filterCard` | CLEANUP | BAJA | `homeStyles.ts` l. 468, 472, 480, 484, 531, 746 — sin referencias |
| Assets sin usar: `logo.jpg` (186 KB), `image.png` (296 KB), `react-logo.png`, `react-logo@2x.png`, `react-logo@3x.png`, `partial-react-logo.png` | CLEANUP | BAJA | `logo.jpg` es una variante en minúscula de `Logo.png`; el resto es plantilla |
| Dependencias que solo usa el código muerto anterior: `expo-symbols`, `expo-haptics`, `expo-web-browser` | CLEANUP | BAJA | Podrían quitarse al eliminar `components/`. `expo-linear-gradient` no se importa en ningún sitio. `expo-image` tampoco se usa, pero **conviene empezar a usarla** (PERF-2), no borrarla |

> Sin `console.*`, sin `TODO`/`FIXME`/`HACK`, sin bloques comentados en el código de proyecto.

---

## 15. Refactors recomendados (ordenados por impacto)

1. **REF-1 · Catálogo único de servicios** (`constants/services.ts` + `types/service.ts`). Resuelve DUP-1, habilita `FlatList` para PERF-2, hace que BUG-2 se corrija una sola vez, y adelgaza `index.tsx` de 476 líneas a ~un tercio. **Impacto alto, riesgo bajo** (datos idénticos, solo cambia dónde viven).
2. **REF-2 · Dividir `styles/homeStyles.ts`** por pantalla/componente y borrar las 6 claves muertas. Sin cambiar valores. Ataca la peor nota (Estilos 4/10) y el hallazgo de arquitectura de severidad ALTA.
3. **REF-3 · `utils/linking.ts` + `constants/contact.ts`**. Resuelve BUG-1 y DUP-3 de una vez. Poco código.
4. **REF-4 · `components/AppHeader.tsx`**. Resuelve DUP-2 (5→1). El refactor más barato; además centraliza el punto donde luego se aplicará safe-area (RESP-1).
5. **REF-5 · `components/SheetModal.tsx`**. Resuelve DUP-4 y saca ~20 claves de estilo del monolito. Algo más de trabajo que los anteriores.
6. **REF-6 · `constants/colors.ts`**. Resuelve DUP-5. Nombrar los hex existentes, sin tocar la paleta.
7. **REF-7 · `router.push` → `router.navigate`** en `index.tsx` l. 365/379. Resuelve BUG-3. Trivial.
8. **REF-8 · Cleanup de plantilla**: eliminar `components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js`, assets sin usar, `import React` de `trabaja.tsx`, y las deps huérfanas. Trivial y reduce ruido.
9. **REF-9 · `paddingBottom` en las 4 `ScrollView` restantes** (RESP-3). Trivial; encaja al hacer REF-2.
10. **REF-10 · `tsconfig`**: `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`. Verificado que no rompen la compilación actual.

---

## 16. Fuera del alcance

Detectado, pero **no evaluado** en esta auditoría por pertenecer al desarrollo funcional/contenido futuro. Sin severidad, sin puntos, sin backlog técnico.

```txt
- Trabaja con nosotros: lógica de estado/validación/envío del formulario aparentemente pendiente.
  El JSX y los estilos del formulario sí se revisaron (están bien estructurados); la lógica no se evalúa.

- Video de presentación (Inicio): contenido final aparentemente pendiente (hoy es un contenedor con texto).

- Imágenes Servicio2/8/16/17/18/19/20: archivos de contenido aparentemente pendientes de entrega.
  (El código que hoy referencia otro asset en su lugar sí se reporta como BUG-2.)

- Datos reales de contacto (teléfono, WhatsApp) y URLs reales de redes sociales: contenido pendiente.
  (La DUPLICACIÓN de esas constantes entre archivos sí se reporta como DUP-3/DUP-5.)

- Carrusel superior de Galería no interactivo: puede ser decoración deliberada o interacción futura.
  No se evalúa si "debería" filtrar.

- app/_layout.tsx (layout raíz) ausente: su necesidad depende de comportamiento futuro
  (providers, control de splash). No hay código incorrecto ahí, simplemente no existe el archivo,
  así que no se puntúa. Se menciona solo porque RESP-1 (safe-area) requerirá crearlo.
```

---

## 17. Backlog técnico

Solo mejoras al **código existente**. Sin desarrollo de funcionalidades nuevas.

| ID | Prioridad | Tipo | Refactor / corrección | Archivo(s) | Complejidad |
|---|---|---|---|---|---|
| COD-01 | ALTA | Bug | `Linking.openURL` con `canOpenURL` + `try/catch` + fallback, centralizado en `utils/linking.ts` | `app/(tabs)/index.tsx`, `app/(tabs)/contactanos.tsx`, `utils/linking.ts` (nuevo) | Baja |
| COD-02 | ALTA | Bug | Restaurar los 7 `require` a la imagen correcta cuando exista el asset; hoy documentar el mapeo incorrecto | `app/(tabs)/servicios.tsx`, `app/(tabs)/index.tsx` | Baja |
| COD-03 | ALTA | Refactor | Catálogo de servicios como fuente única en `constants/services.ts` + `types/service.ts`; Inicio y Servicios lo consumen | `constants/`, `types/`, `app/(tabs)/index.tsx`, `app/(tabs)/servicios.tsx` | Media |
| COD-04 | ALTA | Deuda técnica | Dividir `styles/homeStyles.ts` (1025 líneas) por pantalla/componente; borrar 6 estilos muertos | `styles/` | Alta |
| COD-05 | ALTA | Performance | Redimensionar/comprimir imágenes de servicio y galería (1–2 MB → <150 KB) | `assets/images/` | Media |
| COD-06 | ALTA | Performance | Migrar el grid de 20 servicios de Inicio a `FlatList` (tras COD-03) y usar `expo-image` | `app/(tabs)/index.tsx` | Media |
| COD-07 | MEDIA | Refactor | `components/AppHeader.tsx` — eliminar el header duplicado en 5 pantallas | `components/`, 5 pantallas | Baja |
| COD-08 | MEDIA | Refactor | `components/SheetModal.tsx` — unificar modal de Galería y de Redes; sacar sus estilos del monolito | `components/`, `app/(tabs)/galeria.tsx`, `app/(tabs)/index.tsx`, `styles/` | Media |
| COD-09 | MEDIA | Refactor | `constants/contact.ts` — unificar `PHONE`/`WHATSAPP`/`SOCIAL` (hoy duplicados) y `handleCall`/`handleWhatsApp` | `constants/`, `app/(tabs)/index.tsx`, `app/(tabs)/contactanos.tsx` | Baja |
| COD-10 | MEDIA | Refactor | `constants/colors.ts` — nombrar los hex repetidos (sin cambiar la paleta) | `constants/`, `styles/`, `app/(tabs)/_layout.tsx` | Media |
| COD-11 | MEDIA | Bug | `router.push` → `router.navigate` para navegar a pestañas | `app/(tabs)/index.tsx` (l. 365, 379) | Baja |
| COD-12 | MEDIA | Responsive | `contentContainerStyle` con `paddingBottom` en Inicio, Galería, Trabaja, Contáctanos | 4 pantallas + `styles/` | Baja |
| COD-13 | MEDIA | Responsive | Header basado en `useSafeAreaInsets()` en vez de `paddingTop: 50` fijo | `components/AppHeader.tsx`, `styles/` | Media |
| COD-14 | MEDIA | Responsive | `minHeight` en vez de `height` en contenedores con texto (`contactButton`, `serviceGridCard`, `carouselCard`) | `styles/` | Baja |
| COD-15 | MEDIA | Cleanup | Eliminar plantilla `create-expo-app`: `components/` (los 9), `hooks/`, `constants/theme.ts`, `scripts/reset-project.js`; y deps huérfanas (`expo-symbols`, `expo-haptics`, `expo-web-browser`, `expo-linear-gradient`) | (varios) | Media |
| COD-16 | MEDIA | Buena práctica | `tsconfig`: `forceConsistentCasingInFileNames` (+ `noUnusedLocals`, `noUnusedParameters`) | `tsconfig.json` | Baja |
| COD-17 | MEDIA | Performance | `Logo.png` propio de ~128×128 y pocos KB (hoy 1.09 MB, idéntico a `icon.png`) | `assets/images/`, `components/AppHeader.tsx` | Baja |
| COD-18 | BAJA | Cleanup | Quitar `import React` sin uso; homogeneizar sangría de imports | `app/(tabs)/trabaja.tsx`, `app/(tabs)/contactanos.tsx` | Baja |
| COD-19 | BAJA | Cleanup | Quitar `title` redundante donde hay `tabBarLabel` personalizado | `app/(tabs)/_layout.tsx` | Baja |
| COD-20 | BAJA | Buena práctica | Extraer las funciones/estilos inline de `tabBarLabel` a un componente `TabLabel` | `app/(tabs)/_layout.tsx` | Baja |
| COD-21 | BAJA | Buena práctica | `key` estable en el grid de "Recientes" (no `index`) — al usar `expo-image`/array real | `app/(tabs)/galeria.tsx` (l. 94) | Baja |
| COD-22 | BAJA | Buena práctica | Tipar `recentImages` como `ImageSourcePropType[]` | `app/(tabs)/galeria.tsx` | Baja |
| COD-23 | BAJA | Cleanup | Borrar assets sin usar: `logo.jpg`, `image.png`, `react-logo*.png`, `partial-react-logo.png` | `assets/images/` | Baja |
| COD-24 | BAJA | Buena práctica | `useWindowDimensions()` en vez de `Dimensions.get("window")` a nivel de módulo | `styles/homeStyles.ts` (l. 3-4) | Baja |
| COD-25 | BAJA | Deuda técnica | Helper `shadow(nivel)` para los ~15 bloques de sombra repetidos | `styles/` | Baja |

---

### Anexo — Comprobaciones ejecutadas (no destructivas)

| Comando | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ sin errores |
| `npx expo lint` | ✅ sin errores |
| `npm ls --depth=0` | ✅ sin `extraneous`/`invalid`/`UNMET` |
| `npx expo install --check` | ✅ dependencias alineadas con SDK 54 |
| Búsqueda `console.*` / `any` / `@ts-ignore` / `TODO` en `app/**` | ✅ ninguno |
| Búsqueda de referencias a `components/`, `hooks/`, `constants/theme.ts` desde `app/` | ✅ ninguna (código muerto confirmado) |
| Búsqueda de referencias a estilos `filter*` / `sectionTitle` / `filterCard` | ✅ ninguna (estilos muertos confirmados) |

> Requiere **prueba manual** (no verificable estáticamente): comportamiento de `router.push` a pestañas en dispositivo, barra de 5 pestañas en 320-360 dp, texto con font scaling en contenedores de altura fija, y `Linking` sin app destino instalada.
