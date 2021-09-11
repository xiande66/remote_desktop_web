import { io } from 'socket.io-client'
const socket = (ws) => {
  return io('ws://localhost:3000', {
    reconnectionDelayMax: 10000,
    auth: {
      token: '123',
    },
    query: {
      'my-key': 'my-value',
    },
  })
}
export default socket
