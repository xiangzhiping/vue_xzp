import server from '../utils/requester.js'

export const userRoleQuery = async (req) => {
    return await server.get('/xzp/user/role/query', req)
};


export const userRoleMenuQuery = async (req) => {
    return await server.get('/xzp/user/role/menu/query', req)
};


export const userRoleStatusUpdate = async (req) => {
    return await server.patch('/xzp/user/role/status/update', req)
};


export const userRoleCreate = async (req) => {
    return await server.post('/xzp/user/role/create', req)
};


export const userRoleDelete = async (req) => {
    return await server.del('/xzp/user/role/delete', req)
};
