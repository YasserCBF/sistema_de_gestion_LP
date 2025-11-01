# Sistema de Gestión de Libros y Bienes

Sistema web de administración de inventario educativo para gestionar libros y activos de una institución educativa.

## Características Principales

### Para Docentes
- Solicitar préstamo de libros
- Solicitar uso de bienes y activos
- Ver historial completo de solicitudes
- Monitorear estado de solicitudes en tiempo real

### Para Admin de Biblioteca
- Registrar y editar libros
- Gestionar acervo bibliográfico completo
- Aprobar/rechazar solicitudes de préstamo
- Controlar disponibilidad de libros

### Para Admin de Bienes
- Registrar y editar bienes/activos
- Gestionar inventario de activos
- Categorizar bienes por tipo
- Aprobar/rechazar solicitudes de uso
- Monitorear disponibilidad

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Autenticación**: JWT + LocalStorage

### Backend (por conectar)
- **Framework**: Django
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT

## Estructura del Proyecto

\`\`\`
app/
├── dashboard/
│   ├── docente/
│   ├── admin-bienes/
│   └── admin-biblioteca/
├── auth/
│   ├── login/
│   └── signup/
└── api/
    └── auth/

components/
├── views/
│   ├── libro-register-view.tsx
│   ├── libros-inventory-view.tsx
│   ├── libros-requests-view.tsx
│   ├── bienes-register-view.tsx
│   ├── bienes-inventory-view.tsx
│   ├── bienes-requests-view.tsx
│   ├── solicitud-libro-view.tsx
│   ├── solicitud-bien-view.tsx
│   └── historial-solicitudes-view.tsx
├── ui/
│   └── [componentes shadcn/ui]
└── dashboard-layout.tsx

hooks/
└── use-auth.ts

lib/
├── api-client.ts
└── services/
    ├── libros.service.ts
    └── bienes.service.ts
\`\`\`

## Cómo Empezar

### 1. Instalación

\`\`\`bash
# Clonar repositorio
git clone <repository-url>
cd book-and-asset-management

# Instalar dependencias
npm install
# o
pnpm install
\`\`\`

### 2. Variables de Entorno

Crea un archivo `.env.local`:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

### 3. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Credenciales de Demo

- **Docente**: docente@edu.com / pass123
- **Admin Bienes**: admin-bienes@edu.com / pass123
- **Admin Biblioteca**: admin-lib@edu.com / pass123

## Flujos de Usuario

### Flujo de Solicitud de Libro (Docente)
1. Docente va a "Solicitar Préstamo"
2. Selecciona libro disponible
3. Define fecha de devolución
4. Añade motivo
5. Sistema envía solicitud a Admin Biblioteca
6. Admin Biblioteca recibe notificación
7. Admin aprueba/rechaza solicitud
8. Docente ve actualización de estado

### Flujo de Solicitud de Bien (Docente)
1. Docente va a "Solicitar Bien"
2. Selecciona bien disponible
3. Define cantidad y fecha de devolución
4. Añade motivo
5. Sistema envía solicitud a Admin Bienes
6. Admin Bienes recibe notificación
7. Admin aprueba/rechaza solicitud
8. Docente ve actualización de estado

## API Endpoints Esperados

### Autenticación
\`\`\`
POST /api/auth/login
POST /api/auth/signup
\`\`\`

### Libros
\`\`\`
GET    /api/libros/
GET    /api/libros/{id}/
POST   /api/libros/
PUT    /api/libros/{id}/
DELETE /api/libros/{id}/
\`\`\`

### Solicitudes de Préstamo
\`\`\`
GET    /api/solicitudes-prestamo/
POST   /api/solicitudes-prestamo/
POST   /api/solicitudes-prestamo/{id}/approve/
POST   /api/solicitudes-prestamo/{id}/reject/
\`\`\`

### Bienes
\`\`\`
GET    /api/bienes/
GET    /api/bienes/{id}/
POST   /api/bienes/
PUT    /api/bienes/{id}/
DELETE /api/bienes/{id}/
\`\`\`

### Solicitudes de Bienes
\`\`\`
GET    /api/solicitudes-bien/
POST   /api/solicitudes-bien/
POST   /api/solicitudes-bien/{id}/approve/
POST   /api/solicitudes-bien/{id}/reject/
\`\`\`

## Integración con Backend Django

Consulta [docs/BACKEND_INTEGRATION.md](./docs/BACKEND_INTEGRATION.md) para detalles sobre la integración.

## Características de Seguridad

- Autenticación JWT con tokens
- Protección de rutas según rol
- Validación de entrada
- CORS configurado
- Headers de seguridad

## Próximas Mejoras

- Notificaciones en tiempo real (WebSocket)
- Historial de auditoría
- Reportes y estadísticas
- Integración con calendario
- Exportación a PDF
- Sistema de multas/penalizaciones

## Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio.

## Licencia

Proyecto privado para uso institucional.
