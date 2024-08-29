import server from '../utils/requester.js'

export const userQuery = async (req) => {
    return await server.get('/xzp/user/query', req)
};


export const userAccountStatusUpdate = async (req) => {
    return await server.patch('/xzp/user/account/status/update', req)
};

