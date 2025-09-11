import { Request, Response } from "express"

class AuthController {
    testServer(req:Request, res:Response) {
        try {
            res.status(200).send({
                status: 200,
                message: 'The server is working'
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Error occured in server'
            })

            throw new Error(typeof error === "string" ? error : JSON.stringify(error))
        }
    }
}

export default new AuthController