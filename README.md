# Gizem & Bekir — 17 Kasım 2023 • Bizim Küçük Evrenimiz ❤️

**Gizem & Bekir**'in **17 Kasım 2023** yıldönümü için özel olarak hazırlanmış, **Canva tarzı bebek mavisi & hafif açık yeşil** temalı, etkileşimli romantik web uygulaması.

🌐 **Canlı Site:** https://zeosapka.github.io/bekir-gizem-universe/

---

## Öne Çıkan Özellikler

- **Canva Tarzı Çiçek Açılışı:** Bebek mavisi & pastel yeşil kemerli açılış sahnesinde kadife gül, çok renkli gerçekçi laleler (mercan, sarı, leylak) ve beyaz papatyalar birlikte açar.
- **Sağ & Sol Akan Fotoğraf Şeritleri:** Geniş ekran ve yatay tabletlerde (`1024px+`) sağ ve sol yan boşluklardan yarı şeffaf, `G & B` filigranlı fotoğraflar rastgele sırayla akar.
- **Gizem'in Keşif Yolculuğu (Harita Modu):** *Geçmişimiz*, *Birbirimizi Tanıyoruz*, *Küçük Sırlarımız*, *Hayallerimiz* ve *Kalbin Hazinesi* duraklarından oluşan 5 bölgeli interaktif harita.
- **Gizem & Bekir'in Özel Kareleri:** 3'lü vitrin çerçevesi (istendiğinde cihazdan yeni fotoğraf yüklenebilir).
- **17 Kasım 2023 Geçen Süre Sayacı:** 17 Kasım 2023'ten bugüne geçen toplam gün, saat, dakika, saniye ve yıl sayacı.
- **O Gecenin Yıldız Haritası:** **Serdivan, Sakarya (`40.76° K, 30.36° D`)** için 17 Kasım 2023 (~20:00) gökyüzündeki gerçek takımyıldızları ve **%20 İlk Hilal** ay evresi.
- **Her Gün Bir Neden, Sonsuz Sarılma & Bekir'in 17 Nedeni:** Takvim gününe göre değişen günlük mesajlar, konfetili sarılma butonu ve 17 açılabilir anı/mesaj/fotoğraf kartı.
- **G ❤️ B Mühürlü Aşk Mektubu:** Altın balmumu mühre dokunularak açılan, satır satır beliren özel yıldönümü mektubu.
- **Altın Kupon Defteri, Dilek Kavanozu & Mini Oyunlar:** 4 özel aşk kuponu, ortak dilek kavanozu, Randevu Çarkı, Çift Uyum Testi, **Aşk Hafıza Kartları**, *Gizli Yıldızı Bul* ve *Kalbin Şifresi*.
- **Bizim Küçük Anılarımız (3B Galeri):** 6 adet çift taraflı dönebilen fotoğraf çerçevesi.
- **5 Aydınlık Sürpriz Kutusu & Yazılı Havai Fişek Finali:** 2. kutuda 6 farklı dünya çiçeği (*gül, orkide, ayçiçeği, lale, beyaz zambak, kiraz çiçeği*) açan bahçe; finalde ise gökyüzünde **"SENİ ÇOK SEVİYORUM"** yazısı oluşturan havai fişekler ve **100 dilde Seni Seviyorum** listesi.
- **Müzik Çalar:** Sol üstte **Sezen Aksu — Haydi Gel Benimle Ol** parçası için başlatma/duraklatma ve ses açma/kapatma kontrolü.

---

## Çalıştırma ve Kullanım Kılavuzu

### 1. Gereksinimler
- **Node.js 20+** ve **npm**

### 2. Yerelde Çalıştırma
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

### 3. Üretim Derlemesi (Build)
```bash
npm run build
```
Derlenen dosyalar `dist/` klasörüne çıkar.

### 4. İçerikleri Özelleştirme
- **Metinler, İsimler & Galeri:** [`src/config/universeConfig.ts`](src/config/universeConfig.ts)
- **Fotoğraflar:** [`public/moments/`](public/moments) klasöründeki görselleri güncelleyip vitrin ([`RomanticShowcaseBanner.tsx`](src/components/RomanticShowcaseBanner.tsx)), yan akış ([`SidePhotoStreams.tsx`](src/components/SidePhotoStreams.tsx)) ve 17 Neden ([`SeventeenReasonsAndHug.tsx`](src/components/SeventeenReasonsAndHug.tsx)) üzerinden bağlayabilirsiniz.
- **Müzik:** [`public/music/`](public/music) klasörüne MP3 dosyasını koyup `universeConfig.ts` içindeki `musicPlaylist` alanından seçebilirsiniz.

### 5. Tablet / Telefon Kullanım İpucu
- Açılışta müziği başlatmak için sol üstteki **Müziğimizi Başlat** butonuna dokunun (mobil/tablet tarayıcıları ilk dokunuş olmadan sesi otomatik başlatmaz).
- Tüm kutular, harita bölgeleri, kuponlar ve kartların ilerlemesi tarayıcıda (`localStorage`) saklanır; sayfa yenilense bile kaldığınız yerden devam edebilirsiniz.
- `main` branch'ine yapılan her `push` işlemi [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) üzerinden otomatik olarak **GitHub Pages**'e yayınlanır.
