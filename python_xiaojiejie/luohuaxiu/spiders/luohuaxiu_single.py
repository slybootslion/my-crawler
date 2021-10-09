import os

import scrapy

from za.tools import write_data_to_json_file, luohua_single_method


class LuohuaxiuSingleSpider(scrapy.Spider):
    name = 'luohuaxiu_single'
    allowed_domains = ['luohuaxiu.com']
    start_urls = ['https://luohuaxiu.com/']
    url_link = []
    result = []
    path = os.path.join(os.path.dirname(__file__), '../db/xxx.json')
    base_img_path = os.path.join(os.path.dirname(__file__), '..\\images')

    def start_requests(self):
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
        }
        for url in self.url_link:
            yield scrapy.Request(url, headers=headers, callback=self.parse)

    def parse(self, response):
        luohua_single_method(response=response, path=self.path, base_img_path=self.base_img_path,
                             url_link=self.url_link)
