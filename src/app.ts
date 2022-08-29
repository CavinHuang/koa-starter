import 'reflect-metadata'
import { application } from '@/config'
import { Application } from './server'

const app = new Application(application)

app.start()