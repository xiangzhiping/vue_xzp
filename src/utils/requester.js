import axios from 'axios';
import router from "@/router.js";
import {ElMessage, ElMessageBox} from 'element-plus';

const service = axios.create({
    baseURL: import.meta.env.XZP_FASTAPI_API_BASE_URL,
    timeout: 5000
});

const cancelSource = axios.CancelToken.source();

service.interceptors.request.use(function (config) {
    const urls = [
        "/xzp/user/login/account/password",
        "/xzp/user/login/captcha",
        "/xzp/sys/identity/captcha/send",
        "/xzp/sys/image/captcha/id/get",
        "/xzp/sys/image/captcha/image/get",
        "/xzp/sys/swagger/json/get"
    ];
    if (urls.includes(config.url)) {
        return config;
    } else {
        const authorization = localStorage.getItem('Authorization');
        if (authorization) {
            config.headers['Authorization'] = `Bearer ${authorization}`;
            config.cancelToken = cancelSource.token;
            return config;
        } else {
            ElMessageBox.confirm('无访问凭证，请重新登录（点击确定会跳转到登录页面）', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                router.push('/login').then(r => null);
            })
        }
    }
}, function (error) {
    ElMessage.error(error);
    return error
});

service.interceptors.response.use(function (response) {
    if (response.status === 200) {
        if (response.headers['content-type'] === 'application/json') {
            const res = response.data;
            if (res.code < 300) {
                ElMessage.success(res.msg);
                return res;
            } else if ((res.code === 401 && res.data === 'AUTH_FAILED') || (res.code === 403 && res.data === 'AUTH_FAILED')) {
                ElMessageBox.confirm(res.msg + '（点击确定会跳转到登录页面）', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    router.push('/login').then(r => null);
                })
                return res;
            } else if (300 <= res.code < 500) {
                if (res.msg) {
                    ElMessage.warning(res.msg);
                }
                return res;
            } else {
                ElMessage.error(res.msg);
                return res;
            }
        } else {
            return response.data;
        }
    } else {
        return response
    }
}, function (error) {
    return error
});

const get = (url, params, options) => {
    return service.get(url, {params, ...options});
};

const post = (url, data) => {
    return service.post(url, data);
};

const patch = (url, data) => {
    return service.patch(url, data);
};

const put = (url, data) => {
    return service.put(url, data);
};

const del = (url, data) => {
    return service.delete(url, {data});
};

export default {get, post, patch, put, del};
