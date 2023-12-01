import axios, { AxiosError, AxiosResponse } from 'axios';
// import {stores} from 'common/providers/StoreProvider/Provider'
// import {getLdapUserLogout} from 'common/services/ApiService/queries/lc/LdapUserLogout'
// import {getARMLogout} from 'common/services/ApiService/queries/admin/arm/Logout'

export const axiosInstance = axios.create();

// function deleteCookie(cookieName: string) {
//     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// const removeToken = (tokens: Array<string>) => {
//     for (const tokensKey of tokens) {
//         localStorage.removeItem(tokensKey);
//
//         if (tokensKey === 'arm_token') {
//             stores.adAuthStore.clearStoreARM();
//         }
//
//         if (tokensKey === 'ad_token') {
//             stores.adAuthStore.clearStore();
//         }
//
//         location.reload();
//     }
// };

axiosInstance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        const { url } = response.config;
        const { method } = response.config;
        console.log(url);
        console.log(method);

        // if (
        //     url?.includes('ldap/user') &&
        //     method === 'get' &&
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //     response.data.length === 0
        // ) {
        //     removeToken(['ad_token']);
        // }
        //
        // if (url?.includes('arm/logout')) {
        //     removeToken(['arm_token']);
        // }

        return response;
    },
    async (error: AxiosError<any>) => {
        console.log(error);
        // if (error.response?.status === 401 || error.response?.status === 403) {
        //     if (stores.elkAuthStore.isAuthorized) {
        //         stores.elkAuthStore.clearStore();
        //     }
        //     if (stores.adAuthStore.isAuthorized) {
        //         if (
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        //             !error.request.responseURL.includes('/api/v1/ldap/user')
        //         ) {
        //             await getLdapUserLogout();
        //         }
        //
        //         removeToken(['ad_token']);
        //         stores.adAuthStore.clearStore();
        //     }
        //
        //     if (stores.adAuthStore.isArmAuthorized) {
        //         if (
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        //             !error.request.responseURL.includes('/api/v1/arm/user')
        //         ) {
        //             await getARMLogout();
        //         }
        //
        //         deleteCookie('ARM_SESSION');
        //         removeToken(['arm_token']);
        //         stores.adAuthStore.clearStoreARM();
        //     }
        // }
        return Promise.reject(error);
    },
);

export default axiosInstance;
