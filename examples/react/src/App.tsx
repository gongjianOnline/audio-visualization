import React, { useEffect, useState } from 'react'

import './App.css'
import "audio-visualization-pro"
import audioAssets from "./assets/audio.mp3"

const App:React.FC<any> = ()=>{

  useEffect(()=>{
    createVisualization()
  })

  let AVP:any = null;
  /**初始化实例 */
  const createVisualization = ()=>{
    AVP = new (window as any).AudioVisualizationPro({
      url:audioAssets,
      loop:false
    })
  };
  /**播放&暂停 */
  const audioPlay = (type:number)=>{
    if(type){
      // currentTime . audiostate
      AVP.play(({frequency}:any)=>{
        createEcharts([...Array.from(frequency).reverse(), ...frequency])
      })
    }else{
      AVP.suspend()
    }
  };
  /*销毁实例*/
  const destruction = ()=>{
    if(AVP){
      AVP.destroy();
      AVP = null;
      var myChart = (window as any).echarts.init(document.getElementById('echartsContainer'));
      myChart.clear ()
      createVisualization()
    }
  };
  /**实例化Echarts */
  const createEcharts = (data:any)=>{
    const option = {
      animation:false,
      xAxis: {
        type: "category",
        axisTick:{show:false},
        axisLabel:{show:false}
      },
      grid:{
        bottom:"15%",
        left:0,
        right:0,
        top:0
      },
      yAxis: {show:false},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data,
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#04BE02'
          },
          areaStyle: {
            color: new (window as any).echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#04BE02'
            }, {
              offset: 1,
              color: 'rgba(255, 255, 255,0)'
            }])
          },
        }
      ],
    };
    var myChart = (window as any).echarts.init(document.getElementById('echartsContainer'));
    myChart.setOption(option);
  };


  return (
    <div className="app">
      <div className="titleContainer">音频可视化</div>
      <div className="echartsContainer" id="echartsContainer"></div>
      <div className="controllerContainer">
        <div onClick={()=>audioPlay(1)}>播放</div>
        <div onClick={()=>audioPlay(0)}>暂停</div>
        <div onClick={()=>destruction()}>销毁实例重新创建</div>
      </div>
    </div>
  )
}

export default App
