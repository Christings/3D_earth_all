## 1.worldFlights
### 所用框架：philogl
### 位置：examples\worldFlights
### philogl (https://github.com/senchalabs/philogl) 官方项目下的一个demo，把全球飞行航线在3d地球上表示出来。
## 2.airline_china
### 所用框架：philogl
### 一位博主基于philogl官方项目的demo改写而成，把全球的飞行路线改为了中国飞行路线(参照:examples\worldFlights)
## 3.3dmap
### 所用框架：echart-x
### 利用echart-x制作的3d地球，其数据是把根据经纬度的高低来对国家进行分类（高、中、低）
## 4.echarts-gl
### echarts-gl官方项目，我使用npm拉取代码后，依然运行有问题，显示不清楚，所以弃用，可能还是我自己哪里有问题，但是没找出来。
## 5.echarts3D-globe
### 所用框架：echarts-gl
### 一位童鞋（不好意思，等我有时间把你的gith补上，么么哒）利用echarts-gl而制作的3d地球，模拟的是网络攻击的数据，但我发现依然使用的是飞行航线的数据，所以这个数据究竟能否反应网络攻击有待证实。
## 6.earth
### 所用框架：echarts-gl
### 基于echarts3D-globe重写了一个适合自己需要的精简的地球
## 7.earth-x
### 所用框架：echarts-x
### 基于3dmap重写了一个适合自身需要的最终地球。
## 8.earth-x-other
### 所用框架：echarts-x
### 7写的地球一直有个问题，那就是myChart is not defind,直接用球没什么影响，但是放把球装进一个function里面，然后调用function时这个bug又来了导致无法刷新，所以echart-x-other换了一种引入方式，解决了这个问题。