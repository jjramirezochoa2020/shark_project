import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://test:Password123@cluster0.dylba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Create a MongoClient with a MongoClientOptions object to set the stable API version
const client = new MongoClient (uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect () {
    try {
        await client.connect()
        const database = client.db('polizas_db')
        return database.collection('polizas')
    }
    catch (error) {
        console.error('Error connecting to the database...')
        console.error(error)
        await client.close()
    }
}

export class PolizaModel {

    static async getAll({ type }) {
        const db = await connect();
    
        if (type) {
            return db.find({
                type: {
                    $regex: type, // Busca coincidencias con el valor de `type`
                    $options: 'i' // Insensible a mayúsculas y minúsculas
                }
            }).toArray();
        }
        return db.find({}).toArray(); // Si no se pasa `type`, devuelve todos los documentos
    }

    static async getById ({ id }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return db.findOne({ _id: objectId })
    }

    static async create ({ input }) {
        const db = await connect()
        const { insertId } = await db.insertOne(input)
        return {
            id: insertId,
            ...input
        }
    }

    static async delete ({ id }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        const { deletedCount } = await db.deleteOne({ _id: objectId })
        return deletedCount > 0
    }

    static async update ({ id, input }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, {returnNewDocument: true})
        if (!ok) return false
        return value
    }

}