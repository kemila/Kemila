import * as React from 'react';
import { Layout } from 'antd';
import TopBar from './components/topbar';
import Catalog from './components/catalog';
import View3D from './components/view3d';
import View2D from './components/view2d';
import Material from './components/popup/material';
// import Element from './components/view2d/element';
// import Popup, { PopupConfig, PopupData } from './components/popup';
import Popup, { GroupProp, V, ValueType, CompType, CompProp, KV } from './components/popup';

import Console from './components/console';
import Editor from './components/editor';
import { createCombinedModelClass, XContent } from '@jtl/xcontent_script';
import ViewObject2D from './components/view2d/model/view';
import { View as ViewObject3D } from '@jtl/xview';
import * as Utils from './utils';
import lWall from './references/lwall.yaml';
import snap from './snap';
import './app.css';
import { initComponents } from './store/actions';
import { connect } from 'react-redux';
import * as jsyaml from 'js-yaml';
import { Product } from './store/typedef';
import { convertComponentsToProducts } from './utils/yamlutil';

const { Header, Sider, Content } = Layout;

export interface AppState {
  ymlCode: string;
  // popupConfigs: PopupConfig[];
  popName: string;
  popupGrps: (GroupProp | CompProp)[];
}

// tslint:disable max-line-length
class App extends React.Component<any, AppState> {

