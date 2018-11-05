export default class CatalogConfig {
    constructor() {}

    /**
     * [getHouseTool: 户型绘制->户型配置工具]
     * @return {[type]} [description]
     */
    static getDesignHouseTools() {
        const houseToolImgPath = require['context']('../catalogcontent/housedesign/img/', false, /\.(png|jpe?g|gif|svg)$/);

        let houseToolConfigs = [{
            id: 'wall',
            title: '自由绘制墙体',
            children: [{
                id: 'InnerLine',
                title: '内线画墙',
                img: houseToolImgPath('./create_innerline.svg')
            }, {
                id: 'CenterLine',
                title: '中线画墙',
                img: houseToolImgPath('./create_centerline.svg')
            }]
        }, {
            id: 'room',
            title: '快捷创建房间',
            children: [{
                id: 'RectRoom',
                title: '矩形',
                img: houseToolImgPath('./temproom1.svg')
            }, {
                id: 'LShapeRoom2',
                title: 'L 型1',
                img: houseToolImgPath('./temproom3.svg')
            }, {
                id: 'LShapeRoom3',
                title: 'L 型2',
                img: houseToolImgPath('./temproom4.svg')
            }]
        }, {
            id: 'doorAndWindow',
            title: '门窗类型',
            children: [{
                id: '1e4c2b7c-a13f-42f0-b695-3f33e208506f',
                title: '单开门',
                img: houseToolImgPath('./singledoor.svg')
            }, {
                id: '73934dd2-15f4-4c34-86cb-8c1c34d08860',
                title: '子母门',
                img: houseToolImgPath('./sonMotherdoor.svg')
            }, {
                id: '7f657168-5829-4369-a93f-8c17117d3151',
                title: '移门',
                img: houseToolImgPath('./movedoor.svg')
            }, {
                id: 'd29a146f-dad1-cba8-2c41-027ee799f873',
                title: '矩形窗',
                img: houseToolImgPath('./squarewindow.svg')
            }, {
                id: 'ceb38dd6-2185-04fd-337b-33d2da49c31b',
                title: '飘窗',
                img: houseToolImgPath('./piaowindow.svg')
            }, {
                id: 'ed7dd5a7-5672-e90f-23d5-50c4b4b4cb2a',
                title: '落地窗',
                img: houseToolImgPath('./groundwindow.svg')
            }, {
                id: 'b7008559-3dc0-42a4-ad80-6cab70c9feec',
                title: 'L型窗',
                img: houseToolImgPath('./lxingchuang.svg')
            }, {
                id: '3cd30aa0-9483-4e9a-87fb-ba3a9c4fe8f4',
                title: 'L型飘窗',
                img: houseToolImgPath('./lxingpiaochuang.svg')
            }, {
                id: '5b6c340a-cf32-4694-a6b7-03c73802cda0',
                title: 'U型窗',
                img: houseToolImgPath('./uxingchuang.svg')
            }]
        }, {
            id: 'parts',
            title: '结构部件',
            children: [{
                id: 'pillar',
                title: '柱子',
                img: houseToolImgPath('./zhuzi.svg')
            }, {
                id: 'beam',
                title: '横梁',
                img: houseToolImgPath('./hengliang.svg')
            }, {
                id: 'platform',
                title: '地台',
                img: houseToolImgPath('./ditai.svg')
            }, {
                id: 'flue',
                title: '烟道',
                img: houseToolImgPath('./yandao.svg')
            }, {
                id: 'enclosurepipe',
                title: '包管',
                img: houseToolImgPath('./baoguan.svg')
            }, {
                id: 'qiangdong',
                title: '墙洞',
                img: houseToolImgPath('./qiangdong.svg')
            }, {
                id: 'f0a9c1fb-e83c-e79c-56f0-7c2b7f5482fc',
                title: '蹲坑点位',
                img: houseToolImgPath('./dunkengdianwei.svg')
            }, {
                id: 'c3effc47-905d-45a8-1754-37ff64405b7c',
                title: '下水管道',
                img: houseToolImgPath('./guandao.svg')
            }, {
                id: 'floorheating',
                title: '地暖开关',
                img: houseToolImgPath('./floorHeating.svg')
            }, {
                id: 'a19e57d2-b990-4350-9746-0f0b697ef489',
                title: '空调孔',
                img: houseToolImgPath('./kongtiaokong.svg')
            }, {
                id: '3d61be78-4504-453e-af8b-e646f6d7d2ac',
                title: '新风出口',
                img: houseToolImgPath('./xinfengchukou.svg')
            }, {
                id: '63521ad4-4d60-4741-b02a-4f08690d6a36',
                title: '检修口',
                img: houseToolImgPath('./jianxiukou.svg')
            }, {
                id: 'threshold',
                title: '门槛石',
                img: houseToolImgPath('./menkanshi.svg')
            }, {
                id: 'guanjing',
                title: '管井',
                img: houseToolImgPath('./guanjing.svg')
            }, {
                id: 'paiqidao',
                title: '排气道',
                img: houseToolImgPath('./paiqidao.svg')
            }, {
                id: '5e0b08df-2e02-43c6-8092-62ecdcce93c8',
                title: '水管',
                img: houseToolImgPath('./shuiguan.svg')
            }, {
                id: '030843f3-fb83-4018-a508-4aa090fbdc8a',
                title: '弯道水管',
                img: houseToolImgPath('./wandaoshuiguan.svg')
            }]
        }];

        return houseToolConfigs;
    } 

        /**
     * [getHydropowerTools: 户型绘制->水电配置工具]
     * @return {[type]} [description]
     */
    static getHydropowerTools() {
        const hydropowerToolImgPath = require['context']('../catalogcontent/hydropower/img/', false, /\.(png|jpe?g|gif|svg)$/);

        let hydropowerToolConfigs = [{
            id: 'hydropower',
            title: '水电部分',
            children: [{
                id: '34cd70d4-efc6-3907-1628-2ec31d136aaa',
                title: '强电箱',
                img: hydropowerToolImgPath('./StrongElectricBox.svg')
            }, {
                id: '88723f9c-2aa3-8c02-c151-2087600e6ce4',
                title: '弱电箱',
                img: hydropowerToolImgPath('./WeakBox.svg')
            }, {
                id: '5b2c7b9a-0157-431d-e425-f84738faf454',
                title: '防水面板',
                img: hydropowerToolImgPath('./WaterproofPanel.svg')
            }]
        }, {
            id: 'coldAndHotWater',
            title: '冷热水',
            children: [{
                id: '0da87eb8-c9bb-56be-31af-083debc30686',
                title: '冷热水口',
                img: hydropowerToolImgPath('./HotAndColdWaterOutlet.svg')
            }, {
                id: '56c89ffa-88da-98ef-8b11-397e631d4a41',
                title: '冷水口',
                img: hydropowerToolImgPath('./ColdWaterOutlet.svg')
            }, {
                id: '0ef2150c-94ba-2c13-1d0a-cfdd81696c4a',
                title: '热水口',
                img: hydropowerToolImgPath('./HotWaterOutlet.svg')
            }]
        }, {
            id: 'switchPanel',
            title: '开关类型',
            children: [{
                id: '43523109-c150-61fe-f091-c25793c0ceb6',
                title: '单联开关',
                img: hydropowerToolImgPath('./SingleLinkSwitch.svg')
            }, {
                id: '8096170e-83c1-3b44-b821-02386f1a0061',
                title: '双联开关',
                img: hydropowerToolImgPath('./DoubleSwitch.svg')
            }, {
                id: 'a9c79a0a-33e4-9b79-cb1b-d626b7d858bf',
                title: '三联开关',
                img: hydropowerToolImgPath('./TripleSwitch.svg')
            }, {
                id: '085e9900-6a44-faf6-1030-689944d7bba1',
                title: '四联开关',
                img: hydropowerToolImgPath('./QuadrupleSwitch.svg')
            }, {
                id: '34af74c0-8626-115f-02d5-33d99aa5871c',
                title: '防水单联开关',
                img: hydropowerToolImgPath('./WaterproofSingleSwitch.svg')
            }, {
                id: 'e0486594-2d8f-f080-455b-6a0e44623f47',
                title: '防水双联开关',
                img: hydropowerToolImgPath('./WaterproofDoubleSwitch.svg')
            }, {
                id: 'c7764d4d-f98b-adec-afcb-e57962e69dad',
                title: '防水三联开关',
                img: hydropowerToolImgPath('./WaterproofTripleSwitch.svg')
            }, {
                id: '369401fd-23a7-14d1-03e2-d5d4468a9b52',
                title: '防水四联开关',
                img: hydropowerToolImgPath('./WaterproofQuadrupleSwitch.svg')
            }, {
                id: '399c3edf-ff61-62d5-f0a0-6c3a31964307',
                title: '浴霸开关',
                img: hydropowerToolImgPath('./YubaSwitch.svg')
            }]
        }, {
            id: 'socketType',
            title: '插座类型',
            children: [{
                id: 'd98caf52-31ec-9c27-89d3-d748f623f04b',
                title: '三孔插座',
                img: hydropowerToolImgPath('./ThreeHoleSocket.svg')
            }, {
                id: '6e6d860d-da2b-3171-8333-0136ce7bdaf8',
                title: '大功率插座',
                img: hydropowerToolImgPath('./HighPowerSocket.svg')
            }, {
                id: '63674734-4adc-3efa-0926-d4ca71ae4566',
                title: '五孔插座',
                img: hydropowerToolImgPath('./FiveHoleSocket.svg')
            }, {
                id: '3b2bad0e-1f47-9b6d-171f-2adaeceb2a2c',
                title: '多功能插座',
                img: hydropowerToolImgPath('./MultiFunctionSocket.svg')
            }, {
                id: '262f3f04-951a-40b8-8b31-ea94a6209d2e',
                title: '五孔开关插座',
                img: hydropowerToolImgPath('./FiveHoleSocketSwitch.svg')
            }, {
                id: '037cc1d5-c9f6-65c9-e9c0-b3f72da8f590',
                title: '三孔开关插座',
                img: hydropowerToolImgPath('./ThreeHoleSocketSwitch.svg')
            }, {
                id: 'e1539637-9bec-29f5-6252-1c357d72a86c',
                title: '防水五孔开关插座',
                img: hydropowerToolImgPath('./WaterproofFiveHoleSocketSwitch.svg')
            }, {
                id: '6096022b-8939-ebc1-9b54-0d7dcbf4ab00',
                title: '防水三孔开关插座',
                img: hydropowerToolImgPath('./WaterproofThreeHoleSocketSwitch.svg')
            }, {
                id: 'bd4b6804-bf80-aebd-693c-3fcd7f6c57d2',
                title: '防水三孔插座',
                img: hydropowerToolImgPath('./WaterproofThreeHoleSocket.svg')
            }, {
                id: '0e9110c1-4e2a-e601-1aa1-e3a66cea30e2',
                title: '防水大功率插座',
                img: hydropowerToolImgPath('./WaterproofHighPowerSocket.svg')
            }, {
                id: '8ca5a398-849d-c830-e48d-b5832e74b59d',
                title: '防水五孔插座',
                img: hydropowerToolImgPath('./WaterproofFiveHoleSocket.svg')
            }, {
                id: '1773c45b-67d0-c511-978d-61fc92cf74d7',
                title: '防水多功能插座',
                img: hydropowerToolImgPath('./WaterproofMultiFunctionSocket.svg')
            }, {
                id: 'ab422562-cf70-0307-a5e5-d6813435593c',
                title: '有线电视插座',
                img: hydropowerToolImgPath('./CableTVOutlet.svg')
            }, {
                id: '2958cddd-17cc-3c2f-19f0-fd76eab02a50',
                title: '电话插座',
                img: hydropowerToolImgPath('./TelephoneSocket.svg')
            }, {
                id: '568eddb0-39b9-801a-ab26-4e97e4a68d77',
                title: '有线电视网络插座',
                img: hydropowerToolImgPath('./CableTVNetworkSocket.svg')
            }, {
                id: 'b13310c2-191c-2062-dd66-7a164549d2b1',
                title: '电话网络插座',
                img: hydropowerToolImgPath('./TelephoneNetworkSocket.svg')
            }]
        }];

        return hydropowerToolConfigs;
    }
} 