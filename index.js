require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, Events } = require('discord.js');
const http = require('http');

// Validate critical environment variables
if (!process.env.DISCORD_TOKEN) {
    console.error('Hata: DISCORD_TOKEN .env dosyasında tanımlanmamış!');
    process.exit(1);
}

// Simple HTTP Server to keep the bot alive on free hosting providers (like Glitch/Render)
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write('LuminaStudios AI Bot Aktif! 🤖');
    res.end();
}).listen(process.env.PORT || 3000, () => {
    console.log('Keep-alive sunucusu port ' + (process.env.PORT || 3000) + ' üzerinde dinleniyor.');
});

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Get Groq API key
const groqApiKey = process.env.GROQ_API_KEY || null;
if (!groqApiKey) {
    console.warn('Uyarı: GROQ_API_KEY tanımlanmamış. Yapay zeka özellikleri çalışmayacak.');
}

// System Prompt for LuminaStudios Assistant
const SYSTEM_PROMPT = `
Sen LuminaStudios Yazılım Şirketi'nin Discord sunucusu için tasarlanmış gelişmiş bir yapay zeka asistanısın.
Kullanıcılara yanıt verirken aşağıdaki kurallara kesinlikle uymalısın:
1. Kesinlikle TÜRKÇE yanıt vermelisin.
2. Yanıtların kısa, öz, profesyonel ama samimi olmalıdır.
3. Teknolojik, koruma/kalkan ve para emojilerini (🤖, 🛡️, 💰, 🎮) uygun yerlerde kullanmalısın.
4. Sunucu yönetimi, eğlenceli aktiviteler ve genel sorular hakkında akıllı bir asistan gibi davran.
`;

client.once(Events.ClientReady, () => {
    console.log(`🤖 LuminaStudios AI botu ${client.user.tag} olarak başarıyla başlatıldı!`);
    client.user.setActivity('Sorularınızı (.)', { type: ActivityType.Listening });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.trim();

    // AI Chat Feature: Starts with "."
    if (content.startsWith('.')) {
        const userPrompt = content.slice(1).trim();
        if (!userPrompt) {
            return message.reply('🤖 Merhaba! Benimle sohbet etmek için `.selam` veya `.nasılsın?` şeklinde mesaj gönderebilirsiniz! 🎮');
        }

        if (!groqApiKey) {
            return message.reply('🛡️ **Sistem Uyarısı:** Yapay zeka modülü aktif değil. Lütfen `.env` dosyasındaki `GROQ_API_KEY` alanını kontrol edin! 💰');
        }

        await message.channel.sendTyping();
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: userPrompt }
                    ],
                    model: 'llama-3.1-8b-instant',
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                const errMsg = errData.error?.message || `HTTP Hata Kodu: ${response.status}`;
                throw new Error(errMsg);
            }

            const data = await response.json();
            const responseText = data.choices?.[0]?.message?.content;
            if (responseText) {
                const reply = responseText.length > 2000 ? responseText.substring(0, 1997) + '...' : responseText;
                await message.reply(reply);
            } else {
                await message.reply('🤖 Yanıt oluşturulamadı. Lütfen tekrar deneyin. 🛡️');
            }
        } catch (error) {
            console.error('Groq API Hatası:', error);
            await message.reply(`💰 **Sistem Hatası:** Yapay zeka servisine bağlanılamadı.\n**Hata Detayı:** \`${error.message}\` 🛡️`);
        }
    }
});

// Login
client.login(process.env.DISCORD_TOKEN);
