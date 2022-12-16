import type { NextApiRequest, NextApiResponse } from 'next'
import ClownCryption, { Algorithms } from "clowncryption"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  if (req.headers["sec-fetch-site"] !== "same-origin" || req.method !== "POST") res.status(403).send("no")

  const settings = req.body

  let mes: string

  if (settings.mode === "en") {
    if (settings.encoding === "emoji") {
      mes = ClownCryption.encrypt({
        message: settings.message,
        key: settings.key,
        iv: settings.iv,
        salt: settings.salt,
        algorithm: ("aes" + settings.algore) as Algorithms,
        charset: settings.charsetType
      })
    } else {
      try {
        mes = ClownCryption.aesEncrypt(settings.message, settings.key, settings.iv, parseInt(settings.algore) as 128, settings.salt)
      } catch (err) {
        return res.status(500).send("Encryption Failed, check you have selected the correct mode and your settings are all correct.")
      }

      if (settings.charsetType === "binary") mes = mes.split("").map((val) => val.charCodeAt(0).toString(2).padStart(8, "0")).join("")
    }
  } else {
    if (settings.encoding === "emoji") {
      try {
        mes = ClownCryption.decrypt({
          message: settings.message,
          key: settings.key,
          iv: settings.iv,
          salt: settings.salt,
          algorithm: ("aes" + settings.algore) as Algorithms,
          charset: settings.charsetType
        })
      } catch (err) {
        return res.status(500).send("Decryption Failed, check you have selected the correct mode and your settings are all correct.")
      }
    } else {
      if (settings.charsetType === "binary") settings.message = (settings.message.match(/[01]{8}/g) as string[]).map((val) => String.fromCharCode(parseInt(val, 2))).join("")

      try {
        mes = ClownCryption.aesDecrypt(settings.message, settings.key, settings.iv, parseInt(settings.algore) as 128, settings.salt)
      } catch (err) {
        return res.status(500).send("Decryption Failed, check you have selected the correct mode and your settings are all correct.")
      }
    }
  }
  
  res.status(200).send(mes)
}
