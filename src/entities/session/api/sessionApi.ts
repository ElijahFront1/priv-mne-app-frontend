// Импорт необходимых типов и функций из библиотеки react-query и локальных модулей.
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import {
  GenericErrorModel,
  RequestParams,
  UserDto,
  realworldApi,
} from '~shared/api/realworld';
import { addUser } from '../model/sessionModel';

// Определение интерфейса User, который будет использоваться в приложении.
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

// Функция для преобразования объекта UserDto (DTO — Data Transfer Object) в объект User.
function mapUser(userDto: UserDto): User {
  return userDto;
}

// Объект, содержащий ключи для управления кэшем запросов react-query.
export const sessionKeys = {
  session: {
    root: ['session'],
    // Функция для получения ключа текущего пользователя для кэширования запросов.
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },
  mutation: {
    // Ключи для мутаций, связанных с сессией пользователя.
    login: () => [...sessionKeys.session.root, 'login'],
    create: () => [...sessionKeys.session.root, 'create'],
  },
};

// Определение типов для параметров хука useCurrentUser, исключая 'queryKey' и 'queryFn'.
type UseCurrentUserQuery = UseQueryOptions<
    User,
    GenericErrorModel,
    User,
    string[]
>;
type UseCurrentUserOptions = Omit<UseCurrentUserQuery, 'queryKey' | 'queryFn'>;

// Хук useCurrentUser, который использует хук useQuery из react-query для асинхронной загрузки данных текущего пользователя.
export const useCurrentUser = (
    options?: UseCurrentUserOptions, // Параметры для кастомизации запроса, передаваемые непосредственно в useQuery.
    params?: RequestParams, // Параметры запроса, например, фильтры или параметры пагинации.
) =>
    useQuery({
      queryKey: sessionKeys.session.currentUser(), // Ключ кэширования запроса, используемый react-query.
      queryFn: async ({ signal }) => { // Функция запроса, которая будет вызвана для загрузки данных.
        // Вызов API для получения текущего пользователя.
        const response = await realworldApi.user.getCurrentUser({
          signal, // Объект AbortSignal для отмены запроса.
          ...params, // Дополнительные параметры запроса.
        });

        // Преобразование полученных данных в необходимый формат с помощью mapUser.
        const user = mapUser(response.data.user);

        // Добавление пользователя в глобальное состояние сессии.
        addUser(user);

        // Возврат преобразованного пользователя.
        return user;
      },
      ...options, // Распространение дополнительных опций на useQuery.
    });
