(function()
{
  window.QUIZ_DATA = {
  "modules": [
    {
      "id": "new_account",
      "title": "Проверка нового аккаунта",
      "code": "ACCT",
      "category": "Аккаунты",
      "summary": "Первичная проверка новых рекламодателей и фиксация рисков.",
      "passPercent": 80,
      "questions": [
        {
          "id": "newacc_q1",
          "type": "single",
          "text": "Что нужно проверить первым делом, если у клиента первая кампания и она выделена на желтом фоне в списке кампаний?",
          "options": [
            {
              "id": "a",
              "text": "Историю платежей клиента в Unlimit",
              "correct": false
            },
            {
              "id": "b",
              "text": "Возраст домена в whois",
              "correct": false
            },
            {
              "id": "c",
              "text": "Совпадает ли страна в профиле с фактическим IP клиента",
              "correct": true
            },
            {
              "id": "d",
              "text": "Наличие закрепленного аккаунт-менеджера",
              "correct": false
            }
          ],
          "explanation": "Перед любыми углубленными проверками сравниваем страну в профиле и гео IP клиента."
        },
        {
          "id": "newacc_q2",
          "type": "multi",
          "text": "Что нужно обязательно отразить в комментарии в профиле после проверки нового аккаунта?",
          "options": [
            {
              "id": "a",
              "text": "Совпадает или нет страна профиля и IP (Geo match/mismatch)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Есть ли IP-related аккаунты и что в них происходит",
              "correct": true
            },
            {
              "id": "c",
              "text": "Какой браузер использовал сотрудник комплаенса",
              "correct": false
            },
            {
              "id": "d",
              "text": "Возраст домена по ссылке из кампании",
              "correct": true
            },
            {
              "id": "e",
              "text": "Способ оплаты и наличие подозрительных транзакций",
              "correct": true
            }
          ],
          "explanation": "Комментарий должен фиксировать основные риски и связи по IP, домену и платежам."
        },
        {
          "id": "newacc_q3",
          "type": "single",
          "text": "Какой набор факторов сразу подтягивает новый аккаунт в сторону suspicious, даже если креативы сами по себе не кричащие?",
          "options": [
            {
              "id": "a",
              "text": "Только Tier 3, пополнение картой, домен старше года",
              "correct": false
            },
            {
              "id": "b",
              "text": "Только Tier 1/богатые гео, оплата криптой, VPN/proxy, новый домен, агрессивные форматы вроде Popunder",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только мобильный Android, нет пополнений",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только Tier 2 и старый домен",
              "correct": false
            }
          ],
          "explanation": "Комбинация Tier 1, анонимных платежей, свежего домена и агрессивных форматов выглядит как классический фрод."
        },
        {
          "id": "newacc_q4",
          "type": "image_single",
          "text": "На скрине раздела IP crosschecking видно несколько связанных аккаунтов. Что обязан сделать сотрудник с этой информацией?",
          "imageUrl": "images/ip_crosschecking_example.png",
          "options": [
            {
              "id": "a",
              "text": "Сразу закрыть все связанные аккаунты",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проигнорировать, если у нового клиента креативы выглядят нормально",
              "correct": false
            },
            {
              "id": "c",
              "text": "Проверить связанные аккаунты на историю фрода и отразить это в комментарии",
              "correct": true
            },
            {
              "id": "d",
              "text": "Переслать скрин только аккаунт-менеджеру и на этом остановиться",
              "correct": false
            }
          ],
          "explanation": "Связанные по IP аккаунты нужно проверить на наличие фрода и явно зафиксировать вывод в комментарии."
        },
        {
          "id": "newacc_q5",
          "type": "single",
          "text": "Что означает, если кампания в списке выделена желтым фоном?",
          "options": [
            {
              "id": "a",
              "text": "Это VIP-клиент",
              "correct": false
            },
            {
              "id": "b",
              "text": "Это первая кампания данного клиента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Кампания содержит ошибки и отклонена",
              "correct": false
            },
            {
              "id": "d",
              "text": "У клиента отрицательный баланс",
              "correct": false
            }
          ],
          "explanation": "Желтый фон сигнализирует, что это первая кампания и аккаунт требует полной проверки."
        },
        {
          "id": "newacc_q6",
          "type": "single",
          "text": "Какое действие нужно выполнить в профиле, если аккаунт определен как подозрительный (Suspicious)?",
          "options": [
            {
              "id": "a",
              "text": "Просто оставить комментарий и ничего не менять",
              "correct": false
            },
            {
              "id": "b",
              "text": "Поставить галочку 'Suspicious (block risky format)' и нажать 'Update Client Details'",
              "correct": true
            },
            {
              "id": "c",
              "text": "Удалить аккаунт",
              "correct": false
            },
            {
              "id": "d",
              "text": "Изменить пароль клиента",
              "correct": false
            }
          ],
          "explanation": "Нужно зафиксировать статус Suspicious и сохранить изменения в профиле клиента."
        }
      ]
    },
    {
      "id": "suspicious_patterns",
      "title": "Подозрительные паттерны при перепроверке новых аккаунтов",
      "code": "ACCT+",
      "category": "Аккаунты",
      "summary": "Повторные проверки, мониторинг изменений и сигналы фрода.",
      "passPercent": 80,
      "questions": [
        {
          "id": "susp_q1",
          "type": "single",
          "text": "Зачем проводится повторная проверка аккаунтов из раздела New clients 7 days?",
          "options": [
            {
              "id": "a",
              "text": "Чтобы проверить корректность выставленного CPM",
              "correct": false
            },
            {
              "id": "b",
              "text": "Чтобы вовремя поймать фрод, который появился после первой чистой кампании",
              "correct": true
            },
            {
              "id": "c",
              "text": "Чтобы напомнить клиенту пополнить баланс",
              "correct": false
            },
            {
              "id": "d",
              "text": "Чтобы проверить работу технической поддержки",
              "correct": false
            }
          ],
          "explanation": "Некоторые клиенты прогревают аккаунты: первая кампания чистая, фрод появляется позже."
        },
        {
          "id": "susp_q2",
          "type": "single",
          "text": "Какой паттерн настроек кампании считается особо подозрительным при перепроверке?",
          "options": [
            {
              "id": "a",
              "text": "Native по нескольким Tier 1 гео",
              "correct": false
            },
            {
              "id": "b",
              "text": "Popunder с очень короткой и свежей ссылкой, таргет только на Desktop Windows",
              "correct": true
            },
            {
              "id": "c",
              "text": "Video только на iOS",
              "correct": false
            },
            {
              "id": "d",
              "text": "Classic banner только на Tier 3",
              "correct": false
            }
          ],
          "explanation": "Popunder + новый короткий URL + Desktop Windows выглядит как типичный фрод-паттерн."
        },
        {
          "id": "susp_q3",
          "type": "multi",
          "text": "На что в первую очередь смотрим при повторной проверке аккаунта по алертам из Slack канала?",
          "options": [
            {
              "id": "a",
              "text": "Новые подозрительные IP и совпадения в IP crosschecking",
              "correct": true
            },
            {
              "id": "b",
              "text": "Сетевое оборудование офиса клиента",
              "correct": false
            },
            {
              "id": "c",
              "text": "Настройки кампаний: гео, устройства, браузеры, офферы",
              "correct": true
            },
            {
              "id": "d",
              "text": "Есть ли у аккаунта VIP-статус",
              "correct": false
            },
            {
              "id": "e",
              "text": "Изменения вертикали и форматов после первой кампании",
              "correct": true
            }
          ],
          "explanation": "Повторная проверка фокусируется на IP, настройках кампаний и изменениях в поведении клиента."
        }
      ],
      "docLink": "https://trafficstars.atlassian.net/wiki/spaces/T/pages/491946055"
    },
    {
      "id": "csam",
      "title": "Контент с несовершеннолетними (CSAM)",
      "code": "CSAM",
      "category": "Контент",
      "summary": "Политики борьбы с CSAM и чувствительным визуальным контентом.",
      "passPercent": 90,
      "questions": [
        {
          "id": "csam_q1",
          "type": "single",
          "text": "Что считается CSAM в контексте политики компании?",
          "options": [
            {
              "id": "a",
              "text": "Только реальные фото и видео с участием детей",
              "correct": false
            },
            {
              "id": "b",
              "text": "Любой сексуализированный контент с участием лиц младше 18 лет, включая анимированный, ИИ и текстовый",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только контент с явным проникновением",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только если есть жалоба от органа власти",
              "correct": false
            }
          ],
          "explanation": "CSAM включает реальный, анимированный, нарисованный, ИИ и текстовый сексуализированный контент с несовершеннолетними."
        },
        {
          "id": "csam_q2",
          "type": "multi",
          "text": "Какие ключевые слова относятся к явным красным флагам для CSAM и требуют немедленной реакции?",
          "options": [
            {
              "id": "a",
              "text": "Underage",
              "correct": true
            },
            {
              "id": "b",
              "text": "Child",
              "correct": true
            },
            {
              "id": "c",
              "text": "Loli / Lolicon",
              "correct": true
            },
            {
              "id": "d",
              "text": "Shota",
              "correct": true
            },
            {
              "id": "e",
              "text": "Barely legal",
              "correct": false
            },
            {
              "id": "f",
              "text": "Teen",
              "correct": false
            }
          ],
          "explanation": "Underage, Child, Loli/Lolicon, Shota и подобные формулировки требуют жесткой реакции без допущений."
        },
        {
          "id": "csam_q3",
          "type": "single",
          "text": "Что должен сделать сотрудник, если он уверенно идентифицировал CSAM в креативе или на лендинге?",
          "options": [
            {
              "id": "a",
              "text": "Скачать материалы локально и отправить коллегам для проверки",
              "correct": false
            },
            {
              "id": "b",
              "text": "Отклонить с категорией, относящейся к несовершеннолетним, и следовать процедуре эскалации",
              "correct": true
            },
            {
              "id": "c",
              "text": "Ничего не делать до официального запроса от полиции",
              "correct": false
            },
            {
              "id": "d",
              "text": "Поставить warning и разрешить показ до решения менеджера",
              "correct": false
            }
          ],
          "explanation": "CSAM всегда блокируется и эскалируется. Хранить копии локально без нужды нельзя."
        }
      ]
    },
    {
      "id": "codes",
      "title": "Справочник кодов и флагов",
      "code": "REF",
      "category": "Справочники",
      "summary": "Как пользоваться кодами, справочниками и документировать решения.",
      "passPercent": 80,
      "questions": [
        {
          "id": "codes_q1",
          "type": "single",
          "text": "Зачем вообще нужен справочник кодов и флагов в платформе?",
          "options": [
            {
              "id": "a",
              "text": "Чтобы усложнить жизнь комплаенсу",
              "correct": false
            },
            {
              "id": "b",
              "text": "Чтобы понимать, что означают цифровые коды форматов, флагов и статусов кампаний",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только для команды разработки",
              "correct": false
            },
            {
              "id": "d",
              "text": "Используется исключительно в отчетах BI",
              "correct": false
            }
          ],
          "explanation": "Коды помогают понимать значения флагов, форматов и статусов без постоянных расспросов разработчиков."
        },
        {
          "id": "codes_q2",
          "type": "single",
          "text": "Какое основное правило использования флагов в спорных ситуациях?",
          "options": [
            {
              "id": "a",
              "text": "Если не уверен, лучше вообще не ставить флаг",
              "correct": false
            },
            {
              "id": "b",
              "text": "Если не уверен, свериться со справочником и регламентом, а не придумывать свои трактовки",
              "correct": true
            },
            {
              "id": "c",
              "text": "Ставить как можно больше флагов, на всякий случай",
              "correct": false
            },
            {
              "id": "d",
              "text": "Ставить флаги только по просьбе аккаунт-менеджера",
              "correct": false
            }
          ],
          "explanation": "Справочник кодов работает в паре с регламентами и убирает самодеятельность в трактовке флагов."
        },
        {
          "id": "codes_q3",
          "type": "multi",
          "text": "Что важно помнить при работе с флагами чувствительных категорий (sensitive)?",
          "options": [
            {
              "id": "a",
              "text": "Они влияют на то, какие сайты будут получать трафик кампании",
              "correct": true
            },
            {
              "id": "b",
              "text": "Их можно ставить и снимать без комментариев в профиле",
              "correct": false
            },
            {
              "id": "c",
              "text": "Некоторые флаги используются в автоматизированных фильтрах и алертах",
              "correct": true
            },
            {
              "id": "d",
              "text": "Чем больше флагов, тем выше доход платформы",
              "correct": false
            }
          ],
          "explanation": "Флаги чувствительных категорий напрямую влияют на маршрутизацию трафика и автоматические проверки."
        },
        {
          "id": "code_q1",
          "type": "single",
          "text": "Какой код у формата Popunder?",
          "options": [
            {
              "id": "a",
              "text": "7",
              "correct": true
            },
            {
              "id": "b",
              "text": "104",
              "correct": false
            },
            {
              "id": "c",
              "text": "19",
              "correct": false
            }
          ],
          "explanation": "Код 7 соответствует Popunder."
        },
        {
          "id": "code_q2",
          "type": "single",
          "text": "Какой код у формата Push-уведомления?",
          "options": [
            {
              "id": "a",
              "text": "104",
              "correct": true
            },
            {
              "id": "b",
              "text": "7",
              "correct": false
            },
            {
              "id": "c",
              "text": "15",
              "correct": false
            }
          ],
          "explanation": "Push-уведомления имеют код 104."
        },
        {
          "id": "code_q3",
          "type": "single",
          "text": "Какой код у Direct Link?",
          "options": [
            {
              "id": "a",
              "text": "8",
              "correct": true
            },
            {
              "id": "b",
              "text": "6",
              "correct": false
            },
            {
              "id": "c",
              "text": "104",
              "correct": false
            }
          ],
          "explanation": "Direct Link фиксируется кодом 8."
        }
      ]
    },
    {
      "id": "chinese_advertisers",
      "title": "Китайские рекламодатели и канал #chinese_advertisers",
      "code": "CN",
      "category": "Региональные правила",
      "summary": "Особенности работы с китайскими рекламодателями и ограничениями.",
      "passPercent": 80,
      "questions": [
        {
          "id": "cn_q1",
          "type": "single",
          "text": "Бот для канала #chinese_advertisers считает рекламодателя китайским, если его гео относится к каким странам/регионам?",
          "options": [
            {
              "id": "a",
              "text": "Только CN",
              "correct": false
            },
            {
              "id": "b",
              "text": "CN, TW, HK",
              "correct": true
            },
            {
              "id": "c",
              "text": "Любая азиатская страна",
              "correct": false
            },
            {
              "id": "d",
              "text": "CN и JP",
              "correct": false
            }
          ],
          "explanation": "Логика бота ориентируется на CN, TW и HK как на китайских рекламодателей."
        },
        {
          "id": "cn_q2",
          "type": "multi",
          "text": "Что нужно делать с китайскими рекламодателями, которые попали в общую таблицу Chinese Advertisers?",
          "options": [
            {
              "id": "a",
              "text": "Регулярно просматривать их кампании на предмет фрода",
              "correct": true
            },
            {
              "id": "b",
              "text": "Проставлять необходимые флаги для защиты чувствительных сайтов (например 2.19, если это предусмотрено процессом)",
              "correct": true
            },
            {
              "id": "c",
              "text": "Автоматически закрывать их аккаунты через 7 дней",
              "correct": false
            },
            {
              "id": "d",
              "text": "Игнорировать, если нет жалоб от паблишеров",
              "correct": false
            }
          ],
          "explanation": "Для китайских рекламодателей предусмотрен специальный порядок мониторинга и ограничений по флагам."
        },
        {
          "id": "cn_q3",
          "type": "single",
          "text": "Зачем отправлять запрос в канал technical_support по китайским рекламодателям?",
          "options": [
            {
              "id": "a",
              "text": "Чтобы изменить тарификацию CPM вручную",
              "correct": false
            },
            {
              "id": "b",
              "text": "Чтобы попросить техническую команду массово проставить или изменить флаги/ограничения на их кампании",
              "correct": true
            },
            {
              "id": "c",
              "text": "Чтобы закрыть аккаунт по финансовым причинам",
              "correct": false
            },
            {
              "id": "d",
              "text": "Чтобы запросить доступ к данным Google Analytics рекламодателя",
              "correct": false
            }
          ],
          "explanation": "Через technical_support можно запросить технические изменения по набору китайских рекламодателей."
        },
        {
          "id": "cn_q4",
          "type": "multi",
          "text": "Что означают иконки с цифрами \"91\", \"17\" или словом \"Yoyo\" на китайских креативах?",
          "options": [
            {
              "id": "a",
              "text": "Популярные китайские мессенджеры",
              "correct": false
            },
            {
              "id": "b",
              "text": "Маркеры порносайтов или CSAM-контента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Название локальных брендов одежды",
              "correct": false
            },
            {
              "id": "d",
              "text": "Сигнал к немедленному отклонению кампании",
              "correct": true
            }
          ],
          "explanation": "Такие символы используются для маскировки запрещенного контента и требуют мгновенного отклонения."
        }
      ]
    },
    {
      "id": "account_block",
      "title": "Блокировка аккаунта",
      "code": "BAN",
      "category": "Аккаунты",
      "summary": "Процедуры блокировки аккаунтов и обращение с остатками средств.",
      "passPercent": 80,
      "questions": [
        {
          "id": "block_q1",
          "type": "single",
          "text": "В чем ключевое отличие статуса Closed for Fraud от статуса Inactive?",
          "options": [
            {
              "id": "a",
              "text": "При Closed for Fraud аккаунт можно снова открыть без ограничений",
              "correct": false
            },
            {
              "id": "b",
              "text": "При Inactive остаток средств всегда конфискуется",
              "correct": false
            },
            {
              "id": "c",
              "text": "Closed for Fraud используется для тяжелых нарушений и обычно означает, что остаток не возвращается клиенту",
              "correct": true
            },
            {
              "id": "d",
              "text": "Это одно и то же, просто разные названия",
              "correct": false
            }
          ],
          "explanation": "Closed for Fraud применяем только в тяжелых кейсах, и остаток, как правило, не возвращается."
        },
        {
          "id": "block_q2",
          "type": "multi",
          "text": "Какие шаги входят в процедуру блокировки аккаунта клиента за серьезное нарушение?",
          "options": [
            {
              "id": "a",
              "text": "Определить статус (Closed for Fraud или Inactive) и возможность возврата средств",
              "correct": true
            },
            {
              "id": "b",
              "text": "Изменить статус аккаунта в профиле клиента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Уведомить клиента по электронной почте",
              "correct": true
            },
            {
              "id": "d",
              "text": "Запустить тикет на перенос остатка (если применимо)",
              "correct": true
            },
            {
              "id": "e",
              "text": "Задокументировать блокировку в специальной таблице",
              "correct": true
            }
          ],
          "explanation": "Блокировка всегда должна быть прозрачна: статус, письмо клиенту, тикет и запись в таблице."
        },
        {
          "id": "block_q3",
          "type": "single",
          "text": "Если аккаунт закрыт по информации от платежного партнера о мошенничестве с картой, какой статус корректно использовать?",
          "options": [
            {
              "id": "a",
              "text": "Inactive",
              "correct": false
            },
            {
              "id": "b",
              "text": "Closed for Fraud",
              "correct": true
            },
            {
              "id": "c",
              "text": "Testing",
              "correct": false
            },
            {
              "id": "d",
              "text": "Paused",
              "correct": false
            }
          ],
          "explanation": "Финансовый фрод со стороны клиента относится к тяжелым нарушениям и ведет к Closed for Fraud."
        },
        {
          "id": "block_q4",
          "type": "single",
          "text": "Что происходит с остатком средств на счете при статусе \"Closed for Fraud\"?",
          "options": [
            {
              "id": "a",
              "text": "Всегда возвращается клиенту в полном объеме",
              "correct": false
            },
            {
              "id": "b",
              "text": "Замораживается на 30 дней, затем возвращается",
              "correct": false
            },
            {
              "id": "c",
              "text": "Не возвращается и перечисляется в пользу компании как штраф",
              "correct": true
            },
            {
              "id": "d",
              "text": "Автоматически переводится на благотворительность",
              "correct": false
            }
          ],
          "explanation": "При Closed for Fraud остаток чаще всего конфискуется как штраф за тяжелые нарушения."
        }
      ]
    },
    {
      "id": "email_change",
      "title": "Изменение адреса электронной почты",
      "code": "MAIL",
      "category": "Процедуры",
      "summary": "Безопасная смена email и обработка чувствительных запросов клиентов.",
      "passPercent": 100,
      "questions": [
        {
          "id": "email_q1",
          "type": "single",
          "text": "С какого адреса должен прийти запрос на смену email в аккаунте TrafficStats?",
          "options": [
            {
              "id": "a",
              "text": "С любого email, указав ID аккаунта",
              "correct": false
            },
            {
              "id": "b",
              "text": "Только с email, который уже зарегистрирован в этом аккаунте",
              "correct": true
            },
            {
              "id": "c",
              "text": "Через личный Telegram менеджера",
              "correct": false
            },
            {
              "id": "d",
              "text": "Через форму на лендинге компании",
              "correct": false
            }
          ],
          "explanation": "Мы принимаем запрос на смену email только с текущего зарегистрированного адреса клиента."
        },
        {
          "id": "email_q2",
          "type": "multi",
          "text": "Какие обязательные поля должны быть в Jira тикете на смену email клиента?",
          "options": [
            {
              "id": "a",
              "text": "Email клиента",
              "correct": true
            },
            {
              "id": "b",
              "text": "Скрин запроса клиента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Скан паспорта клиента",
              "correct": false
            },
            {
              "id": "d",
              "text": "Ссылка на профиль клиента в админке",
              "correct": false
            }
          ],
          "explanation": "Минимум нужен сам email и подтверждение, что запрос действительно пришел от клиента."
        },
        {
          "id": "email_q3",
          "type": "single",
          "text": "Что делать, если у сотрудника есть подозрения по запросу на смену email?",
          "options": [
            {
              "id": "a",
              "text": "Игнорировать подозрения и выполнить запрос",
              "correct": false
            },
            {
              "id": "b",
              "text": "Запросить дополнительную информацию по регламенту и эскалировать при необходимости",
              "correct": true
            },
            {
              "id": "c",
              "text": "Сразу закрыть аккаунт",
              "correct": false
            },
            {
              "id": "d",
              "text": "Перенести email, но без записи в Jira",
              "correct": false
            }
          ],
          "explanation": "При подозрениях нужно запросить дополнительные данные/подтверждения и следовать процедуре, а не молча выполнять запрос."
        },
        {
          "id": "email_q4",
          "type": "single",
          "text": "Что нужно для снятия двухфакторной защиты (2FA) с аккаунта клиента?",
          "options": [
            {
              "id": "a",
              "text": "Достаточно устного подтверждения клиентского менеджера",
              "correct": false
            },
            {
              "id": "b",
              "text": "Создать Jira-тикет через канал #help-udc и приложить скрин запроса клиента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Просто отключить 2FA в интерфейсе без подтверждений",
              "correct": false
            },
            {
              "id": "d",
              "text": "Запросить пароль от аккаунта и снять защиту вручную",
              "correct": false
            }
          ],
          "explanation": "Снятие 2FA делается только после тикета с доказательством запроса со стороны клиента."
        }
      ]
    },
    {
      "id": "sites_pwb",
      "title": "Проверка сайтов и правила для PBW",
      "code": "PBW",
      "category": "Паблишеры",
      "summary": "Проверка сайтов: очередь Site Approval, защита PBW и forbidden практики.",
      "passPercent": 80,
      "questions": [
        {
          "id": "sites_q1",
          "type": "single",
          "text": "Какая цель базового процесса проверки сайтов паблишеров?",
          "options": [
            {
              "id": "a",
              "text": "Проверить только корректность кода интеграции",
              "correct": false
            },
            {
              "id": "b",
              "text": "Убедиться, что сайт легальный, генерирует качественный трафик и подходит под наши стандарты",
              "correct": true
            },
            {
              "id": "c",
              "text": "Понять, можно ли продать домен третьей стороне",
              "correct": false
            },
            {
              "id": "d",
              "text": "Определить, какие форматы больше всего раздражают пользователей",
              "correct": false
            }
          ],
          "explanation": "Мы проверяем легальность, качество трафика и соответствие стандартам и аудитории."
        },
        {
          "id": "sites_q2",
          "type": "single",
          "text": "Какие статусы может иметь сайт в процессе проверки?",
          "options": [
            {
              "id": "a",
              "text": "Pending, Approved, Paused, Deleted",
              "correct": false
            },
            {
              "id": "b",
              "text": "Pending, Waiting for updates, Approved, Denied",
              "correct": true
            },
            {
              "id": "c",
              "text": "Draft, Active, Archived",
              "correct": false
            },
            {
              "id": "d",
              "text": "Open, Closed, In progress",
              "correct": false
            }
          ],
          "explanation": "Базовый набор: Pending, Waiting for updates, Approved и Denied."
        },
        {
          "id": "sites_q3",
          "type": "multi",
          "text": "Какие действия предпринимает комплаенс по запросу паблишера, работающего с PBW-трафиком и жалующегося на низкокачественную рекламу?",
          "options": [
            {
              "id": "a",
              "text": "Добавляет ограничения по флагам для Ad Spot list",
              "correct": true
            },
            {
              "id": "b",
              "text": "Отправляет запрос на блокировку части RTB-клиентов через Slack",
              "correct": true
            },
            {
              "id": "c",
              "text": "Отмечает сайт как sensitive, если это предусмотрено регламентом",
              "correct": true
            },
            {
              "id": "d",
              "text": "Отключает все рекламные форматы на сайте",
              "correct": false
            }
          ],
          "explanation": "Для PBW вводим ограничения по флагам, блокируем неподходящих RTB-клиентов и помечаем сайт как sensitive при необходимости."
        },
        {
          "id": "sites_q4",
          "type": "multi",
          "text": "Какие флаги обычно отключаются для спотов PBW-сайта, чтобы защитить его от агрессивной и низкокачественной рекламы?",
          "options": [
            {
              "id": "a",
              "text": "1.8.2 Free aggregator sites",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.3 Fake elements",
              "correct": true
            },
            {
              "id": "c",
              "text": "2.11 Aggressive flashing",
              "correct": true
            },
            {
              "id": "d",
              "text": "3.2 Forced push subscription",
              "correct": true
            },
            {
              "id": "e",
              "text": "3.6 Non Google compliant",
              "correct": true
            }
          ],
          "explanation": "Для PBW-сайтов отключаем ряд флагов, связанных с обманчивыми и агрессивными форматами."
        },
        {
          "id": "sites_q5",
          "type": "single",
          "text": "Какая кнопка позволяет быстро настроить безопасные флаги для PBW сайта?",
          "options": [
            {
              "id": "a",
              "text": "Block all",
              "correct": false
            },
            {
              "id": "b",
              "text": "Leave google Compliant creatives only",
              "correct": true
            },
            {
              "id": "c",
              "text": "Allow aggressive ads",
              "correct": false
            },
            {
              "id": "d",
              "text": "Approve site",
              "correct": false
            }
          ],
          "explanation": "Кнопка Leave google Compliant creatives only отключает большинство агрессивных флагов одним кликом."
        },
        {
          "id": "sites_q6",
          "type": "single",
          "text": "Как паблишер подтверждает владение сайтом (ownership)?",
          "options": [
            {
              "id": "a",
              "text": "Присылает скан паспорта владельца",
              "correct": false
            },
            {
              "id": "b",
              "text": "Размещает специальный мета-тег в коде сайта",
              "correct": true
            },
            {
              "id": "c",
              "text": "Делает звонок в поддержку",
              "correct": false
            },
            {
              "id": "d",
              "text": "Присылает скриншот админки хостинга",
              "correct": false
            }
          ],
          "explanation": "Платформа автоматически проверяет наличие мета-тега \"yoda\" на сайте паблишера."
        },
        {
          "id": "sites_q7",
          "type": "multi",
          "text": "Какие флаги обязательно отключаем для спотов на PBW-сайтах по запросу паблишера?",
          "options": [
            {
              "id": "a",
              "text": "1.8.2 Free aggregator sites",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.3 Fake elements",
              "correct": true
            },
            {
              "id": "c",
              "text": "2.11 Aggressive flashing",
              "correct": true
            },
            {
              "id": "d",
              "text": "2.19 Stop traffic to sensitive sites list",
              "correct": true
            },
            {
              "id": "e",
              "text": "3.2 Forced push subscription",
              "correct": true
            },
            {
              "id": "f",
              "text": "3.3 Back button",
              "correct": true
            },
            {
              "id": "g",
              "text": "3.6 Non Google compliant",
              "correct": true
            }
          ],
          "explanation": "При работе с PBW отключаем агрессивные флаги и используем кнопку “Leave Google compliant creatives only”."
        },
        {
          "id": "sites_q8",
          "type": "multi",
          "text": "Какие признаки могут указывать на риск мошенничества со стороны паблишера?",
          "options": [
            {
              "id": "a",
              "text": "Несоответствие геолокации профиля и IP-адреса",
              "correct": true
            },
            {
              "id": "b",
              "text": "Связанные аккаунты, ранее закрытые за фрод",
              "correct": true
            },
            {
              "id": "c",
              "text": "Большое количество уникального контента",
              "correct": false
            },
            {
              "id": "d",
              "text": "Наличие аккаунт-менеджера",
              "correct": false
            }
          ],
          "explanation": "Гео/IP mismatch и история фрода в связанных аккаунтах — тревожные сигналы."
        },
        {
          "id": "sites_q9",
          "type": "single",
          "text": "Какой статус получает сайт, если требуется подтверждение владения?",
          "options": [
            {
              "id": "a",
              "text": "Pending",
              "correct": false
            },
            {
              "id": "b",
              "text": "Approved",
              "correct": false
            },
            {
              "id": "c",
              "text": "Waiting for updates",
              "correct": true
            },
            {
              "id": "d",
              "text": "Denied",
              "correct": false
            }
          ],
          "explanation": "Пока ждем подтверждения ownership — статус Waiting for updates."
        },
        {
          "id": "sites_q10",
          "type": "single",
          "text": "Какой инструмент чаще всего используем для оценки посещаемости сайта?",
          "options": [
            {
              "id": "a",
              "text": "Google Analytics",
              "correct": false
            },
            {
              "id": "b",
              "text": "Similarweb",
              "correct": true
            },
            {
              "id": "c",
              "text": "Яндекс.Метрика",
              "correct": false
            },
            {
              "id": "d",
              "text": "Alexa",
              "correct": false
            }
          ],
          "explanation": "Similarweb — основной внешний источник оценки трафика паблишера."
        },
        {
          "id": "sites_q11",
          "type": "single",
          "text": "Какой из сайтов НЕ соответствует стандартам TrafficStars?",
          "options": [
            {
              "id": "a",
              "text": "Сайт с оригинальным контентом и высокой посещаемостью",
              "correct": false
            },
            {
              "id": "b",
              "text": "Сайт на Blogspot без изменений шаблона",
              "correct": true
            },
            {
              "id": "c",
              "text": "Сайт с четкой тематикой и хорошим дизайном",
              "correct": false
            },
            {
              "id": "d",
              "text": "Сайт с уникальными статьями",
              "correct": false
            }
          ],
          "explanation": "Бесплатные шаблонные блоги (Blogspot без кастомизаций) считаются низкого качества."
        },
        {
          "id": "sites_q12",
          "type": "multi",
          "text": "Какие типы контента запрещены для мейнстримных сайтов?",
          "options": [
            {
              "id": "a",
              "text": "Религиозный контент",
              "correct": true
            },
            {
              "id": "b",
              "text": "Сайты школ и детских садов",
              "correct": true
            },
            {
              "id": "c",
              "text": "Сайты с авторским контентом",
              "correct": false
            },
            {
              "id": "d",
              "text": "Сайты с коммунитарным содержанием",
              "correct": true
            }
          ],
          "explanation": "Mainstream запрещает религиозные, образовательные и коммунитарные площадки."
        },
        {
          "id": "sites_q13",
          "type": "single",
          "text": "Как проверяем владение сайтом (ownership)?",
          "options": [
            {
              "id": "a",
              "text": "Проверяем выдачу Google",
              "correct": false
            },
            {
              "id": "b",
              "text": "Просим разместить специальный мета-тег и проверяем его наличие",
              "correct": true
            },
            {
              "id": "c",
              "text": "Оцениваем дизайн",
              "correct": false
            },
            {
              "id": "d",
              "text": "Проверяем SSL-сертификат",
              "correct": false
            }
          ],
          "explanation": "Паблишер размещает ownership мета-тег, который наша система проверяет автоматически."
        },
        {
          "id": "sites_q14",
          "type": "single",
          "text": "Какой комментарий указываем при отклонении сайта из-за отсутствия трафика у нового пользователя?",
          "options": [
            {
              "id": "a",
              "text": "Bad design",
              "correct": false
            },
            {
              "id": "b",
              "text": "Low-quality traffic",
              "correct": true
            },
            {
              "id": "c",
              "text": "No SSL",
              "correct": false
            },
            {
              "id": "d",
              "text": "Ownership",
              "correct": false
            }
          ],
          "explanation": "Если трафик отсутствует или сомнительный — используем причину Low-quality traffic."
        },
        {
          "id": "sites_q15",
          "type": "single",
          "text": "Что делаем, если сайт содержит запрещённый контент (например, нарушение авторских прав)?",
          "options": [
            {
              "id": "a",
              "text": "Переводим в статус Approved",
              "correct": false
            },
            {
              "id": "b",
              "text": "Ставим Denied и фиксируем причину",
              "correct": true
            },
            {
              "id": "c",
              "text": "Игнорируем",
              "correct": false
            },
            {
              "id": "d",
              "text": "Просто запрашиваем дополнительные данные",
              "correct": false
            }
          ],
          "explanation": "Сайты с нарушениями отклоняются (Denied) с конкретной причиной."
        },
        {
          "id": "sites_q16",
          "type": "single",
          "text": "Какой тип трафика указывается для сайта с контентом для взрослых?",
          "options": [
            {
              "id": "a",
              "text": "Mainstream",
              "correct": false
            },
            {
              "id": "b",
              "text": "Adult",
              "correct": true
            },
            {
              "id": "c",
              "text": "Network",
              "correct": false
            },
            {
              "id": "d",
              "text": "Direct",
              "correct": false
            }
          ],
          "explanation": "Adult сайты маркируются как Adult traffic."
        },
        {
          "id": "sites_sap_q1",
          "type": "single",
          "text": "Где проверяем сайты паблишеров?",
          "options": [
            {
              "id": "a",
              "text": "Backoffice → Site Approval",
              "correct": true
            },
            {
              "id": "b",
              "text": "Campaign Approval",
              "correct": false
            }
          ],
          "explanation": "Для сайтов выделен отдельный раздел Site Approval."
        },
        {
          "id": "sites_sap_q2",
          "type": "single",
          "text": "С какой стороны списка начинаем аппрув сайтов?",
          "options": [
            {
              "id": "a",
              "text": "С конца списка (самые старые заявки)",
              "correct": true
            },
            {
              "id": "b",
              "text": "С начала списка",
              "correct": false
            }
          ],
          "explanation": "Чтобы паблишеры не ждали, сначала закрываем заявки с наибольшим ожиданием."
        }
      ],
      "docLink": "https://trafficstars.atlassian.net/wiki/spaces/T/pages/392626187/PBW"
    },
    {
      "id": "flags_verticals_full",
      "title": "Флаги и вертикали (полный раздел)",
      "code": "FLAGS",
      "category": "Флаги",
      "summary": "Полный справочник флагов, вертикалей и ограничений площадок.",
      "passPercent": 85,
      "questions": [
        {
          "id": "fv_q1",
          "type": "single",
          "text": "Что такое вертикаль (vertical) в нашей платформе?",
          "options": [
            {
              "id": "a",
              "text": "Набор гео, на которые таргетируется кампания",
              "correct": false
            },
            {
              "id": "b",
              "text": "Категория оффера/сайта (например Dating, Webcams, Gambling), описывающая тематику рекламы",
              "correct": true
            },
            {
              "id": "c",
              "text": "Тип рекламного формата (banner, video, popunder)",
              "correct": false
            },
            {
              "id": "d",
              "text": "Название рекламодателя",
              "correct": false
            }
          ],
          "explanation": "Vertical описывает бизнес-категорию/тематику оффера."
        },
        {
          "id": "fv_q2",
          "type": "single",
          "text": "Какая вертикаль считается самой чувствительной и требует обязательного ограничения 2.19 для большинства сайтов?",
          "options": [
            {
              "id": "a",
              "text": "Mainstream E-commerce",
              "correct": false
            },
            {
              "id": "b",
              "text": "Adult Dating / Hookup",
              "correct": true
            },
            {
              "id": "c",
              "text": "VPN / Utility",
              "correct": false
            },
            {
              "id": "d",
              "text": "Nutra",
              "correct": false
            }
          ],
          "explanation": "Adult Dating — одна из ключевых adult-вертикалей, требующих строгой фильтрации по sensitive сайтам."
        },
        {
          "id": "fv_q3",
          "type": "multi",
          "text": "Какие вертикали обычно классифицируются как adult и требуют повышенного контроля?",
          "options": [
            {
              "id": "a",
              "text": "Webcams / Live Cams",
              "correct": true
            },
            {
              "id": "b",
              "text": "Adult Dating",
              "correct": true
            },
            {
              "id": "c",
              "text": "Porn Tube / Streaming",
              "correct": true
            },
            {
              "id": "d",
              "text": "Mainstream Finance",
              "correct": false
            }
          ],
          "explanation": "В adult-вертикали входят Webcams, Adult Dating и Porn Tube."
        },
        {
          "id": "fv_q4",
          "type": "single",
          "text": "Какой флаг чаще всего отключается на PBW-сайтах, чтобы убрать агрессивные визуальные элементы?",
          "options": [
            {
              "id": "a",
              "text": "2.11 Aggressive flashing",
              "correct": true
            },
            {
              "id": "b",
              "text": "1.3 Webcams",
              "correct": false
            },
            {
              "id": "c",
              "text": "3.3 Clickjacking",
              "correct": false
            },
            {
              "id": "d",
              "text": "1.8.1 Parked domains",
              "correct": false
            }
          ],
          "explanation": "2.11 отвечает за мигающие, раздражающие визуальные эффекты."
        },
        {
          "id": "fv_q5",
          "type": "single",
          "text": "Какой флаг используется для исключения рекламы с fake UI-элементами (фейковые кнопки, диалоги, системные окна)?",
          "options": [
            {
              "id": "a",
              "text": "2.3 Fake elements",
              "correct": true
            },
            {
              "id": "b",
              "text": "3.6 Non Google Compliant",
              "correct": false
            },
            {
              "id": "c",
              "text": "3.2 Forced Push Subscription",
              "correct": false
            },
            {
              "id": "d",
              "text": "1.4 Live Cams",
              "correct": false
            }
          ],
          "explanation": "2.3 отвечает за фейковые элементы, которые вводят пользователя в заблуждение."
        },
        {
          "id": "fv_q6",
          "type": "multi",
          "text": "Какие флаги чаще всего отключают для защиты PBW-сайтов от неприятной рекламы?",
          "options": [
            {
              "id": "a",
              "text": "2.3 Fake elements",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.11 Aggressive flashing",
              "correct": true
            },
            {
              "id": "c",
              "text": "3.2 Forced push subscription",
              "correct": true
            },
            {
              "id": "d",
              "text": "1.1 Mainstream utilities",
              "correct": false
            }
          ],
          "explanation": "Эти флаги связаны с вводящими в заблуждение и агрессивными форматами."
        },
        {
          "id": "fv_q7",
          "type": "single",
          "text": "Что означает флаг 3.6 Non Google Compliant?",
          "options": [
            {
              "id": "a",
              "text": "Креатив полностью соответствует правилам Google Ads",
              "correct": false
            },
            {
              "id": "b",
              "text": "Креатив нарушает стандарты качества Google и может быть сочтен небезопасным",
              "correct": true
            },
            {
              "id": "c",
              "text": "Креатив запрещён только в Chrome",
              "correct": false
            },
            {
              "id": "d",
              "text": "Это относится к desktop-only ограничениям",
              "correct": false
            }
          ],
          "explanation": "3.6 используется для фильтрации опасных или некачественных форматов, нарушающих Google-рекомендации."
        },
        {
          "id": "fv_q8",
          "type": "single",
          "text": "Какая вертикаль чаще всего получает жалобы от PBW и sensitive паблишеров?",
          "options": [
            {
              "id": "a",
              "text": "Tech / VPN",
              "correct": false
            },
            {
              "id": "b",
              "text": "Webcams",
              "correct": true
            },
            {
              "id": "c",
              "text": "Crypto",
              "correct": false
            },
            {
              "id": "d",
              "text": "Nutra",
              "correct": false
            }
          ],
          "explanation": "Webcams — один из самых чувствительных типов adult-рекламы."
        },
        {
          "id": "fv_q9",
          "type": "multi",
          "text": "Какие вертикали считаются полностью mainstream и безопасными по умолчанию?",
          "options": [
            {
              "id": "a",
              "text": "Utilities / Apps / VPN",
              "correct": true
            },
            {
              "id": "b",
              "text": "E-commerce / Retail",
              "correct": true
            },
            {
              "id": "c",
              "text": "Adult Dating",
              "correct": false
            },
            {
              "id": "d",
              "text": "Webcams",
              "correct": false
            }
          ],
          "explanation": "Mainstream включает утилиты, e-commerce и безопасные сервисы."
        },
        {
          "id": "fv_q10",
          "type": "single",
          "text": "Что делает флаг 1.8.2 Free aggregator sites?",
          "options": [
            {
              "id": "a",
              "text": "Разрешает рекламу на всех adult-сайтах",
              "correct": false
            },
            {
              "id": "b",
              "text": "Сигнализирует, что сайт-паблишер — агрегатор бесплатного контента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Запрещает popunder-рекламу",
              "correct": false
            },
            {
              "id": "d",
              "text": "Блокирует все adult-вертикали",
              "correct": false
            }
          ],
          "explanation": "1.8.2 часто используется как ориентир для дополнительных ограничений."
        },
        {
          "id": "fv_q11",
          "type": "single",
          "text": "Зачем кампании adult-вертикалей нужно ставить ограничения по Tier (T1/T2/T3)?",
          "options": [
            {
              "id": "a",
              "text": "Чтобы увеличить CTR",
              "correct": false
            },
            {
              "id": "b",
              "text": "Чтобы соответствовать чувствительности регионов и уровню рисков для разных гео",
              "correct": true
            },
            {
              "id": "c",
              "text": "Чтобы лучше ранжировать кампании в UI",
              "correct": false
            },
            {
              "id": "d",
              "text": "Чтобы рассчитывать налог для клиента",
              "correct": false
            }
          ],
          "explanation": "Tier ограничивает географию показа, снижая риски для чувствительных регионов."
        },
        {
          "id": "fv_q12",
          "type": "multi",
          "text": "Что характерно для вертикали 1.21 Carrier billing?",
          "options": [
            {
              "id": "a",
              "text": "Поле для ввода номера телефона",
              "correct": true
            },
            {
              "id": "b",
              "text": "Мелкий шрифт с условиями цены подписки внизу страницы",
              "correct": true
            },
            {
              "id": "c",
              "text": "Продажа физических товаров",
              "correct": false
            },
            {
              "id": "d",
              "text": "Таргетинг на конкретных мобильных операторов",
              "correct": true
            }
          ],
          "explanation": "Carrier billing — подписки со списанием через номер телефона и упоминанием оператора."
        },
        {
          "id": "fv_q13",
          "type": "single",
          "text": "Применяется ли флаг 2.1 Disney characters к персонажам не из студии Disney, например, Рик и Морти?",
          "options": [
            {
              "id": "a",
              "text": "Нет, только к Микки Маусу и принцессам Disney",
              "correct": false
            },
            {
              "id": "b",
              "text": "Да, ко всем известным персонажам, защищенным авторским правом",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только если персонажи обнажены",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только для аниме",
              "correct": false
            }
          ],
          "explanation": "Флаг 2.1 ставится на любые узнаваемые бренды и персонажей, даже если они не принадлежат Disney."
        },
        {
          "id": "fv_q14",
          "type": "single",
          "text": "Нужно ли ставить флаг 2.19, если антивирусное расширение ругается \"Blocked due to ads\"?",
          "options": [
            {
              "id": "a",
              "text": "Да, это серьезная угроза",
              "correct": false
            },
            {
              "id": "b",
              "text": "Нет, это считается ложным срабатыванием (исключение)",
              "correct": true
            },
            {
              "id": "c",
              "text": "Нужно сразу заблокировать аккаунт",
              "correct": false
            },
            {
              "id": "d",
              "text": "Нужно поставить флаг 2.18",
              "correct": false
            }
          ],
          "explanation": "Ошибки \"due to ads\" обычно false positive и не требуют 2.19 без дополнительных доказательств."
        },
        {
          "id": "fv_q15",
          "type": "single",
          "text": "Что такое технология Exit pop (флаг 3.1)?",
          "options": [
            {
              "id": "a",
              "text": "Открытие рекламы в новой вкладке",
              "correct": false
            },
            {
              "id": "b",
              "text": "Окно, возникающее при попытке закрыть страницу или увести курсор",
              "correct": true
            },
            {
              "id": "c",
              "text": "Автоматическое скачивание файла",
              "correct": false
            },
            {
              "id": "d",
              "text": "Видео со звуком",
              "correct": false
            }
          ],
          "explanation": "Exit pop реагирует на намерение покинуть сайт и блокирует уход пользователя."
        },
        {
          "id": "fv_q16",
          "type": "single",
          "text": "Почему флаг 3.2 Forced push subscription считается опасным?",
          "options": [
            {
              "id": "a",
              "text": "Он блокирует кнопку «Назад»",
              "correct": false
            },
            {
              "id": "b",
              "text": "Он обманом заставляет подписаться на уведомления, блокируя доступ к контенту",
              "correct": true
            },
            {
              "id": "c",
              "text": "Он слишком яркий",
              "correct": false
            },
            {
              "id": "d",
              "text": "Это обычная нативная реклама",
              "correct": false
            }
          ],
          "explanation": "Forced push принуждает пользователя к подписке и используется в мошеннических сценариях."
        },
        {
          "id": "fv_q17",
          "type": "multi",
          "text": "Какие элементы относятся к флагу 3.6 Non Google compliant?",
          "options": [
            {
              "id": "a",
              "text": "Принудительная вибрация на мобильных",
              "correct": true
            },
            {
              "id": "b",
              "text": "Автопроигрывание видео со звуком",
              "correct": true
            },
            {
              "id": "c",
              "text": "Отсутствие логотипа на баннере",
              "correct": false
            },
            {
              "id": "d",
              "text": "Системные диалоговые окна поверх контента",
              "correct": true
            }
          ],
          "explanation": "3.6 охватывает практики, нарушающие Better Ads: вибрацию, звук и поддельные окна."
        },
        {
          "id": "fv_v1_q1",
          "type": "single",
          "text": "Какой флаг ставим на dating-кампании (реальный, виртуальный, mixed)?",
          "options": [
            {
              "id": "a",
              "text": "1.1 Dating",
              "correct": true
            },
            {
              "id": "b",
              "text": "1.19 Mainstream",
              "correct": false
            },
            {
              "id": "c",
              "text": "1.9 Escort",
              "correct": false
            }
          ],
          "explanation": "Все виды дейтинга — 1.1 Dating."
        },
        {
          "id": "fv_v1_q2",
          "type": "single",
          "text": "Флаг 1.8.2 Free aggregator sites ставим когда...",
          "options": [
            {
              "id": "a",
              "text": "Лендинг — бесплатный туб/агрегатор (типа PornHub, xHamster, XVIDEOS и т.п.)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Платный премиум туб",
              "correct": false
            },
            {
              "id": "c",
              "text": "Собственный контент",
              "correct": false
            }
          ],
          "explanation": "Бесплатные агрегаторы запрещены на mainstream и mixed трафике."
        },
        {
          "id": "fv_v1_q3",
          "type": "multi",
          "text": "Какие вертикали запрещены полностью (всегда отклоняем кампанию)?",
          "options": [
            {
              "id": "a",
              "text": "1.9 Escort",
              "correct": true
            },
            {
              "id": "b",
              "text": "1.17 Cigarettes",
              "correct": true
            },
            {
              "id": "c",
              "text": "1.21 Carrier billing",
              "correct": true
            },
            {
              "id": "d",
              "text": "1.7 Medical Cannabis (в некоторых гео)",
              "correct": false
            },
            {
              "id": "e",
              "text": "1.11 Forex and Crypto",
              "correct": false
            }
          ],
          "explanation": "Escort, сигареты и carrier billing — под полным баном."
        },
        {
          "id": "fv_cr_q1",
          "type": "single",
          "text": "Сексуализированная Эльза из «Холодного сердца» на креативе — какой флаг обязателен?",
          "options": [
            {
              "id": "a",
              "text": "2.1 Disney characters",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.13 Deepfake",
              "correct": false
            },
            {
              "id": "c",
              "text": "2.14 Sexy non nude",
              "correct": false
            }
          ],
          "explanation": "Любой узнаваемый персонаж в сексуальном контексте => 2.1."
        },
        {
          "id": "fv_cr_q2",
          "type": "multi",
          "text": "Ставим 2.3 Fake elements, когда на креативе... (выбери все варианты)",
          "options": [
            {
              "id": "a",
              "text": "Фейковая кнопка Play",
              "correct": true
            },
            {
              "id": "b",
              "text": "Фейковый чат/уведомление",
              "correct": true
            },
            {
              "id": "c",
              "text": "Фейковое предупреждение о вирусе",
              "correct": true
            },
            {
              "id": "d",
              "text": "Красная мигающая надпись CLICK HERE",
              "correct": false
            }
          ],
          "explanation": "2.3 отвечает именно за имитацию системных элементов."
        },
        {
          "id": "fv_cr_q3",
          "type": "single",
          "text": "Креатив мигает агрессивно (более 3–4 раз в секунду) — какой флаг ставим?",
          "options": [
            {
              "id": "a",
              "text": "2.11 Aggressive flashing",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.12 Fast animation",
              "correct": false
            },
            {
              "id": "c",
              "text": "2.6 Animated creatives",
              "correct": false
            }
          ],
          "explanation": "Aggressive flashing — отдельный флаг для навязчивой анимации."
        },
        {
          "id": "fv_cr_q4",
          "type": "single",
          "text": "Креатив с голой моделью без логотипа и текста — какой флаг нужен?",
          "options": [
            {
              "id": "a",
              "text": "2.8 Banner without logo and text",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.15 Sexy nude image",
              "correct": false
            }
          ],
          "explanation": "Пустой ню-баннер всегда помечаем как 2.8."
        },
        {
          "id": "fv_l_q1",
          "type": "single",
          "text": "Лендинг заставляет разрешить пуш-уведомления, обещая доступ к контенту. Какой флаг?",
          "options": [
            {
              "id": "a",
              "text": "3.2 Forced push subscription",
              "correct": true
            },
            {
              "id": "b",
              "text": "3.1 Exit pop",
              "correct": false
            },
            {
              "id": "c",
              "text": "3.3 Back button",
              "correct": false
            }
          ],
          "explanation": "Классический forced push — флаг 3.2."
        },
        {
          "id": "fv_l_q2",
          "type": "single",
          "text": "При попытке нажать Back кнопка не работает или ведёт на другой лендинг. Какой флаг?",
          "options": [
            {
              "id": "a",
              "text": "3.3 Back button",
              "correct": true
            },
            {
              "id": "b",
              "text": "3.2 Forced push subscription",
              "correct": false
            },
            {
              "id": "c",
              "text": "3.4 Audio autoplay",
              "correct": false
            }
          ],
          "explanation": "Back button hijacking = 3.3."
        },
        {
          "id": "fv_l_q3",
          "type": "single",
          "text": "Лендинг с adult-контентом запущен на mainstream-трафик. Что ставим?",
          "options": [
            {
              "id": "a",
              "text": "3.5 Adult landing page",
              "correct": true
            },
            {
              "id": "b",
              "text": "3.1 Exit pop",
              "correct": false
            },
            {
              "id": "c",
              "text": "3.6 Non Google compliant",
              "correct": false
            }
          ],
          "explanation": "Adult landing на mainstream требует флага 3.5."
        },
        {
          "id": "fv_flag_2_2",
          "type": "multi",
          "text": "В каких случаях ставим флаг 2.2 Brand imitation?",
          "options": [
            {
              "id": "a",
              "text": "Креатив копирует логотип или стиль известного бренда (например TikTok, Amazon)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Используются производные названия вроде \"Sextagram\" или \"Fuckbook\"",
              "correct": true
            },
            {
              "id": "c",
              "text": "На баннере реальный скриншот из приложения рекламодателя без чужих брендов",
              "correct": false
            },
            {
              "id": "d",
              "text": "Креатив содержит описание тарифов без логотипов",
              "correct": false
            }
          ],
          "explanation": "2.2 ставим при прямой или косвенной имитации бренда — логотипы, стилистика, производные названия."
        },
        {
          "id": "fv_flag_2_3",
          "type": "multi",
          "text": "Что относится к флагу 2.3 Fake elements?",
          "options": [
            {
              "id": "a",
              "text": "Фейковые системные уведомления и чаты",
              "correct": true
            },
            {
              "id": "b",
              "text": "Поддельные кнопки Play/Pause, полосы прокрутки",
              "correct": true
            },
            {
              "id": "c",
              "text": "Призыв к действию «ЖМИ СЮДА», если кнопка ведет на лендинг",
              "correct": false
            },
            {
              "id": "d",
              "text": "Обычный текстовый баннер без графики",
              "correct": false
            }
          ],
          "explanation": "2.3 ставим, когда креатив имитирует элементы интерфейса, вводя пользователя в заблуждение."
        },
        {
          "id": "fv_flag_2_4",
          "type": "single",
          "text": "Заголовок «У вас 3 новых сообщения, зайдите срочно!» — какой флаг обязателен?",
          "options": [
            {
              "id": "a",
              "text": "2.4 Misleading headline and/or brand name",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.9 Misleading text",
              "correct": false
            },
            {
              "id": "c",
              "text": "1.1 Dating",
              "correct": false
            },
            {
              "id": "d",
              "text": "2.15 Sexy nude image",
              "correct": false
            }
          ],
          "explanation": "Вводящий в заблуждение заголовок помечаем как 2.4."
        },
        {
          "id": "fv_flag_2_6",
          "type": "single",
          "text": "Какой флаг ставим на gif/mp4 баннер с несколькими кадрами?",
          "options": [
            {
              "id": "a",
              "text": "2.6 Animated creatives",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.11 Aggressive flashing",
              "correct": false
            },
            {
              "id": "c",
              "text": "2.8 Banner without logo and text",
              "correct": false
            },
            {
              "id": "d",
              "text": "3.2 Forced push subscription",
              "correct": false
            }
          ],
          "explanation": "Любой анимированный баннер отмечаем флагом 2.6; дополнительные флаги ставим при необходимости."
        },
        {
          "id": "fv_flag_2_10",
          "type": "single",
          "text": "На креативе показаны открытые раны и кровь. Какой флаг нужен?",
          "options": [
            {
              "id": "a",
              "text": "2.10 Gruesome images",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.14 Sexy non nude image",
              "correct": false
            },
            {
              "id": "c",
              "text": "2.16 Sexy text",
              "correct": false
            },
            {
              "id": "d",
              "text": "2.5 Capitalized headline",
              "correct": false
            }
          ],
          "explanation": "Графические сцены насилия помечаются флагом 2.10."
        },
        {
          "id": "fv_flag_2_13",
          "type": "single",
          "text": "Креатив использует ИИ, чтобы заменить лицо знаменитости и «раздеть» фото. Какой флаг ставим?",
          "options": [
            {
              "id": "a",
              "text": "2.13 Deepfake",
              "correct": true
            },
            {
              "id": "b",
              "text": "2.1 Disney characters",
              "correct": false
            },
            {
              "id": "c",
              "text": "2.17 Stop traffic to xHamster",
              "correct": false
            },
            {
              "id": "d",
              "text": "3.6 Non google compliant",
              "correct": false
            }
          ],
          "explanation": "Любые AI-модификации лица/тела попадают под 2.13."
        },
        {
          "id": "fv_flag_2_19",
          "type": "multi",
          "text": "Когда используем флаг 2.19 Stop traffic to sensitive sites list?",
          "options": [
            {
              "id": "a",
              "text": "Когда ссылку пометил VirusTotal или антивирусные расширения",
              "correct": true
            },
            {
              "id": "b",
              "text": "Когда креатив просто содержит текст без изображений",
              "correct": false
            },
            {
              "id": "c",
              "text": "Если рекламодатель попал в список проблемных (например, китайские с алертами)",
              "correct": true
            },
            {
              "id": "d",
              "text": "Когда на мейнстрим-трафик попадает креатив с несовершеннолетними",
              "correct": true
            }
          ],
          "explanation": "2.19 используем для рискованных ссылок, проблемных рекламодателей и случаев, которые нужно исключить на sensitive сайтах."
        }
      ]
    },
    {
      "id": "rejection_reasons",
      "title": "Причины отклонения",
      "code": "REJ",
      "category": "Процедуры",
      "summary": "Частые причины отклонения кампаний и профилей.",
      "passPercent": 85,
      "questions": [
        {
          "id": "reject_q1",
          "type": "single",
          "text": "Какую причину выбрать, если Interstitial креатив открывает лендинг в той же вкладке?",
          "options": [
            {
              "id": "a",
              "text": "Broken image",
              "correct": false
            },
            {
              "id": "b",
              "text": "Ad must open in new window/tab",
              "correct": true
            },
            {
              "id": "c",
              "text": "Other violation",
              "correct": false
            },
            {
              "id": "d",
              "text": "Fraud",
              "correct": false
            }
          ],
          "explanation": "Interstitial и Iframe форматы обязаны открываться в новой вкладке (target=\"_blank\")."
        },
        {
          "id": "reject_q2",
          "type": "single",
          "text": "Что делать, если это первая кампания, а в профиле клиента не указаны имя и фамилия?",
          "options": [
            {
              "id": "a",
              "text": "Одобрить в любом случае",
              "correct": false
            },
            {
              "id": "b",
              "text": "Отклонить с причиной \"Other violation\" и запросить данные",
              "correct": true
            },
            {
              "id": "c",
              "text": "Заблокировать аккаунт без объяснений",
              "correct": false
            },
            {
              "id": "d",
              "text": "Самостоятельно заполнить имя",
              "correct": false
            }
          ],
          "explanation": "Анонимные профили не допускаются — запрашиваем данные через причину Other violation."
        },
        {
          "id": "rej_q1",
          "type": "single",
          "text": "Какую категорию отклонения ставим, если креатив имитирует системное уведомление, фейковый чат или фейковую вирусную угрозу?",
          "options": [
            {
              "id": "a",
              "text": "Scams and/or fraud",
              "correct": false
            },
            {
              "id": "b",
              "text": "Intellectual property infringements",
              "correct": false
            },
            {
              "id": "c",
              "text": "Other violation of provider's terms and conditions",
              "correct": true
            },
            {
              "id": "d",
              "text": "Protection of minors",
              "correct": false
            }
          ],
          "explanation": "Фейковые элементы (chat, notifications, virus warning и т.п.) — это всегда Other violation of provider’s terms and conditions."
        },
        {
          "id": "rej_q2",
          "type": "single",
          "text": "Кампания с флагом 1.8.2 Free aggregator sites отклоняется полностью, если...?",
          "options": [
            {
              "id": "a",
              "text": "Рекламодатель новый",
              "correct": false
            },
            {
              "id": "b",
              "text": "Кампания идёт только на PBW",
              "correct": false
            },
            {
              "id": "c",
              "text": "Кампания идёт на mainstream или mixed трафик",
              "correct": true
            },
            {
              "id": "d",
              "text": "Креативы мигают",
              "correct": false
            }
          ],
          "explanation": "Free aggregator sites запрещены на mainstream/mixed, поэтому такие кампании отклоняем целиком."
        },
        {
          "id": "rej_q3",
          "type": "multi",
          "text": "Какие категории отклонения НИКОГДА не применяем к кампаниям с флагом (выбери все правильные)?",
          "options": [
            {
              "id": "a",
              "text": "Animal welfare",
              "correct": true
            },
            {
              "id": "b",
              "text": "Protection of minors",
              "correct": true
            },
            {
              "id": "c",
              "text": "Violence",
              "correct": true
            },
            {
              "id": "d",
              "text": "Scams and/or fraud",
              "correct": true
            },
            {
              "id": "e",
              "text": "Ad must open in new window/tab",
              "correct": false
            }
          ],
          "explanation": "Кампании с флагом никогда полностью не отклоняем — только сообщаем АМу."
        }
      ]
    },
    {
      "id": "campaign_approval_process",
      "title": "Порядок согласования кампаний",
      "code": "CAP",
      "category": "Процедуры",
      "summary": "Шаги проверки кампаний и работа с очередью.",
      "passPercent": 85,
      "questions": [
        {
          "id": "cap_q1",
          "type": "single",
          "text": "Правильная последовательность проверки кампании?",
          "options": [
            {
              "id": "a",
              "text": "Настройки → креативы → лендинг → флаги/аппрув",
              "correct": true
            },
            {
              "id": "b",
              "text": "Сначала лендинг, потом креативы и настройки",
              "correct": false
            }
          ],
          "explanation": "Следуем чек-листу из регламента: настройки → креативы → лендинг → флаги."
        },
        {
          "id": "cap_q2",
          "type": "single",
          "text": "Где смотрим очередь на согласование кампаний?",
          "options": [
            {
              "id": "a",
              "text": "Backoffice → Campaign Approval",
              "correct": true
            },
            {
              "id": "b",
              "text": "Site Approval",
              "correct": false
            }
          ],
          "explanation": "Вся очередь кампаний лежит в разделе Campaign Approval."
        },
        {
          "id": "cap_q3",
          "type": "single",
          "text": "С какой кампании начинаем проверку очереди?",
          "options": [
            {
              "id": "a",
              "text": "С самой старой (в конце списка)",
              "correct": true
            },
            {
              "id": "b",
              "text": "С самой свежей",
              "correct": false
            }
          ],
          "explanation": "Чтобы сократить ожидание клиентов, стартуем с самых старых кампаний."
        }
      ]
    },
    {
      "id": "compliance_basics",
      "title": "Основы комплаенса",
      "code": "BAS",
      "category": "Основы",
      "summary": "Ключевые принципы работы комплаенса: цели, взаимодействие и подготовка к сменам.",
      "passPercent": 80,
      "questions": [
        {
          "id": "basics_intro_q1",
          "type": "single",
          "text": "Какова основная задача департамента комплаенса в TrafficStars?",
          "options": [
            {
              "id": "a",
              "text": "Продвижение рекламы",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проверка соответствия контента требованиям закона и стандартам",
              "correct": true
            },
            {
              "id": "c",
              "text": "Разработка новых рекламных форматов",
              "correct": false
            },
            {
              "id": "d",
              "text": "Поддержка клиентов",
              "correct": false
            }
          ],
          "explanation": "Комплаенс следит за соответствием платформы законам, регламентам и требованиям партнеров."
        },
        {
          "id": "basics_intro_q2",
          "type": "single",
          "text": "Какие навыки наиболее важны для сотрудника комплаенс?",
          "options": [
            {
              "id": "a",
              "text": "Креативность",
              "correct": false
            },
            {
              "id": "b",
              "text": "Критическое мышление, коммуникация и внимательность к деталям",
              "correct": true
            },
            {
              "id": "c",
              "text": "Знание языков программирования",
              "correct": false
            },
            {
              "id": "d",
              "text": "Навыки продаж",
              "correct": false
            }
          ],
          "explanation": "Основа работы — анализировать, ясно коммуницировать и замечать детали."
        },
        {
          "id": "basics_intro_q3",
          "type": "single",
          "text": "Что делать, если вы столкнулись с эмоционально тяжелым контентом?",
          "options": [
            {
              "id": "a",
              "text": "Игнорировать",
              "correct": false
            },
            {
              "id": "b",
              "text": "Обсудить с командой и при необходимости обратиться за поддержкой",
              "correct": true
            },
            {
              "id": "c",
              "text": "Уволиться",
              "correct": false
            },
            {
              "id": "d",
              "text": "Жаловаться клиенту",
              "correct": false
            }
          ],
          "explanation": "Эмоциональные кейсы обсуждаем в команде и обращаемся за поддержкой — это часть гигиены работы."
        },
        {
          "id": "basics_campaign_q1",
          "type": "single",
          "text": "Что является целью проверки рекламной кампании?",
          "options": [
            {
              "id": "a",
              "text": "Увеличить количество рекламы",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проверить соответствие стандартам, законам и требованиям партнеров",
              "correct": true
            },
            {
              "id": "c",
              "text": "Сделать рекламу более креативной",
              "correct": false
            },
            {
              "id": "d",
              "text": "Снизить расходы на рекламу",
              "correct": false
            }
          ],
          "explanation": "Каждая кампания должна соответствовать внутренним и внешним требованиям."
        },
        {
          "id": "basics_campaign_q2",
          "type": "single",
          "text": "Какие решения принимаются по итогу проверки кампании?",
          "options": [
            {
              "id": "a",
              "text": "Только одобрить",
              "correct": false
            },
            {
              "id": "b",
              "text": "Одобрить, ограничить или отклонить",
              "correct": true
            },
            {
              "id": "c",
              "text": "Передать в другой отдел",
              "correct": false
            },
            {
              "id": "d",
              "text": "Всегда отклонить",
              "correct": false
            }
          ],
          "explanation": "Мы можем аппрувить, выдавать ограничения или отклонять кампанию."
        },
        {
          "id": "basics_campaign_q3",
          "type": "single",
          "text": "Что делать, если кампания вызывает сомнения?",
          "options": [
            {
              "id": "a",
              "text": "Одобрить без проверки",
              "correct": false
            },
            {
              "id": "b",
              "text": "Обратиться к старшему сотруднику",
              "correct": true
            },
            {
              "id": "c",
              "text": "Отклонить автоматически",
              "correct": false
            },
            {
              "id": "d",
              "text": "Игнорировать",
              "correct": false
            }
          ],
          "explanation": "Неуверенные кейсы эскалируем тимлидам/старшим."
        },
        {
          "id": "basics_sites_q1",
          "type": "single",
          "text": "Кто такие паблишеры?",
          "options": [
            {
              "id": "a",
              "text": "Владельцы сайтов, размещающие рекламу",
              "correct": true
            },
            {
              "id": "b",
              "text": "Рекламодатели",
              "correct": false
            },
            {
              "id": "c",
              "text": "Сотрудники отдела продаж",
              "correct": false
            },
            {
              "id": "d",
              "text": "Пользователи платформы",
              "correct": false
            }
          ],
          "explanation": "Паблишеры — партнеры, которые размещают рекламу на своих площадках."
        },
        {
          "id": "basics_sites_q2",
          "type": "single",
          "text": "Что проверяется при анализе сайта?",
          "options": [
            {
              "id": "a",
              "text": "Только дизайн",
              "correct": false
            },
            {
              "id": "b",
              "text": "Качество трафика, соответствие стандартам и принадлежность паблишеру",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только скорость загрузки",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только количество страниц",
              "correct": false
            }
          ],
          "explanation": "Важно убедиться в легальности, происхождении трафика и владении сайтом."
        },
        {
          "id": "basics_sites_q3",
          "type": "single",
          "text": "Что делать, если требуется дополнительная информация о сайте?",
          "options": [
            {
              "id": "a",
              "text": "Игнорировать",
              "correct": false
            },
            {
              "id": "b",
              "text": "Запросить дополнительные данные у владельца/аккаунт-менеджера",
              "correct": true
            },
            {
              "id": "c",
              "text": "Отклонить сайт без разбора",
              "correct": false
            },
            {
              "id": "d",
              "text": "Одобрить без проверки",
              "correct": false
            }
          ],
          "explanation": "Запрашиваем недостающие материалы и документируем переписку."
        },
        {
          "id": "basics_alerts_q1",
          "type": "single",
          "text": "Какие бывают источники алертов?",
          "options": [
            {
              "id": "a",
              "text": "Только внутренние",
              "correct": false
            },
            {
              "id": "b",
              "text": "GeoEdge, AdsSecure, PBW, прямые клиенты, внутренние отчеты",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только клиенты",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только автоматические системы",
              "correct": false
            }
          ],
          "explanation": "Мы получаем сигналы как от внешних сервисов, так и от внутренних мониторингов и клиентов."
        },
        {
          "id": "basics_alerts_q2",
          "type": "single",
          "text": "Что делать при получении алерта?",
          "options": [
            {
              "id": "a",
              "text": "Игнорировать",
              "correct": false
            },
            {
              "id": "b",
              "text": "Задокументировать и обработать по инструкции",
              "correct": true
            },
            {
              "id": "c",
              "text": "Передать в другой отдел и забыть",
              "correct": false
            },
            {
              "id": "d",
              "text": "Удалить",
              "correct": false
            }
          ],
          "explanation": "Каждый алерт фиксируем и закрываем согласно процедурам."
        },
        {
          "id": "basics_accounts_q1",
          "type": "single",
          "text": "Когда проводится проверка аккаунта?",
          "options": [
            {
              "id": "a",
              "text": "Только при регистрации",
              "correct": false
            },
            {
              "id": "b",
              "text": "При запуске первой кампании и по необходимости",
              "correct": true
            },
            {
              "id": "c",
              "text": "Раз в год",
              "correct": false
            },
            {
              "id": "d",
              "text": "Никогда",
              "correct": false
            }
          ],
          "explanation": "Аккаунты проверяются на старте и при появлении сигналов."
        },
        {
          "id": "basics_accounts_q2",
          "type": "single",
          "text": "Что делать, если аккаунт вызывает подозрения?",
          "options": [
            {
              "id": "a",
              "text": "Одобрить",
              "correct": false
            },
            {
              "id": "b",
              "text": "Передать на дополнительную проверку",
              "correct": true
            },
            {
              "id": "c",
              "text": "Игнорировать",
              "correct": false
            },
            {
              "id": "d",
              "text": "Удалить без проверки",
              "correct": false
            }
          ],
          "explanation": "Подозрительные случаи эскалируются и фиксируются."
        },
        {
          "id": "basics_payments_q1",
          "type": "single",
          "text": "Какие действия входят в процесс проверки платежей?",
          "options": [
            {
              "id": "a",
              "text": "Только проверка суммы",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проверка источника, соответствия данных и подозрительных операций",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только подтверждение оплаты",
              "correct": false
            },
            {
              "id": "d",
              "text": "Игнорирование",
              "correct": false
            }
          ],
          "explanation": "Платежи оцениваем комплексно: источник, данные клиента, подозрительные паттерны."
        },
        {
          "id": "basics_setup_q1",
          "type": "single",
          "text": "Какие профили браузера используются в работе?",
          "options": [
            {
              "id": "a",
              "text": "Только личный",
              "correct": false
            },
            {
              "id": "b",
              "text": "Personal, Compliance, XXX",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только Compliance",
              "correct": false
            },
            {
              "id": "d",
              "text": "Любой",
              "correct": false
            }
          ],
          "explanation": "Используем преднастроенные профили, чтобы разделять рабочие контексты."
        },
        {
          "id": "basics_setup_q2",
          "type": "single",
          "text": "Какие инструменты и ресурсы должны быть добавлены в закладки?",
          "options": [
            {
              "id": "a",
              "text": "Только почта",
              "correct": false
            },
            {
              "id": "b",
              "text": "Таблицы, инструкции, Grafana Tools и рабочие сервисы",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только Google",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только Slack",
              "correct": false
            }
          ],
          "explanation": "В закладках держим таблицы, регламенты, мониторинги и ключевые инструменты."
        },
        {
          "id": "basics_collab_q1",
          "type": "single",
          "text": "С какими отделами чаще всего взаимодействует комплаенс?",
          "options": [
            {
              "id": "a",
              "text": "Только с HR",
              "correct": false
            },
            {
              "id": "b",
              "text": "Performance, Advertising, Publishing",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только с IT",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только с клиентами",
              "correct": false
            }
          ],
          "explanation": "Комплаенс плотно работает с performance, advertising и publishing-командами."
        }
      ]
    },
    {
      "id": "overall_quiz",
      "title": "Общий квиз по всем темам",
      "code": "ALL",
      "category": "Общий тест",
      "summary": "Смешанный квиз по ключевым темам платформы.",
      "passPercent": 80,
      "shuffleQuestions": true,
      "questions": [
        {
          "id": "all_q1",
          "type": "single",
          "text": "Что в первую очередь проверяется при анализе нового аккаунта с первой кампанией?",
          "options": [
            {
              "id": "a",
              "text": "Только вертикаль кампании",
              "correct": false
            },
            {
              "id": "b",
              "text": "Совпадение страны профиля и фактического IP клиента",
              "correct": true
            },
            {
              "id": "c",
              "text": "Размер баннера",
              "correct": false
            },
            {
              "id": "d",
              "text": "Наличие Google Analytics у клиента",
              "correct": false
            }
          ],
          "explanation": "Гео профиля и IP — базовый sanity-check."
        },
        {
          "id": "all_q2",
          "type": "multi",
          "text": "Какие признаки вместе могут указывать на попытку фрода при перепроверке аккаунта?",
          "options": [
            {
              "id": "a",
              "text": "Новый короткий домен, Popunder, таргет только Desktop Windows",
              "correct": true
            },
            {
              "id": "b",
              "text": "Стабильный старый домен и только Tier 3",
              "correct": false
            },
            {
              "id": "c",
              "text": "Неожиданная смена вертикали на более рискованную",
              "correct": true
            },
            {
              "id": "d",
              "text": "Отсутствие пополнений и нулевая открутка",
              "correct": false
            }
          ],
          "explanation": "Комбинации настроек и смена поведения клиента – ключевые сигналы фрода."
        },
        {
          "id": "all_q3",
          "type": "single",
          "text": "Что является корректным определением CSAM для нашей компании?",
          "options": [
            {
              "id": "a",
              "text": "Любой adult-контент 18+",
              "correct": false
            },
            {
              "id": "b",
              "text": "Любой сексуализированный контент с участием лиц младше 18 лет, включая анимацию и ИИ",
              "correct": true
            },
            {
              "id": "c",
              "text": "Только фото/видео с реальными детьми",
              "correct": false
            },
            {
              "id": "d",
              "text": "Только контент с жалобами от органов власти",
              "correct": false
            }
          ],
          "explanation": "В определение CSAM входит и нереалистичный/генерируемый контент с сексуализацией несовершеннолетних."
        },
        {
          "id": "all_q4",
          "type": "multi",
          "text": "Какие ключевые слова всегда должны вызывать у тебя жесткую реакцию как потенциальный CSAM?",
          "options": [
            {
              "id": "a",
              "text": "Loli / Lolicon",
              "correct": true
            },
            {
              "id": "b",
              "text": "Shota",
              "correct": true
            },
            {
              "id": "c",
              "text": "Underage",
              "correct": true
            },
            {
              "id": "d",
              "text": "Teen",
              "correct": false
            },
            {
              "id": "e",
              "text": "Barely legal",
              "correct": false
            }
          ],
          "explanation": "Комбинации вроде Loli, Shota, Underage – красный флаг вне зависимости от остального описания."
        },
        {
          "id": "all_q5",
          "type": "single",
          "text": "Какую функцию выполняет флаг 2.19 (Stop traffic to sensitive sites list)?",
          "options": [
            {
              "id": "a",
              "text": "Разрешает adult-рекламу на всех сайтах",
              "correct": false
            },
            {
              "id": "b",
              "text": "Блокирует показ кампаний на сайтах из sensitive-списка",
              "correct": true
            },
            {
              "id": "c",
              "text": "Уменьшает CPM для Tier 1",
              "correct": false
            },
            {
              "id": "d",
              "text": "Влияет только на отчеты BI",
              "correct": false
            }
          ],
          "explanation": "2.19 – основной переключатель для защиты sensitive сайтов от определенных вертикалей."
        },
        {
          "id": "all_q6",
          "type": "multi",
          "text": "В каких кейсах обычно требуется участие канала #chinese_advertisers или технической команды для китайских рекламодателей?",
          "options": [
            {
              "id": "a",
              "text": "Когда нужно массово проставить флаги ограничения на кампании китайских рекламодателей",
              "correct": true
            },
            {
              "id": "b",
              "text": "Когда рекламодатель просит скидку на CPM",
              "correct": false
            },
            {
              "id": "c",
              "text": "Когда по китайским рекламодателям есть риски для sensitive сайтов",
              "correct": true
            },
            {
              "id": "d",
              "text": "Когда клиент хочет сменить email",
              "correct": false
            }
          ],
          "explanation": "Для китайских рекламодателей есть отдельный процесс мониторинга и массовых изменений флагов."
        },
        {
          "id": "all_q7",
          "type": "single",
          "text": "В чем главное отличие Closed for Fraud от Inactive при блокировке аккаунта?",
          "options": [
            {
              "id": "a",
              "text": "Closed for Fraud используется только для неактивных клиентов без открутки",
              "correct": false
            },
            {
              "id": "b",
              "text": "Closed for Fraud применяется при тяжелых нарушениях, и остаток обычно не возвращается клиенту",
              "correct": true
            },
            {
              "id": "c",
              "text": "Inactive всегда означает мошенничество",
              "correct": false
            },
            {
              "id": "d",
              "text": "Разницы нет, это один и тот же статус",
              "correct": false
            }
          ],
          "explanation": "Closed for Fraud – тяжелый статус с более жесткими последствиями для клиента и денег на балансе."
        },
        {
          "id": "all_q8",
          "type": "multi",
          "text": "Какие обязательные элементы должны быть в Jira-тикете на смену email клиента?",
          "options": [
            {
              "id": "a",
              "text": "Email клиента",
              "correct": true
            },
            {
              "id": "b",
              "text": "Скрин запроса клиента со старого email",
              "correct": true
            },
            {
              "id": "c",
              "text": "Скан паспорта клиента",
              "correct": false
            },
            {
              "id": "d",
              "text": "Комментарий комплаенса о подозрениях, если они есть",
              "correct": false
            }
          ],
          "explanation": "Должны быть подтверждены email клиента и скрин его запроса со старого email, чтобы доказать, что запрос исходит от владельца аккаунта."
        },
        {
          "id": "all_q9",
          "type": "single",
          "text": "Какая цель процесса проверки сайтов паблишеров перед одобрением?",
          "options": [
            {
              "id": "a",
              "text": "Убедиться, что сайт сможет показывать popunder без ограничений",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проверить легальность, качество трафика и соответствие стандартам сети",
              "correct": true
            },
            {
              "id": "c",
              "text": "Повысить CPM паблишеру",
              "correct": false
            },
            {
              "id": "d",
              "text": "Убедиться, что дизайн сайта современный",
              "correct": false
            }
          ],
          "explanation": "Мы проверяем юридические и качественные параметры сайта, а не его дизайн."
        },
        {
          "id": "all_q10",
          "type": "multi",
          "text": "Какие действия комплаенса помогают защитить PBW-сайты от нежелательной рекламы?",
          "options": [
            {
              "id": "a",
              "text": "Отмечать сайт как sensitive / PBW, если это предусмотрено регламентом",
              "correct": true
            },
            {
              "id": "b",
              "text": "Отключать агрессивные флаги креативов (2.3, 2.11, 3.2, 3.6 и т. п.) в Ad Spot list",
              "correct": true
            },
            {
              "id": "c",
              "text": "Настаивать на показе только adult-рекламы для максимального дохода",
              "correct": false
            },
            {
              "id": "d",
              "text": "Блокировать неподходящих RTB-клиентов для конкретного паблишера",
              "correct": true
            }
          ],
          "explanation": "Для PBW-сайтов мы ограничиваем агрессивную рекламу и блокируем неподходящих рекламодателей через флаги и настройки."
        },
        {
          "id": "all_q11",
          "type": "single",
          "text": "Что из перечисленного НЕ является задачей комплаенса при проверке нового аккаунта?",
          "options": [
            {
              "id": "a",
              "text": "Оценка риска фрода по комбинации гео, вертикали, платежей и форматов",
              "correct": false
            },
            {
              "id": "b",
              "text": "Проверка связей по IP с другими аккаунтами",
              "correct": false
            },
            {
              "id": "c",
              "text": "Подбор оптимального CPM для максимального дохода платформы",
              "correct": true
            },
            {
              "id": "d",
              "text": "Фиксация результата проверки в комментариях профиля",
              "correct": false
            }
          ],
          "explanation": "Комплаенс оценивает риски и фиксирует выводы, но не занимается ценообразованием (CPM)."
        },
        {
          "id": "all_q12",
          "type": "multi",
          "text": "Какие изменения поведения клиента после первой чистой кампании могут быть подозрительными?",
          "options": [
            {
              "id": "a",
              "text": "Резкий переход на очень агрессивные форматы (Popunder, clickbait)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Изменение гео на более рискованные Tier 1/богатые страны",
              "correct": true
            },
            {
              "id": "c",
              "text": "Снижение бюджета и ставок",
              "correct": false
            },
            {
              "id": "d",
              "text": "Добавление более мягких форматов (classic banners)",
              "correct": false
            }
          ],
          "explanation": "Резкая смена форматов и гео в сторону более рискованных после прогрева аккаунта – типичный паттерн фрода."
        },
        {
          "id": "all_q13",
          "type": "single",
          "text": "Что нужно сделать при получении алерта от GeoEdge, AdsSecure или PBW-паблишера?",
          "options": [
            {
              "id": "a",
              "text": "Игнорировать сигнал, если нет времени",
              "correct": false
            },
            {
              "id": "b",
              "text": "Задокументировать алерт и обработать его по инструкции (проверить кампанию/сайт, сообщить об ограничениях)",
              "correct": true
            },
            {
              "id": "c",
              "text": "Сразу переслать алерт клиенту без проверки",
              "correct": false
            },
            {
              "id": "d",
              "text": "Удалить сообщение, чтобы не мешало очереди",
              "correct": false
            }
          ],
          "explanation": "Каждый алерт нужно зафиксировать, проверить и закрыть по процедуре (ограничения, отклонения, уведомления)."
        },
        {
          "id": "all_q14",
          "type": "single",
          "text": "С какой стороны списка Site Approval начинаем проверку сайтов, чтобы сократить ожидание паблишеров?",
          "options": [
            {
              "id": "a",
              "text": "С начала списка (самые свежие заявки)",
              "correct": false
            },
            {
              "id": "b",
              "text": "С конца списка (самые старые заявки)",
              "correct": true
            },
            {
              "id": "c",
              "text": "С сайтов, у которых больше всего страниц",
              "correct": false
            },
            {
              "id": "d",
              "text": "С сайтов с adult-трафиком",
              "correct": false
            }
          ],
          "explanation": "Чтобы паблишеры не ждали, берём самые старые сайты в очереди и постепенно закрываем список."
        },
        {
          "id": "all_q15",
          "type": "single",
          "text": "Какую основную задачу решает флаг 2.3 Fake elements?",
          "options": [
            {
              "id": "a",
              "text": "Ограничивает adult-вертикали на PBW-сайтах",
              "correct": false
            },
            {
              "id": "b",
              "text": "Блокирует креативы с фейковыми системными окнами, кнопками и интерфейсами",
              "correct": true
            },
            {
              "id": "c",
              "text": "Маркирует сайты-агрегаторы",
              "correct": false
            },
            {
              "id": "d",
              "text": "Отсекает низкий CTR",
              "correct": false
            }
          ],
          "explanation": "2.3 используется для борьбы с обманчивыми UI-элементами (fake alerts, системные окна, фейковые кнопки)."
        },
        {
          "id": "all_q16",
          "type": "multi",
          "text": "Какие вертикали чаще всего требуют комбинирования флага 2.19 с ограничениями по флагам креативов (2.3, 2.11, 3.2, 3.6)?",
          "options": [
            {
              "id": "a",
              "text": "Adult Dating",
              "correct": true
            },
            {
              "id": "b",
              "text": "Webcams",
              "correct": false
            },
            {
              "id": "c",
              "text": "Gambling / Casino",
              "correct": false
            },
            {
              "id": "d",
              "text": "Mainstream E-commerce",
              "correct": true
            }
          ],
          "explanation": "Adult Dating часто флажится из-за экстеншенов и требует комбинировать 2.19 с ограничениями креативов; Mainstream E-commerce требует ограничения из-за запрета PBW."
        },
        {
          "id": "all_q17",
          "type": "single",
          "text": "Зачем вести отдельную таблицу/список Chinese Advertisers?",
          "options": [
            {
              "id": "a",
              "text": "Чтобы хранить контакты аккаунт-менеджеров",
              "correct": false
            },
            {
              "id": "b",
              "text": "Чтобы централизованно отслеживать рисковых китайских рекламодателей и применять к ним единые правила",
              "correct": true
            },
            {
              "id": "c",
              "text": "Чтобы считать их отдельный оборот в бухгалтерии",
              "correct": false
            },
            {
              "id": "d",
              "text": "Чтобы выдавать им скидки",
              "correct": false
            }
          ],
          "explanation": "Chinese Advertisers-таблица позволяет единообразно применять ограничения и мониторинг к группе рисковых рекламодателей."
        },
        {
          "id": "all_q18",
          "type": "multi",
          "text": "Какие шаги логично предпринять после жалобы PBW-паблишера на неподходящую рекламу?",
          "options": [
            {
              "id": "a",
              "text": "Проверить, корректно ли помечен сайт (sensitive/PBW)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Пересмотреть флаги в Ad Spot list (2.3, 2.11, 3.2, 3.6 и др.)",
              "correct": true
            },
            {
              "id": "c",
              "text": "Проверить, какие рекламодатели и кампании откручивались по этому сайту",
              "correct": true
            },
            {
              "id": "d",
              "text": "Проигнорировать жалобу, если доход по сайту высокий",
              "correct": false
            }
          ],
          "explanation": "Жалобы PBW-паблишеров – сигнал проверить конфигурацию флагов и фактический набор кампаний на спотах."
        },
        {
          "id": "all_q19",
          "type": "single",
          "text": "Что критично указать в комментарии при смене email клиента, помимо самого запроса?",
          "options": [
            {
              "id": "a",
              "text": "Скриншот запроса от клиента и отметка о согласовании с комплаенсом",
              "correct": true
            },
            {
              "id": "b",
              "text": "Примерный доход клиента за последний месяц",
              "correct": false
            },
            {
              "id": "c",
              "text": "Выбранный формат CPM",
              "correct": false
            },
            {
              "id": "d",
              "text": "Часовой пояс клиента",
              "correct": false
            }
          ],
          "explanation": "Нужны доказательство запроса от клиента (скрин) и фиксация согласования с комплаенсом."
        },
        {
          "id": "all_q20",
          "type": "multi",
          "text": "Какие элементы делают общий процесс комплаенса по рекламодателям и паблишерам устойчивым и воспроизводимым?",
          "options": [
            {
              "id": "a",
              "text": "Единые регламенты и справочники (CSAM, флаги, вертикали, статусы)",
              "correct": true
            },
            {
              "id": "b",
              "text": "Фиксация действий в комментариях профиля и в Jira",
              "correct": true
            },
            {
              "id": "c",
              "text": "Произвольные решения без документирования",
              "correct": false
            },
            {
              "id": "d",
              "text": "Использование алертов и автоматических проверок (Slack каналы, боты)",
              "correct": true
            }
          ],
          "explanation": "Стандартизированные регламенты, фиксация решений и автоматические алерты – базис зрелого комплаенс-процесса."
        }
      ],
      "docLink": "https://trafficstars.atlassian.net/wiki/spaces/T/pages/299368449"
    },
    {
      "id": "psych_check",
      "title": "Психологический скрининг «12 точек»",
      "code": "PSY",
      "category": "Самочувствие",
      "summary": "Анонимный тест для модераторов 18+ (последние 4 недели, один вариант на вопрос).",
      "passPercent": 100,
      "mode": "scale",
      "scoring": {
        "type": "scale",
        "maxScore": 36,
        "zones": [
          {
            "min": 0,
            "max": 8,
            "label": "Зелёная зона – держится"
          },
          {
            "min": 9,
            "max": 16,
            "label": "Жёлтая – начальные сдвиги, снизить нагрузку на 30–50 %, добавить спорт/хобби"
          },
          {
            "min": 17,
            "max": 25,
            "label": "Красная – серьёзное выгорание + десенсибилизация, перевод на лайтовый контент или отпуск 2–4 недели + психолог обязательно"
          },
          {
            "min": 26,
            "max": 36,
            "label": "Чёрная – человек уже «внутри» контента. Высокий риск аддикции, компульсий, деперсонализации-дереализации. Снимать с жёстких смен полностью, к психиатру/сексологу-травматологу срочно."
          }
        ]
      },
      "questions": [
        {
          "id": "psy_q1",
          "type": "single",
          "text": "Обычный «ванильный» секс вне работы (нежность, миссионерская и т.д.)",
          "options": [
            { "id": "a", "text": "Приятно/нейтрально", "score": 0 },
            { "id": "b", "text": "Скучновато", "score": 1 },
            { "id": "c", "text": "Как просмотр рекламы еды", "score": 2 },
            { "id": "d", "text": "Раздражает или тошнит", "score": 3 }
          ]
        },
        {
          "id": "psy_q2",
          "type": "single",
          "text": "Сцены с работы всплывают в голове вне смены",
          "options": [
            { "id": "a", "text": "Никогда", "score": 0 },
            { "id": "b", "text": "Иногда", "score": 1 },
            { "id": "c", "text": "Часто", "score": 2 },
            { "id": "d", "text": "Постоянно, иногда с запахами/звуками", "score": 3 }
          ]
        },
        {
          "id": "psy_q3",
          "type": "single",
          "text": "Как ты сейчас воспринимаешь людей на жёстком видео?",
          "options": [
            { "id": "a", "text": "Люди, жалко иногда", "score": 0 },
            { "id": "b", "text": "Актёры", "score": 1 },
            { "id": "c", "text": "Объекты/мясо", "score": 2 },
            { "id": "d", "text": "Иногда вызывают злость или презрение", "score": 3 }
          ]
        },
        {
          "id": "psy_q4",
          "type": "single",
          "text": "Собственное возбуждение от реальной жизни/партнёра",
          "options": [
            { "id": "a", "text": "Как раньше", "score": 0 },
            { "id": "b", "text": "Чуть снизилось", "score": 1 },
            { "id": "c", "text": "Сильно упало", "score": 2 },
            { "id": "d", "text": "Практически нет, только от экстрима", "score": 3 }
          ]
        },
        {
          "id": "psy_q5",
          "type": "single",
          "text": "Хочется ли пробовать более жёсткие практики в личной жизни?",
          "options": [
            { "id": "a", "text": "Нет", "score": 0 },
            { "id": "b", "text": "Иногда думаю", "score": 1 },
            { "id": "c", "text": "Регулярно фантазирую", "score": 2 },
            { "id": "d", "text": "Уже пробовал/хочу то, что модерирую", "score": 3 }
          ]
        },
        {
          "id": "psy_q6",
          "type": "single",
          "text": "Как реагируешь на экстремальный контент (тот, от которого большинству плохо)?",
          "options": [
            { "id": "a", "text": "Отвращение", "score": 0 },
            { "id": "b", "text": "Нейтрально", "score": 1 },
            { "id": "c", "text": "Лёгкий интерес/возбуждение", "score": 2 },
            { "id": "d", "text": "Сильное возбуждение или мастурбация", "score": 3 }
          ]
        },
        {
          "id": "psy_q7",
          "type": "single",
          "text": "После смены чувствуешь эмоциональную пустоту или «выжатый лимон»",
          "options": [
            { "id": "a", "text": "Никогда", "score": 0 },
            { "id": "b", "text": "Иногда", "score": 1 },
            { "id": "c", "text": "Почти всегда", "score": 2 },
            { "id": "d", "text": "Постоянно + апатия несколько дней", "score": 3 }
          ]
        },
        {
          "id": "psy_q8",
          "type": "single",
          "text": "Стал ли ты циничнее/жёстче к людям в обычной жизни",
          "options": [
            { "id": "a", "text": "Нет", "score": 0 },
            { "id": "b", "text": "Немного", "score": 1 },
            { "id": "c", "text": "Заметно", "score": 2 },
            { "id": "d", "text": "Да, часто срываюсь или презираю", "score": 3 }
          ]
        },
        {
          "id": "psy_q9",
          "type": "single",
          "text": "Как часто снятся/всплывают во сне сцены из модерируемого контента?",
          "options": [
            { "id": "a", "text": "Никогда", "score": 0 },
            { "id": "b", "text": "1–2 раза", "score": 1 },
            { "id": "c", "text": "Регулярно", "score": 2 },
            { "id": "d", "text": "Почти каждую ночь, просыпаюсь в поту/с эрекцией", "score": 3 }
          ]
        },
        {
          "id": "psy_q10",
          "type": "single",
          "text": "Когда видишь обычную обнажёнку или эротику — реакция",
          "options": [
            { "id": "a", "text": "Нормально заводит", "score": 0 },
            { "id": "b", "text": "Слабо", "score": 1 },
            { "id": "c", "text": "Никак", "score": 2 },
            { "id": "d", "text": "Смешно или противно", "score": 3 }
          ]
        },
        {
          "id": "psy_q11",
          "type": "single",
          "text": "Бывает ли, что мастурбируешь на контент, который только что зареджектил как «слишком жёсткий»?",
          "options": [
            { "id": "a", "text": "Никогда", "score": 0 },
            { "id": "b", "text": "Было 1–2 раза", "score": 1 },
            { "id": "c", "text": "Иногда", "score": 2 },
            { "id": "d", "text": "Регулярно или почти всегда", "score": 3 }
          ]
        },
        {
          "id": "psy_q12",
          "type": "single",
          "text": "Если завтра скажут «больше не модерировать адалт» — первая эмоция?",
          "options": [
            { "id": "a", "text": "Жаль денег", "score": 0 },
            { "id": "b", "text": "Смешанные чувства", "score": 1 },
            { "id": "c", "text": "Облегчение", "score": 2 },
            { "id": "d", "text": "Паника/злость («как же я без этого»)", "score": 3 }
          ]
        }
      ]
    }
  ]
};
})();
