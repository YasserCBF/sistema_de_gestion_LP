import { ApiClient } from "@/lib/api-client"

export interface Libro {
  id: number
  titulo: string
  autor: string
  isbn: string
  editorial: string
  año: number
  cantidad: number
  disponibles: number
  descripcion: string
}

export interface SolicitudPrestamo {
  id: number
  docente_id: number
  libro_id: number
  estado: "pendiente" | "aprobada" | "rechazada"
  fecha_solicitud: string
  fecha_respuesta?: string
}

export class LibrosService {
  static async getLibros(): Promise<Libro[]> {
    const { success, data } = await ApiClient.get<Libro[]>("/libros/")
    return success ? data || [] : []
  }

  static async getLibro(id: number): Promise<Libro | null> {
    const { success, data } = await ApiClient.get<Libro>(`/libros/${id}/`)
    return success ? data || null : null
  }

  static async createLibro(libro: Omit<Libro, "id" | "disponibles">): Promise<Libro | null> {
    const { success, data } = await ApiClient.post<Libro>("/libros/", libro)
    return success ? data || null : null
  }

  static async updateLibro(id: number, libro: Partial<Libro>): Promise<Libro | null> {
    const { success, data } = await ApiClient.put<Libro>(`/libros/${id}/`, libro)
    return success ? data || null : null
  }

  static async deleteLibro(id: number): Promise<boolean> {
    const { success } = await ApiClient.delete(`/libros/${id}/`)
    return success
  }

  static async getSolicitudesPrestamo(): Promise<SolicitudPrestamo[]> {
    const { success, data } = await ApiClient.get<SolicitudPrestamo[]>("/solicitudes-prestamo/")
    return success ? data || [] : []
  }

  static async createSolicitudPrestamo(libro_id: number, fecha_devolucion: string): Promise<SolicitudPrestamo | null> {
    const { success, data } = await ApiClient.post<SolicitudPrestamo>("/solicitudes-prestamo/", {
      libro_id,
      fecha_devolucion,
    })
    return success ? data || null : null
  }

  static async approveSolicitud(id: number): Promise<boolean> {
    const { success } = await ApiClient.post(`/solicitudes-prestamo/${id}/approve/`, {})
    return success
  }

  static async rejectSolicitud(id: number): Promise<boolean> {
    const { success } = await ApiClient.post(`/solicitudes-prestamo/${id}/reject/`, {})
    return success
  }
}