  state: AppState = {
    ymlCode: `
      name: 沙发背景墙

      popup:
        - widget: group
          title: 基本尺寸规格
          items:
            - title: 高度
              type: length
              value: height
            - title: 宽度
              type: length
              value: width
            - type: material
              value: myMat
        - widget: group
          title: 详细信息
          items:
            - title: 两侧宽度
              type: length
              value: EQV
              inputable: false
            - title: 离地高度
              type: length
              value: position.z
        - widget: group
          title: 造型设置
          items:
            - title: 仅做中间造型
              widget: switch
              value: onlyMiddle
            - title: 左侧收口
              widget: switch
              value: leftClose
            - title: 右侧收口
              widget: switch
              value: rightClose
        - conditions:
            - leftClose == true
          widget: group
          title: 左侧收口信息
          items:
            - title: 收口类型
              type: string
              value: leftCloseType
              options:
                - 'L型'
                - 'U型'
            - title: 收口长度
              type: length
              value: leftCloseLength
        - conditions:
            - rightClose == true
          widget: group
          title: 右侧收口信息
          items:
            - title: 收口类型
              type: string
              value: rightCloseType
              options:
                - 'L型'
                - 'U型'
            - title: 收口长度
              type: length
              value: rightCloseLength
      
      variables:
        - name: myMat
          type: material
          value: '4d00f171-0630-409c-9e26-71656e41dd59'
        - name: position
          type: point3d 
          value: [0, 0, 0.15]
        - name: width
          type: number
          value: 3.25
        - name: height
          type: number
          value: 2.8
        - name: onlyMiddle
          type: boolean
          value: false
        - name: sideWidth
          type: number
          value:
            - conditions:
                - onlyMiddle == false
              value: 0.6
            - value: 0
        - name: middleWidth
          type: number
          value: width - sideWidth * 2
        - name: middleStyleWidth
          type: number
          value: middleWidth - 0.23
        # 中间竖直EQ值
        - name: EQH
          type: number
          value: (height - 0.115) / 6
        # 中间两侧EQ值
        - name: EQV
          type: number
          value:
            - conditions:
                - middleStyleWidth < 1.8
              value: 0
            - conditions:
                - middleStyleWidth >= 1.8
                - middleStyleWidth <= 2.0
              value: 0.5
            - conditions:
                - middleStyleWidth > 2.0
                - middleStyleWidth <= 3.0
              value: 0.6
            - value: 0.8
        - name: RS
          type: number
          value: middleWidth - EQV * 2 - 0.23
        - name: deep
          type: number
          value: 0.02
        - name: plankDeep
          type: number
          value: 0.009
        # 香槟金镜钢条厚度
        - name: steelBarDeep
          type: number
          value: 0.014
        # 中间延伸长度
        - name: middleExtend
          type: number
          value: 0.007
        # 倒角尺寸
        - name: bevelTS
          type: number
          value: 0.005
        # 倒角段数
        - name: bevelStep
          type: number
          value: 1
        # 收口
        - name: leftClose
          type: boolean
          value: false
        - name: leftCloseType
          type: string
          value: L型
        - name: leftCloseLength
          type: number
          value: 0.1
        # 右侧收口
        - name: rightClose
          type: boolean
          value: false
        - name: rightCloseType
          type: string
          value: L型
        - name: rightCloseLength
          type: number
          value: 0.1
      
      
      # 变量改变时，需要重新求解
      constrains:
        - expression: width >3
          errorMsg: haha
  
      
      snappings:
        active:
        passive:
      
      holes:
      
      components:
         # 浴室柜
        - id: 2b553fcf-343c-444c-a93d-fd1797106753
          position: [0, 0, 0]
          rotation: [0, 0, 0]
      
      item2Ds:
        - type: polyline
          color: '#0080FF'
          fill: '#FFFFFF'
          path: [[width / 2, 0], [width / 2, -deep], [-width / 2, -deep], [-width / 2, 0]]
        - type: text
          text: 'A'
          point: [width / 2, deep / 2]
      
      item3Ds: 
        # 后板
        - type: extrude
          materials:
            - myMat
          extend: plankDeep
          outline: [[-middleWidth / 2, 0], [-middleWidth / 2, height], [middleWidth / 2, height], [middleWidth / 2, 0]]
          position: [0, 0, 0]
          rotation: [90, 0, 0]
        - type: extrude
          materials:
            - 7e44d23c-48f9-4ed6-9f3c-545876fe2a75
          extend: steelBarDeep
          outline: [[middleWidth / 2, 0], [middleWidth / 2, height], [-middleWidth / 2, height], [-middleWidth / 2, 0], [-middleWidth / 2 + 0.01, 0], [-middleWidth / 2 + 0.01, height - 0.01], [middleWidth / 2 - 0.01, height - 0.01], [middleWidth / 2 - 0.01, 0]]
          position: [0, -plankDeep, 0]
          rotation: [90, 0, 0]
        # 木饰面
        - type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: plankDeep
          outline: [[-middleWidth / 2 + 0.01, 0], [-middleWidth / 2 + 0.01, height - 0.01], [middleWidth / 2 - 0.01, height - 0.01], [middleWidth / 2 - 0.01, 0], [middleWidth / 2 - 0.115, 0], [middleWidth / 2 - 0.115, height - 0.115], [-middleWidth / 2 + 0.115, height - 0.115], [-middleWidth / 2 + 0.115, 0]]
          position: [0, -plankDeep, 0]
          rotation: [90, 0, 0]
        # 香槟金镜钢条外
        - type: extrude
          materials:
            - 7e44d23c-48f9-4ed6-9f3c-545876fe2a75
          extend: steelBarDeep
          outline: [[middleWidth / 2 - 0.115, 0], [middleWidth / 2 - 0.115, height - 0.115], [-middleWidth / 2 + 0.115, height - 0.115], [-middleWidth / 2 + 0.115, 0], [-middleWidth / 2 + 0.125, 0], [-middleWidth / 2 + 0.125, height - 0.125], [middleWidth / 2 - 0.125, height - 0.125], [middleWidth / 2 - 0.125, 0]]
          position: [0, -plankDeep, 0]
          rotation: [90, 0, 0]
        
        # 中间两侧造型
        - conditions:
            - middleStyleWidth >= 1.8
          type: extrude
          repeat:
            - [i, 1, 6]
          materials:
            - 5d9f2ccc-cc3d-4e81-b83f-e35d14339db8
          extend: middleExtend
          outline: [[EQV / 2 - bevelTS, bevelTS], [EQV / 2 - bevelTS, EQH - bevelTS], [-EQV / 2 + bevelTS, EQH - bevelTS], [-EQV / 2 + bevelTS, bevelTS]]
          position: [-middleWidth / 2 + 0.115 + EQV / 2, -plankDeep, EQH * (i - 1)]
          rotation: [90, 0, 0]
          bevelThickness: bevelTS
          bevelSegments: bevelStep
          bevelSize: bevelTS
        - conditions:
            - middleStyleWidth >= 1.8
          type: extrude
          repeat:
            - [i, 1, 6]
          materials:
            - 5d9f2ccc-cc3d-4e81-b83f-e35d14339db8
          extend: middleExtend
          outline: [[EQV / 2 - bevelTS, bevelTS], [EQV / 2 - bevelTS, EQH - bevelTS], [-EQV / 2 + bevelTS, EQH - bevelTS], [-EQV / 2 + bevelTS, bevelTS]]
          position: [middleWidth / 2 - 0.115 - EQV / 2, -plankDeep, EQH * (i - 1)]
          rotation: [90, 0, 0]
          bevelThickness: bevelTS
          bevelSegments: bevelStep
          bevelSize: bevelTS
        # 中间RS
        - conditions:
            - middleStyleWidth >= 1.8
          type: extrude
          repeat:
            - [i, 1, 6]
          materials:
            - 5d9f2ccc-cc3d-4e81-b83f-e35d14339db8
          extend: middleExtend
          outline: [[RS / 2 - bevelTS, bevelTS], [RS / 2 - bevelTS, EQH - bevelTS], [-RS / 2 + bevelTS, EQH - bevelTS], [-RS / 2 + bevelTS, bevelTS]]
          position: [0, -plankDeep, EQH * (i - 1)]
          rotation: [90, 0, 0]
          bevelThickness: bevelTS
          bevelSegments: bevelStep
          bevelSize: bevelTS
      
        - conditions:
            - middleStyleWidth < 1.8
          type: extrude
          repeat:
            - [i, 1, 6]
          materials:
            - 5d9f2ccc-cc3d-4e81-b83f-e35d14339db8
          extend: middleExtend
          outline: [[(middleWidth - 0.45) / 2 - bevelTS, bevelTS], [(middleWidth - 0.45) / 2 - bevelTS, EQH - bevelTS], [-(middleWidth - 0.45) / 2 + bevelTS, EQH - bevelTS], [-(middleWidth - 0.45) / 2 + bevelTS, bevelTS]]
          position: [0, -plankDeep, EQH * (i - 1)]
          rotation: [90, 0, 0]
          bevelThickness: bevelTS
          bevelSegments: bevelStep
          bevelSize: bevelTS
      
        # 两侧外圈
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.024
          outline: [[-sideWidth / 2, 0], [-sideWidth / 2, height], [sideWidth / 2, height], [sideWidth / 2, 0]]
          holes: [[[-sideWidth / 2 + 0.085, 0.085], [-sideWidth / 2 + 0.085, height - 0.085], [sideWidth / 2 - 0.085, height - 0.085], [sideWidth / 2 - 0.085, 0.085]]]
          position: [-width / 2 + sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.024
          outline: [[-sideWidth / 2, 0], [-sideWidth / 2, height], [sideWidth / 2, height], [sideWidth / 2, 0]]
          holes: [[[-sideWidth / 2 + 0.085, 0.085], [-sideWidth / 2 + 0.085, height - 0.085], [sideWidth / 2 - 0.085, height - 0.085], [sideWidth / 2 - 0.085, 0.085]]]
          position: [width / 2 - sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        
        # 两侧中圈
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.019
          outline: [[-sideWidth / 2 + 0.085, 0.085], [-sideWidth / 2 + 0.085, height - 0.085], [sideWidth / 2 - 0.085, height - 0.085], [sideWidth / 2 - 0.085, 0.085]]
          holes: [[[-sideWidth / 2 + 0.1, 0.1], [-sideWidth / 2 + 0.1, height - 0.1], [sideWidth / 2 - 0.1, height - 0.1], [sideWidth / 2 - 0.1, 0.1]]]
          position: [-width / 2 + sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.019
          outline: [[-sideWidth / 2 + 0.085, 0.085], [-sideWidth / 2 + 0.085, height - 0.085], [sideWidth / 2 - 0.085, height - 0.085], [sideWidth / 2 - 0.085, 0.085]]
          holes: [[[-sideWidth / 2 + 0.1, 0.1], [-sideWidth / 2 + 0.1, height - 0.1], [sideWidth / 2 - 0.1, height - 0.1], [sideWidth / 2 - 0.1, 0.1]]]
          position: [width / 2 - sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
      
        # 两侧内圈
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.014
          outline: [[-sideWidth / 2 + 0.1, 0.1], [-sideWidth / 2 + 0.1, height - 0.1], [sideWidth / 2 - 0.1, height - 0.1], [sideWidth / 2 - 0.1, 0.1]]
          holes: [[[-sideWidth / 2 + 0.115, 0.115], [-sideWidth / 2 + 0.115, height - 0.115], [sideWidth / 2 - 0.115, height - 0.115], [sideWidth / 2 - 0.115, 0.115]]]
          position: [-width / 2 + sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: 0.014
          outline: [[-sideWidth / 2 + 0.1, 0.1], [-sideWidth / 2 + 0.1, height - 0.1], [sideWidth / 2 - 0.1, height - 0.1], [sideWidth / 2 - 0.1, 0.1]]
          holes: [[[-sideWidth / 2 + 0.115, 0.115], [-sideWidth / 2 + 0.115, height - 0.115], [sideWidth / 2 - 0.115, height - 0.115], [sideWidth / 2 - 0.115, 0.115]]]
          position: [width / 2 - sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        
        # 两侧壁纸
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - e9826e77-6f43-42d0-a0aa-032b2dd658e8
          extend: 0.001
          outline: [[-sideWidth / 2 + 0.115, 0.115], [-sideWidth / 2 + 0.115, height - 0.115], [sideWidth / 2 - 0.115, height - 0.115], [sideWidth / 2 - 0.115, 0.115]]
          position: [-width / 2 + sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
        - conditions:
            - onlyMiddle == false
          type: extrude
          materials:
            - e9826e77-6f43-42d0-a0aa-032b2dd658e8
          extend: 0.001
          outline: [[-sideWidth / 2 + 0.115, 0.115], [-sideWidth / 2 + 0.115, height - 0.115], [sideWidth / 2 - 0.115, height - 0.115], [sideWidth / 2 - 0.115, 0.115]]
          position: [width / 2 - sideWidth / 2, 0, 0]
          rotation: [90, 0, 0]
      
        # 左侧L型收口
        - conditions:
            - leftClose == true
            - leftCloseType == 'L型'
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: height
          outline: [[-width / 2 + 0.003, 0], [-width / 2 + 0.003, leftCloseLength - 0.034], [-width / 2, leftCloseLength - 0.034], [-width / 2, leftCloseLength - 0.024], [-width / 2 + 0.021, leftCloseLength - 0.024], [-width / 2 + 0.021, 0]]
          position: [0, 0, 0]
        # 右侧L型收口
        - conditions:
            - rightClose == true
            - rightCloseType == 'L型'
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: height
          outline: [[width / 2 - 0.003, 0], [width / 2 - 0.003, rightCloseLength - 0.034], [width / 2, rightCloseLength - 0.034], [width / 2, rightCloseLength - 0.024], [width / 2 - 0.021, rightCloseLength - 0.024], [width / 2 - 0.021, 0]]
          position: [0, 0, 0]
      
        # 左侧U型收口
        - conditions:
            - leftClose == true
            - leftCloseType == 'U型'
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: height
          outline: [[-width / 2, 0], [-width / 2, leftCloseLength - 0.024], [-width / 2 + 0.05, leftCloseLength - 0.024], [-width / 2 + 0.05, leftCloseLength - 0.045], [-width / 2 + 0.012, leftCloseLength - 0.045], [-width / 2 + 0.012, 0]]
          position: [0, 0, 0]
      
        # 右侧U型收口
        - conditions:
            - rightClose == true
            - rightCloseType == 'U型'
          type: extrude
          materials:
            - 4d00f171-0630-409c-9e26-71656e41dd59
          extend: height
          outline: [[width / 2, 0], [width / 2, rightCloseLength - 0.024], [width / 2 - 0.05, rightCloseLength - 0.024], [width / 2 - 0.05, rightCloseLength - 0.045], [width / 2 - 0.012, rightCloseLength - 0.045], [width / 2 - 0.012, 0]]
          position: [0, 0, 0]
      
      dwgView:
        name: 沙发背景墙
        baseVec: [0, -1, 0]
        detailDrawings:
        front:
          modelSymbols:
            - conditions:
                - middleStyleWidth < 1.8
              modelName: '正立面'
              isInConstructionDrawing: true
              symbolName: '恒大2000标客餐厅背景墙图块:SFBJQ_01_F'
              rotation: 0
              boundary: [[-middleWidth / 2, 0, 0], [-middleWidth / 2, 0, height], [middleWidth / 2, 0, height], [middleWidth / 2, 0, 0]]
              basePoint: [0, 0, height / 2]
              layer: '0'
              zIndex: 20
              symbolWidth: -1
              symbolHeight: -1
              properties: 
                - type: 'number'
                  name: distance1
                  value: 1000 * EQH
                - type: 'number'
                  name: distance2
                  value: 1000 * EQH
                - type: 'number'
                  name: distance3
                  value: 1000 * EQH
                - type: 'number'
                  name: distance4
                  value: 1000 * EQH
                - type: 'number'
                  name: distance5
                  value: 1000 * EQH
                - type: 'number'
                  name: distance6
                  value: 1000 * EQH
                - type: 'number'
                  name: distance7
                  value: 1000 * middleStyleWidth
            - conditions:
                - middleStyleWidth > 1.8
              modelName: '正立面'
              isInConstructionDrawing: true
              symbolName: '恒大2000标客餐厅背景墙图块:SFBJQ_02_F'
              rotation: 0
              boundary: [[-middleWidth / 2, 0, 0], [-middleWidth / 2, 0, height], [middleWidth / 2, 0, height], [middleWidth / 2, 0, 0]]
              basePoint: [0, 0, height / 2]
              layer: '0'
              zIndex: 20
              symbolWidth: -1
              symbolHeight: -1
              properties: 
                - type: 'number'
                  name: distance1
                  value: 1000 * EQH
                - type: 'number'
                  name: distance2
                  value: 1000 * EQH
                - type: 'number'
                  name: distance3
                  value: 1000 * EQH
                - type: 'number'
                  name: distance4
                  value: 1000 * EQH
                - type: 'number'
                  name: distance5
                  value: 1000 * EQH
                - type: 'number'
                  name: distance6
                  value: 1000 * EQH
                - type: 'number'
                  name: distance7
                  value: 1000 * EQV
                - type: 'number'
                  name: distance8
                  value: 1000 * RS
                - type: 'number'
                  name: distance9
                  value: 1000 * EQV
            # 两侧
            - conditions:
                - onlyMiddle == false
              modelName: '正立面'
              isInConstructionDrawing: true
              symbolName: '恒大2000标客餐厅背景墙图块:DSBJQCB_01_F'
              rotation: 0
              boundary: [[-width / 2, 0, 0], [-width / 2, 0, height], [-width / 2 + sideWidth, 0, height], [-width / 2 + sideWidth, 0, 0]]
              basePoint: [-width / 2 + sideWidth / 2, 0, height / 2]
              layer: '0'
              zIndex: 20
              symbolWidth: -1
              symbolHeight: -1
              properties: 
                - type: 'number'
                  name: distance1
                  value: 1000 * height
                - type: 'number'
                  name: distance2
                  value: 1000 * sideWidth
      
            # 两侧
            - conditions:
                - onlyMiddle == false
              modelName: '正立面'
              isInConstructionDrawing: true
              symbolName: '恒大2000标客餐厅背景墙图块:DSBJQCB_01_F'
              rotation: 0
              boundary: [[width / 2, 0, 0], [width / 2, 0, height], [width / 2 - sideWidth, 0, height], [width / 2 - sideWidth, 0, 0]]
              basePoint: [width / 2 - sideWidth / 2, 0, height / 2]
              layer: '0'
              zIndex: 20
              symbolWidth: -1
              symbolHeight: -1
              properties: 
                - type: 'number'
                  name: distance1
                  value: 1000 * height
                - type: 'number'
                  name: distance2
                  value: 1000 * sideWidth
        
    `,
    // test popup2
    popName: '测试标题',
    popupGrps: [
      {
        title: '横向三列嵌套group',
        cols: 3,
        items: [
          {
            id: 'child1_img',
            compType: 'image',
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532077123959&di=becc4a29e7bb484d282ba24fc797fe3e&imgtype=0&src=http%3A%2F%2Fimage5.suning.cn%2Fuimg%2Fb2c%2Fnewcatentries%2F0070114441-000000000166061759_1_800x800.jpg'
          },
          {
            id: 'child2_group',
            cols: 1,
            items: [
              {
                id: 'cd_input1',
                title: '高度',
                value: 1,
                valueType: ValueType.LENGTH
              },
              {
                id: 'cd_input1',
                title: '墙面面积',
                value: 1,
                valueType: ValueType.AREA,
                compType: CompType.LABEL
              }
            ]
          },
          {
            id: 'child3_img',
            compType: CompType.IMAGE,
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532077123959&di=becc4a29e7bb484d282ba24fc797fe3e&imgtype=0&src=http%3A%2F%2Fimage5.suning.cn%2Fuimg%2Fb2c%2Fnewcatentries%2F0070114441-000000000166061759_1_800x800.jpg'
          }

        ]
      },
      {
        title: '横向两列group',
        cols: 2,
        items: [
          {
            id: 'cdd_input1',
            title: '高度',
            value: 1,
            valueType: ValueType.LENGTH
          },
          {
            id: 'cdd_input2',
            title: '墙面面积',
            value: 1,
            valueType: ValueType.AREA,
            compType: CompType.LABEL
          },
          {
            id: 'cdd_input3',
            title: '立面面积',
            value: 1,
            valueType: ValueType.AREA,
            compType: CompType.LABEL
          }
        ]
      },
      {
        title: '普通单列group',
        cols: 1,
        items: [
          {
            id: 'cdd_drop1',
            title: '高度',
            compType: CompType.DROPLIST,
            value: 1,
            valueType: ValueType.LENGTH,
            options: [
              {
                value: 1
              },
              {
                value: 2
              }
            ]
          },
          {
            id: 'cdd_sw1',
            title: '计算面积',
            value: true,
            valueType: ValueType.BOOL,
            compType: CompType.SWITCH
          }
        ]
      },
      {
        id: 'cdd_mat',
        name: '材质名称不知道啊',
        compType: CompType.MATERIAL,
        value: '',
        options: []
      },
      {
        id: 'cdd_btn',
        title: '确认应用',
        label: '确认',
        compType: CompType.BUTTON
      }
    ],
  };
  private initComponentsTimeout;
  private console: Console;
  private view2d: View2D;
  private view3d: View3D;
  private curXContent: XContent;
  private viewObject2d: ViewObject2D; // 2d elements
  private viewObject3d: ViewObject3D; // 3d view object

