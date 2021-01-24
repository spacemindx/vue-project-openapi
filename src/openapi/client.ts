import memoize from 'lodash/memoize';
// @ts-ignore
import SwaggerClient from 'swagger-client';
// @ts-ignore
import swagger from './api.swagger.json';
import { components, paths } from './types/generated/api';

type TApiCall<P, R> = (params: P) => Promise<R>;

type TApi = {
  Project: {
    get_project: TApiCall<paths['/project']['get']['parameters']['query'], components['schemas']['Project']>;
  };
};

/**
 * (1)
 * Самый простой вариант использовать swagger-client, у либы 2.2к звездочек, есть активность,
 * есть позитивный опыт ее использования
 * инициализируем new SwaggerClient (ниже) и у нас доступ ко всем end-point вида
 * const { Client, Preset } = await getClient();
 * const response = await Client.app_api_v1_client_user_clients(params)
 * const response = await Preset.app_api_v1_vis_preset_get(params)
 * из коробки доступна авторизация, requestInterceptor и responseInterceptor
 * отсутствие кодогенерации я склонен рассматривть как плюс
 * -- Из минусов можно отметить что в IDE не будет автокомплита для получаемой сущности
 *
 * (2)
 * Типизируем наш SwaggerClient
 * Генерирует типы с помощью openapi-typescript (см. package.json -> scripts), 500 звездочек, есть активность
 * И обмазываем наш клиент этими типами, для примера я только для одного вызова сделал см. тип TApi выше
 * Изначально это потребует не так много времени, добавление новых end-point в процессе, займет минимум
 * При "значительных" изменения в описании api проект будет валиться с ошибкой
 *
 * (3)
 * Так SwaggerClient и типы генеряться по определенным шаблонам то можно самому дописать генератор для типа TApi
 * Это займет не так много времени, день, максимум два моя оценка.
 *
 * Если типизации не будет можно сделать не TApi а явную мапу для методов SwaggerClient,
 * тогда появится autocomplete я так думаю
 *
 * (4)
 * Думаю это еще можно как-то поудобнее интегрировать в структуру VUE приложения,
 * но это нужно уже посмотреть сам проект
 *
 * (5)
 * Если все это не нравится, нужно пробовать ряд готовых решений, среди которых одни новички,
 * я искал, смотрел, узнавал у коллег, но так и не нашел что-то проверенное и широко-используемое,
 * в результате остановился на предложенном варианте
 * либо писать свой велосипед
 */
export const getApiClient = memoize(async () => {
  const {
    apis,
  } = await new SwaggerClient({
    spec: { ...swagger },
    requestInterceptor: (req: any) => {
      req.headers = {
        ...req.headers,
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: 'set some token',
      };
      return req;
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    authorizations: {  properties: { access_token: '234934239' } },
  });

  return apis as TApi;
});
