import { randomUUID } from 'node:crypto'
import mysql from 'mysql2/promise'
import { ConnectionCheckOutFailedEvent } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT, 10), // Convierte el puerto a número
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const connection = await mysql.createConnection(config)

export class PolizaModel {

    static async getAll ({ type }) {
        if (type) {
            const [result] = await connection.query(
                `SELECT * FROM polizas WHERE type = "${type}"`
            )
            console.log(result)
            return result
        }
        
        const [result] = await connection.query(
            'SELECT * FROM polizas'
        )
        console.log(result)
        return result
    }

    static async getById ({ id }) {
        const [result] = await connection.query(
            `SELECT * FROM polizas WHERE id = "${id}"`
        )
        console.log(result)
        return result
    }

    static async create ({ input }) {
        const { id, type, id_user, company, expiration_date, url, value } = input;

        const [result] = await connection.query(
            `INSERT INTO polizas (id, type, id_user, company, expiration_date, url, value) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, type, id_user, company, expiration_date, url, value]
        )
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