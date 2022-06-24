// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



const dgram = require('dgram')


export default async function handler(req, res) {
  await query({host:"217.182.46.69"})
  .then((data) => 
    res.status(200).json(data)
  )
  .catch((e) => {
    console.log(e)
    return res.status(200).json("error")
  })
  
}       


function query(options) {
  return new Promise((resolve, reject) => {
    if (typeof options === 'string') options.host = options
    options.port = options.port || 7777
    options.timeout = options.timeout || 1000

    if (!options.host) return reject('Invalid port')

    if (!isFinite(options.port) || options.port < 1 || options.port > 65535)
      return reject('Invalid port')

      let response = {}

    request(options, 'i')
      .then((information) => {
        response.address = options.host
        response.port = options.port
        response.hostname = information.hostname
        response.gamemode = information.gamemode
        response.mapname = information.mapname
        response.passworded = information.passworded === 1
        response.maxplayers = information.maxplayers
        response.online = information.players

        request(options, 'r').then((rules) => {
          rules.lagcomp = rules.lagcomp === 'On'
          rules.weather = parseInt(rules.weather, 10) || null
          response.rules = rules

          if (response.online > 100) {
            response.players = []
            return resolve(response)
          } else {
            request(options, 'd')
              .then((players) => {
                response.players = players
                return resolve(response)
              })
              .catch((e) => {
                return reject(e)
              })
          }
        })
      })
      .catch((e) => {
        return reject(e)
      })
  })
}

function request(options, opcode) {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket('udp4')
    const packet = Buffer.alloc(10 + opcode.length)

    packet.write('SAMP')

    for (let i = 0; i < 4; ++i) packet[i + 4] = options.host.split('.')[i]

    packet[8] = options.port & 0xff
    packet[9] = (options.port >> 8) & 0xff
    packet[10] = opcode.charCodeAt(0)

    try {
      socket.send(packet, 0, packet.length, options.port, options.host, function (error) {
        if (error) return reject(error)
      })
    } catch (error) {
      return reject(error)
    }

    let controller = undefined

    const onTimeOut = function () {
      socket.close()
      return reject('Host unavailable')
    }

    controller = setTimeout(onTimeOut, options.timeout)

    socket.on('message', function (message) {
      if (controller) clearTimeout(controller)

      if (message.length < 11) return resolve(true)
      else {
        socket.close()

        message = message.slice(11)

        let object = {}
        let array = []
        let strlen = 0
        let offset = 0

        try {
          if (opcode == 'i') {
            object.passworded = message.readUInt8(offset)
            offset += 1

            object.players = message.readUInt16LE(offset)
            offset += 2

            object.maxplayers = message.readUInt16LE(offset)
            offset += 2

            strlen = message.readUInt16LE(offset)
            offset += 4

            object.hostname = decode(message.slice(offset, (offset += strlen)))

            strlen = message.readUInt16LE(offset)
            offset += 4

            object.gamemode = decode(message.slice(offset, (offset += strlen)))

            strlen = message.readUInt16LE(offset)
            offset += 4

            object.mapname = decode(message.slice(offset, (offset += strlen)))

            return resolve(object)
          }

          if (opcode == 'r') {
            let rulecount = message.readUInt16LE(offset)
            offset += 2

            let property = undefined
            let value = undefined

            while (rulecount) {
              strlen = message.readUInt8(offset)
              ++offset

              property = decode(message.slice(offset, (offset += strlen)))

              strlen = message.readUInt8(offset)
              ++offset

              value = decode(message.slice(offset, (offset += strlen)))

              object[property] = value

              --rulecount
            }

            return resolve(object)
          }

          if (opcode == 'd') {
            let playercount = message.readUInt16LE(offset)
            offset += 2

            let player = undefined

            while (playercount) {
              player = {}

              player.id = message.readUInt8(offset)
              ++offset

              strlen = message.readUInt8(offset)
              ++offset

              player.name = decode(message.slice(offset, (offset += strlen)))

              player.score = message.readUInt16LE(offset)
              offset += 4

              player.ping = message.readUInt16LE(offset)
              offset += 4

              array.push(player)

              --playercount
            }

            return resolve(array)
          }
        } catch (exception) {
          return reject(exception)
        }
      }
    })
  })
}

function decode(buffer) {
  let charset = ''
  for (let i = 0; i < 128; i++) charset += String.fromCharCode(i)
  charset +=
    '€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�'
    let charsetBuffer = Buffer.from(charset, 'ucs2')
    let decodeBuffer = Buffer.alloc(buffer.length * 2)
  for (let i = 0; i < buffer.length; i++) {
    decodeBuffer[i * 2] = charsetBuffer[buffer[i] * 2]
    decodeBuffer[i * 2 + 1] = charsetBuffer[buffer[i] * 2 + 1]
  }
  return decodeBuffer.toString('ucs2')
}

