# 基于ionic的混合APP实战

**要是觉得这个项目还不错，别忘记star哦**

技术分析，详见我的[博客](https://www.wty90.com/2018/01/16/ionic-app/)

线上地址：[点击这里](https://ionic.wty90.com)

## 一、工程目录分析

platforms是build之后生成的android和ios模拟器文件夹。

resources是app在手机上的图标和开机画面等适配图。

www是前端的工程目录，index.html是入口文件

**js文件夹**

* app.js是app的系统配置和负责tab路由切换；

* controllers.js是主要的逻辑模块

* services.js负责模块间通信的

templates文件夹放置了所有tab的模板，用了很多ionic提供的组件，开发很方便

## 二、项目运行

1. 克隆仓库到本地

2. 安装node包: npm install

3. 网页版效果: ionic serve

4. 添加平台: ionic cordova platform add android/ios

5. 编译：ionic cordova build android/ios

6. 模拟：ionic cordova emulate android/ios

## 注意
侧边栏页的登录信息，账号：wty，密码：123456。可以在www -> js -> controllers.js里面修改。
