# Auditoría CALLI Mobile

> Auditoría técnica integral realizada sobre el código real del repositorio (no sobre el documento de contexto).
> Fecha: 2026-08-28 · Alcance: todo el proyecto · Rol: revisión de código pre-release (Senior React Native / Expo).
> **No se modificó código de implementación.** Único archivo creado: este reporte.

---

## 1. Resumen ejecutivo

**CALLI Mobile** es una app Expo Router (SDK 54, RN 0.81.5, React 19, TypeScript `strict`) con 5 pestañas: Inicio, Servicios, Galería, Trabaja con nosotros y Contáctanos. El proyecto **compila** (`tsc --noEmit` limpio, `expo lint` limpio, bundle Metro OK) y **arranca**, pero se encuentra claramente en **estado de desarrollo**, no de producción:

- Una funcionalidad central (**formulario de "Trabaja con nosotros"**) es una maqueta visual: no captura estado, no valida y no envía nada.
- **7 imágenes de servicios no existen** en el repo; en una sesión previa se parchearon los `require` apuntando a imágenes distintas, por lo que hoy varios servicios muestran **la foto equivocada**.
- **No existe `app/_layout.tsx`** (layout raíz). expo-router genera uno por defecto, así que la app funciona, pero **no hay dónde montar** `SafeAreaProvider`, `GestureHandlerRootView`, control de splash, `StatusBar`, error boundary ni providers globales.
- Datos de contacto **ficticios y duplicados** (teléfono `+529991234567`, redes `https://www.facebook.com/`).
- **El proyecto no está bajo control de versiones** (no es un repo git).
- `app.json` sin `android.package` ni `ios.bundleIdentifier`; `icon.png` **no es cuadrado** (1536×1024) → `expo-doctor` falla.
- Imágenes **enormes** (hasta 1.9 MB) renderizadas a ≤115 px; la pantalla de Inicio monta **20 `ImageBackground`** a la vez.

Nada de esto impide desarrollar, pero **sí impide liberar**. La base técnica (tipado, routing, lint, versiones de dependencias) es sólida y coherente; los problemas son de **completitud funcional, arquitectura y preparación de release**, no de un código roto.

### Valoración

```txt
Salud general:                 5/10

Arquitectura:                  4/10
Calidad de código:             6/10
Lógica funcional:              5/10
TypeScript:                    8/10
UI / Responsive:               4/10
Seguridad:                     7/10
Mantenibilidad:                4/10
Preparación para producción:   2/10
```

| Dimensión | Nota | Motivo |
|---|---|---|
| **Salud general** | 5/10 | Compila, tipa y linta limpio, routing correcto; pero feature central falsa, imágenes incorrectas, sin layout raíz, sin git, sin config de build. |
| **Arquitectura** | 4/10 | Sin `app/_layout.tsx`; `styles/homeStyles.ts` (1025 líneas) mezcla estilos de las 5 pantallas; catálogo de servicios duplicado en 2 formatos; `components/`, `hooks/`, `constants/theme.ts` son plantilla muerta; datos hardcodeados dentro de las pantallas. |
| **Calidad de código** | 6/10 | Estilo consistente (salvo `trabaja.tsx`), sin `any`, sin `console.*`, sin `TODO`, lint limpio. Penaliza: duplicación masiva, números mágicos, estilos inline en el layout, código de plantilla sin usar. |
| **Lógica funcional** | 5/10 | Filtro + buscador de Servicios y modal de Galería están **bien**. Penaliza: submit de "Trabaja" sin `onPress`, `Linking.openURL` sin protección, imágenes de servicio equivocadas, contador `0/300` fijo. |
| **TypeScript** | 8/10 | `strict: true`, `tsc` limpio, modelos de dominio tipados (`Category`, `Service`). Margen: flags más estrictas (`noUnusedLocals`, `noUncheckedIndexedAccess`). |
| **UI / Responsive** | 4/10 | Sin `safe-area` (header con `paddingTop: 50` fijo + `edgeToEdgeEnabled`); alturas fijas que recortan texto escalado; labels de tab a `fontSize: 9`; sin `paddingBottom` en 4 de 5 ScrollViews; riesgo de apretujamiento con 5 tabs en pantallas chicas. |
| **Seguridad** | 7/10 | Sin `.env`, sin claves, sin tokens, sin backend, sin vectores de inyección. Penaliza: datos ficticios con forma de PII embarcados y enlaces externos sin validar; requerirá cuidado al cablear el formulario. |
| **Mantenibilidad** | 4/10 | `index.tsx` con 20 bloques `<ImageBackground>` casi idénticos; estilos de todo el proyecto en un solo archivo; sin componentes reutilizables; sin `data/` ni `constants/`; sin git. |
| **Preparación para producción** | 2/10 | Sin `bundleIdentifier`/`package`, icono no cuadrado, datos ficticios, feature muerta, sin EAS, sin control de versiones, `README` de plantilla. |

---

## 2. Hallazgos críticos

Resolver **antes que nada** (detalle y reproducción en §3):

1. **`AUD-001` — Imágenes de servicios inexistentes / incorrectas.** `Servicio2, 8, 16, 17, 18, 19, 20 (.jpg)` no existen en `assets/images/`. Los `require` de `app/(tabs)/servicios.tsx` y `app/(tabs)/index.tsx` fueron redirigidos a otras imágenes para que compile, así que hoy "Carpintería" muestra la foto de pintura, "Herrería" la de albañilería, etc. Es un problema de **contenido en producción**.
2. **`AUD-002` — Formulario "Trabaja con nosotros" no funcional.** `app/(tabs)/trabaja.tsx`: ningún `TextInput` tiene `value`/`onChangeText`, el contador está fijo en `0/300` (línea 135) y el botón "Enviar Postulación" (línea 160) **no tiene `onPress`**. Un candidato llena el formulario, pulsa enviar y no ocurre nada.
3. **`AUD-003` — Falta el layout raíz `app/_layout.tsx`.** expo-router v6 inyecta un `DefaultNavigator`, por eso la app corre, pero no hay punto de montaje para `SafeAreaProvider`, `GestureHandlerRootView`, `SplashScreen.preventAutoHideAsync()`, `StatusBar`, error boundary ni providers. Es la causa raíz de varios problemas de UI (§10) y un bloqueo para escalar la app.
4. **`AUD-004` — `icon.png` no es cuadrado (1536×1024).** `expo-doctor` falla el check de schema. Bloquea una build limpia y el envío a tiendas.
5. **`AUD-005` — Datos de contacto ficticios embarcados.** Teléfono/WhatsApp `+529991234567` (placeholder) en `index.tsx` (líneas 21-22) y `contactanos.tsx` (líneas 13-14); redes sociales genéricas (`https://www.facebook.com/`, …) en `index.tsx` (~líneas 436, 448, 460). La app "llama" y "escribe" a un número inventado.
6. **`AUD-006` — Proyecto sin control de versiones.** No hay repositorio git inicializado. Todo el trabajo incremental descrito en el documento de contexto no tiene historial ni respaldo. Riesgo operativo alto.

---

## 3. Bugs

> Se distingue **BUG** (comportamiento incorrecto observable) de RIESGO / DEUDA / MEJORA (§4, §14, §15).

