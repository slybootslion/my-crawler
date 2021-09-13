# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import os

from u2ku.items import U2KuLinkSingleItem


class U2KuPipeline:
    def process_item(self, item, spider):
        return item


class U2KuSinglePipeline(object):
    def __init__(self):
        path = os.path.join(os.path.dirname(__file__), 'db\\uuu.json')
        self.file = open(path, 'wb')
        self.exporter = U2KuLinkSingleItem(self.file, encoding='utf-8', ensure_ascii=False)
        self.exporter.start_exporting()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def spider_close(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
