import z from 'zod'

const polizaSchema = z.object({
    id: z.string({
        invalid_type_error: 'El ID de la póliza debe ser un string',
        required_error: 'El ID de la póliza es requerido'
    }),
    type: z.string({
        invalid_type_error: 'El tipo de póliza debe ser un string',
        required_error: 'El tipo de póliza es requerido'
    }),
    id_user: z.string({
        invalid_type_error: 'El ID del usuario debe ser un string',
        required_error: 'El ID del usuario es requerido'
    }),
    company: z.string({
        invalid_type_error: 'El nombre de la compañía debe ser un string',
        required_error: 'El nombre de la compañía debe ser un string'
    }),
    expiration_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha debe tener el formato YYYY-MM-DD"
    }),
    url: z.string({
        invalid_type_error: 'La url de la póliza debe ser un string',
        required_error: 'La url de la póliza debe ser un string'
    }),
    value: z.number().positive({ message: "El número debe ser mayor que cero" })
})

export function validatePoliza (input) {
    return polizaSchema.safeParse(input)
}

export function validatePartialPoliza (input) {
    return polizaSchema.partial().safeParse(input)
}