  render() {
    return (
      <Layout className="xcontent-root">
        <Header
          style={{ height: 48, lineHeight: '48px' }}
          onKeyDown={this.stopPropagation}
          onKeyUp={this.stopPropagation}
        >
          <TopBar />
        </Header>
        <Layout>
          <Sider
            className="xcontent-catalog-sider"
            width={240}
            collapsible={true}
            collapsedWidth={0}
            breakpoint="xl"
            onCollapse={() => setTimeout(this.resize.bind(this), 210)}
            onKeyDown={this.stopPropagation}
            onKeyUp={this.stopPropagation}
          >
            <Catalog />
          </Sider>

          <Content className="xcontent-content">
            <Layout>
              <View3D ref={(view3d: View3D) => this.view3d = view3d} />
              <View2D ref={(view2d: View2D) => this.view2d = view2d} />
            </Layout>
            <Layout
              onKeyDown={this.stopPropagation}
              onKeyUp={this.stopPropagation}
              style={{position: 'relative'}}
            >
              <Popup
                title={this.state.popName}
                items={this.state.popupGrps}
                onChange={(v, id) => this.popValChg(v, id)}
                onClick={(id, props) => this.popClick(id, props)}
              />
              <Console ref={(console: Console) => this.console = console} />
              <Material/>
            </Layout>
          </Content>
          <Sider
            className="xcontent-editor-sider"
            width={640}
            collapsible={true}
            collapsedWidth={24}
            defaultCollapsed={true}
            reverseArrow={true}
            onCollapse={() => setTimeout(this.resize.bind(this), 210)}
            onKeyDown={this.stopPropagation}
            onKeyUp={this.stopPropagation}
          >
            <Editor
              value={this.props.yamlState.yamlCode}
              onChange={Utils.debounce(this.codeChange.bind(this), 500) as (a: any, b: any , code: string) => void}
            />
          </Sider>
        </Layout>
      </Layout>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    setTimeout(() => {
      this.parseWall();
      this.parseCode();
      this.initComponents(this.state.ymlCode);
    });
  }

  public updateItems() {
    if (!this.curXContent) {
      return;
    }

    if (this.viewObject2d) {
      this.view2d.removeView(this.viewObject2d);
    }

    this.viewObject2d = Utils.item2ds2ViewObject(this.curXContent, this.updateItems.bind(this));
    this.view2d.addView(this.viewObject2d);

    if (this.viewObject3d) {
      this.view3d.removeView(this.viewObject3d);
    }
    this.viewObject3d = Utils.item3ds2ViewObject(this.curXContent.get3DItems());
    this.view3d.addView(this.viewObject3d);
  }

  private async parseWall() {
    try {
      const wall = new (createCombinedModelClass(lWall))();
      wall.setPosition({
        x: 1, y: 1, z: 0
      });
      await wall.parse();
      const view = Utils.item2ds2ViewObject(wall);
      delete view.getOutline;
      this.view2d.addView(view);
      this.view3d.addView(Utils.item3ds2ViewObject(wall.get3DItems()));
      Utils.wall2Qsnap(wall).forEach(s => {
        snap.addPoint({
          ID: '1',
          point: s,
          trapType: 1
        });
      });
    } catch (e) {
      if (e.name === 'YAMLException') {
        this.console.info(`${e.name}: ${e.message}`);
      } else {
        console.log(e);
      }
    }
  }

  private initComponents(code: string) {
      let currentProducts: Product[] = [];
      if (code !== '') {
          let jobj = jsyaml.load(code);
          if (jobj.components && jobj.components.length > 0) {
              currentProducts = convertComponentsToProducts( jobj.components );
          }
      }

      this.props.initComponents(code, currentProducts);
  }

    private codeChange(a: any, b: any , code: string) {
        clearTimeout(this.initComponentsTimeout);
        this.initComponentsTimeout = setTimeout(() => {
            this.initComponents(code);
        }, 800) ;
        this.setState({ ymlCode: code }, this.parseCode.bind(this));
    }

  private async parseCode() {
    this.console.info(); // clear the console
    try {
      this.curXContent = new (createCombinedModelClass(this.state.ymlCode))();
      await this.parseItems();
    } catch (e) {
      if (e.name === 'YAMLException') {
        this.console.info(`${e.name}: ${e.message}`);
      } else {
        // console.log(e);
      }
    }
  }

  private updatePopup() {
    this.setState({
      popName: this.curXContent.getName(),
      popupGrps: Utils.popup2Groups(this.curXContent.getPopupConfig(), this.parseItems.bind(this))
    });
    this.console.info('update Popup');

  }

  private popValChg(value: V | V[], id: string): { success: boolean, errorMsg: string } {
    console.log(`pop val chg>>${id},new val is ${value}`);
    return {success: true, errorMsg: ''};
  }

  private popClick(id: string, props?: KV) {
    console.log('pop click');
    if (props) {
      console.log('popup props:', props);
    }
  }

  private async parseItems() {
    if (!this.curXContent) {
      return;
    }

    await this.curXContent.parse();

    this.updateItems();
    this.updatePopup();
  }

  private resize = () => {
    if (this.view2d) {
      this.view2d.resize();
    }
    if (this.view3d) {
      this.view3d.resize();
    }
  }

  private stopPropagation(event: React.KeyboardEvent<HTMLElement>) {
    event.stopPropagation();
  }
}

const  mapStateToProps = state => {
    return {
        yamlState: state.yamlState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initComponents: (yamlCode, currentProducts) => {
            dispatch(initComponents(yamlCode, currentProducts));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);