export interface MomentItem {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  quote: string;
  /**
   * Özel fotoğraf yolu. Fotoğraflarınızı `/public/moments/` klasörüne ekleyip
   * `imageUrl: "./moments/foto1.jpg"` şeklinde tanımlayabilirsiniz.
   * Boş bırakıldığında (`""`), romantik takımyıldızı çerçevesi gösterilir.
   */
  imageUrl: string;
  accentColor: string;
  constellationName: string;
}

export const UNIVERSE_CONFIG = {
  recipientName: "Gizem",
  coupleNames: "Bekir & Gizem",
  siteTitle: "BEKİR & GİZEM — 17 KASIM 2023 • BİZİM KÜÇÜK EVRENİMİZ",
  // Hedef Yıldönümü Tarihi: 17 Kasım 2027, 00:00:00 (Bir sonraki 17 Kasım yıldönümü)
  birthdayIsoDate: "2027-11-17T00:00:00",
  birthdayDisplayDate: "17 Kasım 2023",

  // Tek Şarkılık Tam Süreli Romantik Müzik (/public/music/ içindeki MP3 kaydı)
  crossfadeSeconds: 4.0,
  musicPlaylist: [
    {
      id: "haydi-gel-benimle-ol",
      title: "Sezen Aksu — Haydi Gel Benimle Ol ❤️",
      src: "/music/Sezen Aksu - Haydi Gel Benimle Ol.mp3",
      startAtSeconds: 0,
      excerptDurationSeconds: 300,
      volumeScale: 1.0,
    },
  ],
  customAudioSrc: "/music/Sezen Aksu - Haydi Gel Benimle Ol.mp3",
  musicTrackTitle: "Sezen Aksu — Haydi Gel Benimle Ol ❤️",

  // Müzik Oynatıcı Metinleri
  musicPlayer: {
    playingLabel: "Müziğimiz Çalıyor",
    pausedLabel: "Müziğimizi Başlat",
    playAriaLabel: "Romantik müzik listesini başlat",
    pauseAriaLabel: "Müziği duraklat",
    nextTrackAriaLabel: "Sıradaki şarkıya yumuşak geçiş yap",
    muteAriaLabel: "Sesi kapat",
    unmuteAriaLabel: "Sesi aç",
  },

  // 0. Sinematik Çiçek Açma Katmanı (Gül, Lale ve Papatya Buketi)
  flowerIntro: {
    badgeText: "17 Kasım 2023 • Bekir & Gizem'in Çiçek Bahçesi",
    growingText:
      "17 Kasım 2023'ün en güzel hatırası için güller, laleler ve papatyalar senin için açıyor... 🌹🌷🌼",
    message: "Yıldönümümüz kutlu olsun biricik aşkım. ❤️",
    novemberSubtext:
      "17 Kasım 2023'te başlayan en güzel hikâyemize, Bekir'den Gizem'e...",
    touchHeartButtonText: "Gülün Kalbine Dokun ❤️",
    skipButtonText: "Animasyonu Geç",
    continueHint: "Karşılama ekranına geçiliyor...",
  },

  // 1. Açılış Ekranı (First Impression)
  opening: {
    quote: "İki kalbin aynı ritimde atmaya başladığı o gün, bütün evren güzelleşir.",
    greeting: "Yıldönümümüz kutlu olsun biricik aşkım ❤️",
    dateText: "17 Kasım 2023 • Bekir & Gizem",
    buttonText: "BİZİM KÜÇÜK EVRENİMİZE GİR",
  },

  // 2. Ana Kutlama Ekranı (Hero Celebration)
  hero: {
    headlinePrefix: "Yıldönümümüz kutlu olsun,",
    headlineHighlight: "biricik aşkım.",
    subheadline: "17 Kasım 2023'ten beri her günüm seninle daha anlamlı, daha güzel.",
    touchHint: "Küçük kalpleri uyandırmak için evrenin herhangi bir yerine dokun ✨",
    scrollButtonText: "Hikâyemizi Keşfet",
  },

  // 3. Geri Sayım Ekranı (Anniversary Elapsed Timer)
  countdown: {
    preTitle: "17 KASIM 2023'TEN BERİ BİRLİKTE GEÇEN ZAMAN",
    titlePrefix: "Her Saniye Aşkımızı",
    titleHighlight: "Birlikte Büyütüyor",
    celebrationHeadline: "17 KASIM — YILDÖNÜMÜMÜZ KUTLU OLSUN BİRİCİK AŞKIM!",
    celebrationSubtext:
      "Bekir & Gizem — 17 Kasım 2023'te başlayan hikâyemiz, bugün ve her gün tüm evreni aydınlatıyor. ❤️",
    units: {
      days: "Gün",
      hours: "Saat",
      minutes: "Dakika",
      seconds: "Saniye",
    },
    previewBirthdayButton: "Yıldönümü Kutlama Modunu Önizle (17 Kasım)",
    showLiveTimerButton: "Canlı Geri Sayımı Göster",
  },

  // 4. İnteraktif Aşk Mektubu (Interactive Love Letter)
  loveLetter: {
    badgeText: "Bekir'den Gizem'e • Yıldız Işığıyla Mühürlendi",
    envelopePrompt: "17 Kasım 2023'e özel, yalnızca sana yazılmış bir mektup...",
    sealInitials: "G ❤️ B",
    openEnvelopeAriaLabel: "Gizem için yazılan yıldönümü mektubunu aç",
    touchSealHint: "Açmak İçin Altın Mühre Dokun",
    headerLabel: "Yıldönümü Mektubu",
    showAllButton: "Tümünü Göster",
    foldButton: "Zarfı Kapat",
    salutation: "Canım Sevgilim Gizem,",
    paragraphs: [
      "İyi ki tanışmış, beraber olmuşuz seninle; iyi ki hayatlarımız karşılaşmış.",
      "Varlığın çok kıymetli bir hediye bana.",
      "Nice 17 Kasımlarımız birlikte olsun istiyorum. Birlikte bir ömür sağlıklı, mutlu ve huzurlu olmak dileğiyle inşAllah.",
      "Yıldönümümüz kutlu olsun en değerlim.",
      "Seni çok seviyorum.",
    ],
    signOff: "Seni çok seven Bekir... ❤️",
    foreverBadge: "17 Kasım 2023 • Sonsuza Dek",
  },

  // 5. Havai Fişek Kutlaması (Fireworks Celebration)
  fireworks: {
    badgeText: "Gökyüzü Senfonisi",
    sectionTitle: "Aşkımızla Geceyi Aydınlat",
    sectionSubtitle:
      "Bir saniyeliğine gözlerini kapat, bizim için en güzel dileğini tut ve aşağıdaki yıldız ışığına dokun.",
    buttonText: "BİZİM İÇİN BİR DİLEK TUT GİZEM ✨",
    modalTopHint: "✦ 17 Kasım 2023 • Bekir & Gizem ✦",
    skyMessage: "SENİNLE HER GÜNÜM BİR MUCİZE, GİZEM.",
    touchSkyHint:
      "Kalp havai fişekleri fırlatmak için gökyüzünün herhangi bir yerine dokun ❤️",
    closeButtonText: "Evrene Dön",
    closeAriaLabel: "Havai fişek gösterisini kapat",
  },

  // 6. Bizim Küçük Anılarımız (Our Little Moments)
  momentsSection: {
    badgeText: "Bekir & Gizem • Yıldız Işığı Galerisi",
    title: "BİZİM KÜÇÜK ANILARIMIZ",
    subtitle:
      "17 Kasım 2023'ten bugüne biriktirdiğimiz en güzel anıları, içten gülümsemeleri ve birlikte geçen huzurlu saniyeleri saklamak için ayrılmış özel çerçeveler.",
    helperNote:
      "3B döndürmek için çerçevelere dokun • Büyütmek için 'Tam Ekran' butonunu seç",
    flipBadgeText: "3B Çevir",
    flipButtonText: "Notu Çevir",
    flipBackButtonText: "Çerçeveye Dön",
    fullscreenButtonText: "Tam Ekran",
    editNoteLabel: "Anı Notunu Özelleştir:",
    closeModalAriaLabel: "Tam ekran anı görünümünü kapat",
    configTipText:
      "İpucu: Fotoğrafları dilediğiniz zaman src/config/universeConfig.ts dosyasından ekleyebilirsiniz.",
    items: [
      {
        id: "moment-1",
        title: "17 Kasım 2023 — Başlangıcımız",
        subtitle: "Hikâyemizin başladığı o en özel gün için ayrıldı",
        dateLabel: "Anı Çerçevesi I",
        quote: "17 Kasım 2023'te başlayan bu güzel hikâye, hayatımın en kıymetli armağanı.",
        imageUrl: "",
        accentColor: "#E83E70",
        constellationName: "Lyra • Uyum Takımyıldızı",
      },
      {
        id: "moment-2",
        title: "En Güzel Gülümsemen",
        subtitle: "Zamanı durduran o sıcak tebessümün için ayrıldı",
        dateLabel: "Anı Çerçevesi II",
        quote: "Sen gülümsediğinde etrafımda güller, laleler ve papatyalar açıyor.",
        imageUrl: "",
        accentColor: "#F5D58A",
        constellationName: "Cygnus • Zarafet Takımyıldızı",
      },
      {
        id: "moment-3",
        title: "Birlikte Kahkahalarımız",
        subtitle: "İçten bir neşe ve paylaştığımız mutluluk için ayrıldı",
        dateLabel: "Anı Çerçevesi III",
        quote: "Milyarlarca sesin olduğu bu evrende en güzel melodi senin sesin.",
        imageUrl: "",
        accentColor: "#FF91B5",
        constellationName: "Cassiopeia • Taç Takımyıldızı",
      },
      {
        id: "moment-4",
        title: "Aynı Yıldızların Altında",
        subtitle: "Dingin bir akşam ve sevgi dolu bir bakış için ayrıldı",
        dateLabel: "Anı Çerçevesi IV",
        quote: "Gökyüzünde nereye bakarsam bakayım, en parlak yıldız hep sensin.",
        imageUrl: "",
        accentColor: "#E83E70",
        constellationName: "Andromeda • Mucize Takımyıldızı",
      },
      {
        id: "moment-5",
        title: "El Ele Yürüdüğümüz Yollar",
        subtitle: "Birlikte geçen en huzurlu anlarımız için ayrıldı",
        dateLabel: "Anı Çerçevesi V",
        quote: "Sen yanımdayken en sıradan saniyeler bile altına dönüşüyor.",
        imageUrl: "",
        accentColor: "#F5D58A",
        constellationName: "Vela • Yolculuk Takımyıldızı",
      },
      {
        id: "moment-6",
        title: "Birlikte Yazacağımız Yarınlar",
        subtitle: "Bizi bekleyen nice 17 Kasımlar için ayrıldı",
        dateLabel: "Anı Çerçevesi VI",
        quote: "Hikâyemizin en güzel sayfaları el ele yazmaya devam edeceklerimiz.",
        imageUrl: "",
        accentColor: "#FF91B5",
        constellationName: "Carina • Ufuk Takımyıldızı",
      },
    ] as MomentItem[],
  },

  // 6.5. Oyun Köşesi (Mini Games Section)
  gamesSection: {
    badgeText: "BEKİR & GİZEM OYUN KÖŞESİ ❤️",
    title: "Biraz da Eğlenelim Gizem! ❤️",
    subtitle: "Yıldönümümüz için sana üç küçük sürpriz hazırladım.",
    playButtonText: "Oyunu Başlat",
    playAgainButtonText: "Tekrar Oyna",
    switchGameLabel: "Oyun Seç:",
    catchHearts: {
      tabTitle: "Aşk Hafıza Kartları",
      cardTitle: "Aşk Hafıza Kartları",
      cardSubtitle: "12 kartın içindeki 6 romantik çifti eşleştirerek hafızanı test et.",
      durationSeconds: 30,
      pointsPerHeart: 10,
      scoreLabel: "Eşleşme",
      timeLabel: "Hamle",
      timeUnit: "",
      startPrompt: "6 özel sembol çifti kartların altında gizli. Eşleştirmeye hazır mısın?",
      finalMessage: "Harikasın Gizem! Bütün kalp çiftlerini sevgiyle buldun! ❤️",
      collectedSummaryPrefix: "Toplam Hamle:",
    },
    findStar: {
      tabTitle: "Gizli Yıldızı Bul",
      cardTitle: "Gizli Yıldızı Bul",
      cardSubtitle: "Parlayan yıldızların arasına gizlenmiş özel altın yıldızı keşfet.",
      instructionText:
        "Gökyüzündeki yıldızlara dikkatlice bak ve içlerinden en özel altın parıltıya sahip olan gizli yıldızına dokun ✨",
      wrongStarHint:
        "Bu yıldız da çok parlak ama aradığımız özel altın yıldız başka bir yerde parlıyor... ✨",
      finalMessage: "Aradığın yıldız zaten sensin Gizem! ✨",
      playAgainText: "Yıldızları Yeniden Karıştır",
    },
    heartCipher: {
      tabTitle: "Kalbin Şifresi",
      cardTitle: "Kalbin Şifresi",
      cardSubtitle: "Üç romantik bilmeceyi çözerek kalbin gizli mektubunu aç.",
      stagePrefix: "Aşama",
      unlockedBadge: "Kilit Açıldı ✨",
      finalMessage:
        "Bu küçük sürprizin şifresi: 17 KASIM 2023 • YILDÖNÜMÜMÜZ KUTLU OLSUN BİRİCİK AŞKIM! ❤️",
      finalLetterSubtext:
        "Kalbin bütün kilitlerini sevgiyle açtın. Nice mutlu 17 Kasımlara el ele...",
      stages: [
        {
          id: 1,
          question:
            "1. Bilmece: Karanlık bir gecede bile Bekir'in dünyasını ve kalbini aynı anda aydınlatan en güzel ışık nedir?",
          options: [
            "Gizem'in içten gülümsemesi",
            "Uzak bir gezegen",
            "Sokak lambaları",
          ],
          correctIndex: 0,
          hint: "İpucu: Bir tebessümün bile bütün dünyamı ısıtmaya yetiyor... ❤️",
        },
        {
          id: 2,
          question:
            "2. Bilmece: Takvimdeki yüzlerce gün arasından bizim hikâyemizin başladığı o en özel gün hangisidir?",
          options: [
            "Sıradan bir pazartesi",
            "17 Kasım 2023 — Sevgili Olma Yıldönümümüz",
            "Yılın ilk günü",
          ],
          correctIndex: 1,
          hint: "İpucu: Kasım ayının kalbimizdeki en anlamlı gününü düşün... ✨",
        },
        {
          id: 3,
          question:
            "3. Bilmece: Bu küçük dijital evrenin her bir yıldızı, gülü, lalesi ve papatyası kimin için sevgiyle hazırlandı?",
          options: [
            "Rastgele bir gezgin için",
            "Zaman yolcuları için",
            "Yalnızca senin için, güzel Gizem'im ❤️",
          ],
          correctIndex: 2,
          hint: "İpucu: Bu evrenin kalbinde sadece senin ismin yazılı... ❤️",
        },
      ],
    },
  },

  // 6.8. Küçük Sürprizler (5 İnteraktif Hediye Kutusu Bölümü)
  surpriseGiftsSection: {
    badgeText: "SÜRPRİZ HEDİYE KUTULARI 🎁",
    title: "Gizem'e Küçük Sürprizler 🎁",
    subtitle:
      "17 Kasım yıldönümümüz için senin için beş küçük sürpriz sakladım. Bakalım hangisinde ne var? ❤️",
    openedBadgeText: "Açıldı ✨ • Tekrar Aç",
    unopenedBadgeText: "Açmak İçin Dokun 🎁",
    closeModalButtonText: "Hediyelere Dön",
    closeModalAriaLabel: "Hediye penceresini kapat",
    boxes: [
      {
        id: 1,
        numberLabel: "1",
        title: "Sana Bir Mektup 💌",
        shortHint: "Bekir'den kalpten dökülen kısa bir not...",
        accentColor: "#A7F3D0",
        ribbonColor: "#BAE6FD",
        boxGradient: "from-[#0D9488]/90 via-[#0F766E]/90 to-[#06383E]/95",
        headline: "Sana Küçük Bir Not 💌",
        message:
          "17 Kasım 2023'te elini ilk tuttuğum günden beri hayatımın en güzel mevsimini yaşıyorum. Seninle aynı yolda yürümek, en sıradan bir günü bile kahkahalarla unutulmaz kılmak bana verilen en büyük şans. İyi ki hayatıma girdin, iyi ki benimlesin biricik aşkım; birlikte daha nice güzel yıllara...",
        subNote: "17 Kasım 2023'ten sonsuza dek • Bekir ❤️",
      },
      {
        id: 2,
        numberLabel: "2",
        title: "Sonsuz Çiçekler 🌹🌷🌼",
        shortHint: "Güller, laleler ve papatyalarla dolu bir bahar...",
        accentColor: "#BAE6FD",
        ribbonColor: "#A7F3D0",
        boxGradient: "from-[#0284C7]/90 via-[#0369A1]/90 to-[#073349]/95",
        headline: "Sonsuz Çiçekler 🌹🌷🌼",
        message:
          "Her gül, her lale ve her papatya sana olan sevgimi anlatsaydı, bu bahar hiç bitmezdi.",
        subNote: "Yeni çiçekler açtırmak için bahçeye dokun 🌸",
      },
      {
        id: 3,
        numberLabel: "3",
        title: "Küçük Bir Yıldız ✨",
        shortHint: "17 Kasım gökyüzünün dilek yıldızı...",
        accentColor: "#6EE7B7",
        ribbonColor: "#FDE68A",
        boxGradient: "from-[#059669]/90 via-[#047857]/90 to-[#06383E]/95",
        headline: "Küçük Bir Yıldız ✨",
        message:
          "Ne zaman gökyüzüne baksan, bizim aşkımız için parlayan bir yıldız olduğunu hatırla.",
        subNote: "Yıldıza dokunarak gökyüzüne bir dilek izi bırak ✨",
      },
      {
        id: 4,
        numberLabel: "4",
        title: "Birlikte Gelecek Hayallerimiz 🌙",
        shortHint: "Bizi bekleyen nice güzel yıllar...",
        accentColor: "#7DD3FC",
        ribbonColor: "#A7F3D0",
        boxGradient: "from-[#0EA5E9]/85 via-[#0D9488]/90 to-[#06383E]/95",
        headline: "Birlikte Gelecek Hayallerimiz 🌙",
        message:
          "Birlikte izleyeceğimiz huzurlu gün batımları, el ele keşfedeceğimiz yeni yollar, yıldızların altında edeceğimiz uzun sohbetler ve yan yana kutlayacağımız nice 17 Kasımların hayaliyle...",
        futureDreams: [
          "🌅 Birlikte izlenecek huzurlu gün batımları",
          "✈️ El ele keşfedilecek yeni şehirler ve yolculuklar",
          "🌌 Yıldızların altında saatlerce sürecek tatlı sohbetler",
          "❤️ Yan yana kutlanacak nice 17 Kasım yıldönümleri",
        ],
        subNote: "En güzel günlerimiz birlikte yürümeye devam edeceklerimiz 🌙",
      },
      {
        id: 5,
        numberLabel: "5",
        title: "En Büyük Sürpriz ❤️",
        shortHint: "Kalbimin en özel köşesi...",
        accentColor: "#A7F3D0",
        ribbonColor: "#BAE6FD",
        boxGradient: "from-[#10B981]/90 via-[#0284C7]/90 to-[#06383E]/95",
        isGrandSpecial: true,
        headline: "En Büyük Sürpriz ❤️",
        message:
          "Hayatımın en güzel sürprizi sensin biricik aşkım. 17 Kasım 2023'ten sonsuza dek iyi ki varsın, iyi ki hayatımdasın. Yıldönümümüz kutlu olsun!",
        subNote: "Bekir ❤️ Gizem — 17 Kasım 2023",
      },
    ],
  },

  // 7. Son Sürpriz Butonu ve Final (Final Surprise)
  surprise: {
    preTitle: "✦ 17 Kasım 2023'ten Sonsuza Dek ✦",
    buttonText: "SON BİR SÜRPRİZİM VAR ❤️",
    mainMessage:
      "Bu koca evrende yollarımızın kesişmiş ve kalplerimizin birleşmiş olmasına çok mutluyum.",
    subMessage: "Yıldönümümüz kutlu olsun biricik aşkım. ❤️ — Bekir",
    moreConfettiButton: "Daha Fazla Altın ve Pembe Konfeti Yağdır",
    closeButtonText: "Kapat",
    closeAriaLabel: "Sürpriz ekranını kapat",
  },
};
