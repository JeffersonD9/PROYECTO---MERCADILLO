import {config} from 'dotenv'

config()

//PORT

export const PORT = process.env.PORT || 3000
export const SECRET_TOKEN = "Secret-Token"

