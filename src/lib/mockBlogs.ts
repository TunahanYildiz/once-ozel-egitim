export interface BlogPostSection {
  type: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

export interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover_url: string;
  created_at: string;
  sections: BlogPostSection[];
  content_html?: string;
}

export const MOCK_BLOGS_DETAIL: Record<string, Record<string, BlogPostDetail>> = {
  'cocuklarda-dil-gelisimi': {
    tr: {
      id: '1',
      slug: 'cocuklarda-dil-gelisimi',
      title: 'Çocuklarda Dil Gelişimi ve Konuşma Terapisi',
      summary: '0-5 yaş arasındaki dil gelişimi aşamaları, normalden sapmaları erken fark etme yöntemleri ve konuşma terapisinin çocuğunuza nasıl katkı sağlayabileceğine dair kapsamlı bir rehber.',
      cover_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-05-01T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Dil ve konuşma becerileri, çocukların dünyayı anlama ve kendilerini ifade etme yollarının temelidir. Dil gelişimi, doğumdan itibaren başlayan ve özellikle ilk beş yılda inanılmaz bir hızla ilerleyen dinamik bir süreçtir. Her çocuğun gelişim hızı benzersiz olmakla birlikte, belirli yaş dönemlerinde kazanılması beklenen temel beceriler bulunmaktadır.'
        },
        {
          type: 'heading',
          text: 'Yaş Gruplarına Göre Dil Gelişimi Aşamaları'
        },
        {
          type: 'paragraph',
          text: '• 0-12 Ay (Bebeklik Dönemi): Agulama, babıldama, sesleri taklit etme ve ismine tepki verme bu dönemin önemli aşamalarıdir. İlk anlamlı kelimeler genellikle 1 yaş civarında ortaya çıkar.'
        },
        {
          type: 'paragraph',
          text: '• 12-24 Ay (İlk Çocukluk): Kelime haznesi hızla genişler. İki kelimeli basit cümleler (örn: "anne su", "baba gitti") kurulmaya başlanır. Çocuk, basit komutları anlar ve yerine getirir.'
        },
        {
          type: 'paragraph',
          text: '• 2-3 Yaş: Üç veya daha fazla kelimeden oluşan cümleler kurulur. Çocuğun konuşması, yakın çevresi tarafından büyük oranda anlaşılır. Soru ekleri ve zamirler kullanılmaya başlanır.'
        },
        {
          type: 'paragraph',
          text: '• 3-5 Yaş: Karmaşık cümleler kurulur, hikayeler anlatılır. Konuşmanın anlaşılırlığı yabancılar için bile %90\'ın üzerine çıkar.'
        },
        {
          type: 'heading',
          text: 'Erken Dönemde Dil Gecikmesi Belirtileri'
        },
        {
          type: 'paragraph',
          text: 'Ebeveynlerin şu belirtilere dikkat etmesi ve gerektiğinde uzman desteği alması önemlidir:'
        },
        {
          type: 'list',
          items: [
            '12 aylık olmasına rağmen işaret parmağıyla istediklerini göstermemesi veya ses çıkarmaması',
            '18 aylıkken basit kelimeleri (anne, baba vb.) taklit etmemesi veya kullanmaması',
            '2 yaşına geldiğinde kendiliğinden kelime veya cümle kurmak yerine sadece başkalarının söylediklerini tekrarlaması (ekolali)',
            'Konuşurken göz teması kurmaktan kaçınması',
            'Söylenen basit yönergeleri anlamakta güçlük çekmesi'
          ]
        },
        {
          type: 'heading',
          text: 'Konuşma Terapisinin Rolü'
        },
        {
          type: 'paragraph',
          text: 'Dil ve konuşma terapisi, çocuğun iletişim becerilerini en üst düzeye çıkarmayı hedefler. Terapistler, oyun temelli ve bilimsel yöntemlerle çocukların kelime haznesini genişletir, konuşma seslerini doğru üretmelerini sağlar ve sosyal iletişim becerilerini güçlendirir. Erken müdahale, çocuğun okul öncesi döneme akranlarıyla benzer seviyede başlaması için en kritik adımdır.'
        }
      ]
    },
    en: {
      id: '1',
      slug: 'cocuklarda-dil-gelisimi',
      title: 'Language Development and Speech Therapy in Children',
      summary: 'A comprehensive guide on stages of language development between ages 0-5, how to recognize deviations early, and how speech therapy can benefit your child.',
      cover_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-05-01T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Language and speech skills are the foundation of how children understand the world and express themselves. Language development is a dynamic process that starts from birth and progresses at an incredible pace, especially in the first five years. Although each child\'s pace of development is unique, there are milestone skills expected to be acquired in specific age periods.'
        },
        {
          type: 'heading',
          text: 'Stages of Language Development by Age Groups'
        },
        {
          type: 'paragraph',
          text: '• 0-12 Months (Infancy): Cooing, babbling, imitating sounds, and responding to their name are important milestones. The first meaningful words usually appear around 1 year of age.'
        },
        {
          type: 'paragraph',
          text: '• 12-24 Months (Toddlerhood): Vocabulary expands rapidly. Simple two-word sentences (e.g., "mommy water", "daddy gone") start to form. The child understands and follows simple commands.'
        },
        {
          type: 'paragraph',
          text: '• 2-3 Years: Sentences of three or more words are formed. The child\'s speech is largely understood by close family. Question words and pronouns start to be used.'
        },
        {
          type: 'paragraph',
          text: '• 3-5 Years: Complex sentences are formed, stories are told. Intelligibility of speech rises above 90%, even for strangers.'
        },
        {
          type: 'heading',
          text: 'Early Signs of Language Delay'
        },
        {
          type: 'paragraph',
          text: 'It is important for parents to pay attention to the following signs and seek expert support when necessary:'
        },
        {
          type: 'list',
          items: [
            'Not pointing or making sounds to show desires by 12 months',
            'Not imitating or using simple words (like mom, dad) by 18 months',
            'Only repeating what others say (echolalia) instead of producing spontaneous words or sentences by 2 years',
            'Avoiding eye contact while speaking',
            'Having difficulty understanding simple directions'
          ]
        },
        {
          type: 'heading',
          text: 'The Role of Speech Therapy'
        },
        {
          type: 'paragraph',
          text: 'Speech and language therapy aims to maximize the child\'s communication skills. Therapists expand children\'s vocabulary, help them produce speech sounds correctly, and strengthen social communication skills through play-based and scientific methods. Early intervention is the most critical step to ensure a child starts preschool at a similar level to their peers.'
        }
      ]
    },
    de: {
      id: '1',
      slug: 'cocuklarda-dil-gelisimi',
      title: 'Sprachentwicklung und Logopädie bei Kindern',
      summary: 'Ein umfassender Leitfaden zu den Phasen der Sprachentwicklung im Alter von 0-5 Jahren, wie man Abweichungen frühzeitig erkennt und wie Logopädie Ihrem Kind helfen kann.',
      cover_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-05-01T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Sprach- und Sprechfähigkeiten sind die Grundlage dafür, wie Kinder die Welt verstehen und sich selbst ausdrücken. Die Sprachentwicklung ist ein dynamischer Prozess, der von Geburt an beginnt und besonders in den ersten fingern Jahren in einem unglaublichen Tempo voranschreitet. Obwohl das Entwicklungstempo jedes Kindes einzigartig ist, gibt es grundlegende Fähigkeiten, die in bestimmten Altersperioden erworben werden sollten.'
        },
        {
          type: 'heading',
          text: 'Phasen der Sprachentwicklung nach Altersgruppen'
        },
        {
          type: 'paragraph',
          text: '• 0-12 Monate (Säuglingsalter): Lallen, Babbeln, Nachahmen von Tönen und Reagieren auf den eigenen Namen sind wichtige Meilensteine. Die ersten sinnvollen Wörter erscheinen meist um das erste Lebensjahr herum.'
        },
        {
          type: 'paragraph',
          text: '• 12-24 Monate (Kleinkindalter): Der Wortschatz erweitert sich schnell. Einfache Zwei-Wort-Sätze (z.B. "Mama Wasser", "Papa weg") bilden sich. Das Kind versteht und befolgt einfache Anweisungen.'
        },
        {
          type: 'paragraph',
          text: '• 2-3 Jahre: Sätze aus drei oder mehr Wörtern werden gebildet. Die Sprache des Kindes wird von der nahen Familie weitgehend verstanden. Fragewörter und Pronomen werden genutzt.'
        },
        {
          type: 'paragraph',
          text: '• 3-5 Jahre: Komplexe Sätze werden gebildet, Geschichten erzählt. Die Verständlichkeit der Sprache steigt auch bei Fremden auf über 90%.'
        },
        {
          type: 'heading',
          text: 'Frühe Anzeichen einer Sprachverzögerung'
        },
        {
          type: 'paragraph',
          text: 'Es ist wichtig, dass Eltern auf die folgenden Anzeichen achten und bei Bedarf fachliche Unterstützung suchen:'
        },
        {
          type: 'list',
          items: [
            'Mit 12 Monaten nicht auf Gegenstände zeigen oder keine Töne erzeugen, um Wünsche auszudrücken',
            'Mit 18 Monaten einfache Wörter (wie Mama, Papa) nicht nachahmen oder verwenden',
            'Mit 2 Jahren nur wiederholen, was andere sagen (Echolalie), statt spontane Wörter oder Sätze zu sprechen',
            'Vermeiden von Blickkontakt beim Sprechen',
            'Schwierigkeiten beim Verstehen einfacher Anweisungen'
          ]
        },
        {
          type: 'heading',
          text: 'Die Rolle der Logopädie'
        },
        {
          type: 'paragraph',
          text: 'Die Sprach- und Sprechtherapie zielt darauf ab, die Kommunikationsfähigkeiten des Kindes zu maximieren. Therapeuten erweitern spielerisch und wissenschaftlich fundiert den Wortschatz der Kinder, unterstützen sie bei der korrekten Lautbildung und stärken die soziale Interaktionsfähigkeit. Eine frühzeitige Intervention ist der wichtigste Schritt, damit ein Kind auf dem Niveau seiner Gleichaltrigen in den Kindergarten startet.'
        }
      ]
    },
    ru: {
      id: '1',
      slug: 'cocuklarda-dil-gelisimi',
      title: 'Развитие речи и логопедия у детей',
      summary: 'Подробное руководство об этапах развития речи у детей в возрасте от 0 до 5 лет, методах раннего выявления отклонений и том, как логопедия может помочь вашему ребенку.',
      cover_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-05-01T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Языковые и речевые навыки — это основа того, как дети понимают мир и выражают себя. Развитие речи — динамичный процесс, который начинается с рождения и прогрессирует с невероятной скоростью, особенно в первые пять лет. Хотя темпы развития каждого ребенка уникальны, существуют базовые навыки, которые должны быть приобретены в определенные возрастные периоды.'
        },
        {
          type: 'heading',
          text: 'Этапы развития речи по возрастным группам'
        },
        {
          type: 'paragraph',
          text: '• 0-12 месяцев (Младенчество): Гуление, лепет, подражание звукам и реакция на собственное имя — важные вехи. Первые осмысленные слова обычно появляются около 1 года.'
        },
        {
          type: 'paragraph',
          text: '• 12-24 месяца (Раннее детство): Словарный запас быстро расширяется. Начинают формироваться простые двухсловные предложения (например, «мама дай», «папа ушел»). Ребенок понимает и выполняет простые команды.'
        },
        {
          type: 'paragraph',
          text: '• 2-3 года: Формируются предложения из трех и более слов. Речь ребенка в значительной степени понятна близким. Начинают использоваться вопросительные слова и местоимения.'
        },
        {
          type: 'paragraph',
          text: '• 3-5 лет: Строятся сложные предложения, пересказываются истории. Понятность речи возрастает до 90% и выше даже для незнакомых людей.'
        },
        {
          type: 'heading',
          text: 'Ранние признаки задержки речевого развития'
        },
        {
          type: 'paragraph',
          text: 'Родителям важно обращать внимание на следующие признаки и при необходимости обращаться за помощью к специалистам:'
        },
        {
          type: 'list',
          items: [
            'Отсутствие указательного жеста или звуков для выражения желаний к 12 месяцам',
            'Неспособность подражать простым словам (мама, папа и т.д.) или использовать их к 18 месяцам',
            'К 2 годам только повторение слов за другими (эхолалия) вместо спонтанной речи',
            'Избегание зрительного контакта во время общения',
            'Трудности с пониманием простых словесных инструкций'
          ]
        },
        {
          type: 'heading',
          text: 'Роль логопеда в развитии ребенка'
        },
        {
          type: 'paragraph',
          text: 'Логопедическая помощь направлена на максимальное развитие коммуникативных навыков ребенка. Специалисты с помощью игровых и научных методов расширяют словарный запас детей, помогают им правильно произносить звуки речи и укрепляют навыки социального взаимодействия. Раннее вмешательство — самый важный шаг для того, чтобы ребенок начал посещать дошкольное учреждение на одном уровне со своими сверстниками.'
        }
      ]
    }
  },
  'otizmde-erken-tani': {
    tr: {
      id: '2',
      slug: 'otizmde-erken-tani',
      title: 'Otizmde Erken Tanının Hayat Kurtaran Önemi',
      summary: 'Erken müdahalenin otizm spektrum bozukluğunda ne denli kritik olduğunu, ebeveynlerin dikkat etmesi gereken ilk belirtileri ve doğru kaynaklara nasıl ulaşılacağını bu yazıda ele aldık.',
      cover_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-04-15T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Otizm Spektrum Bozukluğu (OSB), doğuştan gelen ya da yaşamın ilk yıllarında ortaya çıkan karmaşık bir nörogelişimsel farklılıktır. Otizmin belirtileri genellikle yaşamın ilk 2-3 yılında belirginleşir. Araştırmalar, beynin en hızlı geliştiği ve plastisitesinin (şekillenebilirliğinin) en yüksek olduğu erken çocukluk döneminde yapılan müdahalelerin, çocuğun gelecekteki bağımsız yaşam becerileri üzerinde dramatik derecede olumlu etkileri olduğunu göstermektedir.'
        },
        {
          type: 'heading',
          text: 'Ebeveynlerin Dikkat Etmesi Gereken İlk Belirtiler'
        },
        {
          type: 'paragraph',
          text: 'Otizmde erken tanı koyabilmek için ebeveynlerin gelişimsel basamakları yakından takip etmesi gerekir. Aşağıdaki belirtilerden biri veya birkaçı gözlemlendiğinde zaman kaybetmeden bir çocuk psikiyatristine başvurulmalıdır:'
        },
        {
          type: 'list',
          items: [
            'Adı söylendiğinde tepki vermeme veya dönüp bakmama',
            'Göz teması kurmaktan kaçınma veya çok kısa süreli kurma',
            'İşaret parmağıyla istediği bir nesneyi göstermeme veya ortak dikkat geliştirememe',
            'Akranlarına veya çevresindeki insanlara karşı ilgisizlik, oyunlara dahil olmama',
            'Dönen nesnelere (pervane, tekerlek vb.) aşırı ilgi veya sallanma, parmak ucunda yürüme gibi tekrarlayıcı hareketler (sterotipi)',
            'Konuşmada gecikme veya aynı kelimeleri sürekli tekrarlama'
          ]
        },
        {
          type: 'heading',
          text: 'Erken Müdahale ve Bireyselleştirilmiş Eğitim (BEP)'
        },
        {
          type: 'paragraph',
          text: 'Tanı alan çocuk için zaman kaybetmeden yoğun ve nitelikli bir özel eğitim programı başlatılmalıdır. Bireyselleştirilmiş Eğitim Programı (BEP), çocuğun güçlü ve zayıf yönlerini analiz ederek tamamen onun hızına ve ihtiyacına uygun gelişim hedefleri belirler. ABA (Uygulamalı Davranış Analizi) terapisi, konuşma terapisi ve duyu bütünleme destekleriyle örülen çok boyutlu eğitim, otizmli çocukların potansiyellerini en üst seviyeye ulaştırır.'
        },
        {
          type: 'paragraph',
          text: 'Unutulmamalıdır ki otizm bir hastalık değil, gelişimsel bir farklılıktır. Doğru zamanda atılan doğru adımlarla, bu farklılığa sahip çocuklarımız bağımsız, başarılı ve mutlu bir hayat kurabilirler.'
        }
      ]
    },
    en: {
      id: '2',
      slug: 'otizmde-erken-tani',
      title: 'The Life-Saving Importance of Early Diagnosis in Autism',
      summary: 'We discuss how critical early intervention is in autism spectrum disorder, the first signs parents should watch for, and how to access the right resources.',
      cover_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-04-15T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Autism Spectrum Disorder (ASD) is a complex neurodevelopmental difference that is congenital or appears in the first years of life. Symptoms of autism usually become apparent in the first 2-3 years of life. Research shows that interventions made during early childhood—when the brain develops fastest and has the highest plasticity (moldability)—have dramatically positive effects on the child\'s future independent living skills.'
        },
        {
          type: 'heading',
          text: 'First Signs Parents Should Watch For'
        },
        {
          type: 'paragraph',
          text: 'To make an early diagnosis of autism, parents must closely monitor developmental milestones. A child psychiatrist should be consulted if one or more of the following signs are observed:'
        },
        {
          type: 'list',
          items: [
            'Not responding or looking back when their name is called',
            'Avoiding eye contact or making it for very brief periods',
            'Not pointing to an object they want or failing to develop joint attention',
            'Disinterest in peers or people around them, not participating in games',
            'Excessive interest in spinning objects (fans, wheels, etc.) or repetitive movements like rocking or walking on toes (stereotypy)',
            'Delay in speech or constantly repeating the same words'
          ]
        },
        {
          type: 'heading',
          text: 'Early Intervention and Individualized Education Program (IEP)'
        },
        {
          type: 'paragraph',
          text: 'An intensive and high-quality special education program should be started without losing time for a diagnosed child. The Individualized Education Program (IEP) analyzes the child\'s strengths and weaknesses and sets development goals completely suited to their pace and needs. Multi-dimensional education built with ABA (Applied Behavior Analysis) therapy, speech therapy, and sensory integration support brings autistic children\'s potential to the highest level.'
        },
        {
          type: 'paragraph',
          text: 'It should be remembered that autism is not a disease, but a developmental difference. With the right steps taken at the right time, our children with this difference can build an independent, successful, and happy life.'
        }
      ]
    },
    de: {
      id: '2',
      slug: 'otizmde-erken-tani',
      title: 'Die lebensrettende Bedeutung einer frühen Diagnose bei Autismus',
      summary: 'Wir besprechen, wie wichtig eine frühzeitige Intervention bei Autismus-Spektrum-Störungen ist, auf welche ersten Anzeichen Eltern achten sollten und wie man an die richtigen Ressourcen gelangt.',
      cover_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-04-15T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Die Autismus-Spektrum-Störung (ASS) ist eine komplexe neurobiologische Entwicklungsbesonderheit, die angeboren ist oder sich in den ersten Lebensjahren zeigt. Die Symptome werden meist in den ersten 2-3 Lebensjahren deutlich. Die Forschung zeigt, dass Interventionen in der frühen Kindheit – wenn das Gehirn sich am schnellsten entwickelt und die höchste Plastizität besitzt – dramatisch positive Auswirkungen auf die zukünftigen Fähigkeiten zur selbstständigen Lebensführung haben.'
        },
        {
          type: 'heading',
          text: 'Erste Anzeichen, auf die Eltern achten sollten'
        },
        {
          type: 'paragraph',
          text: 'Für eine frühzeitige Autismus-Diagnose sollten Eltern die Entwicklungsschritte eng begleiten. Ein Kinderpsychiater sollte aufgesucht werden, wenn eines oder mehrere der folgenden Anzeichen beobachtet werden:'
        },
        {
          type: 'list',
          items: [
            'Nicht reagieren oder sich umdrehen, wenn der Name gerufen wird',
            'Vermeiden von Blickkontakt oder nur sehr kurzes Halten desselben',
            'Nicht mit dem Zeigefinger auf ein gewünschtes OBjekt zeigen oder die geteilte Aufmerksamkeit verfehlen',
            'Desinteresse an Gleichaltrigen oder Mitmenschen, kein Einbringen in Spiele',
            'Übermäßiges Interesse an rotierenden Objekten (Ventilatoren, Räder) oder stereotype Bewegungen wie Schaukeln oder Zehenspitzengang',
            'Verzögerung der Sprache oder ständiges Wiederholen derselben Wörter'
          ]
        },
        {
          type: 'heading',
          text: 'Frühförderung und individueller Bildungsplan (IEP)'
        },
        {
          type: 'paragraph',
          text: 'Für ein diagnostiziertes Kind sollte ohne Zeitverlust ein intensives und qualifiziertes sonderpädagogisches Programm gestartet werden. Der Individuelle Bildungsplan analysiert die Stärken und Schwächen des Kindes und legt Entwicklungsziele fest, die ganz auf sein Tempo und seine Bedürfnisse abgestimmt sind. Ein mehrdimensionaler Ansatz mit ABA-Therapie, Logopädie und sensorischer Integration schöpft das Potenzial autistischer Kinder voll aus.'
        },
        {
          type: 'paragraph',
          text: 'Es sollte nicht vergessen werden, dass Autismus keine Krankheit ist, sondern eine Entwicklungsbesonderheit. Mit den richtigen Schritten zur richtigen Zeit können unsere Kinder mit dieser Besonderheit ein selbstbestimmtes, erfolgreiches und glückliches Leben aufbauen.'
        }
      ]
    },
    ru: {
      id: '2',
      slug: 'otizmde-erken-tani',
      title: 'Жизненно важная ценность ранней диагностики аутизма',
      summary: 'В этой статье мы обсуждаем, насколько критично раннее вмешательство при расстройствах аутистического спектра, на какие первые признаки родителям следует обратить внимание.',
      cover_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-04-15T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Расстройство аутистического спектра (РАС) — это сложное врожденное нарушение развития нервной системы, проявляющееся в первые годы жизни. Симптомы аутизма обычно становятся очевидными в возрасте 2–3 лет. Исследования показывают, что вмешательства в раннем детстве — когда мозг развивается наиболее активно и обладает наибольшей пластичностью — оказывают колоссальное положительное влияние на будущую независимость ребенка.'
        },
        {
          type: 'heading',
          text: 'Первые признаки, на которые родители должны обратить внимание'
        },
        {
          type: 'paragraph',
          text: 'Для ранней диагностики аутизма родителям необходимо внимательно следить за этапами развития ребенка. При обнаружении одного или нескольких из следующих признаков следует незамедлительно обратиться к детскому психиатру:'
        },
        {
          type: 'list',
          items: [
            'Отсутствие реакции на собственное имя (ребенок не оборачивается)',
            'Избегание зрительного контакта или кратковременный взгляд',
            'Отсутствие указательного жеста на интересующий предмет или неспособность разделить внимание',
            'Безразличие к сверстникам и окружающим людям, нежелание участвовать в совместных играх',
            'Чрезмерный интерес к вращающимся предметам (вентиляторы, колеса) или повторяющиеся движения, такие как покачивание или ходьба на цыпочках (стереотипии)',
            'Задержка речи или постоянное повторение одних и тех же слов'
          ]
        },
        {
          type: 'heading',
          text: 'Раннее вмешательство и индивидуальная программа обучения (ИОП)'
        },
        {
          type: 'paragraph',
          text: 'Для ребенка с диагностированным РАС необходимо без промедления начать интенсивную программу специального образования. Индивидуализированная программа обучения анализирует сильные и слабые стороны ребенка и устанавливает цели развития, полностью соответствующие его темпу и потребностям. Многомерный подход с применением ABA-терапии, логопедии и терапии сенсорной интеграции раскрывает потенциал детей с аутизмом.'
        },
        {
          type: 'paragraph',
          text: 'Важно помнить, что аутизм — это не болезнь, а особенность развития. При правильных и своевременных шагах наши дети с такой особенностью могут построить независимую, успешную и счастливую жизнь.'
        }
      ]
    }
  },
  'duyu-butunleme-nedir': {
    tr: {
      id: '3',
      slug: 'duyu-butunleme-nedir',
      title: 'Duyu Bütünleme Nedir? Belirtileri ve Tedavisi',
      summary: 'Duyu bütünleme terapisinin duyusal işleme güçlüğü yaşayan çocuklarda gözlemlenen belirtiler, günlük yaşama etkileri ve bu süreçteki rolü hakkında bilmeniz gerekenler.',
      cover_url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-03-20T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Duyu bütünleme; vücudumuzdan ve çevremizden aldığımız duyusal bilgileri (dokunma, işitme, görme, koklama, tat alma, denge ve derin duyu) beynimizin organize etmesi ve bunlara uygun bir yanıt oluşturması sürecidir. Bu süreçte yaşanan aksaklıklar "Duyusal İşleme Bozukluğu" olarak adlandırılır ve çocukların akademik, sosyal ve günlük yaşam becerilerini doğrudan etkiler.'
        },
        {
          type: 'heading',
          text: 'Duyusal İşleme Güçlüğü Belirtileri'
        },
        {
          type: 'paragraph',
          text: 'Duyusal hassasiyetler çocuktan çocuğa farklılık gösterebilir. Bazı çocuklar duyusal girdilere karşı aşırı hassasken (aşırı duyarlılık), bazıları ise daha fazla girdiye ihtiyaç duyar (düşük duyarlılık):'
        },
        {
          type: 'list',
          items: [
            'Aşırı Duyarlılık: Yüksek seslerden (süpürge, blender vb.) aşırı korkma, kıyafet etiketlerinden rahatsız olma, sarılmaktan veya dokunulmaktan kaçınma, yemeklerin dokusuna aşırı seçici yaklaşma.',
            'Düşük Duyarlılık (Arayış): Kendi etrafında sürekli dönme, yüksek yerlerden atlama isteği, nesneleri koklama veya sürekli ağzına götürme, ağrıya karşı yüksek tolerans gösterme.',
            'Koordinasyon Problemleri: Sık sık düşme, sakarlık, merdiven inip çıkarken aksaklık, bisiklete binme veya top yakalamada zorlanma.'
          ]
        },
        {
          type: 'heading',
          text: 'Duyu Bütünleme Terapisi Nasıl Uygulanır?'
        },
        {
          type: 'paragraph',
          text: 'Duyu bütünleme terapisi, özel donanımlı terapi salonlarında (salıncaklar, tırmanma duvarları, top havuzları, farklı dokuda materyaller) uzman fizyoterapistler veya ergoterapistler tarafından oyun formunda uygulanır. Terapi sürecinde çocuğun sinir sisteminin duyusal girdileri doğru işlemesi desteklenir. Bu sayede çocuğun odaklanma süresi uzar, motor koordinasyonu gelişir, kaygı düzeyi düşer ve günlük yaşama uyumu artar.'
        }
      ]
    },
    en: {
      id: '3',
      slug: 'duyu-butunleme-nedir',
      title: 'What is Sensory Integration? Symptoms and Treatment',
      summary: 'Learn about the symptoms observed in children with sensory processing difficulties, its effects on daily life, and the role of sensory integration therapy in this process.',
      cover_url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-03-20T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Sensory integration is the process by which our brain organizes sensory information received from our body and environment (touch, hearing, sight, smell, taste, balance, and deep sensation) and creates an appropriate response. Disruptions in this process are called "Sensory Processing Disorder" and directly affect children\'s academic, social, and daily living skills.'
        },
        {
          type: 'heading',
          text: 'Symptoms of Sensory Processing Difficulties'
        },
        {
          type: 'paragraph',
          text: 'Sensory sensitivities can differ from child to child. While some children are hypersensitive to sensory inputs (over-responsiveness), others need more inputs (under-responsiveness):'
        },
        {
          type: 'list',
          items: [
            'Over-Responsiveness: Being extremely afraid of loud noises (vacuum, blender, etc.), being disturbed by clothing tags, avoiding hugging or being touched, being extremely picky about food textures.',
            'Under-Responsiveness (Sensory Seeking): Spinning around constantly, wanting to jump from high places, smelling objects or constantly putting them in the mouth, showing high tolerance to pain.',
            'Coordination Problems: Falling frequently, clumsiness, extreme insecurity when going up or down stairs, difficulty riding a bicycle or catching a ball.'
          ]
        },
        {
          type: 'heading',
          text: 'How is Sensory Integration Therapy Applied?'
        },
        {
          type: 'paragraph',
          text: 'Sensory integration therapy is applied in game form by expert physiotherapists or occupational therapists in specially equipped therapy rooms (swings, climbing walls, ball pits, materials of different textures). During the therapy process, the child\'s nervous system is supported to process sensory inputs correctly. In this way, the child\'s attention span increases, motor coordination develops, anxiety levels drop, and adaptation to daily life increases.'
        }
      ]
    },
    de: {
      id: '3',
      slug: 'duyu-butunleme-nedir',
      title: 'Was ist sensorische Integration? Symptome und Behandlung',
      summary: 'Erfahren Sie mehr über die Symptome bei Kindern mit sensorischen Verarbeitungsstörungen, deren Auswirkungen auf den Alltag und die Rolle der sensorischen Integrationstherapie.',
      cover_url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-03-20T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Sensorische Integration ist der Prozess, bei dem unser Gehirn sensorische Informationen von unserem Körper und unserer Umgebung (Berührung, Hören, Sehen, Riechen, Schmecken, Gleichgewicht und Tiefensensibilität) organisiert und eine angemessene Antwort erstellt. Störungen in diesem Prozess werden als "Sensorische Verarbeitungsstörung" bezeichnet und wirken sich direkt auf die schulischen, sozialen und alltäglichen Fähigkeiten von Kindern aus.'
        },
        {
          type: 'heading',
          text: 'Symptome von sensorischen Verarbeitungsstörungen'
        },
        {
          type: 'paragraph',
          text: 'Sensorische Empfindlichkeiten können sich von Kind zu Kind unterscheiden. Während manche Kinder überempfindlich auf Reize reagieren (Überempfindlichkeit), benötigen andere mehr Reize (Unterempfindlichkeit):'
        },
        {
          type: 'list',
          items: [
            'Überempfindlichkeit: Extreme Angst vor lauten Geräuschen (Staubsauger, Mixer), Störung durch Kleidungsetiketten, Vermeiden von Umarmungen oder Berührungen, extreme Wählerischkeit bei Essenskonsistenzen.',
            'Unterempfindlichkeit (Reizsuche): Ständiges Drehen um die eigene Achse, Drang, von hohen Stellen zu springen, Riechen an Gegenständen oder ständiges in den Mund Stecken, hohe Schmerztoleranz.',
            'Koordinationsprobleme: Häufiges Hinfallen, Ungeschicklichkeit, Unsicherheit beim Treppensteigen, Schwierigkeiten beim Fahrradfahren oder Ballfangen.'
          ]
        },
        {
          type: 'heading',
          text: 'Wie wird die sensorische Integrationstherapie durchgeführt?'
        },
        {
          type: 'paragraph',
          text: 'Die sensorische Integrationstherapie wird spielerisch von erfahrenen Physiotherapeuten oder Ergotherapeuten in speziell ausgestatteten Therapieräumen (Schaukeln, Kletterwände, Bällebäder, Materialien verschiedener Texturen) durchgeführt. Während der Therapie wird das Nervensystem des Kindes dabei unterstützt, Sinnesreize richtig zu verarbeiten. Dadurch verbessert sich die Aufmerksamkeitsspanne, die motorische Koordination entwickelt sich, Angstzustände nehmen ab und die Bewältigung des Alltags fällt leichter.'
        }
      ]
    },
    ru: {
      id: '3',
      slug: 'duyu-butunleme-nedir',
      title: 'Что такое сенсорная интеграция? Симптомы и лечение',
      summary: 'Узнайте о симптомах, наблюдаемых у детей с трудностями обработки сенсорной информации, их влиянии на повседневную жизнь и роли терапии сенсорной интеграции.',
      cover_url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1200&q=80',
      created_at: '2026-03-20T00:00:00Z',
      sections: [
        {
          type: 'paragraph',
          text: 'Сенсорная интеграция — это процесс, посредством которого наш мозг организует сенсорную информацию, получаемую от нашего тела и из окружающей среды (осязание, слух, зрение, обоняние, вкус, чувство равновесия и глубокая чувствительность), и формирует адекватный ответ. Нарушения этого процесса называются «синдромом нарушения сенсорной обработки» и напрямую влияют на учебные, социальные и бытовые навыки ребенка.'
        },
        {
          type: 'heading',
          text: 'Симптомы нарушения сенсорной обработки'
        },
        {
          type: 'paragraph',
          text: 'Сенсорная чувствительность индивидуальна для каждого ребенка. Некоторые дети гиперчувствительны к стимулам (сверхчувствительность), тогда как другие испытывают нехватку ощущений (сниженная чувствительность):'
        },
        {
          type: 'list',
          items: [
            'Сверхчувствительность: Сильный страх перед громкими звуками (пылесос, блендер), дискомфорт от ярлыков на одежде, избегание объятий или прикосновений, избирательность к текстуре пищи.',
            'Сниженная чувствительность (поиск ощущений): Постоянное кружение на месте, желание спрыгивать с высоты, обнюхивание предметов или постоянное желание тянуть их в рот, высокий болевой порог.',
            'Проблемы с координацией: Частые падения, неуклюжесть, неуверенность при спуске и подъеме по лестнице, трудности с ездой на велосипеде или ловлей мяча.'
          ]
        },
        {
          type: 'heading',
          text: 'Как проводится терапия сенсорной интеграции?'
        },
        {
          type: 'paragraph',
          text: 'Терапия сенсорной интеграции проводится в игровой форме квалифицированными физиотерапевтами или эрготерапевтами в специально оборудованных залах (качели, скалодромы, сухие бассейны, материалы различной текстуры). В процессе занятий нервная система ребенка обучается правильно обрабатывать сенсорные сигналы. Это способствует улучшению концентрации внимания, развитию моторной координации, снижению уровня тревожности и повышению адаптации к повседневной жизни.'
        }
      ]
    }
  }
};
