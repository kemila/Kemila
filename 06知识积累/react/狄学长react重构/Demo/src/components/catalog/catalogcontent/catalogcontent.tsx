import * as React from 'react';
import CatalogAbstractFactory from '../utils/catalogabstractfactory';
import './catalogcontent.scss';
/**
 * @description:CatalogContent对应的props
 * @catalogType: 需要显示的catalog内容
 */
interface ICatalogContentProps {
    catalogType: string,
}

export default class CatalogContent extends React.Component<ICatalogContentProps, any> {
    constructor(props: ICatalogContentProps) {
        super(props);
    }

    render() {
        let contentType = this.props.catalogType;
        if (!contentType) {
            contentType = 'GlobalSearchMaterial';
        }
        let ContentComponent = CatalogAbstractFactory.getModule(contentType);
        return (
            <div className="catalog-content">
                <ContentComponent />
            </div>
        );
    }
}