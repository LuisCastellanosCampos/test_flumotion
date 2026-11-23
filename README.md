# Prototipo Portal de Vídeos Corporativos — Flumotion

Prototipo funcional full-stack que permite a un cliente corporativo mostrar, gestionar y reproducir sus vídeos desde una interfaz web inspirada en YouTube.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Back-end** | Node.js · TypeScript · Express 5 |
| **Persistencia** | Archivo `medias.json` (simula base de datos) |
| **Front-end** | React 19 · TypeScript · Vite |
| **Player** | iframe propietario de Flumotion (CDN API) |

---

## Estructura del proyecto

```
Proyecto Flumotion/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   │   └── media.ts              # Interfaces y tipos del dominio
│   │   ├── application/
│   │   │   ├── mediaRepository.ts    # Interfaz del repositorio (puerto)
│   │   │   └── mediaService.ts       # Lógica de negocio
│   │   ├── infrastructure/
│   │   │   ├── controllers/
│   │   │   │   └── mediaController.ts  # Controladores Express
│   │   │   └── repositories/
│   │   │       └── jsonMediaRepository.ts  # Adaptador JSON (persistencia)
│   │   ├── validation.ts             # Validaciones del payload
│   │   ├── validation.test.ts        # Tests unitarios
│   │   └── index.ts                  # Punto de entrada, inyección de dependencias
│   ├── medias.json                   # Base de datos en archivo
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx            # Cabecera con logo, navegación e idioma
│   │   │   ├── Player.tsx            # Player principal (iframe + fallback)
│   │   │   ├── MediaList.tsx         # Grid de miniaturas / playlist
│   │   │   ├── AddMediaForm.tsx      # Formulario de alta de vídeos
│   │   │   └── Footer.tsx
│   │   ├── hooks/
│   │   │   └── useMedias.ts          # Custom hook: fetch y estado de medias
│   │   ├── types/
│   │   │   └── media.ts              # Tipo Media del lado cliente
│   │   ├── translations.ts           # Traducciones ES / ES-MX / EN
│   │   ├── App.tsx
│   │   └── App.css
│   ├── public/                       # Logos e iconos de idioma
│   ├── index.html
│   └── package.json
│
├── Estimacion.TXT                    # Estimación y conclusiones del candidato
└── README.md
```

> La arquitectura del back-end sigue los principios de **Clean Architecture**: la capa de dominio no depende de ninguna infraestructura, el servicio de aplicación solo conoce la interfaz del repositorio (patrón puerto/adaptador), y la inyección de dependencias se realiza en el punto de entrada (`index.ts`).

---

## Requisitos previos

- **Node.js** v18 o superior (recomendado v22)
- **npm** v8 o superior

---

## Instrucciones de lanzamiento

> Arrancar **primero** el back-end para que el front-end pueda conectarse.

### 1. Back-end

```bash
cd backend
npm install
npm run dev
```

Servidor disponible en: **http://localhost:3001**

### 2. Front-end

```bash
cd frontend
npm install
npm run dev
```

Interfaz disponible en: **http://localhost:5173**

---

## Endpoints de la API

### `GET /getmedias`

Devuelve el array completo de medias almacenadas, enriqueciendo cada objeto con las rutas dinámicas de reproducción y miniatura calculadas en tiempo de ejecución.

**Respuesta exitosa `200 OK`:**
```json
[
  {
    "id": "uuid",
    "title": "Presentación Flumotion 2026",
    "description": "...",
    "duration": 120,
    "tags": "Corporativo, Promo",
    "filedata": {
      "bitrate": 2500,
      "fileSize": 25000000,
      "filename": "video.mp4"
    },
    "thumbnail": {
      "id": "uuid",
      "name": "thumb-Presentación",
      "filename": "video_3.jpg",
      "thumbnailroute": "https://progressive.codev8.net/userdatanew/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/thumbnails/video_3.jpg"
    },
    "mediaroute": "https://storagecdn.codev8.net/ondemand/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/video.mp4"
  }
]
```

---

### `POST /addmedias`

Valida y persiste un nuevo objeto media en el archivo `medias.json`. Devuelve `201 Created` con el objeto guardado, o `400 Bad Request` con el detalle de errores de validación.

**Cuerpo de la petición:**
```json
{
  "title": "Presentación Flumotion 2026",
  "description": "Vídeo de presentación corporativa",
  "duration": 120,
  "tags": "Corporativo, Promo",
  "filedata": {
    "bitrate": 2500,
    "fileSize": 25000000,
    "filename": "video.mp4"
  },
  "thumbnail": {
    "name": "thumb-Presentación Flumotion 2026",
    "filename": "video_3.jpg"
  }
}
```

**Respuesta exitosa `201 Created`:**
```json
{
  "message": "Media añadido correctamente",
  "data": { ... }
}
```

**Respuesta de error `400 Bad Request`:**
```json
{
  "error": "Datos inválidos para crear la media",
  "details": ["El campo 'title' es obligatorio", "..."]
}
```

---

## Ejecutar los tests unitarios

Los tests cubren la función `validateMediaPayload` y verifican: payload válido, payload incompleto, filenames con rutas inválidas, IDs duplicados y tipos de datos incorrectos.

```bash
cd backend
npx tsx --test src/validation.test.ts
```

---

## Build de producción (front-end)

```bash
cd frontend
npm run build
```

Los archivos estáticos se generan en `frontend/dist/`.

---

## Funcionalidades destacadas

- **Player dual**: player propietario de Flumotion vía `iframe` + reproductor HTML5 nativo como respaldo para demostraciones sin CDN.
- **Formulario de alta**: desde la propia interfaz se pueden añadir vídeos nuevos que se persisten en el back-end vía `POST /addmedias`.
- **Multi-idioma**: selector de idioma (Español / Español MX / English) persistido en `localStorage`.
- **Vídeo activo destacado**: el elemento seleccionado en la playlist se resalta visualmente de forma diferenciada.
- **Validaciones robustas**: el back-end rechaza filenames con rutas relativas (`../`, `/`), duraciones no enteras, IDs duplicados y campos obligatorios vacíos.
