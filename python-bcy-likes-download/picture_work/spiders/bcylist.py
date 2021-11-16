import os
from time import sleep

import requests
import scrapy

from picture_work.items import BcyPictureDownloadItem
from picture_work.utils.tools import bcy_json_str2dict


class BcylistSpider(scrapy.Spider):
    name = 'bcylist'
    user_id = '0000000'  # 这里填对应的用户id
    base_url = 'https://bcy.net/u/{}/like'.format(user_id)
    json_url = 'https://bcy.net/apiv3/user/favor'
    cookies = {}
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
    }

    def start_requests(self):
        # cookie文件 在浏览器里登录把cookie复制到cookies.txt文件中
        f = open(os.path.abspath('picture_work/file/cookies.txt'), 'r')
        for line in f.read().split(';'):
            name, value = line.strip().split('=', 1)
            self.cookies[name] = value
        yield scrapy.Request(cookies=self.cookies,
                             headers=self.headers,
                             url=self.base_url)

    def parse(self, response, **kwargs):
        txt = response.text
        d = bcy_json_str2dict(txt)
        likes_ids = []
        first_page_last_since = ''
        for item in d['page']['list']:
            likes_ids.append(item.get('item_detail').get('item_id'))
            first_page_last_since = item.get('since')

        params = {
            'uid': self.user_id,
            'ptype': 'like',
            'mid': self.user_id,
            'since': first_page_last_since,
            'size': '1000',
        }
        data = requests.get(url=self.json_url,
                            params=params,
                            cookies=self.cookies,
                            headers=self.headers,
                            verify=False).json().get('data').get('list')
        for item in data:
            likes_ids.append(item.get('item_detail').get('item_id'))

        for likes_id in likes_ids:
            sleep(1.5)  # 每个like停留一点时间，否则会被bcy的反爬拉黑。
            url = 'https://bcy.net/item/detail/{}'.format(likes_id)
            print(url)
            yield scrapy.Request(url=url, callback=self.pic_detail, dont_filter=True)

    def pic_detail(self, response):
        txt = response.body.decode(response.encoding)
        d = bcy_json_str2dict(txt)
        detail = d.get('detail')
        post_data = detail.get('post_data')
        uname = detail.get('detail_user').get('uname')
        item_id = post_data.get('item_id')
        images = []
        for pic_item in post_data.get('multi'):
            pic = {
                'type': pic_item.get('format'),
                'url': pic_item.get('original_path'),
            }
            pic['filename'] = pic['url'].split('/')[-1].split('~')[0]
            images.append(pic)
        folder_name = '{}_{}'.format(uname, item_id)
        item = BcyPictureDownloadItem(images=images, folder_name=folder_name)
        yield item
