# Auditoría de publicación en Google Play — CALLI Mobile

> Fecha: 2026-09-16 · Rol: revisión de seguridad/código (equivalente a la skill `security-review`, adaptada porque el repo no tiene remoto `origin` contra el cual diffear) + investigación de requisitos vigentes de Google Play (fuentes web citadas en §3).
> Alcance: (a) código y configuración actuales del repositorio, **incluyendo cambios sin commitear**; (b) ausencia/presencia de base de datos y conexiones de red; (c) requisitos de Google Play Store vigentes a septiembre 2026 para poder enviar la app a revisión.
> Continúa el trabajo de `AUDITORIA_CALLI_MOBILE.md` y `AUDITORIA_CODIGO_CALLI.md` (2026-08-28) — no repite sus hallazgos salvo que hayan cambiado de estado. **No se modificó código de implementación.** Único archivo creado: este reporte.

---

## 0. Veredicto

**No está lista para enviarse a Google Play todavía**, pero ya no por razones técnicas de arquitectura (esas se resolvieron en las últimas sesiones) sino por tres bloqueantes concretos y varios trámites administrativos que solo el usuario puede completar (cuenta, verificación de identidad, testers, assets legales).

El bloqueante técnico más grave y más fácil de arreglar es este: **toda la app — botones de llamar, WhatsApp, y el formulario de "Trabaja con nosotros" — apunta a un número de teléfono ficticio (`+52 999 123 4567`)**. Si se publica así, la app pasaría la revisión automática de Google (no es una violación de política) pero sería completamente inútil para un usuario real: llamaría o escribiría a un número que no es de CALLI.

---

## 1. Código — hallazgos (rol seguridad/calidad)

### 1.1 Estado del working tree (nuevo desde el 2026-08-28, sin commitear)

El repo tiene cambios **sin confirmar** que este reporte audita como si fueran el estado real, tal como se acordó:

- **Upgrade de Expo SDK 54 → 57** (React Native 0.81.5 → 0.86.3, React 19.0 → 19.2.3, expo-router 6→ ~57). `package.json`/`package-lock.json` modificados (+1695/-2539 líneas). `npm ls` confirma que `node_modules/expo` (57.0.22) sí coincide con lo declarado en `package.json` — el upgrade se instaló correctamente, no quedó a medias.
- **Borrado en working tree** (no confirmado con `git rm`, solo falta `git add`) de `components/`, `hooks/`, `constants/theme.ts`, `scripts/reset-project.js` — plantilla muerta de `create-expo-app` (`COD-15` del audit anterior). El borrado es correcto y coincide con la recomendación previa; falta decidir si se confirma.
- `app/(tabs)/servicios.tsx` modificado (+68/-0 aprox.): se agregó una nueva categoría "Legal" con 8 servicios (`Legal1.jpg`…`Legal8.jpg`, sí están `require`ados y sí existen en `assets/images/`).
- `styles/homeStyles.ts` modificado (2 líneas).
- `app.json` modificado (ver §1.3).

**Recomendación:** antes de tocar nada de Play Store, decidir con el usuario si este upgrade y esta limpieza se confirman (`git add` + commit) o se revierten. Publicar con un working tree sucio no es correcto independientemente de la tienda.

### 1.2 Nuevo — imágenes huérfanas añadidas (bloatan el APK sin usarse)

4 imágenes nuevas están en `assets/images/` pero **no las referencia ningún archivo** (verificado con grep en todo el repo):

- `HipotecasGravamenesRegistro.png`
- `RegularizacionPrediosMujer.png`
- `TramitesEscrituracionFirma.png`
- `TramitesEscrituracionNotaria.png`

Hipótesis: iban destinadas a `app/(tabs)/index.tsx` (el carrusel de Inicio) como parte de la misma categoría "Legal" que sí se agregó en `servicios.tsx`, pero ese archivo no se tocó — es la misma duplicación de catálogo ya señalada como `AUD-009`/`COD-03` en la auditoría anterior, ahora manifestada como contenido a medio integrar. Si no se van a usar, hay que borrarlas; si sí, falta cablear `index.tsx`.

### 1.3 Reconfirmado — placeholder de contacto (bloqueante real, `AUD-005`)

`PHONE_NUMBER = "+529991234567"` y `WHATSAPP_NUMBER = "529991234567"` siguen duplicados, sin cambios, en:

