import { Injectable, OnModuleInit } from '@nestjs/common'
import * as ngrok from 'ngrok'

@Injectable()
export class NgrokService implements OnModuleInit {

  public url: string
  async connect() {
    this.url = await ngrok.connect({
      addr: process.env.PORT || 3030,
    })
  }

  async disconnect(): Promise<void> {
    await ngrok.disconnect()
    console.log('Tunnel fermé')
  }

  onModuleInit(): any {
    this.connect().then(() => console.log('Tunnel ouvert', this.url)).catch(console.error)
  }

}
