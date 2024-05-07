# 音频可视化 audio-visualization-pro

## 简介

`audio-visualization-pro` 是针对 `audio-visualization`开源的强化版本,通过 `WEB-AUDIO-API` 实现的实现的音乐可视化的库，通过本库你可以获取到`当前音频`的音频频谱，并在原作者基础上强化了创建、暂停、销毁等实例方法并提供相应的 API 方法

## 方法

| 方法                                             | 注释                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| AudioVisualizationPro(url:string,loop:booler)    | 实例化API                                                    |
| setFftSzie(int)                                  | 音频振幅常用32、64、128、512（等倍数定义）                   |
| play(({frequency, currentTime, audiostate})=>{}) | 播放，包含回到函数 frequency 音频振幅数组 Array[number]、currentTime播放的进度、audiostate播放状态 1播放、0停止 |
| suspend()                                        | 暂停播放                                                     |
| destroy()                                        | 销毁当前实例，可重新创建新的音乐可视化实例                   |

## 示例

### vue2.0 

```vue

```

### vue3.0

```vue

```

### react

```tsx

```

## 效果

