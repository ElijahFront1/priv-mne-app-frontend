const apiConfig = {
    stand: {
        url: 'http://localhost:3000',
        endpoints: {
            apiV1: '/api/v1',
        },
    },
};

export const apiUrl = `${apiConfig.stand.url}${apiConfig.stand.endpoints.apiV1}`;

export default apiConfig;
