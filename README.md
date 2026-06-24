# LuminaStudios Discord Bot (Groq AI)

Bu proje, LuminaStudios Software Company için özel olarak tasarlanmış, Groq API (Llama 3.3) destekli çok amaçlı bir Discord botudur. Moderasyon, ekonomi ve eğlence odağıyla Türkçe olarak yanıt verir.

## 🚀 Kurulum Adımları

1. **Geliştirici Portalı Ayarları:**
   - [Discord Developer Portal](https://discord.com/developers/applications) adresine gidin.
   - Yeni bir uygulama oluşturun ve **Bot** sekmesine tıklayın.
   - **Privileged Gateway Intents** kısmından aşağıdaki izinleri aktif edin:
     - `PRESENCE INTENT`
     - `SERVER MEMBERS INTENT`
     - `MESSAGE CONTENT INTENT` (Kritik)

2. **Dosyaları Hazırlama:**
   - Proje klasöründeki `.env` dosyasını açın.
   - `DISCORD_TOKEN` kısmına Discord Bot Token'ınızı yapıştırın.
   - `GROQ_API_KEY` kısmına Groq Console'dan aldığınız API anahtarını yapıştırın.

3. **Bağımlılıkları Yükleme:**
   Klasörde terminali açıp şu komutu çalıştırın:
   ```bash
   npm install
   ```

4. **Botu Başlatma:**
   ```bash
   npm start
   ```

## 🎮 Kullanım ve Özellikler

- **Yapay Zeka Soru-Cevap:** Botu etiketleyerek ya da mesajınızın başına `!sor` ekleyerek Groq destekli yapay zekayla sohbet edebilirsiniz.
  - *Örnek:* `@LuminaBot sunucu kuralları nedir?` veya `!sor bana bir zar at`
- **Karakter ve Dil:** Bot her zaman Türkçe konuşur, kısa ve öz cevaplar verir; teknoloji, kalkan ve madeni para emojileri (🤖, 🛡️, 💰, 🎮) kullanır.

## 🛡️ Lisans
LuminaStudios Software Company. Tüm hakları saklıdır.