| Severidad | Archivo | Problema | Impacto |
|---|---|---|---|
| CRÍTICO | `app/(tabs)/servicios.tsx`, `app/(tabs)/index.tsx` | 7 imágenes de servicio no existen; los `require` fueron reapuntados a otras imágenes | Servicios muestran foto equivocada; catálogo visualmente incorrecto |
| ALTO | `app/(tabs)/trabaja.tsx` | Formulario sin estado, sin validación, sin envío; botón sin `onPress` (l. 160); contador fijo `0/300` (l. 135) | Feature central inservible; el usuario cree que postuló y no |
| ALTO | `app/(tabs)/index.tsx` (l. 33, 41, ~436-460), `contactanos.tsx` (l. 17, 25) | `Linking.openURL(...)` sin `canOpenURL` ni `try/catch` | Promesa rechazada no capturada → pantalla roja en dev / fallo silencioso en prod si falta la app destino |
| ALTO | `app.json` (l. 7) | `icon.png` 1536×1024 (no cuadrado) | `expo-doctor` falla; icono deformado; build/submit bloqueados |
| MEDIO | `app/(tabs)/index.tsx` (~l. 436, 448, 460) | URLs de redes sociales genéricas (dominio raíz) | "Visita nuestras redes" abre la home de Facebook/Instagram/TikTok, no el perfil de CALLI |
| MEDIO | `app/(tabs)/index.tsx` (l. 21-22) y `contactanos.tsx` (l. 13-14) | Teléfono/WhatsApp ficticios y **duplicados** en 2 archivos | Contacto real imposible; al cambiarlo hay que tocar 2 sitios (riesgo de desincronización) |
| MEDIO | `index.tsx`, `galeria.tsx`, `trabaja.tsx`, `contactanos.tsx` | `ScrollView` sin `contentContainerStyle` con `paddingBottom` (solo `servicios.tsx` lo tiene, l. 231) | La última tarjeta queda pegada / bajo la barra de 5 tabs (82 px) |
| MEDIO | `styles/homeStyles.ts` (l. 24) + `app.json` `edgeToEdgeEnabled: true` | Header con `paddingTop: 50` fijo, sin `safe-area-context` | En dispositivos con notch alto / Dynamic Island / cutouts Android el header se dibuja mal |
| BAJO | `app/(tabs)/trabaja.tsx` (l. 1) | `import React from "react"` sin usar (nuevo JSX transform) | Ruido; lo detectaría `noUnusedLocals` |
| BAJO | `app/(tabs)/galeria.tsx` (l. 94) | `key={index}` en `.map()` de "Recientes" | Aceptable por ser lista estática; mala práctica si se vuelve dinámica |
| BAJO | `app/(tabs)/_layout.tsx` (l. 73, 97) | `title` y `tabBarLabel` personalizado a la vez en `trabaja`/`contactanos` | `title` es redundante con `headerShown: false`; inofensivo |

### Detalle

---

#### [CRÍTICO] Imágenes de servicios inexistentes / incorrectas

**Archivo:** `app/(tabs)/servicios.tsx` (array `services`, l. 67-209) y `app/(tabs)/index.tsx` (grid, l. 120-346)

**Problema:**
`assets/images/` contiene `Servicio1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15` (`.jpg`). **No existen** `Servicio2, 8, 16, 17, 18, 19, 20`. En una intervención previa, los `require` que apuntaban a esos archivos se cambiaron a imágenes existentes para desbloquear el bundle:

| Servicio | Imagen "correcta" (falta) | Imagen que se muestra hoy |
|---|---|---|
| Remodelaciones (id 4) | `Servicio2.jpg` | `Servicio1.jpg` (construcción) |
| Croquis para escrituración (id 8) | `Servicio8.jpg` | `Servicio3.jpg` (planos) |
| Herrería y balconería (id 16) | `Servicio16.jpg` | `Servicio11.jpg` (albañilería) |
| Impermeabilización (id 17) | `Servicio17.jpg` | `Servicio12.jpg` (plomería) |
| Aluminio y vidriería (id 18) | `Servicio18.jpg` | `Servicio13.jpg` (electricidad) |
| Jardinería y limpieza (id 19) | `Servicio19.jpg` | `Servicio6.jpg` (topográfico) |
| Carpintería (id 20) | `Servicio20.jpg` | `Servicio14.jpg` (pintura) |

Lo mismo, con el mismo mapeo, en el grid de 20 tarjetas de `index.tsx`.

**Reproducción:**
1. Abrir la app → pestaña **Servicios**.
2. Seleccionar categoría **Mantenimiento**.
3. Observar "Carpintería": muestra la foto de "Servicio de pintura".
4. Repetir en **Inicio** → grid "Nuestros Servicios", tarjetas 16-20.

**Causa:** Los archivos entregables nunca se agregaron al repo; el parche de `require` fue una solución temporal para compilar (documentada en el contexto §18-19).

**Solución recomendada:**
- Agregar los 7 `.jpg` reales a `assets/images/` con el nombre exacto (`Servicio2.jpg`, … respetando la `S` mayúscula) y revertir los `require` a su nombre original.
- A la vez, unificar el catálogo (ver `AUD` de arquitectura): un único `constants/services.ts` consumido por Inicio y Servicios, para no volver a tener 2 listas que se desincronizan.
- **Requiere prueba manual** tras reponer las imágenes: verificar las 20 tarjetas en ambas pantallas.

---

#### [ALTO] Formulario "Trabaja con nosotros" no funcional

**Archivo:** `app/(tabs)/trabaja.tsx`

**Problema:**
- Los 4 campos (`Nombre completo`, `Dirección`, `Teléfono`, `Mensaje`) son `<TextInput>` **sin `value` ni `onChangeText`**: no hay `useState`, el componente ni siquiera importa `useState`.
- El contador `<Text style={styles.counter}>0/300</Text>` (l. 135) es **texto fijo**; nunca refleja lo escrito pese a que el `TextInput` tiene `maxLength={300}`.
- El botón `<TouchableOpacity style={styles.submitButton}>` (l. 160) **no tiene `onPress`**. Pulsarlo no hace nada.
- No hay estados de `loading` / `error` / `success`, ni validación (campos vacíos, formato de teléfono, longitud mínima de mensaje).
- No hay envío: ni `mailto:`, ni `wa.me`, ni API.

**Reproducción:**
1. Abrir pestaña **Trabaja con nosotros**.
2. Escribir en "Mensaje" → el contador sigue en `0/300`.
3. Dejar todo vacío → pulsar "Enviar Postulación" → no pasa nada (tampoco con los campos llenos).

