echo '打包'
npm run build

echo '删除旧项目'
rm -rf ../node-crawler-koa/dist

echo '移动文件夹'
mv ./dist ../node-crawler-koa/dist

echo '运行服务器'
cd ../node-crawler-koa
npm run serve
