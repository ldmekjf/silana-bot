let fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
    if (!text) throw '⚠️ اكتب اسم الأغنية بعد الأمر.\nمثال: .song Despacito';

    m.reply('⏳ جارٍ البحث عن الأغنية، انتظر قليلاً...');

    try {
        // API مجاني لتحميل الأغاني (استبدله إذا كان لديك API آخر)
        let api = `https://api.dreaded.site/api/dl/ytmp3?url=https://www.youtube.com/results?search_query=${encodeURIComponent(text)}&apikey=dreadedapikey`;
        
        let res = await fetch(api);
        let data = await res.json();

        if (!data || !data.result || !data.result.download) {
            throw '❌ لم أستطع إيجاد الأغنية.';
        }

        let url = data.result.download;
        await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mp4' }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply('❌ حدث خطأ أثناء جلب الأغنية.');
    }
};

handler.command = /^song$/i;
handler.help = ['song <اسم الأغنية>'];
handler.tags = ['music'];

module.exports = handler;
