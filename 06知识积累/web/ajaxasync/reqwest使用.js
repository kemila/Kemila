
import reqwest from 'reqwest'
import Cookies from 'js-cookie'

class Connection {

    constructor (url, headers) {
        this._url = url
        this._headers = headers
    }

    requestGet () {
        let _url = this._url
        if (!_url) {
            return Promise.reject(null)
        }
        let _headers = this._headers
        let token = Cookies.get('access_token');
        if(token){
            if(!_headers){
                _headers = {};
            }
            _headers.Authorization = 'Bearer ' + token;
        }
        return new Promise(function (resolve, reject) {
            //console.log(_url)
            reqwest({
                url: _url,
                type: 'json',
                method: 'GET',
                headers: _headers,
                success: resolve,
                error: reject
            })
        })
    }

    requestPost (dataObj) {
        return this._requestWithData('POST', dataObj)
    }

    requestPut (dataObj) {
        return this._requestWithData('PUT', dataObj)
    }

    requestPostFormData (dataObj) {
        return this._requestWithData('POST', dataObj, false);
    }

    requestFormData (formData) {
        let _url = this._url
        if (!_url || !formData) {
            return Promise.reject(null)
        }
        let _headers = this._headers
        let token = Cookies.get('access_token');
        if(token){
            if(!_headers){
                _headers = {};
            }
            _headers.Authorization = 'Bearer ' + token;
        }
        return new Promise(function (resolve, reject) {
            reqwest({
                url: _url,
                method: 'POST',
                headers: _headers,
                data: formData,
                processData: false,
                success: resolve,
                error: reject
            })
        })
    }

    requestDelete () {
        let _url = this._url
        if (!_url) {
            return Promise.reject(null)
        }
        let _headers = this._headers
        return new Promise(function (resolve, reject) {
            reqwest({
                url: _url,
                type: 'json',
                method: 'DELETE',
                headers: _headers,
                success: resolve,
                error: reject
            })
        })
    }

    _requestWithData (type, dataObj, isStringify = true) {
        let _url = this._url
        if (!_url || !dataObj) {
            return Promise.reject(null)
        }
        let _headers = this._headers
        let token = Cookies.get('access_token');
        if(token){
            if(!_headers){
                _headers = {};
            }
            _headers.Authorization = 'Bearer ' + token;
        }
        return new Promise(function (resolve, reject) {
            reqwest({
                url: _url,
                type: 'json',
                method: type,
                headers: _headers,
                contentType: 'application/json',
                data: isStringify ? JSON.stringify(dataObj) : dataObj,
                success: resolve,
                error: reject
            })
        })
    }
}

export default Connection
