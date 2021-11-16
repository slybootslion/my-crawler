# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import os
import urllib.request
from time import strftime, localtime


class PictureDownloadPipeline:
    def __init__(self):
        b = os.getcwd()
        self.path = b + '/download/' + strftime('%Y-%m-%d', localtime())
        if not os.path.exists(self.path):
            os.makedirs(self.path)

    def process_item(self, item, spider):
        images = item.get('images')
        folder_name = item.get('folder_name')
        folder_path = self.path + '/' + folder_name
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        for img in images:
            filename = img.get('filename')
            url = img.get('url')
            img_path = folder_path + '/' + filename + '.' + img.get('type')

            opener = urllib.request.build_opener()
            opener.addheaders = [('User-Agent',
                                  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36' +
                                  '(KHTML, like Gecko) Chrome / 81.0.4044.9 Safari / 537.36')]
            urllib.request.install_opener(opener)
            urllib.request.urlretrieve(url, img_path)
            print(filename, '---', url)

        return item
