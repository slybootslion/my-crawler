<img class="banner-pic" src="http://oss.slybootslion.com/blog/Konachan.com - 313616 anthropomorphism azur_lane belfast_(azur_lane) blue_eyes breasts cleavage formidable_(azur_lane) logo long_hair miyase_mahiro red_eyes white_hair.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

### 必读

首先这是一个春节假期无聊随便写着玩的东西，没有想过要长期维护更新，代码写的挺low的。

可能用的人也是为了下bcy的图，还是要强调一下，**不要滥用！不要滥用！不要滥用！** 如果bcy更改了大图地址，大家都用不了。

**吐槽：早知道要布到线上，我就应该用python写。**


**--- 2021-03-20 更新在线地址 ---**

[在线地址](http://n1.sketchmac.com/)

**注意：尽量布本地环境来用，我的服务器是个弱鸡，随时可能崩。**


更新：

布到到了线上环境，所以将selenium调整成了静默模式，同时更新了Linux的selenium驱动。

删掉了之前随意写的无用注释，不过也没人看吧。

**--- 2021-03-05 更新使用方法 ---**

因为这个后端是基于Koa2的，并且爬取的方式是selenium来控制浏览器，所以确保自己的电脑上有node环境，以及安装了chrome浏览器。

git完之后，分别去两个文件夹里安装依赖，就是说你得开两个命令行工具
```bash
cd crawler-client-vue3
npm i
```

```bash
cd node-crawler-koa
npm i
```

然后分别运行前后端
```bash
cd crawler-client-vue3
npm run serve
```

```bash
cd node-crawler-koa
npm run serve
```

然后访问前端页面：`http://localhost:39003/`

如果看到之前介绍演示的图片就对了。

（下面这段作废）~~在安装完依赖之后，如果你不想开两个命令行窗口，并且可以忍受打包的速度，还可以这样操作：~~
```bash
## cd node-crawler-koa
## sh build.sh
```
~~这个脚本会自动打包前端项目，将打包后的文件夹转移到后端项目中，并启动项目。
这个时候浏览器输入的端口是后端端口：http://localhost:39004/~~ 

其他的一些说明：
（现在改成静默模式了，不会弹出浏览器）~~因为要控制录制的gif的图片大小，所以录制的动图里有一些细节没有出现。这个是基于selenium的，一个比较low的爬虫，会自动打开一个chrome浏览器窗口，并访问页面。在所有资源没有处理完之前，不要手动关闭这个打开的窗口，处理完之后窗口会自动关闭。~~

chrome会组织批量下载，所以如果下载图片时只下了一张，看看页面是不是有批量下载允许的弹窗，点允许。

因为当时就是随便写写的，一开始的设想也不是要操作浏览器，是想要上线到服务器环境的，所以前后端分开写了，不过后来发现没必要，只靠前端就可以做到**（更正：只靠前端也是需要下载浏览器驱动的，如果要发布到线上，还是需要后端）**。后端部分显得比较多余，不过已经写了就懒得改（也没时间），所以就这样吧。

目前来看，这些网站资源转换都还比较正常，但是不保证之后这些网站做出调整这个工具还能正常使用。

最后，强调一下：**下载要有节制，身体更加要紧**。


**--- 一开始的readme ---**

最近在总结一些所谓的“技术文章”，主要来自掘金、知乎和微信公众号，总结整理到自己的笔记blog上，忽然感觉手动的复制粘贴太麻烦了，所以给自己写了这样一个工具，可以快速的把相中的文章生成markdown的内容，提升“剽窃”的效率。

展示一下：

提交一个链接，直接转成markdown文本：
<img class="banner-pic" src="http://oss.slybootslion.com/blog/给自己写了一个工具01.gif"/>

复制到编辑器里就是这个样子：
<img class="banner-pic" src="http://oss.slybootslion.com/blog/给自己写了一个工具02.gif"/>

因为录制GIF图太麻烦了，而且生成文件太大，所以可能显示不全，其实主要还是利用selenium来实现浏览器操作，对页面元素进行抓取，然后利用sitdown这个第三方库将html文本转成markdown的格式。

简单的讲：一个简陋且单一的爬虫 → html文本转markdown

转成的markdown，可以点击下来，前端直接生成本地markdown文件，原理很简单，利用Blob将内容转为下载文件。

还有一个功能，是从bcy上批量下载高清无水印大图。比如这样：

<img class="banner-pic" src="http://oss.slybootslion.com/blog/给自己写了一个工具03.gif"/>

是不是很棒？

如果是a链接直接模拟点击会在浏览器中打开，download属性是同源情况下才会起作用，所以为了实现直接下载而不是浏览器打开这些图片，可以通过发送请求，将资源下载到本地。
