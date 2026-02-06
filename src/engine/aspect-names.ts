import type { Aspect } from '../types/quiz';

interface AspectMeta {
  name: { ru: string; en: string };
  description: { ru: string; en: string };
}

type AspectNames = Record<string, Record<Aspect, AspectMeta>>;

export const ASPECT_NAMES: AspectNames = {
  // ─── NT: Analysts ───────────────────────────────
  INTJ: {
    shadow: {
      name: { ru: 'Архитектор Бездны', en: 'Architect of the Abyss' },
      description: {
        ru: 'Скрытая сторона вашего видения — глубокая, интенсивная, неукротимая. Аромат того, что вы знаете, но не говорите вслух.',
        en: 'The hidden side of your vision — deep, intense, untamed. The scent of what you know but never say aloud.',
      },
    },
    sanctuary: {
      name: { ru: 'Комната за Стеной', en: 'The Room Behind the Wall' },
      description: {
        ru: 'Место, где контроль отступает и остаётся только тишина. Ваш самый честный покой.',
        en: 'Where control recedes and only silence remains. Your most honest peace.',
      },
    },
    armor: {
      name: { ru: 'Стратегический Щит', en: 'The Strategic Shield' },
      description: {
        ru: 'Ваша безупречная внешняя оболочка — точная, выверенная, не допускающая слабости.',
        en: 'Your flawless outer shell — precise, measured, admitting no weakness.',
      },
    },
  },

  INTP: {
    shadow: {
      name: { ru: 'Лаборатория Хаоса', en: 'Laboratory of Chaos' },
      description: {
        ru: 'Место, где логика встречает безумие — ваши самые дикие и честные мысли.',
        en: 'Where logic meets madness — your wildest, most honest thoughts.',
      },
    },
    sanctuary: {
      name: { ru: 'Библиотека Тишины', en: 'The Library of Silence' },
      description: {
        ru: 'Ностальгическое убежище среди пыльных страниц и незаданных вопросов.',
        en: 'A nostalgic refuge among dusty pages and unasked questions.',
      },
    },
    armor: {
      name: { ru: 'Щит Безразличия', en: 'The Shield of Indifference' },
      description: {
        ru: 'Холодная отстранённость, за которой скрывается самый острый ум в комнате.',
        en: 'Cool detachment hiding the sharpest mind in the room.',
      },
    },
  },

  ENTJ: {
    shadow: {
      name: { ru: 'Корона в Темноте', en: 'Crown in Darkness' },
      description: {
        ru: 'Та часть вас, которая жаждет не только победы, но и... нежности. Признание, которое вы никогда не произнесёте.',
        en: 'The part of you that craves not just victory, but... tenderness. An admission you will never voice.',
      },
    },
    sanctuary: {
      name: { ru: 'Тихая Крепость', en: 'The Silent Fortress' },
      description: {
        ru: 'Единственное место, где вам не нужно быть сильным. Роскошь уязвимости.',
        en: 'The only place where you need not be strong. The luxury of vulnerability.',
      },
    },
    armor: {
      name: { ru: 'Командирский Доспех', en: 'The Commander\'s Armor' },
      description: {
        ru: 'Ваша несокрушимая аура лидера — запах, который входит в комнату раньше вас.',
        en: 'Your unbreakable aura of leadership — a scent that enters the room before you do.',
      },
    },
  },

  ENTP: {
    shadow: {
      name: { ru: 'Лабиринт Зеркал', en: 'The Hall of Mirrors' },
      description: {
        ru: 'За блеском и обаянием — бездонная глубина, в которую вы боитесь заглядывать.',
        en: 'Behind the brilliance and charm — a bottomless depth you fear to explore.',
      },
    },
    sanctuary: {
      name: { ru: 'Забытая Кухня', en: 'The Forgotten Kitchen' },
      description: {
        ru: 'Стыдно простое желание тепла и постоянства. Аромат дома, которого ещё нет.',
        en: 'The shamefully simple desire for warmth and constancy. The scent of a home that doesn\'t exist yet.',
      },
    },
    armor: {
      name: { ru: 'Искра Перемен', en: 'The Spark of Change' },
      description: {
        ru: 'Ваше неукротимое обаяние — яркое, переменчивое, невозможное для удержания.',
        en: 'Your irrepressible charm — bright, mercurial, impossible to contain.',
      },
    },
  },

  // ─── NF: Diplomats ──────────────────────────────
  INFJ: {
    shadow: {
      name: { ru: 'Пророк в Тумане', en: 'Prophet in the Fog' },
      description: {
        ru: 'Интенсивность, которую вы прячете от мира — ваше знание о людях, которое иногда пугает вас самих.',
        en: 'The intensity you hide from the world — your knowledge of people that sometimes frightens even you.',
      },
    },
    sanctuary: {
      name: { ru: 'Храм Без Роли', en: 'The Temple Without a Role' },
      description: {
        ru: 'Здесь вам не нужно быть мудрым, сильным или чутким. Здесь можно просто быть.',
        en: 'Here you need not be wise, strong, or perceptive. Here you can simply be.',
      },
    },
    armor: {
      name: { ru: 'Невидимый Маяк', en: 'The Invisible Lighthouse' },
      description: {
        ru: 'Тихое присутствие, которое направляет других — точное слово в точный момент.',
        en: 'A quiet presence that guides others — the right word at the right moment.',
      },
    },
  },

  INFP: {
    shadow: {
      name: { ru: 'Океан Внутри', en: 'The Ocean Within' },
      description: {
        ru: 'Бесконечная глубина чувств — красивая, пугающая, способная поглотить.',
        en: 'An infinite depth of feeling — beautiful, terrifying, capable of consuming.',
      },
    },
    sanctuary: {
      name: { ru: 'Плед и Тишина', en: 'Blanket and Silence' },
      description: {
        ru: 'Мягкое укрытие, где грусть превращается в красоту, а одиночество — в покой.',
        en: 'A soft shelter where sadness becomes beauty and solitude becomes peace.',
      },
    },
    armor: {
      name: { ru: 'Нежная Сталь', en: 'Gentle Steel' },
      description: {
        ru: 'Мягкость, которая обманчива — под ней скрывается несгибаемая воля.',
        en: 'A softness that deceives — beneath it hides an unbending will.',
      },
    },
  },

  ENFJ: {
    shadow: {
      name: { ru: 'Пустая Сцена', en: 'The Empty Stage' },
      description: {
        ru: 'Что остаётся, когда аплодисменты стихают? Голод, который невозможно утолить.',
        en: 'What remains when the applause fades? A hunger that cannot be satisfied.',
      },
    },
    sanctuary: {
      name: { ru: 'Тихое «Да»', en: 'The Quiet Yes' },
      description: {
        ru: 'Шёпотом произнесённое желание свободы — от ролей, ожиданий, бесконечной заботы.',
        en: 'A whispered desire for freedom — from roles, expectations, endless caregiving.',
      },
    },
    armor: {
      name: { ru: 'Дирижёрская Палочка', en: 'The Conductor\'s Baton' },
      description: {
        ru: 'Ваша способность создавать гармонию вокруг себя — магнетизм, от которого невозможно отвернуться.',
        en: 'Your ability to create harmony around you — a magnetism impossible to resist.',
      },
    },
  },

  ENFP: {
    shadow: {
      name: { ru: 'Угасающая Искра', en: 'The Fading Spark' },
      description: {
        ru: 'Страх потерять огонь — самая тёмная правда для того, кто живёт вспышками.',
        en: 'The fear of losing the fire — the darkest truth for one who lives in flashes.',
      },
    },
    sanctuary: {
      name: { ru: 'Закрытая Комната', en: 'The Closed Room' },
      description: {
        ru: 'Место, куда вы пускаете не всех — тихая, настоящая версия вас.',
        en: 'The place you don\'t let everyone in — the quiet, real version of you.',
      },
    },
    armor: {
      name: { ru: 'Калейдоскоп', en: 'The Kaleidoscope' },
      description: {
        ru: 'Яркий, переливающийся, невозможный — ваш дар делать каждую секунду незабываемой.',
        en: 'Bright, iridescent, impossible — your gift of making every moment unforgettable.',
      },
    },
  },

  // ─── SJ: Sentinels ──────────────────────────────
  ISTJ: {
    shadow: {
      name: { ru: 'Тайный Сад', en: 'The Secret Garden' },
      description: {
        ru: 'Удивительно богатый внутренний мир, о котором никто не подозревает. Воображение за стенами порядка.',
        en: 'A surprisingly rich inner world no one suspects. Imagination behind walls of order.',
      },
    },
    sanctuary: {
      name: { ru: 'Запах Дома', en: 'The Scent of Home' },
      description: {
        ru: 'Якорь стабильности — знакомые ритуалы, дерево, тепло, и ощущение что всё на месте.',
        en: 'An anchor of stability — familiar rituals, wood, warmth, and the feeling that everything is in place.',
      },
    },
    armor: {
      name: { ru: 'Несокрушимый Порядок', en: 'Unbreakable Order' },
      description: {
        ru: 'Ваша надёжность как суперсила — мир может рушиться, но вы — точка опоры.',
        en: 'Your reliability as a superpower — the world may crumble, but you are the point of stability.',
      },
    },
  },

  ISFJ: {
    shadow: {
      name: { ru: 'Вулкан под Шёлком', en: 'Volcano Beneath Silk' },
      description: {
        ru: 'Подавленный огонь — ярость, обида, сила, которую вы прячете за улыбкой.',
        en: 'Suppressed fire — rage, resentment, strength hidden behind a smile.',
      },
    },
    sanctuary: {
      name: { ru: 'Засушенная Роза', en: 'The Pressed Rose' },
      description: {
        ru: 'Хрупкая вечность — забота, сохранённая между страницами времени.',
        en: 'Fragile eternity — care preserved between the pages of time.',
      },
    },
    armor: {
      name: { ru: 'Невидимая Забота', en: 'Invisible Devotion' },
      description: {
        ru: 'Запах хлеба и чистого белья — забота, которую замечаешь только когда она исчезает.',
        en: 'The scent of bread and clean linen — care you only notice when it vanishes.',
      },
    },
  },

  ESTJ: {
    shadow: {
      name: { ru: 'Крепость с Садом', en: 'The Fortress with a Garden' },
      description: {
        ru: 'За непроницаемыми стенами — детская гордость, ностальгия и страх быть ненужным.',
        en: 'Behind impenetrable walls — childlike pride, nostalgia, and the fear of being unnecessary.',
      },
    },
    sanctuary: {
      name: { ru: 'Три Невозможных Слова', en: 'Three Impossible Words' },
      description: {
        ru: '«Мне нужна помощь» — самое сложное, что вы можете произнести. И самое целительное.',
        en: '"I need help" — the hardest thing you can say. And the most healing.',
      },
    },
    armor: {
      name: { ru: 'Маяк Надёжности', en: 'The Lighthouse of Reliability' },
      description: {
        ru: 'Виден издалека, работает безотказно — ваша несокрушимая воля и продуктивность.',
        en: 'Visible from afar, never failing — your indomitable will and productivity.',
      },
    },
  },

  ESFJ: {
    shadow: {
      name: { ru: 'За Кулисами', en: 'Behind the Curtain' },
      description: {
        ru: 'Что скрывается за идеальной хозяйкой? Злость, обида и тоска по собственной радости.',
        en: 'What hides behind the perfect host? Anger, resentment, and longing for your own joy.',
      },
    },
    sanctuary: {
      name: { ru: 'Украденный Вечер', en: 'The Stolen Evening' },
      description: {
        ru: 'Редкое, виноватое удовольствие побыть одной — без чужих потребностей.',
        en: 'The rare, guilty pleasure of being alone — without anyone else\'s needs.',
      },
    },
    armor: {
      name: { ru: 'Дирижёр Гармонии', en: 'The Conductor of Harmony' },
      description: {
        ru: 'Ваш дар — создавать тепло, которое обнимает каждого. Традиция как форма любви.',
        en: 'Your gift — creating warmth that embraces everyone. Tradition as a form of love.',
      },
    },
  },

  // ─── SP: Explorers ──────────────────────────────
  ISTP: {
    shadow: {
      name: { ru: 'Безымянный Вулкан', en: 'The Unnamed Volcano' },
      description: {
        ru: 'Огромное чувство без имени — подавленное, опасное, настоящее.',
        en: 'An enormous feeling without a name — suppressed, dangerous, real.',
      },
    },
    sanctuary: {
      name: { ru: 'Мастерская Тишины', en: 'The Workshop of Silence' },
      description: {
        ru: 'Место, где только вы и вещи. Руки работают, голова молчит — это и есть покой.',
        en: 'A place of just you and things. Hands working, mind quiet — this is peace.',
      },
    },
    armor: {
      name: { ru: 'Молчаливое Действие', en: 'The Silent Action' },
      description: {
        ru: 'Не слова — дела. Ваш аромат не говорит — он просто делает то, что нужно.',
        en: 'Not words — deeds. Your scent doesn\'t speak — it simply does what\'s needed.',
      },
    },
  },

  ISFP: {
    shadow: {
      name: { ru: 'Тихий Пожар', en: 'The Quiet Inferno' },
      description: {
        ru: 'Мир считает вас мягким — и ошибается. Под нежностью горит огонь, способный сжечь всё.',
        en: 'The world thinks you\'re soft — and it\'s wrong. Beneath the tenderness burns a fire that could consume everything.',
      },
    },
    sanctuary: {
      name: { ru: 'Цветок с Землёй', en: 'Flower with Earth' },
      description: {
        ru: 'Красота в необработанном виде — только что сорванная, с землёй на стебле. Настоящая.',
        en: 'Beauty in its raw form — freshly picked, earth still on the stem. Real.',
      },
    },
    armor: {
      name: { ru: 'Исчезающий Жест', en: 'The Vanishing Gesture' },
      description: {
        ru: 'Ваша форма силы — тихий уход, растворение. Не бегство — выбор.',
        en: 'Your form of strength — a quiet departure, dissolution. Not escape — choice.',
      },
    },
  },

  ESTP: {
    shadow: {
      name: { ru: 'Тень за Вспышкой', en: 'The Shadow Behind the Flash' },
      description: {
        ru: 'Секундная пустота за восторгом — и нежелание останавливаться, чтобы её рассмотреть.',
        en: 'The split-second void behind the thrill — and the refusal to stop and examine it.',
      },
    },
    sanctuary: {
      name: { ru: 'Пустая Комната', en: 'The Empty Room' },
      description: {
        ru: 'Эксперимент — кто я, когда не двигаюсь? Редкие минуты тишины, ценнее любого адреналина.',
        en: 'An experiment — who am I when I\'m not moving? Rare minutes of silence, more precious than any adrenaline.',
      },
    },
    armor: {
      name: { ru: 'Удар без Предупреждения', en: 'The Strike Without Warning' },
      description: {
        ru: 'Громкий, дерзкий, без извинений — ваш аромат бьёт сразу, как и вы сами.',
        en: 'Loud, bold, unapologetic — your scent hits immediately, just like you.',
      },
    },
  },

  ESFP: {
    shadow: {
      name: { ru: 'Тень за Светом', en: 'The Shadow Behind the Light' },
      description: {
        ru: 'Одиночество в комнате, полной людей. Страх, что однажды свет погаснет.',
        en: 'Loneliness in a room full of people. The fear that one day the light will go out.',
      },
    },
    sanctuary: {
      name: { ru: 'Ритуал Тишины', en: 'The Ritual of Silence' },
      description: {
        ru: 'Ванна, свеча, музыка — не для красоты, а для выживания. Тело как храм, нуждающийся в ремонте.',
        en: 'Bath, candle, music — not for beauty, but for survival. The body as a temple needing repair.',
      },
    },
    armor: {
      name: { ru: 'Незабываемый Шлейф', en: 'The Unforgettable Trail' },
      description: {
        ru: 'Аромат, от которого оборачиваются — яркий, щедрый, как вы сами.',
        en: 'A scent that makes heads turn — bright, generous, like you.',
      },
    },
  },
};
