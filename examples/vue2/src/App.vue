<template>
  <div id="app">
    <div class="titleContainer">音频可视化</div>
    <div class="echartsContainer" id="echartsContainer"></div>
    <!-- 控制器 -->
    <div class="controllerContainer">
      <div @click="audioPlay(1)">播放</div>
      <div @click="audioPlay(0)">暂停</div>
      <div @click="destruction()">销毁实例重新创建</div>
    </div>
  </div>
</template>

<script>
import "audio-visualization-pro"
export default {
  name: 'App',
  components: {
    
  },
  data(){
    return {
      AVP:null
    }
  },
  mounted(){
    this.createVisualization();
  },
  methods:{
    /**初始化实例 */
    createVisualization(){
      this.AVP = new window.AudioVisualizationPro({
        url:require("./assets/audio.mp3"),
        loop:false
      })
    },
    /**播放&暂停 */
    audioPlay(type){
      if(type){
        // currentTime . audiostate
        this.AVP.play(({frequency})=>{
          this.createEcharts([...Array.from(frequency).reverse(), ...frequency])
        })
      }else{
        this.AVP.suspend()
      }
    },
    /*销毁实例*/
    destruction(){
      if(this.AVP){
        this.AVP.destroy();
        this.AVP = null;
        var myChart = window.echarts.init(document.getElementById('echartsContainer'));
        myChart.clear ()
        this.createVisualization()
      }
    },
    /**实例化Echarts */
    createEcharts(data){
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
							color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#04BE02'
							}, {
								offset: 1,
								color: 'rgba(255, 255, 255,0)'
							}])
						},
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };
      var myChart = window.echarts.init(document.getElementById('echartsContainer'));
      myChart.setOption(option);
    }


  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.echartsContainer{
  width: 100vw;
  height: 100vh;
}
.controllerContainer{
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.controllerContainer > div {
  margin-left: 10px;
  padding: 4px  25px;
  border: 1px solid rgb(33, 127, 255);
  border-radius: 10px;
  cursor: pointer;
}
.titleContainer{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
