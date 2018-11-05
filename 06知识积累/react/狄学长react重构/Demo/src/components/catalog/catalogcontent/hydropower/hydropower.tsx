import * as React from 'react';
import CatalogConfig from '../../utils/catalogconfig';
let PerfectScrollbar = require('react-perfect-scrollbar');
import 'react-perfect-scrollbar/dist/css/styles.css';
import './hydropower.scss';

export default class Hydropower extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

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
        let hydropowerTools = CatalogConfig.getHydropowerTools();
        let toolList = this.getToolsList(hydropowerTools);
        return (
            <div className="hydropower">
                <PerfectScrollbar>
                    {toolList} 
                </PerfectScrollbar>
            </div>
        );
    }
}