import os

import scrapy

from za.tools import luohua_single_method, write_album_list_file

'''
class LuohuaxiuAlbumSpider(scrapy.Spider):
    name = 'luohuaxiu_album'
    allowed_domains = ['luohuaxiu.com' 
    start_urls = ['https://luohuaxiu.com/']

    origin_url = 'https://luohuaxiu.com/archives/category/wanghong-cos/yinjinningning'
    albums_list = []
    path = os.path.join(os.path.dirname(__file__), '..\\db\\album_list.json')

    # base_img_path = os.path.join(os.path.dirname(__file__), '..\\images')

    def start_requests(self):
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
        }
        yield scrapy.Request(self.origin_url, headers=headers, callback=self.parse)

    def parse(self, response):
        albums = response.css('.post.grid')
        for album in albums:
            album_a = album.css('h3 a')
            # album_title = (album_a('::text').extract())[-1]
            album_link = album_a.css('::attr(href)').extract_first('')
            self.albums_list.append(album_link)

        write_album_list_file(path=self.path, data=self.albums_list)
'''


class LuohuaxiuAlbumSpider(scrapy.Spider):
    name = 'luohuaxiu_album'
    allowed_domains = ['luohuaxiu.com']
    start_urls = ['https://luohuaxiu.com/']

    origin_url = []
    albums_list = []
    path = os.path.join(os.path.dirname(__file__), '../db/_xxx.json')
    base_img_path = os.path.join(os.path.dirname(__file__), '..\\images')

    def start_requests(self):
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
        }
        for url in self.origin_url:
            yield scrapy.Request(url, headers=headers, callback=self.parse)

    def parse(self, response):
        albums = response.css('.post.grid')
        for album in albums:
            album_a = album.css('h3 a')
            # album_title = (album_a('::text').extract())[-1]
            album_link = album_a.css('::attr(href)').extract_first('')
            self.albums_list.append(album_link)

        next_el = response.css('.next-page a')
        if next_el:
            next_link = next_el.css('::attr(href)').extract_first('')
            if next_link:
                yield scrapy.Request(url=next_link,
                                     callback=self.parse)
        else:
            for link in self.albums_list:
                yield scrapy.Request(url=link, callback=self.detail)

    def detail(self, response):
        luohua_single_method(response=response, path=self.path, base_img_path=self.base_img_path,
                             url_link=self.albums_list)
