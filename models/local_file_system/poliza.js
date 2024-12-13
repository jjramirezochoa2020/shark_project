import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const polizas = readJSON('./polizas.json')

export class PolizaModel {

    static async getAll ({ type }) {
        if (type) {
            return polizas.filter(
                poliza => poliza.type.toLowerCase() === type.toLowerCase()
            )
        }
        return polizas
    }

    static async getById ({ id }) {
        const poliza = polizas.find(poliza => poliza.id === id)
        return poliza
    }

    static async create ({ input }) {
        const newPoliza = {
            id: randomUUID(),
            ...input
        }
        polizas.push(newPoliza)
        return newPoliza
    }

    static async delete ({ id }) {
        const polizaIndex = polizas.findIndex(poliza => poliza.id === id)
        if (polizaIndex === -1) return false
        polizas.splice(polizaIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const polizaIndex = polizas.findIndex(poliza => poliza.id === id)
        if (polizaIndex === -1) return false
        polizas[polizaIndex] = {
            ...polizas[polizaIndex],
            ...input
        }
        return polizas[polizaIndex]
    }

}