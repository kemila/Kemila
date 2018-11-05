import { LRUMap } from 'lru_map';

class CatalogCache {
    lruLimit: number;
    pageContext: any;
    static _instance;
    constructor() {
        this.lruLimit = 1000;
        this.pageContext = new LRUMap(this.lruLimit);
    }

    getPageContext(cacheId) {
        return this.pageContext.get(cacheId);
    }

    setPageContext(cacheId, cacheData) {
        this.pageContext.set(cacheId, cacheData);
    }

    static getInstance() {
        CatalogCache._instance = CatalogCache._instance ||
            new CatalogCache();

        return CatalogCache._instance;
    }
}

export default CatalogCache;