- `app/(tabs)/index.tsx:116-117`
- `app/(tabs)/contactanos.tsx:13-14`
- `app/(tabs)/servicios.tsx:303-304`
- `app/(tabs)/trabaja.tsx:16`

El formulario "Trabaja con nosotros" (`AUD-002`) **ya está resuelto** desde la última auditoría: tiene estado real (`useState` por campo), valida campos vacíos con `Alert.alert`, y en `handleSubmit` arma un mensaje y lo manda por `wa.me` — un patrón razonable para una app sin backend. Pero como usa el mismo número placeholder, la postulación llegaría a un WhatsApp que no existe.

**Esto es lo único que de verdad urge antes de cualquier trámite de Play Store**: reemplazar el número en los 4 archivos por el real de CALLI (y las URLs de redes sociales genéricas que señala `AUD-005`).

### 1.4 Reconfirmado abierto — `Linking.openURL` sin `.catch` (`COD-01`)

Persisten llamadas sin manejo de error en `index.tsx:124,128,136` (a diferencia de las que sí tienen `.catch()` en el resto del archivo y en `trabaja.tsx`/`servicios.tsx`/`contactanos.tsx`). Si el dispositivo no tiene WhatsApp instalado o no soporta `tel:` (tablets, algunos emuladores), esas tres llamadas producen una promesa rechazada sin capturar → puede aparecer como *unhandled promise rejection* en los logs de Play Console/Crashlytics si algún día se agrega reporting, y en dispositivos estrictos puede escalar a warning visible. Fix es trivial (agregar `.catch(() => {})` igual que las otras 17 llamadas del proyecto).

### 1.5 Dependencias — `npm audit`

15 vulnerabilidades "moderate", todas en la cadena `@expo/config-plugins → xcode` (herramienta de build, no código que se empaqueta en el APK/IPA final) y arrastradas por `expo`/`expo-splash-screen`. `npm audit fix` sugiere "downgrade" a `expo@46` porque no tiene el `advisory` reindexado para SDK 57 (falso positivo de resolución, no una regresión real). **Riesgo real: bajo** — son dependencias de tiempo de compilación (Node/CLI), no runtime de la app instalada en el teléfono. No bloquea Play Store. Verificar de nuevo con `npm audit` cuando el ecosistema de Expo 57 tenga sus advisories actualizados.

### 1.6 Superficie de seguridad — sin novedades

Sin `.env`, sin claves ni tokens hardcodeados, sin `eval`, sin `WebView` con `injectedJavaScript`, sin `AsyncStorage`/`SecureStore` (no hay nada que persistir), sin permisos nativos declarados (no hay carpetas `android/`/`ios/` — workflow managed puro). Consistente con la nota "Seguridad 7/10" de la auditoría de agosto.

---

## 2. Base de datos y conexiones — resultado: no existen

Verificado exhaustivamente (grep de `fetch`, `axios`, `supabase`, `firebase`, `database`, `apiKey`, `.env`, `AsyncStorage`, `SecureStore` en todo `app/`; revisión de `package.json`):

- **No hay backend, API, ni base de datos.** CALLI Mobile es una app 100% estática: catálogo de servicios, galería de fotos, y contacto — todo hardcodeado en el bundle.
- **No hay ninguna conexión de red saliente propia.** Los únicos "enlaces externos" son `Linking.openURL` hacia `tel:`, `wa.me` (WhatsApp) y presumiblemente redes sociales — el sistema operativo abre la app externa correspondiente; CALLI Mobile no hace ninguna petición HTTP por su cuenta.
- **No hay analytics, crash reporting, ni SDK de terceros** (ni Firebase, ni Sentry, ni ningún ads network) en `package.json`.

**Implicación para Play Store (bueno):** la superficie de riesgo de seguridad/privacidad es mínima — no hay tokens que filtrar, no hay tráfico que interceptar, no hay PII que se transmita a ningún servidor propio.

**Implicación (a decidir, no bloqueante):** sin analytics ni crash reporting, si la app falla en producción para un usuario real, nadie se entera. No es necesario para publicar, pero es una recomendación típica de release si el usuario quiere visibilidad post-lanzamiento (p. ej. Sentry o Firebase Crashlytics, ambos gratuitos en el tier básico). **No lo agregué — decisión del usuario**, y si se agrega hay que revisarlo contra el Data Safety form (§3.5).

---

