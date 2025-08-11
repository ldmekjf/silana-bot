import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let input = `[!] *exemple*\n\n${usedPrefix + command} despacito`
    if (!text) return m.reply(input)

    m.react('⏱️')

    try {
        // 1. البحث عن الأغنية في YouTube
        let search = await yts(text)
        let video = search.videos[0] // أول نتيجة
        if (!video) return m.reply('⚠️ لم أجد أي نتائج للأغنية المطلوبة.')

        let title = video.title
        let url = video.url
        let duration = video.timestamp
        let thumbnail = video.thumbnail

        // 2. جلب رابط MP3 عبر API خارجي
        let { data } = await axios.get(`https://api.akuari.my.id/downloader/youtube?link=${url}`)
        let audioUrl = data.audio // رابط الـ mp3

        // 3. إرسال الأغنية للمستخدم
        await conn.sendFile(
            m.chat,
            audioUrl,
            `${title}.mp3`,
            `🎵: ${title}\n🕒: ${duration}\n🔗: ${url}`,
            m,
            false,
            { mimetype: 'audio/mpeg' }
        )

        m.react('✅')

    } catch (err) {
        console.error(err)
        m.reply('❌ حدث خطأ أثناء جلب الأغنية.')
    }
}

handler.help = ['song <اسم_الأغنية>']
handler.tags = ['downloader']
handler.command = /^song$/i
handler.limit = true
handler.register = false

export default handler
