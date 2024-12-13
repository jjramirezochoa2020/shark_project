// import { PolizaModel } from '../models/local_file_system/poliza.js'
// import { PolizaModel } from '../models/mongodb/poliza.js'
import { PolizaModel } from '../models/mysql/poliza.js'
import { validatePoliza, validatePartialPoliza } from '../schemas/polizas.js'

export class PolizaController {
    static async getAll (req, res) {
        const { type } = req.query
        const polizas = await PolizaModel.getAll({ type })
        res.json(polizas)
    }

    static async getById (req, res) {
        const { id } = req.params
        const poliza = await PolizaModel.getById({ id })
        if (poliza) return res.json(poliza)
        res.status(404).json({
             message: 'Poliza no encontrada' })
    }

    static async create (req, res) {
        const result = validatePoliza(req.body)

        if (!result.success) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }

        const newPoliza = await PolizaModel.create({ input: result.data })
        res.status(201).json(newPoliza)
    }

    static async delete (req, res) {
        const { id } = req.params

        const result = await PolizaModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Poliza no encontrada' })
        }

        return res.json( {
            message: 'Póliza eliminada'
        })
    }

    static async update (req, res) {
        const result = validatePartialPoliza(req.body)

        if (!result.success) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }

        const { id } = req.params
        const updatePoliza = await PolizaModel.update({
            id, 
            input: result.data
        })
        return res.json(updatePoliza)
    }

}