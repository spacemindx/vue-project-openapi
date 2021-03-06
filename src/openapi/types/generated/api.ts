/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/SearchVisit": {
    /** Запрашивает агрегированные данные по запросам и сегментам */
    get: {
      parameters: {
        query: {
          /** ID проекта */
          project_id: number;
          /** Дата начала (включается) */
          start_date: string;
          /** Дата конца (исключается) */
          end_date: string;
          /** Метод группировки */
          group_by: "type" | "segment";
          /** Метод группировки дат */
          time_group_by?: "day" | "week" | "month" | "year";
          /** Типы устройств */
          devices: ("DESKTOP" | "MOBILE" | "TABLET")[];
          /** Данные каких доменов включить в результат. Если не задавать, то вернет суммарно по всем доменам */
          domains?: number[];
        };
      };
      responses: {
        /** Успех */
        200: unknown;
        /** Домен не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/auth": {
    post: operations["app.api.v1.auth.authorize"];
  };
  "/auth/refresh": {
    post: operations["app.api.v1.auth.refresh"];
  };
  "/auth/revoke_access": {
    delete: operations["app.api.v1.auth.revoke_access"];
  };
  "/auth/revoke_refresh": {
    delete: operations["app.api.v1.auth.revoke_refresh"];
  };
  "/client": {
    get: operations["app.api.v1.client.user_clients"];
    /** Создать нового клиента для пользователя */
    post: {
      requestBody: {
        "application/json": {
          /** true если клиент - физ. лицо; false - иначе */
          private?: boolean;
        };
      };
      responses: {
        /** Клиент создан */
        201: unknown;
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/client/{client_id}": {
    /** Удалить клиента */
    delete: {
      responses: {
        /** Клиент удален */
        200: unknown;
        /** Клиент не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Получить информацию о клиенте */
    get: {
      responses: {
        /** Клиент найден */
        200: unknown;
        /** Клиент не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    parameters: {
      path: {
        /** ID клиента */
        client_id: number;
      };
    };
  };
  "/domain": {
    /** Получить все домены в проекте */
    get: {
      parameters: {
        query: {
          /** ID проекта */
          project_id?: number;
        };
      };
      responses: {
        /** Успех */
        200: {
          "application/json": components["schemas"]["BaseDomain"][];
        };
        /** Домен не существует */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Создать новый домен */
    post: {
      requestBody: {
        "application/json": {
          /** Префикс домена. Конечный домен будет сформирован как префик + корневой домен Проекта */
          prefix?: string;
          /** ID проекта к которому прикрепить домен */
          project_id?: number;
          /** Протокол подключения (http|https) */
          scheme?: "https" | "http";
        };
      };
      responses: {
        /** Домен создан */
        201: {
          "application/json": components["schemas"]["Domain"];
        };
        /** Домен с ключом (проект, схема, префикс) существует */
        409: {
          "application/json": components["schemas"]["Domain"];
        };
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/domain/{domain_id}": {
    /** Удалить домен */
    delete: {
      responses: {
        /** Домен удален */
        200: unknown;
        /** Домен не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Получить информацию о домене */
    get: {
      parameters: {
        query: {
          /** Добавить все поля */
          detailed?: number;
        };
      };
      responses: {
        /** Домен найден */
        200: {
          "application/json":
            | components["schemas"]["BaseDomain"]
            | components["schemas"]["Domain"];
        };
        /** Домен не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Обновить данные домена. */
    put: {
      requestBody: {
        "application/json": {
          /** ID google токена */
          g_creds_id?: number | null;
          /** Включить отслеживание переходов из поисковых систем */
          update_search_visits?: boolean;
          /** ID yandex токена */
          y_creds_id?: number | null;
        };
      };
      responses: {
        /** Домен обновлен */
        200: {
          "application/json": components["schemas"]["Domain"];
        };
        /** Домен/токен не найден или нет прав доступа */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    parameters: {
      path: {
        /** ID домена */
        domain_id: number;
      };
    };
  };
  "/oauth2/callback": {
    get: operations["app.api.v1.oauth2.callback"];
  };
  "/oauth2/privacy": {
    get: operations["app.api.v1.oauth2.privacy"];
  };
  "/oauth2/request": {
    get: operations["app.api.v1.oauth2.auth_request"];
  };
  "/oauth2/revoke": {
    get: operations["app.api.v1.oauth2.revoke"];
  };
  "/oauth2/terms": {
    get: operations["app.api.v1.oauth2.terms"];
  };
  "/project": {
    /** Получить все проекты клиента с доменами */
    get: {
      parameters: {
        query: {
          /** ID клиента */
          client_id?: number;
        };
      };
      responses: {
        /** Успех */
        200: {
          "application/json": components["schemas"]["Project"][];
        };
        /** Домен не существует */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Создать новый проект */
    post: {
      requestBody: {
        "application/json": {
          /** ID клиента к которому прикрепить проект */
          client_id?: number;
          /** Название проекта (опционально) */
          name?: string;
          /** Корневой домен проекта. Запрещены названия доменов с www. При необходимости, создается соотвествующий домен с префиксом www */
          root_domain?: string;
        };
      };
      responses: {
        /** Проект создан */
        201: unknown;
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/project/{project_id}": {
    /** Удалить проект */
    delete: {
      responses: {
        /** Проект удален */
        200: unknown;
        /** Проект не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Получить информацию о проекте */
    get: {
      responses: {
        /** Проект найден */
        200: unknown;
        /** Проект не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Обновить данные проекта. */
    put: {
      requestBody: {
        "application/json": {
          /** Список брендовых запросов */
          brand_queries?: string[];
          /** Новое имя проекта */
          name?: string;
        };
      };
      responses: {
        /** Проект обновлен */
        200: {
          "application/json": components["schemas"]["Project"];
        };
        /** Проект/токен не найден или нет прав доступа */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
      };
    };
  };
  "/project/{project_id}/frq_conf": {
    get: operations["app.api.v1.frq_conf.search"];
    post: operations["app.api.v1.frq_conf.post"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
      };
    };
  };
  "/project/{project_id}/frq_conf/{frq_conf_id}": {
    get: operations["app.api.v1.frq_conf.get"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
        /** ID конфига */
        frq_conf_id: number;
      };
    };
  };
  "/project/{project_id}/pos_conf": {
    get: operations["app.api.v1.pos_conf.search"];
    post: operations["app.api.v1.pos_conf.post"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
      };
    };
  };
  "/project/{project_id}/pos_conf/{pos_conf_id}": {
    get: operations["app.api.v1.pos_conf.get"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
        /** ID конфига */
        pos_conf_id: number;
      };
    };
  };
  "/project/{project_id}/preset": {
    get: operations["app.api.v1.vis_preset.search"];
    post: operations["app.api.v1.vis_preset.post"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
      };
    };
  };
  "/project/{project_id}/preset/{preset_id}": {
    get: operations["app.api.v1.vis_preset.get"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
        /** ID пресета */
        preset_id: number;
      };
    };
  };
  "/project/{project_id}/structure": {
    get: operations["app.api.v1.structure.search"];
    post: operations["app.api.v1.structure.post"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
      };
    };
  };
  "/project/{project_id}/structure/{structure_id}": {
    get: operations["app.api.v1.structure.get"];
    parameters: {
      path: {
        /** ID проекта */
        project_id: number;
        /** ID структуры */
        structure_id: number;
      };
    };
  };
  "/segment": {
    /** Получить все сегменты проекта */
    get: {
      parameters: {
        query: {
          /** ID проекта для которого показать сегменты */
          project_id?: number;
        };
      };
      responses: {
        /** Успех */
        200: {
          "application/json": components["schemas"]["ResourceSegment"][];
        };
        /** Домен не существует */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Создать новый сегмент */
    post: {
      requestBody: {
        "application/json": {
          /** Имя сегмента */
          name?: string;
          /** ID проекта */
          project_id?: number;
          /** Регулярное выражение */
          regex?: string;
        };
      };
      responses: {
        /** Сегмент создан */
        201: {
          "application/json": components["schemas"]["ResourceSegment"];
        };
        /** Домен не существует */
        404: {
          "application/json": components["schemas"]["Error"];
        };
        /** Сегмент с таким regex существует для этого проекта */
        409: {
          "application/json": components["schemas"]["Error"];
        };
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/segment/{segment_id}": {
    /** Удалить сегмент */
    delete: {
      responses: {
        /** Сегмент удален */
        200: unknown;
        /** Сегмент не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Получить информацию о сегменте */
    get: {
      responses: {
        /** Сегмент найден */
        200: {
          "application/json": components["schemas"]["ResourceSegment"];
        };
        /** Домен или сегмент не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Обновить данные сегмента. */
    put: {
      requestBody: {
        "application/json": {
          /** Имя сегмента */
          name?: string;
          /** Регулярное выражение */
          regex?: string;
        };
      };
      responses: {
        /** Сегмент обновлен */
        200: {
          "application/json": components["schemas"]["ResourceSegment"];
        };
        /** Домен или сегмент не найде */
        404: {
          "application/json": components["schemas"]["Error"];
        };
        /** Сегмент с таким regex существует для этого проекта */
        409: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    parameters: {
      path: {
        /** ID сегмента */
        segment_id: number;
      };
    };
  };
  "/user": {
    /** Создать нового пользователя */
    post: {
      requestBody: {
        "application/json": {
          /** Email пользователя, используется для авторизации */
          email?: string;
          /** Имя пользователя */
          name?: string;
          /** Пароль */
          password?: string;
          /** Фамилия пользователя */
          second_name?: string;
        };
      };
      responses: {
        /** Пользователь создан */
        201: {
          "application/json": components["schemas"]["AuthUser"];
        };
        /** Пользователь существует */
        409: {
          "application/json": components["schemas"]["Error"];
        };
        /** Введены неверные данные */
        422: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  "/user/{user_id}": {
    /** Удалить пользователя */
    delete: {
      responses: {
        /** Пользователь удален */
        200: unknown;
        /** Пользователь не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    /** Получить информацию о пользователе */
    get: {
      responses: {
        /** Пользователь найден */
        200: unknown;
        /** Пользователь не найден */
        404: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
    parameters: {
      path: {
        /** ID пользователя */
        user_id: number;
      };
    };
  };
  "/user/{user_id}/{provider}/sites": {
    get: operations["app.api.v1.user.provider_sites"];
    parameters: {
      path: {
        /** ID пользователя */
        user_id: number;
        /** Аналитическая система */
        provider: "google" | "yandex";
      };
      query: {
        /** ID токена */
        token_id: number;
      };
    };
  };
}

export interface operations {
  "app.api.v1.auth.authorize": {
    requestBody: {
      "application/json": {
        /** Email пользователя */
        email?: string;
        /** Пароль пользователя */
        password?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        "application/json": components["schemas"]["AuthUser"];
      };
      /** Неправильные учетные данные */
      422: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Обновляет выданный JWT access_token */
  "app.api.v1.auth.refresh": {
    responses: {
      /** Возвращает новый access_token но уже без refresh_token */
      200: {
        "application/json": {
          access_token?: string;
        };
      };
    };
  };
  /** Блокирует выданный JWT access_token */
  "app.api.v1.auth.revoke_access": {
    responses: {
      /** Успех */
      200: {
        "application/json": {
          msg?: string;
        };
      };
    };
  };
  /** Блокирует выданный JWT refresh_token */
  "app.api.v1.auth.revoke_refresh": {
    responses: {
      /** Успех */
      200: {
        "application/json": {
          msg?: string;
        };
      };
    };
  };
  /** Список всех клиентов доступных пользователю */
  "app.api.v1.client.user_clients": {
    responses: {
      /** Успех */
      200: {
        "application/json": components["schemas"]["ClientUserRole"][];
      };
    };
  };
  "app.api.v1.oauth2.callback": {
    responses: {
      /** Новый токен успешно получен */
      201: unknown;
      /** Ошибка авторизации на стороне провайдера */
      401: {
        "application/json": components["schemas"]["Error"];
      };
      /** Неправильный state */
      422: {
        "application/json": components["schemas"]["Error"];
      };
      /** Неправильный provider */
      501: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  "app.api.v1.oauth2.privacy": {
    responses: {
      /** Политика конфиденциальности */
      200: {
        "text/plain": string;
      };
    };
  };
  "app.api.v1.oauth2.auth_request": {
    parameters: {
      query: {
        /** Провайдер данных */
        provider: "google" | "yandex";
      };
    };
    responses: {
      /** Редирект на Yandex или Google для предоставления доступа */
      302: never;
      /** Для этого пользователя существует Google токен */
      409: {
        "application/json": components["schemas"]["Error"];
      };
      /** Неправильный provider */
      501: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  "app.api.v1.oauth2.revoke": {
    parameters: {
      query: {
        /** Провайдер данных */
        provider: "google" | "yandex";
        /** ID токена */
        token_id: number;
      };
    };
    responses: {
      /** Токен отозван */
      200: unknown;
      /** Токен не найден в базе */
      404: {
        "application/json": components["schemas"]["Error"];
      };
      /** Неправильный provider */
      501: {
        "application/json": components["schemas"]["Error"];
      };
      /** Ошибка на стороне провайдера */
      502: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  "app.api.v1.oauth2.terms": {
    responses: {
      /** Условия использования */
      200: {
        "text/plain": string;
      };
    };
  };
  /** Получить все конфиги частотности проекта */
  "app.api.v1.frq_conf.search": {
    responses: {
      /** Успех */
      200: {
        "application/json": components["schemas"]["FrequencyParserConfig"][];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Добавить конфиг парсера частотности к проекту */
  "app.api.v1.frq_conf.post": {
    requestBody: {
      "application/json": {
        /** Устройство */
        device?: "all" | "desktop" | "tablet_phone" | "tablet" | "phone";
        /** Регион выдачи */
        regions?: string[];
      };
    };
    responses: {
      /** Конфиг создан */
      201: {
        "application/json": components["schemas"]["FrequencyParserConfig"];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить информацию о конфиге */
  "app.api.v1.frq_conf.get": {
    responses: {
      /** Конфиг найден */
      200: {
        "application/json": components["schemas"]["FrequencyParserConfig"];
      };
      /** Проект не найден */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить все конфиги позиций проекта */
  "app.api.v1.pos_conf.search": {
    responses: {
      /** Успех */
      200: {
        "application/json": components["schemas"]["PositionParserConfig"][];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Добавить конфиг парсера позиций к проекту */
  "app.api.v1.pos_conf.post": {
    requestBody: {
      "application/json": {
        /** Устройство */
        device?:
          | "desktop"
          | "tablet_android"
          | "tablet_ios"
          | "mobile_android"
          | "mobile_ios";
        /** Язык */
        language?: string;
        /** Регион выдачи */
        region?: string;
        /** Поисковой движок */
        search_engine?: string;
        /** Хост движка */
        search_engine_host?: string;
      };
    };
    responses: {
      /** Конфиг создан */
      201: {
        "application/json": components["schemas"]["PositionParserConfig"];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить информацию о конфиге */
  "app.api.v1.pos_conf.get": {
    responses: {
      /** Конфиг найден */
      200: {
        "application/json": components["schemas"]["PositionParserConfig"];
      };
      /** Проект не найден */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить все пресеты видимости проекта */
  "app.api.v1.vis_preset.search": {
    responses: {
      /** Успех */
      200: {
        "application/json": components["schemas"]["VisibilityPreset"][];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Создать новый пресет видимости */
  "app.api.v1.vis_preset.post": {
    requestBody: {
      "application/json": {
        /** ID конфига частотности */
        f_conf_id?: number;
        /** ID конфига позиций */
        p_conf_id?: number;
        /** ID структуры слов */
        structure_id?: number;
      };
    };
    responses: {
      /** Пресет создан */
      201: {
        "application/json": components["schemas"]["VisibilityPreset"];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
      /** Пресет с такой конфигурацией существует */
      409: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить информацию о пресете */
  "app.api.v1.vis_preset.get": {
    responses: {
      /** Пресет найден */
      200: {
        "application/json": components["schemas"]["VisibilityPreset"];
      };
      /** Проект или пресет не найден */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить все структуры фраз проекта */
  "app.api.v1.structure.search": {
    responses: {
      /** Успех */
      200: {
        "application/json": components["schemas"]["VisibilityStructure"][];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Создать новую структуру. Опицонально можно сразу добавить список ключей. */
  "app.api.v1.structure.post": {
    requestBody: {
      "application/json": {
        /** Название структуры */
        name?: string;
        /** Список поисковых фраз */
        queries?: string[];
      };
    };
    responses: {
      /** Структура создана */
      201: {
        "application/json": components["schemas"]["VisibilityStructure"];
      };
      /** Проект не существует */
      404: {
        "application/json": components["schemas"]["Error"];
      };
      /** Структцра с таким именем существует */
      409: {
        "application/json": components["schemas"]["Error"];
      };
      /** Отсутствует имя */
      422: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить информацию о структуре */
  "app.api.v1.structure.get": {
    responses: {
      /** Конфиг найден */
      200: {
        "application/json": components["schemas"]["VisibilityStructure"];
      };
      /** Проект не найден */
      404: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  /** Получить список подтвержденных сайтов для токена */
  "app.api.v1.user.provider_sites": {
    responses: {
      /** Успех */
      200: {
        "application/json": string[];
      };
      /** Учетная запись провайдера или пользователь не найдены */
      404: {
        "application/json": components["schemas"]["Error"];
      };
      /** Провайдер не существует */
      501: {
        "application/json": components["schemas"]["Error"];
      };
      /** Учетная запись провайдера или пользователь не найдены */
      520: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
}

export interface components {
  schemas: {
    AuthUser: components["schemas"]["User"] & {
      access_token?: string;
      refresh_token?: string;
    };
    BaseDomain: {
      g_creds_id?: number;
      id?: number;
      /** Префикс домена. Конечный домен будет сформирован как префик + корневой домен Проекта */
      prefix?: string;
      project_id?: number;
      /** Протокол подключения (http|https) */
      scheme?: "http" | "https";
      y_creds_id?: number;
    };
    ClientUserRole: {
      /** ID клиента */
      client_id?: number;
      /** ID роли */
      role_id?: number;
      /** ID пользователя */
      user_id?: number;
    };
    Domain: components["schemas"]["BaseDomain"] & {
      update_search_visits?: boolean;
    };
    Error: {
      detail?: { [key: string]: any };
      status?: number;
      title?: string;
      type?: string;
    };
    FrequencyParserConfig: {
      /** Устройство */
      device?: "all" | "desktop" | "tablet_phone" | "tablet" | "phone";
      /** ID конфига */
      id?: number;
      /** Регион выдачи */
      regions?: string[];
    };
    PositionParserConfig: {
      /** Устройство */
      device?:
        | "desktop"
        | "tablet_android"
        | "tablet_ios"
        | "mobile_android"
        | "mobile_ios";
      /** ID конфига */
      id?: number;
      /** Язык */
      language?: string;
      /** Регион выдачи */
      region?: string;
      /** Поисковой движок */
      search_engine?: string;
      /** Хост движка */
      search_engine_host?: string;
    };
    Project: {
      brand_queries?: string[];
      client_id?: number;
      domains?: {
        id?: number;
        url?: string;
      }[];
      id?: number;
      name?: string;
      root_domain?: string;
      segments?: string[];
    };
    ResourceSegment: {
      /** ID домена */
      domain_id?: number;
      /** ID сегмента */
      id?: number;
      /** Имя сегмента */
      name?: string;
      /** Регулярное выражение */
      regex?: string;
    };
    User: {
      /** Email пользователя, используется для авторизации */
      email?: string;
      /** Имя пользователя */
      name?: string;
      /** Пароль */
      password?: string;
      /** Фамилия пользователя */
      second_name?: string;
    };
    VisibilityPreset: {
      /** ID конфига частотности */
      f_conf_id?: number;
      /** ID пресета */
      id?: number;
      /** ID конфига позиций */
      p_conf_id?: number;
      /** ID проекта */
      project_id?: number;
      /** ID структуры */
      structure_id?: number;
    };
    VisibilityStructure: {
      /** ID конфига */
      id?: number;
      /** Количество поисковых запросов */
      n_queries?: number;
      /** Имя структуры */
      name?: string;
    };
  };
}
