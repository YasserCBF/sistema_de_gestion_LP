import { ApiClient } from "@/lib/api-client"

export interface Bien {
  id: number
  nombre: string
  codigo: string
  categoria: string
  cantidad: number
  disponibles: number
  estado: "disponible" | "en-uso" | "mantenimiento" | "descartado"
  valor: number
  ubicacion: string
  descripcion: string
}

export interface SolicitudBien {
  id: number
  docente_id: number
  bien_id: number
  cantidad: number
  motivo: string
  estado: "pendiente" | "aprobada" | "rechazada"
  fecha_solicitud: string
  fecha_respuesta?: string
}

export class BienesService {
  static async getBienes(): Promise<Bien[]> {
    const { success, data } = await ApiClient.get<Bien[]>("/bienes/")
    return success ? data || [] : []
  }

  static async getBien(id: number): Promise<Bien | null> {
    const { success, data } = await ApiClient.get<Bien>(`/bienes/${id}/`)
    return success ? data || null : null
  }

  static async createBien(bien: Omit<Bien, "id" | "disponibles">): Promise<Bien | null> {
    const { success, data } = await ApiClient.post<Bien>("/bienes/", bien)
    return success ? data || null : null
  }

  static async updateBien(id: number, bien: Partial<Bien>): Promise<Bien | null> {
    const { success, data } = await ApiClient.put<Bien>(`/bienes/${id}/`, bien)
    return success ? data || null : null
  }

  static async deleteBien(id: number): Promise<boolean> {
    const { success } = await ApiClient.delete(`/bienes/${id}/`)
    return success
  }

  static async getSolicitudesBien(): Promise<SolicitudBien[]> {
    const { success, data } = await ApiClient.get<SolicitudBien[]>("/solicitudes-bien/")
    return success ? data || [] : []
  }

  static async createSolicitudBien(
    bien_id: number,
    cantidad: number,
    motivo: string,
    fecha_devolucion: string,
  ): Promise<SolicitudBien | null> {
    const { success, data } = await ApiClient.post<SolicitudBien>("/solicitudes-bien/", {
      bien_id,
      cantidad,
      motivo,
      fecha_devolucion,
    })
    return success ? data || null : null
  }

  static async approveSolicitudBien(id: number): Promise<boolean> {
    const { success } = await ApiClient.post(`/solicitudes-bien/${id}/approve/`, {})
    return success
  }

  static async rejectSolicitudBien(id: number): Promise<boolean> {
    const { success } = await ApiClient.post(`/solicitudes-bien/${id}/reject/`, {})
    return success
  }
}