**Causa:** La pantalla se construyó como maqueta visual y nunca se cableó (pendiente #10 del documento de contexto).

**Solución recomendada:**
- `useState` por campo (o un objeto `form` + `setForm`), `onChangeText`, contador derivado `` `${mensaje.length}/300` ``.
- Validación mínima antes de enviar (todos requeridos, teléfono numérico ≥10, mensaje ≥20).
- Envío sin backend a corto plazo: componer `mailto:` o `https://wa.me/<num>?text=<encodeURIComponent(resumen)>`; a medio plazo, endpoint real.
- Estados visibles: botón deshabilitado mientras `!isValid`, spinner en envío, mensaje de éxito/error.
- `KeyboardAvoidingView` + `keyboardShouldPersistTaps="handled"` (hoy el teclado tapa el botón).

---

#### [ALTO] `Linking.openURL` sin protección

**Archivos:** `app/(tabs)/index.tsx` (`handleCall` l. 32-34, `handleWhatsApp` l. 36-42, `openSocialLink` ~l. 28-30 usado en l. ~436/448/460), `app/(tabs)/contactanos.tsx` (l. 16-26)

**Problema:**
```tsx
const handleCall = () => {
  Linking.openURL(`tel:${PHONE_NUMBER}`);   // promesa sin await, sin catch
};
```
`Linking.openURL` devuelve una `Promise` que **se rechaza** si no hay app capaz de abrir el esquema (emulador sin dialer, dispositivo sin WhatsApp, sin navegador). Al no haber `catch`, se produce un *unhandled promise rejection*: pantalla roja en desarrollo y, en producción, el botón "no hace nada" sin explicación.

**Reproducción:**
1. Emulador Android sin Google Play / sin WhatsApp instalado.
2. **Inicio** o **Contáctanos** → "WhatsApp".
3. En dev: `Possible Unhandled Promise Rejection`. En release: silencio.

**Causa:** No se comprueba `canOpenURL` ni se envuelve en `try/catch`.

**Solución recomendada:**
```tsx
const open = async (url: string, fallbackMsg: string) => {
  try {
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert("No disponible", fallbackMsg);
    await Linking.openURL(url);
  } catch {
    Alert.alert("Error", "No se pudo abrir la aplicación.");
  }
};
```
Centralizar en `utils/linking.ts` y reusar en Inicio y Contáctanos.

---

#### [ALTO] `icon.png` no cuadrado

**Archivo:** `app.json` (l. 7), `assets/images/icon.png` (1536×1024, 1.09 MB)

**Problema:** `expo-doctor` → *"Field: icon - image should be square, but the file has dimensions 1536x1024"*. Un icono no cuadrado se deforma o se recorta en el launcher y **bloquea** validaciones de build/submit.
Además `Logo.png` es **byte a byte idéntico** a `icon.png` (ambos 1 114 014 bytes): el mismo archivo de 1536×1024 se usa como logo de 40×40 en todos los headers.

**Solución recomendada:** Exportar un `icon.png` **1024×1024** real. Generar un `Logo.png` aparte, cuadrado y liviano (~128×128, PNG optimizado) para el header.

---

#### [MEDIO] URLs de redes genéricas / contacto ficticio y duplicado

**Archivos:** `app/(tabs)/index.tsx` (l. 21-22 constantes, ~436/448/460 redes), `app/(tabs)/contactanos.tsx` (l. 13-14)

**Problema:**
- `PHONE_NUMBER = "+529991234567"` y `WHATSAPP_NUMBER = "529991234567"` son placeholders y están **repetidos** en dos pantallas.
- `openSocialLink("https://www.facebook.com/")`, `.../instagram.com/`, `.../tiktok.com/` → abren la portada de cada red, no el perfil de CALLI.

**Solución recomendada:** `constants/contact.ts` con `PHONE`, `WHATSAPP`, `SOCIAL = { facebook, instagram, tiktok }` y consumir desde ambas pantallas. Sustituir por datos reales antes de release.

---

## 4. Riesgos

Aún no son bugs, pero lo serán:

- **Sin `app/_layout.tsx` (RIESGO ALTO).** Hoy funciona por el `DefaultNavigator` de expo-router. En cuanto se necesite: ocultar el splash de forma controlada, cargar fuentes, `SafeAreaProvider`, `GestureHandlerRootView`, `StatusBar`, `ErrorBoundary`, `ThemeProvider` o cualquier provider (auth, analytics), **no hay dónde ponerlo** sin crear el archivo. Recomendado crearlo ya con `<Stack>` + providers, aunque sea mínimo.
- **Catálogo de servicios duplicado (RIESGO ALTO).** `servicios.tsx` tiene un array `Service[]` tipado (l. 67-209); `index.tsx` tiene 20 `<ImageBackground>` escritos a mano (l. 120-346) con títulos y (tras el parche) imágenes que **ya divergen**. Cualquier cambio de catálogo hay que hacerlo dos veces, en dos formatos distintos. → fuente única en `constants/services.ts`.
- **`styles/homeStyles.ts` como cajón de sastre (RIESGO MEDIO).** 1025 líneas con estilos de las 5 pantallas + 2 modales. Cada pantalla importa todo. Crece sin control; nombres como `contactSection` se reutilizan entre Inicio y Contáctanos con intención distinta.
- **Imágenes sin optimizar + 20 a la vez (RIESGO MEDIO→rendimiento, §13).**
- **`Linking` con futura entrada de usuario (RIESGO MEDIO).** Cuando el formulario de "Trabaja" envíe por `wa.me`/`mailto`, **todo** campo del usuario debe pasar por `encodeURIComponent`. Hoy solo se codifica un mensaje constante.
- **Sin `+not-found.tsx` propio (RIESGO BAJO).** Una ruta inexistente muestra la pantalla `Unmatched` de expo-router, sin marca.
- **`Dimensions.get("window")` a nivel de módulo (RIESGO BAJO).** `styles/homeStyles.ts` l. 3: `isSmallScreen` se congela al cargar; no reacciona a rotación/foldables. Mitigado por `orientation: "portrait"`, pero el patrón correcto es `useWindowDimensions()`.
- **`.gitignore` ignora `expo-env.d.ts`** (l. 10) — es autogenerado, correcto; solo se nota porque hoy existe en el árbol.

---

## 5. Arquitectura

### Estado actual

```txt
app/
  index.tsx            → <Redirect href="/(tabs)" />
  (tabs)/
    _layout.tsx        → <Tabs> con 5 Tabs.Screen
    index.tsx          → Inicio      (476 líneas; 20 bloques ImageBackground a mano)
    servicios.tsx      → Servicios   (336 líneas; array Service[] + filtro + buscador)  ← la mejor construida
    galeria.tsx        → Galería     (143 líneas; carrusel + grid + modal preview)
    trabaja.tsx        → Formulario  (169 líneas; 100% estático)
    contactanos.tsx    → Contacto    (80 líneas; llamada + WhatsApp)
assets/images/         → 36 archivos (mezcla de reales, plantilla y sin usar)
styles/homeStyles.ts   → 1025 líneas, estilos de TODO el proyecto
components/  (9 archivos)  ─┐
hooks/       (3 archivos)   ├─ plantilla create-expo-app, 0 imports desde app/
constants/theme.ts         ─┘
scripts/reset-project.js   → script de plantilla, ya no aplica
```

**Falta el layout raíz** (`app/_layout.tsx`).

### Problemas

1. **Sin capa de datos.** Los 20 servicios, las 6 categorías, los datos de contacto y las URLs de redes viven hardcodeados dentro de los `.tsx` de pantalla, algunos duplicados.
2. **Sin componentes reutilizables.** `Header` (logo + "CALLI") está copiado literalmente en `index`, `servicios`, `galeria`, `trabaja`, `contactanos`. El patrón de modal-tarjeta (overlay `Pressable` + header + botón X) está en `galeria.tsx` y en el modal de redes de `index.tsx`, con estilos casi gemelos (`galleryModal*` vs `socialModal*`).
3. **Presentación y datos mezclados.** `servicios.tsx` mezcla el modelo (`type Service`, array de 20), la lógica (`filter`) y la vista en un archivo.
4. **Estilos monolíticos.** Un único `homeStyles.ts` mal llamado ("home") para 5 pantallas.
5. **Plantilla sin podar.** `components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js` son de `create-expo-app` y no se usan (verificado: 0 referencias desde `app/`). Arrastran dependencias (`expo-symbols`, `expo-haptics`, `expo-web-browser`).

### Estructura razonable para el tamaño de CALLI

No hace falta arquitectura empresarial. Con esto basta:

```txt
app/
  _layout.tsx            ← CREAR: Stack + SafeAreaProvider + GestureHandlerRootView + splash
  +not-found.tsx         ← opcional, con marca
  index.tsx
  (tabs)/ ...

src/  (o raíz)
  components/
    AppHeader.tsx        ← logo + "CALLI" reutilizable
    SheetModal.tsx       ← overlay + tarjeta + botón X reutilizable
    ServiceCard.tsx
  constants/
    contact.ts           ← teléfono, WhatsApp, redes
    services.ts          ← catálogo único de 20 servicios + 6 categorías
    colors.ts            ← paleta (#0A1F44, #0f1f3d, #ff3b3b, #25D366, …)
  types/
    service.ts           ← Category, Service
  utils/
    linking.ts           ← openExternal() con canOpenURL + try/catch
  styles/
    <por pantalla o por componente>
```

`hooks/`, `services/` (API) y `data/` remota se añaden **cuando** haya backend, no antes.

---

## 6. React Native / Expo

### React / RN

- **`useState` correcto** donde existe: `servicios.tsx` (`activeCategory`, `searchText`), `galeria.tsx` (`selectedImage`), `index.tsx` (`socialModalVisible`). Sin estado innecesario ni derivable.
- **`filteredServices` recalculado en cada render** (`servicios.tsx` l. 216). A n=20 es trivial; no vale la pena `useMemo` salvo que el catálogo crezca mucho.
- **Sin `useEffect`, sin listeners, sin timers, sin subscripciones** → **no hay memory leaks ni cleanup pendiente**. ✔
- **Sin operaciones asíncronas** salvo `Linking.openURL` (mal manejada, §3).
- **Listas:** todo con `.map()` sobre arrays estáticos de ≤20. `key`: `servicios.tsx` usa `key={category.name}` y `key={service.id}` ✔; `galeria.tsx` usa `key={index}` (aceptable, lista fija).
- **`ScrollView` en vez de `FlatList`** para las listas de servicios (20) y grids. Correcto para el tamaño actual; se vuelve relevante solo junto al peso de imágenes (§13).
- **`TouchableOpacity` / `Pressable`:** uso correcto. Modales de Galería y Redes con `Pressable` overlay + `Pressable` interior con `onPress={() => {}}` para frenar la propagación — patrón válido.
- **`Modal`:** ambos con `transparent`, `animationType="fade"` y **`onRequestClose`** → el botón atrás de Android cierra el modal ✔.
- **Teclado (`trabaja.tsx`):** sin `KeyboardAvoidingView` ni `keyboardShouldPersistTaps`. El teclado tapará el botón "Enviar" y los últimos campos.
- **Volver atrás:** `index.tsx` navega con `router.push("/galeria")` / `"/contactanos"`. Como son pestañas, `push` apila una segunda instancia de la pantalla **encima** de la pestaña; el gesto atrás vuelve a Inicio pero el estado del tab puede quedar raro. Debería ser `router.navigate(...)` o directamente seleccionar la pestaña.

### Expo

- **Versiones sanas.** `expo install --check` → *"Dependencies are up to date"*. `expo@54.0.37`, RN `0.81.5`, React `19.1.0`, `react-native-reanimated@4.1.7` + `react-native-worklets@0.5.1` (pareja correcta para Reanimated 4), `expo-router@6.0.24`.
- **`expo-doctor`: 17/18.** Único fallo: icono no cuadrado (§3).
- **`app.json`:**
  - `newArchEnabled: true`, `react-compiler: true`, `typedRoutes: true` — moderno y coherente.
  - `edgeToEdgeEnabled: true` (Android) **sin** manejo de safe-area en las pantallas → contenido bajo la barra de estado (§10).
  - **Falta `android.package` y `ios.bundleIdentifier`** → no se puede generar build nativa / EAS.
  - Sin `version`/`buildNumber`/`versionCode` gestionados; sin `runtimeVersion`.
  - `scheme: "callimobile"` definido, pero no hay configuración de deep links que lo aproveche.
  - Splash configurado en plugins, pero **nadie llama** `SplashScreen.preventAutoHideAsync()` (no hay layout raíz) → el splash se oculta de inmediato.
- **Permisos:** ninguno declarado. Correcto: la app solo usa `Linking` (no requiere permiso). Si el formulario adjunta CV/archivos o usa cámara, habrá que declararlos.

### `package.json`

- **Scripts:** `start`, `android`, `ios`, `web`, `lint`, `reset-project`. Correctos. No hay `dev` (causó el `Missing script: "dev"` del contexto §16) — es esperado en Expo.
- **`react-dom` + `react-native-web@0.21` + `web.output: "static"`** — soporte web activo. Si no se va a publicar web, son ~3 dependencias y configuración de más (no dañan).
- **Dependencias solo usadas por código de plantilla muerto** (candidatas a eliminar junto con `components/`):
  `expo-symbols` (icon-symbol), `expo-haptics` (haptic-tab), `expo-web-browser` (external-link).
- **Dependencias declaradas y NO importadas en `app/`:** `expo-linear-gradient` (el contexto asume que se usa — **no**), `expo-image` (las pantallas usan el `Image` de RN; `expo-image` daría caché y *downsampling* gratis, ver §13).
- **Requeridas por el runtime aunque no se importen directamente** (no tocar): `expo-constants`, `expo-linking`, `expo-splash-screen`, `expo-status-bar`, `expo-system-ui`, `expo-font`, `react-native-screens`, `react-native-safe-area-context`, `react-native-worklets`.
- Sin `extraneous`/`invalid`/`UNMET` en `npm ls --depth=0`. ✔

---

## 7. TypeScript

- **`tsconfig.json`:** `extends "expo/tsconfig.base"`, `strict: true`, alias `@/*`. `npx tsc --noEmit` → **sin errores**.
- **Sin `any`, sin `as any`, sin `@ts-ignore`/`@ts-expect-error`, sin `!` non-null assertions** en `app/` `components/` `hooks/` `constants/` `styles/`. ✔
- **Modelos de dominio bien tipados:** `type Category` (unión literal de 6), `type Service` con `image: ImageSourcePropType`, `categories: {name: Category; icon: string; description: string}[]`, `services: Service[]`. `useState<Category>("Todos")`, `useState<ImageSourcePropType | null>(null)`. Muy correcto.
- **`galeria.tsx`:** `recentImages` se infiere como `number[]` (los `require` devuelven `number` en RN) — funciona, y `selectedImage` sí está tipado `ImageSourcePropType | null`.
- **Rutas tipadas** (`typedRoutes: true`): `.expo/types/router.d.ts` refleja las 5 rutas correctamente; `router.push("/galeria")` está verificado por tipos.

### Oportunidades (no rompen nada)

- Añadir en `compilerOptions`:
  - `"noUnusedLocals": true` / `"noUnusedParameters": true` → cazaría el `import React` muerto de `trabaja.tsx`.
  - `"noUncheckedIndexedAccess": true` → fuerza a considerar `undefined` al indexar arrays/records (útil cuando llegue la capa de datos).
  - `"noFallthroughCasesInSwitch"`, `"forceConsistentCasingInFileNames"` (esto último **importante** en este proyecto por el historial de `Servicio2.jpg` vs mayúsculas).
- Tipar el retorno de los componentes de pantalla no es necesario (inferencia OK).

---

## 8. Navegación (`expo-router`)

- **5 pestañas ↔ 5 archivos reales**, sin duplicados, sin `name` repetido. ✔ (El error histórico de `name="galeria"` duplicado del contexto §13 ya está resuelto.)
- **`app/index.tsx` → `<Redirect href="/(tabs)" />`.** Funciona, pero introduce un frame de redirección en arranque en frío. Alternativa: dejar que `(tabs)` sea el índice sin el redirect, o `<Redirect>` está bien si se prefiere explícito.
- **`app/(tabs)/_layout.tsx`:**
  - `headerShown: false` global ✔.
  - `title` + `tabBarLabel` (render prop) juntos en `trabaja` y `contactanos`: `title` no aporta nada aquí; `tabBarLabel` gana. Limpiable.
  - Estilos y funciones de label **inline**, recreados en cada render del layout. Impacto nulo en la práctica (el layout casi no re-renderiza), pero es deuda menor.
  - `tabBarLabel` de `trabaja` a `fontSize: 9`, `lineHeight: 10.5`, 2 líneas ("Trabaja\ncon nosotros"): legibilidad muy pobre y sin escalar con Dynamic Type.
- **Falta layout raíz** → sin `<Stack>` propio, sin `initialRouteName`, sin `screenOptions` globales, sin providers. (§4, §5)
- **`router.push` a pestañas** desde `index.tsx` (§6): preferible `router.navigate` para no apilar instancias duplicadas de un tab.
- **Sin `+not-found.tsx`, sin `+html.tsx`, sin `_sitemap` personalizado.** Aceptable; `_sitemap` solo aparece en dev.
- **`scheme` definido pero sin `Linking` config** (deep links entrantes no mapeados). Solo relevante si se quieren enlaces `callimobile://...`.

---

## 9. Lógica funcional

### Inicio

`Abrir app → Redirect → (tabs)/index`. Header, "¿Quiénes somos?", placeholder de video (caja azul con texto "Video presentación", `index.tsx` — **contenido de desarrollo**), sección Contacto (Llamar / WhatsApp), grid "Nuestros Servicios" (20 `ImageBackground`), "Acciones Rápidas" (3 tarjetas):
- "Contáctanos" → `router.push("/contactanos")` ✔ (pero `push` sobre tab, §6/§8).
- "Mira Nuestros Proyectos" → `router.push("/galeria")` ✔.
- "Visita nuestras redes" → `setSocialModalVisible(true)` → modal con 3 iconos → cada uno `openSocialLink(<url genérica>)` (§3).
- Botones Llamar/WhatsApp → `Linking` sin protección (§3), número ficticio (§3).
- **Comportamiento problemático:** imágenes equivocadas en tarjetas 4, 8, 16-20 (§3).

### Servicios — *la pantalla mejor resuelta*

`Seleccionar categoría → filtra → Buscar → combina → Cambiar categoría → Limpiar búsqueda → Cambiar de tab`:
- `filteredServices = services.filter(matchesCategory && matchesSearch)` (l. 216-226). `matchesCategory`: `"Todos"` o igualdad exacta. `matchesSearch`: `includes` en título + descripción + categoría, todo `toLowerCase()`. **Correcto.**
- Título dinámico: `"Servicios destacados"` vs `` `Servicios de ${activeCategory}` `` ✔.
- Estado vacío: `noServicesBox` cuando `length === 0` ✔.
- El `searchText` **persiste al cambiar de categoría** (es un `&&`): p. ej. categoría "Diseño" + búsqueda "elec" → 0 resultados. Es coherente, pero puede confundir. Decisión de UX: ¿limpiar el buscador al tocar una categoría? Recomiendo mantenerlo pero es discutible.
- El estado (`activeCategory`, `searchText`) **se mantiene al cambiar de pestaña y volver** — expo-router no desmonta el tab. Deseable aquí; solo hay que saberlo.
- Sin bugs lógicos. Único defecto: las imágenes (§3).

### Galería

`Seleccionar imagen → modal → cerrar con X → abrir otra → cerrar tocando fuera → atrás Android`:
- `onPress={() => setSelectedImage(image)}` → `visible={selectedImage !== null}`.
- Cerrar: botón X (`closePopup`), tap en overlay (`Pressable onPress={closePopup}`), `onRequestClose` (atrás Android). Tap en la tarjeta interior no cierra (`onPress={() => {}}`). **Los 3 caminos de cierre funcionan.**
- Abrir otra imagen tras cerrar: `selectedImage` se resetea a `null` y se re-asigna ✔. No hay estado residual.
- El carrusel superior (Construcción/Remodelación/Mantenimiento/Finalizados) **no es interactivo** (son `<View>`, no `Touchable`) — parece pulsable pero no hace nada. ¿Intencional? Si debe filtrar la galería, es una feature faltante; si es decorativo, quitar la affordance visual.
- `key={index}` en el grid (l. 94): funciona por lista estática.

### Contacto

`Llamada → WhatsApp → volver a la app`:
- `handleCall`/`handleWhatsApp` idénticos a los de Inicio (código duplicado). `Linking` sin protección (§3), número ficticio (§3).
- Volver a la app tras la llamada/WhatsApp: la pantalla mantiene su estado (no hay ninguno) ✔.

### Trabaja con nosotros

`Abrir → campos vacíos → llenar parcialmente → enviar → errores → éxito`:
- **Ninguno de esos pasos produce efecto.** Sin estado, sin validación, sin envío, sin feedback (§3, `AUD-002`).
- El `TextInput` de mensaje tiene `maxLength={300}` pero el contador es texto fijo `0/300`.
- **Requiere rediseño funcional**, no un parche.

### Funciones / ramas muertas

- `import React` en `trabaja.tsx` (sin uso).
- No se detectaron funciones declaradas y nunca llamadas dentro de `app/`, ni condiciones imposibles, ni ramas inalcanzables (más allá del carrusel no interactivo de Galería, que es UI, no código muerto).
- Todo `components/`, `hooks/`, `constants/theme.ts` es código muerto a nivel de proyecto (§14).

---

## 10. UI / UX / Responsive

- **Safe area ausente (ALTO).** Todos los headers: `paddingTop: 50` fijo (`homeStyles.ts` l. 24). Sin `SafeAreaView` ni `useSafeAreaInsets()`. Con `edgeToEdgeEnabled: true` en Android, el contenido se dibuja **bajo** la barra de estado. En iPhone con Dynamic Island / notch alto, 50 px puede quedar corto o largo según dispositivo. → envolver en `SafeAreaProvider` (en el layout raíz que falta) y usar `insets.top` + un padding base.
- **Alturas fijas vs escalado de fuente (MEDIO).** `contactButton: height 54`, `serviceGridCard: height 115`, `carouselCard: 130`, `searchContainer` con `paddingVertical` fijo, `submitButtonText: fontSize 22`. Con "Texto más grande" del sistema, el texto se recorta o desborda. → `minHeight` en vez de `height`, o `allowFontScaling` controlado.
- **`paddingBottom` faltante (MEDIO).** Solo `servicios.tsx` pasa `contentContainerStyle={styles.scrollContent}` (`paddingBottom: 40`). En Inicio, Galería, Trabaja y Contáctanos la última tarjeta queda pegada o bajo la barra de 5 tabs (82 px de alto).
- **5 tabs (MEDIO).** `tabBarStyle.height: 82`, labels a `fontSize: 9-10`, "Trabaja con nosotros" forzado a 2 líneas. En pantallas ≤360 dp (muchos Android de gama baja) los 5 items van muy apretados; los iconos (22 px) + label de 2 líneas rozan el borde. Probar en 320-360 dp. Alternativa: label "Trabajo" / "Contacto" de 1 línea, o `tabBarShowLabel` selectivo.
- **`servicesMiniCard: width "31%"` + `serviceGridCard: "48%"` con `space-between`.** En tablets/foldables las tarjetas quedan diminutas y el grid se ve vacío; no hay `maxWidth` ni cálculo de columnas.
- **`Dimensions.get("window")` una sola vez** (`homeStyles.ts` l. 3): `isSmallScreen` no reacciona a cambios. `orientation: portrait` lo mitiga.
- **Placeholder de video** en Inicio: caja azul con texto. Claramente "en construcción".
- **Contraste de placeholders:** `#999` (`servicios.tsx`) y `#888` (`trabaja.tsx`) sobre blanco ≈ 2.8-3.5:1 → por debajo de AA para texto. Subir a `#6B7280` o más oscuro.
- **Modales:** bien centrados, `maxWidth: 420`. El de Galería tiene `minHeight: 500` + `maxHeight: "78%"`: en teléfonos pequeños (< ~640 dp de alto) `minHeight: 500` puede casi llenar la pantalla y pelearse con `maxHeight`. Revisar en dispositivo bajo.
- **Sin estados de carga/vacío** salvo el "no hay servicios" de Servicios. Galería y (futuro) envío de formulario no tienen skeleton ni spinner.

---

## 11. Assets

`assets/images/` — 36 archivos. Inventario:

**Usados en código (verificado con grep):**
`Logo.png`; `Servicio1,3,4,5,6,7,9,10,11,12,13,14,15.jpg`; `img1-6.jpg`; `icon1.png`, `icon2.png`, `icon3.png`.

**Usados en `app.json`:**
`icon.png`, `splash-icon.png`, `favicon.png`, `android-icon-foreground.png`, `android-icon-background.png`, `android-icon-monochrome.png`.

**Referenciados pero INEXISTENTES** (parcheados a otra imagen, §3):
`Servicio2.jpg`, `Servicio8.jpg`, `Servicio16.jpg`, `Servicio17.jpg`, `Servicio18.jpg`, `Servicio19.jpg`, `Servicio20.jpg`.

**Sin usar (candidatos a borrar):**
`logo.jpg` (186 KB — el código usa `Logo.png`), `image.png` (296 KB), `react-logo.png`, `react-logo@2x.png`, `react-logo@3x.png`, `partial-react-logo.png` (plantilla).

**Duplicado exacto:** `Logo.png` == `icon.png` (ambos 1 114 014 bytes, 1536×1024). El logo del header (40×40) carga un archivo de 1.09 MB.

**Peso (problema real, ver §13):**

| Archivo | Tamaño | Se muestra a |
|---|---:|---|
| `Servicio11.jpg` | 1.96 MB | ~48% ancho / 115 px alto |
| `Servicio15.jpg` | 1.27 MB | ídem |
| `Servicio10.jpg` | 1.17 MB | ídem |
| `Servicio13.jpg` | 1.05 MB | ídem |
| `Servicio7/12.jpg` | ~0.88 MB | ídem |
| `img1.jpg`,`img4.jpg` | 1.83 MB c/u | ~180 px / pantalla completa |
| `img2.jpg` | 1.79 MB | ídem |
| `img3.jpg` | 1.61 MB | ídem |
| `Logo.png` | 1.09 MB | 40×40 px en **cada** header |

Formatos: JPG para fotos (correcto), PNG para logo/iconos (correcto). **Ninguna imagen está redimensionada** al tamaño de presentación; no hay `@2x/@3x` de las fotos ni versiones WebP.

**Nombres:** convención inconsistente — `Servicio1.jpg` (Mayús) vs `img1.jpg` (minús) vs `icon1.png`. El caso `Servicio*` con mayúscula ya causó el error histórico en Metro. Recomendado: `forceConsistentCasingInFileNames` en tsconfig y una convención única.

---

## 12. Seguridad

- **Sin secretos.** No hay `.env`, `.env.*`, ni archivos de credenciales. Búsqueda de `key`/`token`/`secret`/`password`/`api` en el código fuente → **nada**. No hay backend, ni `fetch`, ni SDK de terceros con claves.
- **`app.json`** no contiene `extra` con claves, ni `projectId` de EAS (aún).
- **Datos con forma de PII embarcados:** teléfono/WhatsApp ficticios (§3). No es un secreto, pero no debe embarcarse un número real de una persona sin consentimiento; usar el número **oficial de la empresa**.
- **`Linking.openURL`:** todas las URLs son **literales** en el código (`tel:`, `https://wa.me/...`, `https://www.facebook.com/`). No hay construcción de URL con entrada de usuario → **sin riesgo de inyección de esquema** hoy.
  - El único dato variable es el `message` de WhatsApp, que **sí** pasa por `encodeURIComponent` ✔.
  - **Riesgo futuro:** cuando el formulario de "Trabaja" arme un `wa.me`/`mailto` con nombre/teléfono/mensaje del usuario, **cada campo** debe ir por `encodeURIComponent`, y conviene validar/limitar longitud antes.
- **Sin `WebView`, sin `eval`, sin `dangerouslySetInnerHTML`** (no aplica en RN, pero se confirma que no hay render de HTML remoto).
- **Permisos nativos:** ninguno pedido (correcto para el alcance actual).
- **Almacenamiento:** no se guarda nada (`AsyncStorage`, `SecureStore`, `MMKV` no están). Sin datos de usuario en disco → sin superficie de fuga local.

**Conclusión:** superficie de ataque mínima porque la app aún no hace casi nada con datos. El 7/10 refleja que está limpia hoy pero **sin defensas preparadas** para cuando entren formularios y/o backend.

---

## 13. Rendimiento

Problemas **reales** (no micro-optimización):

1. **Imágenes gigantes sin redimensionar (ALTO).** ~10-15 MB de JPG decodificándose en la pantalla de **Inicio**, que monta **20 `ImageBackground`** simultáneos dentro de un `ScrollView` (todos se montan aunque no estén visibles). En Android de gama baja: consumo de memoria alto, *jank* al hacer scroll, posible reciclado/parpadeo. Servicios monta otros 13-20. Galería carga img1-4 (~1.8 MB c/u) para miniaturas de 180 px.
   - **Solución:** redimensionar los originales a ~1000 px de ancho máx. y comprimir (calidad 70-80, o WebP). Objetivo: < 150 KB por foto de tarjeta.
2. **`Image` de RN en vez de `expo-image` (MEDIO).** `expo-image` **ya es dependencia** y no se usa. Aporta caché en disco/memoria, *downsampling* automático y `contentFit`. Cambio de bajo esfuerzo y alto impacto para este caso.
3. **`Logo.png` de 1.09 MB en cada header (MEDIO).** Se decodifica en las 5 pantallas. Generar un logo de ~128×128 y pocos KB.
4. **`ScrollView` en vez de `FlatList`/`FlashList` para listas de servicios (MEDIO, dependiente de #1).** A 20 ítems un `ScrollView` es aceptable; el problema no es el número de vistas sino el peso de las imágenes. Si el catálogo va a crecer, migrar a lista virtualizada.
5. **`filteredServices` sin `useMemo` (BAJO).** Recalcular un `filter` de 20 en cada pulsación de tecla es imperceptible. Solo memoizar si crece el dataset.
6. **Funciones/estilos inline en `_layout.tsx` y en los `.map()` (BAJO).** Se recrean por render; irrelevante al volumen actual. Con `react-compiler` activado, parte de esto se memoiza automáticamente.

No se detectaron: renders en bucle, `setState` en render, cálculos pesados síncronos, ni animaciones costosas (Reanimated solo aparece en código muerto).

---

## 14. Código muerto y duplicación

### Código muerto (verificado: 0 referencias desde `app/`)

- **`components/`** (9 archivos): `external-link.tsx`, `haptic-tab.tsx`, `hello-wave.tsx`, `parallax-scroll-view.tsx`, `themed-text.tsx`, `themed-view.tsx`, `ui/collapsible.tsx`, `ui/icon-symbol.tsx`, `ui/icon-symbol.ios.tsx`.
- **`hooks/`** (3): `use-color-scheme.ts`, `use-color-scheme.web.ts`, `use-theme-color.ts`.
- **`constants/theme.ts`** (`Colors`, `Fonts`).
- **`scripts/reset-project.js`** — su propio comentario dice que se puede borrar tras usarlo.
- **`import React from "react"`** en `trabaja.tsx` (l. 1).
- **Estilos sin ninguna referencia** en `styles/homeStyles.ts`: `filtersContainer` (l. 468), `filterItem` (l. 472), `activeFilter` (l. 480), `filterText` (l. 484), `sectionTitle` (l. 531), `filterCard` (l. 746).
- **Assets sin usar:** `logo.jpg`, `image.png`, `react-logo*.png` ×3, `partial-react-logo.png` (§11).
- **Dependencias solo referenciadas por el código muerto anterior:** `expo-symbols`, `expo-haptics`, `expo-web-browser`. **Sin referenciar en absoluto:** `expo-linear-gradient`, `expo-image` (esta última conviene **empezar a usarla**, no borrarla — §13).

> Sin `console.*`, sin `TODO`/`FIXME`/`HACK`, sin bloques de código comentado en el código fuente del proyecto. ✔

### Duplicación

- **Header "CALLI"** (logo + texto) copiado en las 5 pantallas → `AppHeader`.
- **`handleCall` / `handleWhatsApp`** idénticos en `index.tsx` y `contactanos.tsx` → `utils/linking.ts` + `constants/contact.ts`.
- **Patrón modal-tarjeta** duplicado: `galleryModal*` (~10 estilos) vs `socialModal*` (~10 estilos), casi iguales → `SheetModal` + estilos compartidos.
- **Catálogo de 20 servicios** en 2 representaciones (`servicios.tsx` array vs `index.tsx` JSX a mano) → `constants/services.ts`.
- **Colores repetidos como literales** en `homeStyles.ts` y en JSX: `#0A1F44` (~30 veces), `#0f1f3d`, `#fff`, `#666`, `#25D366` → `constants/colors.ts`.
- **Valores de sombra** (`shadowColor/Opacity/Radius/Offset` + `elevation`) repetidos ~15 veces con ligeras variantes → helper `shadow(level)`.

---

## 15. Deuda técnica

### Alta

- **Falta `app/_layout.tsx`** con providers (safe-area, gesture handler, splash, status bar, error boundary).
- **Catálogo de servicios duplicado** en 2 formatos incompatibles.
- **`styles/homeStyles.ts` monolítico** (1025 líneas, 5 pantallas + 2 modales).
- **Formulario de "Trabaja" sin implementar** (también es bug funcional, §3).
- **Sin control de versiones (git).**

### Media

- **Sin componentes reutilizables** (`AppHeader`, `SheetModal`, `ServiceCard`).
- **Datos y constantes hardcodeados** en pantallas (contacto, redes, categorías).
- **Código de plantilla sin podar** (`components/`, `hooks/`, `constants/theme.ts`, `scripts/`) + dependencias asociadas.
- **`Linking` sin utilidad centralizada** con manejo de error.
- **Imágenes sin pipeline de optimización.**
- **`router.push` a pestañas** en vez de `navigate`.

### Baja

- `import React` muerto y sangría inconsistente en `trabaja.tsx`.
- `title` redundante junto a `tabBarLabel` en `_layout.tsx`.
- Estilos muertos en `homeStyles.ts`.
- `key={index}` en `galeria.tsx`.
- Nombres de assets con casing inconsistente.
- `Dimensions.get` a nivel de módulo en vez de `useWindowDimensions`.
- `README.md` es el de `create-expo-app`.

---

## 16. Preparación para producción

Lista de todo lo que grita **"esto sigue en desarrollo"**:

**Configuración / build**
- [ ] `app.json` sin `android.package` ni `ios.bundleIdentifier` → **no se puede generar build nativa**.
- [ ] `icon.png` no cuadrado (1536×1024) → `expo-doctor` falla.
- [ ] Sin `eas.json`, sin `extra.eas.projectId`, sin `owner` → sin EAS Build/Submit/Update.
- [ ] Sin `runtimeVersion` ni política de versionado (`version`/`versionCode`/`buildNumber`).
- [ ] `name`/`slug` = `calli-mobile` (nombre de desarrollo; el nombre visible debería ser "CALLI").
- [ ] Splash configurado pero no controlado por código (no hay layout raíz que llame `preventAutoHideAsync`).
- [ ] `README.md` = plantilla `create-expo-app`.
- [ ] **Proyecto sin repositorio git.**

**Contenido / datos ficticios**
- [ ] Teléfono y WhatsApp `+529991234567` (placeholder) en 2 archivos.
- [ ] URLs de redes = portadas genéricas de Facebook/Instagram/TikTok.
- [ ] 7 imágenes de servicio faltantes → hoy se muestra la foto equivocada en Servicios e Inicio.
- [ ] Placeholder "Video presentación" en Inicio (caja sin video real).
- [ ] Formulario "Trabaja con nosotros" no envía nada.
- [ ] Assets de plantilla en `assets/images/` (`react-logo*`, `partial-react-logo`, `image.png`, `logo.jpg`).

**Calidad / robustez**
- [ ] Sin `SafeAreaProvider` → layout frágil en notch / edge-to-edge.
- [ ] `Linking.openURL` sin manejo de error.
- [ ] Sin error boundary global.
- [ ] Imágenes de 1-2 MB sin optimizar.
- [ ] Sin tests, sin CI.
- [ ] Sin analítica ni reporte de errores (Sentry/Crashlytics) — opcional, pero habitual antes de release.

---

## 17. Plan recomendado de corrección

> Sin cambiar identidad visual ni comportamiento deseado. Cada fase es independiente y verificable.

### Fase 0 — Bugs críticos (lo que hace que la app muestre cosas incorrectas)

0.1 Reponer las 7 imágenes reales (`Servicio2/8/16/17/18/19/20.jpg`) y revertir los `require` parcheados en `servicios.tsx` e `index.tsx`. *(AUD-001)*
0.2 Exportar `icon.png` 1024×1024 real; `Logo.png` propio, cuadrado y liviano. Verificar `expo-doctor` en verde. *(AUD-004)*
0.3 `git init` + primer commit + `.gitignore` ya existe. Rama `main`. *(AUD-006)*
0.4 Sustituir teléfono/WhatsApp/redes por los datos reales (aún hardcodeados si hace falta, la centralización va en Fase 2). *(AUD-005)*

### Fase 1 — Estabilidad (funcional + configuración)

1.1 Crear `app/_layout.tsx`: `<Stack screenOptions={{headerShown:false}}>` + `SafeAreaProvider` + `GestureHandlerRootView` + `SplashScreen.preventAutoHideAsync()`/`hideAsync()` + `StatusBar`. *(AUD-003)*
1.2 Implementar el formulario de `trabaja.tsx`: estado por campo, contador reactivo, validación, envío por `wa.me`/`mailto` (sin backend por ahora), estados loading/error/success, `KeyboardAvoidingView`. *(AUD-002)*
1.3 `utils/linking.ts` con `openExternal()` (`canOpenURL` + `try/catch` + `Alert` de fallback); usarlo en Inicio, Contáctanos y el nuevo submit. *(bug ALTO §3)*
1.4 Añadir `android.package` y `ios.bundleIdentifier` a `app.json`; definir política de versionado.
1.5 `paddingBottom` en los ScrollViews de Inicio, Galería, Trabaja, Contáctanos.
1.6 Header con `useSafeAreaInsets()` en vez de `paddingTop: 50` fijo.

### Fase 2 — Calidad (refactor, sin cambiar comportamiento)

2.1 `constants/services.ts` (catálogo único) + `types/service.ts`; consumir desde Servicios **e** Inicio (Inicio pasa de 20 bloques JSX a un `.map`). *(deuda alta)*
2.2 `constants/contact.ts` y `constants/colors.ts`; eliminar literales repetidos.
2.3 Componentes `AppHeader` y `SheetModal` (unifica modal de Galería y de Redes).
2.4 Dividir `styles/homeStyles.ts` por pantalla/componente; borrar estilos muertos.
2.5 Podar plantilla: `components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js` y las deps `expo-symbols`/`expo-haptics`/`expo-web-browser`/`expo-linear-gradient`. Quitar `import React` de `trabaja.tsx`.
2.6 tsconfig: `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`, `noUncheckedIndexedAccess`.
2.7 `README.md` propio del proyecto.

### Fase 3 — UX / Responsive / Accesibilidad

3.1 Optimizar imágenes (redimensionar + comprimir/WebP) y migrar a `expo-image`.
3.2 Probar en 320-360 dp: barra de 5 tabs, grids `31%`/`48%`, modal de Galería (`minHeight: 500`).
3.3 `minHeight` en vez de `height` en botones/tarjetas con texto; revisar con "Texto más grande".
3.4 `accessibilityLabel`/`accessibilityRole` en botones icónicos (X de modales, tabs) e imágenes con contenido; subir contraste de placeholders (`#999`→`#6B7280`).
3.5 Decidir el carrusel no interactivo de Galería: hacerlo funcional o quitar la affordance.
3.6 `router.navigate` en vez de `router.push` para navegación entre pestañas.

### Fase 4 — Producción

4.1 `eas.json` + `projectId`; perfiles `development`/`preview`/`production`.
4.2 Nombre visible "CALLI", splash e iconos definitivos (adaptive icon Android, todos cuadrados).
4.3 Error boundary global + (opcional) Sentry/Crashlytics.
4.4 Checklist de tiendas: capturas, descripción, política de privacidad (obligatoria si hay formulario que recoge datos), permisos justificados.
4.5 Build de prueba interna (EAS `preview`) y QA en dispositivos reales Android + iOS.

---

## 21. Backlog final

| ID | Prioridad | Tipo | Tarea | Archivo(s) | Complejidad |
|---|---|---|---|---|---|
| AUD-001 | CRÍTICA | Bug | Reponer 7 imágenes de servicio reales y revertir los `require` parcheados | `assets/images/`, `app/(tabs)/servicios.tsx`, `app/(tabs)/index.tsx` | Baja |
| AUD-002 | CRÍTICA | Bug | Implementar formulario "Trabaja": estado, contador reactivo, validación, envío, loading/error/success, teclado | `app/(tabs)/trabaja.tsx` | Alta |
| AUD-003 | CRÍTICA | Arquitectura | Crear `app/_layout.tsx` (Stack + SafeAreaProvider + GestureHandlerRootView + control de splash + StatusBar) | `app/_layout.tsx` (nuevo) | Media |
| AUD-004 | CRÍTICA | Configuración | `icon.png` 1024×1024 cuadrado; `Logo.png` propio y liviano; `expo-doctor` en verde | `assets/images/`, `app.json` | Baja |
| AUD-005 | CRÍTICA | Configuración | Sustituir teléfono/WhatsApp/redes ficticios por datos reales | `app/(tabs)/index.tsx`, `app/(tabs)/contactanos.tsx` | Baja |
| AUD-006 | CRÍTICA | Configuración | Inicializar repositorio git + primer commit | (raíz) | Baja |
| AUD-007 | ALTA | Bug | `Linking.openURL` con `canOpenURL` + `try/catch` + fallback; utilidad centralizada | `utils/linking.ts` (nuevo), `index.tsx`, `contactanos.tsx` | Baja |
| AUD-008 | ALTA | Configuración | Añadir `android.package` e `ios.bundleIdentifier`; política de versionado | `app.json` | Baja |
| AUD-009 | ALTA | Arquitectura | Catálogo único `constants/services.ts` + `types/service.ts`; Inicio y Servicios lo consumen | `constants/`, `types/`, `app/(tabs)/index.tsx`, `app/(tabs)/servicios.tsx` | Media |
| AUD-010 | ALTA | Responsive | Header con `useSafeAreaInsets()` en vez de `paddingTop: 50` fijo | `styles/homeStyles.ts`, pantallas | Media |
| AUD-011 | ALTA | Performance | Optimizar imágenes (resize + compresión/WebP) y migrar a `expo-image` | `assets/images/`, todas las pantallas con `Image` | Media |
| AUD-012 | MEDIA | UX | `paddingBottom` en ScrollViews de Inicio, Galería, Trabaja, Contáctanos | 4 pantallas + `homeStyles.ts` | Baja |
| AUD-013 | MEDIA | Refactor | `constants/contact.ts` y `constants/colors.ts`; eliminar literales repetidos | `constants/`, `styles/homeStyles.ts`, pantallas | Media |
| AUD-014 | MEDIA | Refactor | Componentes `AppHeader` y `SheetModal` (unificar modales Galería/Redes) | `components/`, 5 pantallas | Media |
| AUD-015 | MEDIA | Refactor | Dividir `styles/homeStyles.ts` por pantalla/componente y borrar estilos muertos (`filter*`, `sectionTitle`) | `styles/` | Alta |
| AUD-016 | MEDIA | Cleanup | Podar plantilla (`components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js`) y deps huérfanas (`expo-symbols`, `expo-haptics`, `expo-web-browser`, `expo-linear-gradient`) | (varios) | Media |
| AUD-017 | MEDIA | UX | Definir el carrusel no interactivo de Galería (hacerlo funcional o quitar affordance) | `app/(tabs)/galeria.tsx` | Media |
| AUD-018 | MEDIA | Bug | URLs de redes → perfiles reales de CALLI (depende de AUD-005/AUD-013) | `app/(tabs)/index.tsx` | Baja |
| AUD-019 | MEDIA | Refactor | `router.navigate` en vez de `router.push` para navegar entre pestañas | `app/(tabs)/index.tsx` | Baja |
| AUD-020 | MEDIA | TypeScript | tsconfig más estricto (`noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`, `noUncheckedIndexedAccess`) | `tsconfig.json` | Baja |
| AUD-021 | BAJA | UX | Reemplazar placeholder de video en Inicio por video real o quitarlo | `app/(tabs)/index.tsx` | Baja |
| AUD-022 | BAJA | Responsive | `minHeight` en vez de `height` en botones/tarjetas con texto; revisar con escalado de fuente | `styles/homeStyles.ts` | Media |
| AUD-023 | BAJA | Responsive | Probar y ajustar barra de 5 tabs y grids en 320-360 dp | `app/(tabs)/_layout.tsx`, `styles/homeStyles.ts` | Media |
| AUD-024 | BAJA | UX | Accesibilidad: `accessibilityLabel`/`Role` en botones icónicos e imágenes; contraste de placeholders | pantallas, `styles/homeStyles.ts` | Media |
| AUD-025 | BAJA | Cleanup | Quitar `import React` de `trabaja.tsx`; homogeneizar sangría de imports | `app/(tabs)/trabaja.tsx` | Baja |
| AUD-026 | BAJA | Cleanup | Borrar assets sin usar (`logo.jpg`, `image.png`, `react-logo*`, `partial-react-logo`) | `assets/images/` | Baja |
| AUD-027 | BAJA | Cleanup | Quitar `title` redundante donde hay `tabBarLabel` personalizado | `app/(tabs)/_layout.tsx` | Baja |
| AUD-028 | BAJA | Configuración | `README.md` propio del proyecto | `README.md` | Baja |
| AUD-029 | BAJA | Configuración | `+not-found.tsx` con identidad de CALLI | `app/+not-found.tsx` (nuevo) | Baja |
| AUD-030 | BAJA | Configuración | `eas.json` + `projectId` + error boundary global (+ opcional Sentry) | (raíz), `app/_layout.tsx` | Media |

---

### Anexo — Comprobaciones ejecutadas (no destructivas)

| Comando | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ sin errores |
| `npx expo lint` | ✅ sin errores |
| `npx expo-doctor` | ⚠️ 17/18 — falla "Expo config schema": `icon.png` no cuadrado (1536×1024) |
| `npx expo install --check` | ✅ "Dependencies are up to date" |
| `npx expo export --platform android` | ✅ bundle OK (1062 módulos) — tras el parche de imágenes |
| `npm ls --depth=0` | ✅ sin `extraneous`/`invalid`/`UNMET` |
| `npx expo start` (arranque) | ✅ Metro levanta; entry bundle HTTP 200 (~4.8 MB) |
| Búsqueda `console.*` / `any` / `@ts-ignore` / `TODO` en `app/**` | ✅ ninguno |
| Búsqueda de secretos (`.env`, key/token/secret/password) | ✅ ninguno |

> Pendiente de **prueba manual** (no verificable estáticamente): comportamiento en notch/edge-to-edge, barra de 5 tabs en pantallas ≤360 dp, modal de Galería en teléfonos de poca altura, `Linking` sin app destino, y render de las 20 tarjetas de servicio una vez repuestas las imágenes reales.
