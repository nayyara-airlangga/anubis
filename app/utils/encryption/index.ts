import CryptoES from "crypto-es"

const encryptText = (text: string, key: string) => {
  const encryptedText = CryptoES.AES.encrypt(text, key).toString()
  return encryptedText as string
}

const decryptText = (encryptedText: string, key: string) => {
  const decryptedBytes = CryptoES.AES.decrypt(encryptedText, key)
  const decryptedText = decryptedBytes.toString(CryptoES.enc.Utf8)
  return decryptedText as string
}

export { encryptText, decryptText }
