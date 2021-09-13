import json
import os

import scrapy


# https://www.u2ku.com/qitajigou/page_41.html


class U2kuSingleSpider(scrapy.Spider):
    name = 'u2ku_single'
    allowed_domains = ['www.u2ku.com']
    start_urls = ['https://www.u2ku.com/']
    url_link = [
        'https://www.u2ku.com/21863.html',
        'https://www.u2ku.com/21867.html',
        'https://www.u2ku.com/21860.html',
        'https://www.u2ku.com/22604.html',
        'https://www.u2ku.com/22624.html',
        'https://www.u2ku.com/22635.html',
        'https://www.u2ku.com/22626.html',
    ]
    result = []
    path = os.path.join(os.path.dirname(__file__), '..\\db\\xxx.json')
    # path = 'D:\\Code\\Git\\awesome-server\\restful-json\\public\\x.json'

    def start_requests(self):
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
        }
        for url in self.url_link:
            yield scrapy.Request(url, headers=headers, callback=self.parse)

    def parse(self, response):
        # page_buttons = response.css('.nav-links')
        # btns = page_buttons.css('a.page-numbers')[1:-1]
        # next_page = []
        # for btn in btns:
        #     next_page.append(btn.css('::attr(href)').extract_first())
        meta = {
            'title': response.meta.get('title', ''),
            'images': response.meta.get('images', []),
            'count': response.meta.get('count', 0),
            'url': response.meta.get('url', '')
        }
        if meta['count'] == 0:
            count_ele = response.css('.post_title_topimg::text').extract_first('')[1:-2]
            meta['count'] = int(count_ele)
        if not meta['url']:
            meta['url'] = response.url
        if not meta['title']:
            meta['title'] = response.css('.item_title h1::text').extract_first('')

        pic_list = response.css('.image_div img')
        for pic in pic_list:
            image = {
                'url': pic.css('::attr(src)').extract_first(''),
                'title': pic.css('::attr(alt)').extract_first('')
            }
            meta['images'].append(image)

        if len(meta['images']) < meta['count']:
            next_link = response.css('.nav-links .prev::attr(href)').extract_first('')
            yield scrapy.Request(url=next_link,
                                 meta=meta,
                                 callback=self.parse)
        else:
            self.result.append(meta)
            if len(self.result) == len(self.url_link):
                with open(self.path, 'w', encoding='utf-8') as f:
                    f.write(json.dumps(self.result, indent=4, ensure_ascii=False))
                    print('----------------------加载完成:{}--------------------------'.format(len(self.url_link)))
