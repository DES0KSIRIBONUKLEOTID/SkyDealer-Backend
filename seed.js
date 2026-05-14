const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plane = require('./models/Plane');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const planes = [
  {
    id: 1,
    title: "Gulfstream G650",
    price: 65000000,
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80",
      "https://cdn.prod.website-files.com/67c734771b96932daef1ebc6/68a7732027965ff346080e99_688b82fbb4b92d4661f4869e_private-jet-charter-gulfstream-g650-cabin-inside.jpeg",
      "https://thumbs.dreamstime.com/b/%D0%B0%D1%80%D0%B5%D0%BD%D0%B0-%D0%B2%D0%BE%D0%B7-%D1%83%D1%88%D0%BD%D1%8B%D1%85-%D1%81%D1%83-%D0%BD-78441250.jpg"
    ],
    description: "Флагман бізнес-авіації. Найшвидший і найкомфортніший джет у своєму класі.",
    category: "Бізнес-джет",
    year: 2022,
    manufacturer: "Gulfstream",
    specs: { speed: "956 км/год", range: "12 964 км", altitude: "15 545 м", passengers: 19, engines: "2 × Rolls-Royce BR725", cargo: "5.52 м³" }
  },
  {
    id: 2,
    title: "Cessna 172 Skyhawk",
    price: 450000,
    images: [
      "/Cessna_172.jpg",
      "https://flyer.co.uk/?attachment_id=83175",
      "https://static0.simpleflyingimages.com/wordpress/wp-content/uploads/2024/01/cessna_172r_skyhawk_an1535191.jpg?q=50&fit=crop&w=825&dpr=1.5"
    ],
    description: "Ідеальний варіант для навчання та приватних польотів. Надійний та економічний.",
    category: "Легка авіація",
    year: 2018,
    manufacturer: "Cessna",
    specs: { speed: "226 км/год", range: "1 185 км", altitude: "4 267 м", passengers: 4, engines: "1 × Lycoming IO-360", cargo: "0.85 м³" }
  },
  {
    id: 3,
    title: "Bombardier Global 7500",
    price: 73000000,
    images: [
      "/Bombardier.jpg",
      "https://www.claylacy.com/wp-content/uploads/2024/11/Global-7500-10.jpg",
      "https://bombardier.com/sites/default/files/styles/interactive_visualization_tool_retina_3200_desktop/public/ivt/hotspots/backgrounds/2023-03/Global-7500-and-Global-8000-Bombardier-Vision-Cockpit-Dual-HUD-2880x1376.jpg.webp?itok=CJJ8QQQp"
    ],
    description: "Бізнес-джет з найбільшою дальністю польоту. Поєднує розкіш та технології.",
    category: "Бізнес-джет",
    year: 2023,
    manufacturer: "Bombardier",
    specs: { speed: "982 км/год", range: "14 260 км", altitude: "15 545 м", passengers: 19, engines: "2 × GE Passport", cargo: "5.52 м³" }
  },
  {
    id: 4,
    title: "HondaJet Elite",
    price: 5200000,
    images: [
      "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=600&q=80",
      "https://flyvolato.com/wp-content/uploads/2023/09/honda-jet-interior-1024x682.jpg",
      "https://www.hondajet.com/-/media/HondaJet/Photos/Products/Hondajet-Elite-II/ProductCards/Features/Elite2-avionics-2_375.jpg"
    ],
    description: "Інноваційний легкий джет з унікальним розташуванням двигунів над крилом.",
    category: "Легкий джет",
    year: 2021,
    manufacturer: "Honda Aircraft",
    specs: { speed: "782 км/год", range: "2 661 км", altitude: "13 106 м", passengers: 7, engines: "2 × GE Honda HF120", cargo: "1.86 м³" }
  },
  {
    id: 5,
    title: "Boeing 747-8F",
    price: 419000000,
   images: [
      "/Boeing747.jpg",
      "https://www.airlinereporter.com/wp-content/uploads/2012/02/7478a.jpg",
      "https://i.redd.it/tc410ijeun7z.jpg"
    ], 
    description: "«Королева небес» у вантажному варіанті. Легендарний чотиридвигунний літак з характерним «горбом». Унікальний тим, що має ніс, який відкидається вгору, що дозволяє завантажувати дуже довгі та негабаритні вантажі прямо спереду.\n\nВикористання: Перевезення найважчих та найбільших вантажів на найбільші відстані. Основний літак таких гігантів, як Atlas Air, Cargolux, UPS.",
    category: "Вантажний",
    year: 2021,
    manufacturer: "Boeing",
    specs: { speed: "908 км/год", range: "8 130 км (з повним вантажем)", altitude: "13 100 м", passengers: 0, engines: "4 × GEnx-2B67", cargo: "137 тонн" }
  },
  {
    id: 6,
    title: "Boeing 777F",
    price: 352000000,
   images: [
      "/Boeing777.jpg",
      "https://runwaygirlnetwork.com/wp-content/uploads/2021/08/boeing_777_klass_ekonom_4-Custom-800x415.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhgz2Wsng4NR9lzMBH0tl6ajXyQpwyjRZbA&s"
    ],
    description: "Найпоширеніший сучасний важкий двомоторний вантажівник. Базується на пасажирській версії 777-200LR. Дуже економічний і має велику дальність польоту.\n\nВикористання: Основний «робочий кінь» глобальної логістики (FedEx, DHL, Qatar Airways Cargo). Возить все: від посилок e-commerce до автомобілів і скакових коней.",
    category: "Вантажний",
    year: 2022,
    manufacturer: "Boeing",
    specs: { speed: "896 км/год", range: "9 200 км", altitude: "13 140 м", passengers: 0, engines: "2 × GE90-110B1", cargo: "102 тонни" }
  },
  {
    id: 7,
    title: "Антонов Ан-124-100 «Руслан»",
    price: 150000000,
    images: [
      "/Antonov_An-124.jpg",
      "https://images.aircharterservice.com/global/aircraft-guide/cargo-charter/antonov-an-124-2.jpg",
      "https://www.airlinereporter.com/wp-content/uploads/2013/02/AN124-33.jpg"
    ], 
    description: "Український важкий транспортний літак, один із найбільших серійних літаків у світі. Має унікальну конструкцію: завантаження можливе як через ніс (який піднімається, літак «присідає»), так і через задню рампу. Це дозволяє перевозити наскрізні вантажі.\n\nВикористання: Спеціалізовані перевезення надважких та великогабаритних вантажів, які не влазять у стандартні «Боїнги»: турбіни електростанцій, потяги метро, супутники, військова техніка. Експлуатується українською авіакомпанією «Авіалінії Антонова».",
    category: "Вантажний",
    year: 2004,
    manufacturer: "Antonov",
    specs: { speed: "865 км/год", range: "4 800 км (з вантажем 120т)", altitude: "11 600 м", passengers: 88, engines: "4 × Д-18Т", cargo: "1040 м³ / 120 тонн" }
  },
  {
    id: 8,
    title: "Airbus A330-200F",
    price: 241000000,
   images: [
      "/Airbus_A330.jpg",
      "https://www.airpartner.com/media/caipteqg/a330-200-interior-1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Airbus_A330-200_flight_deck_forward_displays.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
    ],  
    description: "Конкурент Boeing у сегменті середніх/важких вантажівників. Його легко впізнати за характерною «гулею» під носом, куди ховається передня стійка шасі, щоб вирівняти підлогу вантажної палуби.\n\nВикористання: Популярний серед експрес-перевізників та для регіональних вантажних маршрутів в Азії та Європі.",
    category: "Вантажний",
    year: 2019,
    manufacturer: "Airbus",
    specs: { speed: "871 км/год", range: "7 400 км", altitude: "12 500 м", passengers: 0, engines: "2 × Rolls-Royce Trent 700", cargo: "70 тонн" }
  },
  {
    id: 9,
    title: "Cirrus SR22T",
    price: 1250000,
     images: [
      "/Cirrus_SR-22.jpg",
      "https://www.flyingmag.com/wp-content/uploads/sites/2/2025/05/6818cf6b-2d2c-4c01-9e4e-bc304dc825f0-1024x768.jpg",
      "https://flyer.co.uk/wp-content/uploads/2022/04/SR22-G7-Avionics.jpg"
    ], 
    description: "Найпопулярніший у світі високотехнологічний одномоторний літак. Ідеальний для особистих подорожей та бізнесу.\n\nУнікальна особливість: Оснащений системою CAPS (Cirrus Airframe Parachute System) — повноцінним парашутом для всього літака, що робить його одним із найбезпечніших у своєму класі.",
    category: "Легка авіація",
    year: 2023,
    manufacturer: "Cirrus Aircraft",
    specs: { speed: "394 км/год", range: "1 943 км", altitude: "7 620 м", passengers: 5, engines: "1 × Continental TSIO-550-K", cargo: "0.9 м³" }
  },
  {
    id: 10,
    title: "Pilatus PC-12 NGX",
    price: 5500000,
   images: [
      "/Pilatus.jpg",
      "https://www.pilatus-aircraft.com/assets/media/22-News/2021/_fullSizeAuto/36097/2021-02-12-Trends.webp?v=1737743497",
      "https://flightlineaviation.co.uk/wp-content/uploads/2024/09/Pilatus-panel-psd.jpg"
    ], 
    description: "Швейцарський одномоторний турбогвинтовий літак. Універсальний «позашляховик» преміум-класу.\n\nОсобливості: Здатен приземлятися на короткі, ґрунтові та трав'яні смуги, куди реактивним джетам шлях закрито. При цьому пропонує простору кабіну від BMW Designworks, що не поступається середнім бізнес-джетам.",
    category: "Турбогвинтовий",
    year: 2022,
    manufacturer: "Pilatus",
    specs: { speed: "537 км/год", range: "3 426 км", altitude: "9 144 м", passengers: 10, engines: "1 × Pratt & Whitney PT6E-67XP", cargo: "1.13 м³" }
  },
  {
    id: 11,
    title: "Dassault Falcon 8X",
    price: 59500000,
      images: [
      "/Dassault_Falcon_7X.jpg",
      "https://jetvina.com/wp-content/uploads/2024/02/01.Falcon8X_Cabin_Desktop-1536x845-1.jpg",
      "https://www.dassaultfalcon.com/app/uploads/2022/09/1920_C_01-W-026_Falcon8X_2018USB55_FalconEye.jpg"
    ], 
    description: "Ультра-далекомагістральний французький бізнес-джет з характерною тримоторною конструкцією (S-duct).\n\nПереваги: Три двигуни не лише надають йому агресивного вигляду, але й дозволяють прокладати прямі маршрути над океанами та горами без суворих обмежень, які діють для двомоторних літаків. Найнижчий рівень шуму в кабіні серед конкурентів.",
    category: "Бізнес-джет",
    year: 2021,
    manufacturer: "Dassault Aviation",
    specs: { speed: "900 км/год", range: "11 945 км", altitude: "15 545 м", passengers: 16, engines: "3 × Pratt & Whitney PW307D", cargo: "3.7 м³" }
  },
  {
    id: 12,
    title: "Boeing 787-9 Dreamliner (BBJ)",
    price: 292500000,
     images: [
      "/Boeing_787.jpg",
      "https://businessjets.boeing.com/wp-content/uploads/2023/10/B787-9-Dining-Area-02.jpg",
      "https://resources.globalair.com/specs/images/wp2819244.jpg?w=650&h=430&mode=max"
    ], 
    description: "Широкофюзеляжний пасажирський авіалайнер нового покоління, який також доступний у VIP-конфігурації (Boeing Business Jet) для глав держав та мільярдерів.\n\nТехнології: Фюзеляж виготовлений з композитних матеріалів, що дозволило зробити найбільші ілюмінатори в класі та підтримувати більш комфортний тиск і вологість у салоні. Справжній летючий палац.",
    category: "Пасажирський",
    year: 2024,
    manufacturer: "Boeing",
    specs: { speed: "903 км/год", range: "17 500 км (BBJ версія)", altitude: "13 100 м", passengers: 40, engines: "2 × GEnx-1B або Trent 1000", cargo: "153 м³" }
  },
  {
    id: 13,
    title: "Антонов Ан-225 «Мрія»",
    price: 300000000,
    images: [
      "/Antonov_An-225_Mria.jpg",
      "https://runway-media-production.global.ssl.fastly.net/us/originals/2018/04/Antonov-An-225-cargo-bay.jpg",
      "https://imgproc.airliners.net/photos/airliners/4/6/3/1312364.jpg?v=v40"
    ],
    description: "Найбільший та найпотужніший транспортний літак у світі. Створений в єдиному екземплярі. Справжня гордість української авіації та абсолютний ексклюзив для приватних колекціонерів або масштабних державних місій.",
    category: "Вантажний",
    year: 1988,
    manufacturer: "Antonov",
    specs: { speed: "850 км/год", range: "15 400 км", altitude: "11 000 м", passengers: 70, engines: "6 × Д-18Т", cargo: "250 тонн / 1300 м³" }
  },
  {
    id: 14,
    title: "Embraer Phenom 300E",
    price: 10950000,
    images: [
      "/Embraer_EMB-505_Phenom_300.jpg",
      "https://cdn.privatejetcardcomparisons.com/uploads/Embraer-Phenom-300E-Bosa-Nova.png",
      "https://assets.skiesmag.com/wp-content/uploads/2021/09/Phenom-300E-Cockpit-1024x683.jpg"
    ],
    description: "Найпопулярніший легкий бізнес-джет у світі останнє десятиліття. Пропонує неперевершену швидкість, економічність та комфорт у своєму класі. Ідеальний для швидких перельотів Європою.",
    category: "Легкий джет",
    year: 2023,
    manufacturer: "Embraer",
    specs: { speed: "859 км/год", range: "3 723 км", altitude: "13 716 м", passengers: 10, engines: "2 × Pratt & Whitney PW535E1", cargo: "2.4 м³" }
  },
  {
    id: 15,
    title: "Aérospatiale-BAC Concorde",
    price: 150000000,
    images: [
      "/Concorde.jpg",
      "https://live.staticflickr.com/4009/5122892163_4747370ed8_b.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3-KMPfpFebfqH4Jqx0GOWsCj39k3eq6o6tQ&s"
    ],
    description: "Легендарний надзвуковий пасажирський авіалайнер. Доступний як колекційний екземпляр. Літав вдвічі швидше за звук, дозволяючи дістатися з Лондона до Нью-Йорка за 3.5 години.",
    category: "Пасажирський",
    year: 1976,
    manufacturer: "Aérospatiale/BAC",
    specs: { speed: "2 179 км/год (Мах 2.04)", range: "7 222 км", altitude: "18 300 м", passengers: 100, engines: "4 × Rolls-Royce/Snecma Olympus 593", cargo: "6.4 м³" }
  },
  {
    id: 16,
    title: "ICON A5",
    price: 389000,
    images: [
      "/Icon_A5.jpg",
      "https://viemagazine.com/wp-content/uploads/2015/09/vie-magazine-icon-12.jpg",
      "https://resources.globalair.com/specs/images/Amphibian/ICON/ICON/A5/Interior/int2.jpg?w=650&h=430&mode=max"
    ],
    description: "Легкий спортивний літак-амфібія зі складаними крилами. Його можна зберігати в гаражі і перевозити на причепі. Приземляється як на асфальт, так і на озера. Ідеальна іграшка для вікенду.",
    category: "Легка авіація",
    year: 2022,
    manufacturer: "ICON Aircraft",
    specs: { speed: "176 км/год", range: "791 км", altitude: "3 048 м", passengers: 2, engines: "1 × Rotax 912 iS", cargo: "0.2 м³" }
  },
  {
    id: 17,
    title: "Beechcraft King Air 360",
    price: 8400000,
     images: [
      "/Tc-90.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGYN0wL3ac5quTe5lKZJkVVoGhnHjEV6-bA&s",
      "https://www.flyer.co.uk/wp-content/uploads/2020/08/Beechcraft-King-Air-360-2.jpg"
    ],
    description: "Найпопулярніший у світі двомоторний турбогвинтовий літак. Славиться своєю надійністю, просторим салоном та здатністю злітати з коротких і ґрунтових смуг.",
    category: "Турбогвинтовий",
    year: 2023,
    manufacturer: "Beechcraft",
    specs: { speed: "578 км/год", range: "3 345 км", altitude: "10 668 м", passengers: 11, engines: "2 × Pratt & Whitney PT6A-60A", cargo: "2.0 м³" }
  },
  {
    id: 18,
    title: "Airbus A350-1000",
    price: 366500000,
      images: [
      "/A350.jpg",
      "https://images.airlinegeeks.com/wp-content/uploads/2023/12/13194023/IMG_4405-1920x1440.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuAxflUaILV8-h_d2GiHtg4ojdT3YUwNsHvA&s"
    ],
    description: "Надсучасний широкофюзеляжний лайнер з композитних матеріалів. Найбільший у сімействі A350. Забезпечує неперевершений комфорт, тишу в салоні та неймовірну паливну ефективність.",
    category: "Пасажирський",
    year: 2024,
    manufacturer: "Airbus",
    specs: { speed: "903 км/год", range: "16 100 км", altitude: "13 100 м", passengers: 410, engines: "2 × Rolls-Royce Trent XWB-97", cargo: "208 м³" }
  },
  {
    id: 19,
    title: "Diamond DA62",
    price: 1450000,
     images: [
      "/Diamond62.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwvdBtUdteH9BXt62Qgi15sEjHsJwap72fA&s",
      "https://www.diamondaircraft.com/fileadmin/_processed_/8/e/csm_DA62-removable-control-stick_DSC4292_6551b35c12.jpg"
    ],
    description: "Розкішний 7-місний легкий двомоторний літак. Його часто називають «літаючим позашляховиком». Має футуристичний дизайн і надзвичайно економні дизельні двигуни.",
    category: "Легка авіація",
    year: 2023,
    manufacturer: "Diamond Aircraft",
    specs: { speed: "356 км/год", range: "2 380 км", altitude: "6 096 м", passengers: 7, engines: "2 × Austro Engine AE330", cargo: "1.2 м³" }
  },
  {
    id: 20,
    title: "Gulfstream G700",
    price: 78000000,
      images: [
      "/Qatar.jpg",
      "https://www.gulfstream.com/assets/images/aircraft/g700/d_g700_i_mkt_00097_PROD.jpg",
      "https://learningcenter.flexjet.com/wp-content/uploads/2025/09/2_gulfstream-G700.jpg"
    ],
    description: "Новий абсолютний флагман приватної авіації. Має найбільший, найширший і найдовший салон у галузі. Дозволяє летіти майже зі швидкістю звуку між континентами.",
    category: "Бізнес-джет",
    year: 2024,
    manufacturer: "Gulfstream",
    specs: { speed: "982 км/год", range: "14 353 км", altitude: "15 545 м", passengers: 19, engines: "2 × Rolls-Royce Pearl 700", cargo: "5.52 м³" }
  },
  {
    id: 21,
    title: "Cessna Citation Longitude",
    price: 29995000,
       images: [
      "/Cessna_long.jpg",
      "https://www.basjets.com/ceasy/resource/1125?&doCrop=1&width=1600&height=900",
      "https://www.ainonline.com/cdn-cgi/image/width=1600,format=webp,quality=90/https://backend.ainonline.com/sites/default/files/webcitation_longitude_cockpit_photo.jpg"
    ],
    description: "Супер-середній бізнес-джет. Пропонує найтихіший салон у своєму класі та відмінну дальність польоту для трансатлантичних подорожей з найвищим рівнем комфорту.",
    category: "Бізнес-джет",
    year: 2022,
    manufacturer: "Cessna",
    specs: { speed: "895 км/год", range: "6 482 км", altitude: "13 716 м", passengers: 12, engines: "2 × Honeywell HTF7700L", cargo: "3.17 м³" }
  },
  {
    id: 22,
    title: "Boeing BBJ MAX 8",
    price: 110000000,
      images: [
      "/BBJ_MAX_8.jpg",
      "https://businessjets.boeing.com/wp-content/uploads/2023/10/04-BBJ_Final_View2.jpg",
      "https://resources.globalair.com/specs/images/9a54ffd81d55c387663262f6985c8d82.jpg?w=650&h=430&mode=max"
    ],
    description: "Корпоративна VIP-версія популярного лайнера 737 MAX. Дає власникам простір комерційного літака з розкішшю п'ятизіркового готелю, включаючи спальні та душові кабіни.",
    category: "Пасажирський",
    year: 2023,
    manufacturer: "Boeing",
    specs: { speed: "840 км/год", range: "12 297 км", altitude: "12 500 м", passengers: 19, engines: "2 × CFM LEAP-1B", cargo: "27.3 м³" }
  },
  {
    id: 23,
    title: "Cessna 208B Grand Caravan EX",
    price: 2685000,
      images: [
      "/Cessna_208_Caravan.jpg",
      "https://africair.com/wp-content/uploads/2017/12/Grand-Caravan-Interior-4.jpg",
      "https://assets.skiesmag.com/wp-content/uploads/2024/07/Cessna-Grand-Caravan-Cockpit-Image-Updated.jpg"
    ],
    description: "Надійний і витривалий утилітарний турбогвинтовий літак. Відомий як «крилатий пікап». Використовується для пасажирських, вантажних перевезень та гуманітарних місій у найважчих умовах.",
    category: "Турбогвинтовий",
    year: 2022,
    manufacturer: "Cessna",
    specs: { speed: "343 км/год", range: "1 689 км", altitude: "7 620 м", passengers: 14, engines: "1 × Pratt & Whitney PT6A-140", cargo: "3.1 м³" }
  },
  {
    id: 24,
    title: "Airbus BelugaXL",
    price: 330000000,
     price: 2685000,
      images: [
      "/BelugaXL.jpg",
      "https://www.aeroflap.com.br/wp-content/uploads/2019/10/yourfile-5.jpg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDBzarywUS3MFgP1LvA2jUfjjZAUk0zFqsl40qxQRuCjQJTFaXYi5BZH1zMS4eUg4D9ixiUb2lsGRwHXwMaRoJvebY3HOL9Cc58P2WelIqYM7k8ZJ8J2YJdH_2wADxMe3bg3IzAbQWwNbc/s640/Airbus-Beluga-cockpit.JPG"
    ],
    description: "Один з найбільш незвичайних літаків у світі, створений у формі кита-білухи. Спеціалізований вантажівник для транспортування величезних частин інших літаків (наприклад, крил A350).",
    category: "Вантажний",
    year: 2020,
    manufacturer: "Airbus",
    specs: { speed: "737 км/год", range: "4 000 км", altitude: "10 668 м", passengers: 0, engines: "2 × Rolls-Royce Trent 700", cargo: "51 тонна / 2209 м³" }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("✅ Connected to MongoDB for seeding...");

    await Plane.deleteMany({});
    console.log("🗑  Old planes removed");

    // Якщо у літака вже є масив images, використовуємо його. Якщо немає - створюємо заглушки.
    const planesWithGallery = planes.map(plane => {
      return {
        ...plane,
        status: 'В наявності',
        images: plane.images ? plane.images : [
          plane.image,
          "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=800&q=80"
        ]
      };
    });

    await Plane.insertMany(planesWithGallery);
    console.log("✈️  New planes with GALLERY added successfully!");

    mongoose.connection.close();
    console.log("🔌 Connection closed. Seeding done.");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDB();