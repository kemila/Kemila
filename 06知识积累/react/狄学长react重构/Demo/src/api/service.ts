import axios from 'axios';

export default class Service{
    categoryUrl: string;

    constructor() {
        this.categoryUrl = 'http://dev-service.jtl3d.com/api/catalog/CatalogV2/';
    }

    static _instance;

    baseApi(url, method, data) {
        return axios({
            url: url,
            method: method,
            data: data,
            responseType: 'json',
        }).catch(err => {
            console.log('request error, HTTP CODE: ', err.response.status);
            return Promise.reject(err);
        });
    }

    getCategories(params) {
        let url = this.categoryUrl + 'SearchCategories?' + params;
        let method = 'get';
        let data = null;
        return this.baseApi(url, method, data);
    }

    getCatalogModels(params) {
        let url = this.categoryUrl + 'SearchProducts';
        let data = params;
        let method = 'post';
        return this.baseApi(url, method, data);
    }

    static getInstance() {
        Service._instance = Service._instance ||
            new Service();

        return Service._instance;
    }
}
