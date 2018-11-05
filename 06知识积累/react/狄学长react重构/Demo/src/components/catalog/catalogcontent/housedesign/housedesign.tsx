import * as React from 'react';
import CatalogConfig from '../../utils/catalogconfig';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './housedesign.scss';

export default class HouseDesign extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    getToolsList(designHouseTools) {
        const toolList = designHouseTools.map((toolObj) => {
            const itemList = this.getItemList(toolObj.children);
            return <div className="list-items" key={toolObj.id}>
                        <div className="title">{toolObj.title}</div>
                        <div className="tools">
                            {itemList}
                        </div>
                   </div>
        });

        return (
            toolList
        );
    }

    getItemList(tools) {
        const itemList = tools.map((tool) => {
            return  <div className="tool" key={tool.id}>
                       <div className="img-icon">
                            <img src={tool.img} alt=""/>
                       </div>
                       <div className="name">{tool.title}</div>
                    </div>
        });

        return (
            itemList
        )
    }

    render() {
        let designHouseTools = CatalogConfig.getDesignHouseTools();
        let toolList = this.getToolsList(designHouseTools);
        return (
            <div className="house-design">
                <PerfectScrollbar>
                    <div className="upload-house">
                        <img src={require('./img/upload.svg')} className="normal-img"/>
                        <img src={require('./img/upload_light.svg')} className="active-img"/>
                        <div className="name">上传户型描摹图</div>
                    </div>
                    {toolList} 
                </PerfectScrollbar>
            </div>
        );
    }
}