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

  // 4 Şarkılık Tam Süreli & Yumuşak Geçişli Romantik Müzik Listesi (/public/music/ içindeki MP3 kayıtları)
  crossfadeSeconds: 6.0,
  musicPlaylist: [
    {
      id: "piyanist",
      title: "Ferdi Özbeğen — Piyanist 🎹",
      src: "/music/Ferdi Özbeğen - Piyanist.mp3",
      startAtSeconds: 0,
      excerptDurationSeconds: 226,
      volumeScale: 1.0,
    },
    {
      id: "gurbette-sevgilim",
      title: "Ferdi Özbeğen — Gurbette Sevgilim 🌹",
      src: "/music/Ferdi Özbeğen - Gurbette Sevgilim.mp3",
      startAtSeconds: 0,
      excerptDurationSeconds: 266,
      volumeScale: 1.0,
    },
    {
      id: "hani-benim-olacaktin",
      title: "Haluk Levent — Hani Benim Olacaktın ❤️",
      src: "/music/Haluk Levent  -  Hani Benim Olacaktın - SENDE Bİ DİNLE.mp3",
      startAtSeconds: 0,
      excerptDurationSeconds: 232,
      volumeScale: 0.86,
    },
    {
      id: "ayrilik",
      title: "Selda Bağcan — Ayrılık ✨",
      src: "/music/Ayrılık - Selda Bağcan.mp3",
      startAtSeconds: 0,
      excerptDurationSeconds: 278,
      volumeScale: 0.88,
    },
  ],
  customAudioSrc: "/music/Ferdi Özbeğen - Piyanist.mp3",
  musicTrackTitle: "Ferdi Özbeğen — Piyanist 🎹",

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

  // 3. Geri Sayım Ekranı (Anniversary Countdown)
  countdown: {
    preTitle: "BİR SONRAKİ 17 KASIM YILDÖNÜMÜMÜZE",
    titlePrefix: "Her Saniye Aşkımızı",
    titleHighlight: "Bir Ömre Daha Yaklaştırıyor",
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
    sealInitials: "B ❤️ G",
    openEnvelopeAriaLabel: "Gizem için yazılan yıldönümü mektubunu aç",
    touchSealHint: "Açmak İçin Altın Mühre Dokun",
    headerLabel: "Yıldönümü Mektubu",
    showAllButton: "Tümünü Göster",
    foldButton: "Zarfı Kapat",
    salutation: "Canım Sevgilim Gizem,",
    paragraphs: [
      "17 Kasım 2023, hayatımın en güzel döneminin başladığı, kalbimin seninle tamamlandığı o en özel gün.",
      "Seninle geçen her an, bir gülün zarafeti, bir lalenin asaleti ve bir papatyanın saf sıcaklığı gibi içimi ısıtıyor.",
      "Yanımdayken zamanın nasıl geçtiğini anlamıyorum; en sıradan günler bile senin gülüşünle unutulmaz bir anıya dönüşüyor.",
      "Bana verdiğin sevgi, huzur, güven ve paylaştığımız bütün güzel anılar için sana ne kadar teşekkür etsem az.",
      "Birlikte daha nice 17 Kasımlar kutlamayı, el ele nice güzel yollar yürümeyi ve her yeni günde seni yeniden sevmeyi diliyorum.",
      "Yıldönümümüz kutlu olsun biricik aşkım.",
      "İyi ki hayatımdasın, iyi ki benimlesin.",
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
      tabTitle: "Kalpleri Yakala",
      cardTitle: "Kalpleri Yakala",
      cardSubtitle: "30 saniye içinde beliren parlak kalplere dokun ve topla.",
      durationSeconds: 30,
      pointsPerHeart: 10,
      scoreLabel: "Skor",
      timeLabel: "Süre",
      timeUnit: "sn",
      startPrompt: "Kalpler evrende belirmeye hazır. Başlamak için butona dokun!",
      finalMessage: "Bütün kalpler senin için Gizem! ❤️",
      collectedSummaryPrefix: "Toplam Puanın:",
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
        accentColor: "#FF91B5",
        ribbonColor: "#F5D58A",
        boxGradient: "from-[#4A102D] via-[#2B0B21] to-[#17081C]",
        headline: "Sana Küçük Bir Not 💌",
        message:
          "17 Kasım'dan beri günün hangi saati olursa olsun, aklıma düştüğün her an yüzümde istemsiz bir tebessüm oluşuyor. Senin o güzel kalbin, zarafetin ve sevgimiz bu dünyadaki en nadir hazine. Her sabah uyandığında Bekir tarafından ne kadar çok sevildiğini hissetmeni diliyorum...",
        subNote: "Her zaman kalbimdesin Gizem ❤️",
      },
      {
        id: 2,
        numberLabel: "2",
        title: "Sonsuz Çiçekler 🌹🌷🌼",
        shortHint: "Güller, laleler ve papatyalarla dolu bir bahar...",
        accentColor: "#E83E70",
        ribbonColor: "#FF91B5",
        boxGradient: "from-[#5A1236] via-[#310B24] to-[#17071A]",
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
        accentColor: "#F5D58A",
        ribbonColor: "#F5D58A",
        boxGradient: "from-[#3D1230] via-[#220B26] to-[#11071A]",
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
        accentColor: "#FF91B5",
        ribbonColor: "#F5D58A",
        boxGradient: "from-[#481234] via-[#250A24] to-[#120619]",
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
        accentColor: "#F5D58A",
        ribbonColor: "#E83E70",
        boxGradient: "from-[#6E153E] via-[#4A102D] to-[#1E081B]",
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
