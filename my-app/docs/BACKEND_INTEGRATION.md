# Integración con Backend Django

## Configuración

### Variables de Entorno
Crea un archivo `.env.local` o configura en tu proyecto Vercel:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

## Estructura de API Esperada

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/signup` - Registrarse

### Libros
- `GET /api/libros/` - Obtener todos los libros
- `GET /api/libros/{id}/` - Obtener libro específico
- `POST /api/libros/` - Crear libro
- `PUT /api/libros/{id}/` - Actualizar libro
- `DELETE /api/libros/{id}/` - Eliminar libro

### Solicitudes de Préstamo
- `GET /api/solicitudes-prestamo/` - Obtener solicitudes
- `POST /api/solicitudes-prestamo/` - Crear solicitud
- `POST /api/solicitudes-prestamo/{id}/approve/` - Aprobar solicitud
- `POST /api/solicitudes-prestamo/{id}/reject/` - Rechazar solicitud

### Bienes
- `GET /api/bienes/` - Obtener todos los bienes
- `GET /api/bienes/{id}/` - Obtener bien específico
- `POST /api/bienes/` - Crear bien
- `PUT /api/bienes/{id}/` - Actualizar bien
- `DELETE /api/bienes/{id}/` - Eliminar bien

### Solicitudes de Bienes
- `GET /api/solicitudes-bien/` - Obtener solicitudes
- `POST /api/solicitudes-bien/` - Crear solicitud
- `POST /api/solicitudes-bien/{id}/approve/` - Aprobar solicitud
- `POST /api/solicitudes-bien/{id}/reject/` - Rechazar solicitud

## Estructura de Respuesta

Todas las respuestas deben seguir este formato:

\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`

## Autenticación con Token

Los requests incluyen el token JWT en el header `Authorization`:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Ejemplo de Uso en Componentes

\`\`\`typescript
import { LibrosService } from '@/lib/services/libros.service';

export default function MyComponent() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    LibrosService.getLibros().then(setLibros);
  }, []);

  return (
    // ...
  );
}
