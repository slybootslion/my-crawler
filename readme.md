<img class="banner-pic" src="http://oss.slybootslion.com/blog/Konachan.com - 313616 anthropomorphism azur_lane belfast_(azur_lane) blue_eyes breasts cleavage formidable_(azur_lane) logo long_hair miyase_mahiro red_eyes white_hair.jpg?x-oss-process=image/auto-orient,1/quality,q_80/watermark,text_c2x5Ym9vdHNsaW9u,color_ffffff,size_40,shadow_70,t_74,x_10,y_10"/>

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
