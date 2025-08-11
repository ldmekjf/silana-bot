import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `أين النص؟\n\nالاستخدام:\n${usedPrefix + command} <اسم الملف>\n\nمثال:\n${usedPrefix + command} menu`
    if (!m.quoted.text) throw `يرجى الرد على رسالة نصية تحتوي على الكود!`
    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`تم الحفظ في الملف: ${path}`)
}
handler.help = ['sfp']
handler.tags = ['owner']
handler.command = /^sfp$/i

handler.owner = true
export default handler
