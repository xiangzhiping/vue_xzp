import server from '../utils/requester';

export const imageCaptchaIdGet = async () => {
    return await server.get('/xzp/sys/image/captcha/id/get', {});
};

export const imageCaptchaImageGet = async (captcha_id) => {
    return await server.get('/xzp/sys/image/captcha/image/get', {captcha_id}, {responseType: 'blob'});
};

export const userAccountPasswordLogin = async (req) => {
    return await server.post('/xzp/user/login/account/password', req);
};

export const identityCaptchaSend = async (req) => {
    return await server.post('/xzp/sys/identity/captcha/send', req);
};

export const userEmailCaptchaLogin = async (req) => {
    return await server.post('/xzp/user/login/captcha', req);
};

export const userPasswordReset = async (req) => {
    return await server.patch('/xzp/user/password/retrieval', req);
};

export const userAccountRegister = async (req) => {
    return await server.post('/xzp/user/register', req);
};