## 3. Requisitos de Google Play Store — vigentes a septiembre 2026 (investigado)

### 3.1 Cuenta de desarrollador

- Cuota única de **USD 25** (sin renovación anual), pagada una sola vez al crear la cuenta. ([iconikai.com](https://www.iconikai.com/blog/google-play-developer-account-fee-2026))
- **Verificación de identidad obligatoria para toda cuenta nueva** desde septiembre de 2026: subida de documento de identidad y, en algunos casos, selfie. Toma entre 2 y 5 días hábiles. **No se puede publicar en producción sin completarla**, aunque sí se puede preparar el listing y subir builds mientras se verifica. La cuota no se reembolsa si la verificación falla. ([testerbee.com](https://testerbee.com/blog/google-play-developer-verification-2026), [afkarsoftware.com](https://afkarsoftware.com/en/blog-detail/google-play-console-account-2026-one-time-25-fee/))
- Cuenta de **organización** (empresa) requiere además número D-U-N-S y documentación del negocio — a valorar si CALLI se publica como cuenta individual o como negocio formal.

**Pregunta abierta (necesito que la respondas):** ¿ya tienes cuenta de Play Console creada (individual u organización), o hay que partir de cero? Esto cambia el plazo real antes de poder publicar (la verificación de identidad sola ya toma días).

### 3.2 Testing cerrado obligatorio para cuentas nuevas (regla de los "testers")

Si la cuenta de Play Console es **personal y se creó a partir del 13 de noviembre de 2023**, Google exige antes de poder pasar a producción: **una prueba cerrada (closed testing) con mínimo 12 testers opt-in activos durante 14 días consecutivos** (bajó de 20 a 12 el 11 de diciembre de 2024). Esto aplica **por cada app nueva**. Las cuentas de **organización** están exentas de este requisito. ([support.google.com](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en), [primetestlab.com](https://primetestlab.com/blog/google-play-changed-20-to-12-testers))

**Implicación práctica:** si la cuenta va a ser personal (no de empresa), hay que conseguir 12 personas que instalen la app vía el track de "prueba cerrada" y la mantengan activa 14 días antes de poder enviarla a producción — esto es un plazo de calendario real, no algo que yo pueda acelerar.

**Pregunta abierta:** ¿la cuenta será personal o de organización/empresa? Si es personal, ¿tienes ya 12 personas (empleados, clientes, familiares) dispuestas a instalar una build de prueba 14 días?

### 3.3 Requisitos técnicos de la build

- **Formato:** Google exige subir **Android App Bundle (.aab)**, no APK, para publicar en producción (el APK del perfil `preview` de tu `eas.json` sirve solo para pruebas internas/testing manual, no para el listing final — para producción se necesita generar con el perfil `production` de EAS, que sí produce `.aab` por defecto).
- **Target API level:** desde el **31 de agosto de 2026**, toda app nueva o actualización debe apuntar a **Android 16 (API 36)** como mínimo para poder subirse (hay extensión posible hasta el 1 de noviembre de 2026 solicitándola). Las apps ya existentes que no lleguen a API 35 dejan de ser visibles para usuarios nuevos en dispositivos con Android más reciente. ([foresightmobile.com](https://foresightmobile.com/blog/complete-guide-to-android-app-publishing-in-2026), [support.google.com](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en))
  - **No pude confirmar con certeza** qué `targetSdkVersion`/`compileSdkVersion` genera Expo SDK 57 por defecto (la documentación pública no lo detalla de forma explícita en lo que encontré). Dado que SDK 57 es muy reciente, es probable que ya apunte a API 36, pero **hay que verificarlo con una build real** (`eas build --profile production -p android` y revisar el manifest generado, o `expo config --type public`) antes de asumirlo. Si no, se ajusta con el plugin `expo-build-properties`.
- **App Signing por Google Play:** recomendado dejar que Google gestione la firma (Play App Signing) — EAS lo soporta directamente.

### 3.4 Contenido del listing (assets que hay que producir — ninguno existe hoy en el repo)

No encontré en el proyecto: ícono de listing en alta resolución (distinto al icon.png de la app), **feature graphic** (1024×500, obligatorio), capturas de pantalla (mínimo 2 por tipo de dispositivo declarado), descripción corta (80 caracteres) y larga (4000 caracteres), categoría de la app, y clasificación de contenido (cuestionario **IARC** dentro de Play Console — determina el rating por edad).

**Pregunta abierta:** ¿quieres que te ayude a redactar la descripción corta/larga y a armar el cuestionario de clasificación de contenido, o eso lo maneja alguien más del lado de negocio?

### 3.5 Política de privacidad y Data Safety form — obligatorios aunque no se recolecte nada

Google exige **política de privacidad publicada (URL pública)** y el formulario **Data safety** completo para **toda** app, sin excepción — incluidas apps que, como CALLI Mobile, no recolectan ningún dato (§2). En ese caso el formulario simplemente se declara "no data collected or shared", pero **hay que tener la URL de la política igual**. ([support.google.com](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [respectlytics.com](https://respectlytics.com/blog/google-play-data-safety-guide/))

**Pregunta abierta:** ¿CALLI ya tiene una política de privacidad publicada en algún sitio (web de la empresa, etc.), o hay que redactarla y alojarla en algún lado? Dado que la app no recolecta datos, puede ser un documento corto, pero **igual necesita una URL pública real** — no puede ser un archivo local del repo.

### 3.6 Cuestionario de contenido (App content) en Play Console

Además de IARC, Play Console pide declarar: público objetivo (target audience — si aplica a niños cambia todo el flujo de revisión), si la app tiene anuncios (no, según §2), acceso a datos financieros/salud (no aplica), y una declaración de "app de noticias"/COVID/elecciones (no aplica). Esto se llena directo en consola al momento de publicar, no requiere trabajo de código.

### 3.7 Nombre del paquete y branding

`com.calli.mobile` (Android) / `com.calli.mobile` (iOS) ya están fijados en `app.json` desde la sesión anterior — **verificar que nadie más lo haya registrado ya en Play Console** (los `package name` son únicos y permanentes una vez publicados, no se pueden cambiar después).

---

## 4. Checklist priorizado

**Bloqueante técnico — antes que nada (lo puedo hacer yo cuando me digas):**
1. Reemplazar el número placeholder `+529991234567` por el real en los 4 archivos (§1.3) y las URLs de redes sociales genéricas (`AUD-005`).
2. Decidir y confirmar (commit o revert) el upgrade a Expo 57 y el borrado de plantilla muerta (§1.1).
3. Agregar `.catch()` a las 3 llamadas de `Linking.openURL` sin protección en `index.tsx` (§1.4).
4. Resolver las 4 imágenes huérfanas: o se cablean en `index.tsx` o se borran (§1.2).
5. Verificar `targetSdkVersion`/`compileSdkVersion` real de una build EAS contra el requisito API 36 (§3.3).

**Bloqueante administrativo/de negocio — solo tú puedes avanzarlo:**
6. Crear (o confirmar que ya existe) la cuenta de Google Play Console y decidir personal vs. organización (§3.1).
7. Completar la verificación de identidad de Google (2-5 días hábiles) (§3.1).
8. Si la cuenta es personal: conseguir 12 testers y correr 14 días de prueba cerrada (§3.2) — este es el paso que más tiempo de calendario consume.
9. Redactar y publicar una política de privacidad con URL pública (§3.5).
10. Producir feature graphic, capturas de pantalla, descripciones corta/larga, y completar el cuestionario de contenido/IARC (§3.4, §3.6).

---

## 5. Lo que necesito que me respondas para seguir

1. ¿Confirmo el upgrade a Expo 57 y el borrado de la plantilla muerta (commit), o lo revertimos?
2. ¿Cuál es el número de teléfono/WhatsApp real de CALLI (y las URLs reales de redes sociales) para reemplazar el placeholder?
3. ¿Las 4 imágenes huérfanas (`HipotecasGravamenesRegistro.png`, `RegularizacionPrediosMujer.png`, `TramitesEscrituracionFirma.png`, `TramitesEscrituracionNotaria.png`) van a usarse en `index.tsx` como parte de la categoría "Legal", o las borro?
4. ¿Ya tienes cuenta de Google Play Console? ¿Personal o de organización/empresa?
5. ¿Ya existe una política de privacidad publicada para CALLI, o hay que redactarla y necesitas que te ayude con eso (y con dónde alojarla)?
6. ¿Quieres que prepare yo la descripción corta/larga del listing y te deje el checklist del cuestionario de contenido, o eso lo maneja alguien más?

No voy a tocar código de implementación hasta que me confirmes el punto 1 y me des los datos reales de los puntos 2 y 3.
