import json
import os
from time import sleep

import requests
import scrapy

from picture_work.utils.tools import bcy_json_str2dict


# 标注过喜欢的全部下载完之后，运行这个可以将喜欢清空
class BcyDislikeSpider(scrapy.Spider):
    name = 'bcydislike'
    user_id = '0000000'  # 这里填对应的用户id
    dislike_url = 'https://bcy.net/apiv3/item/unlike'
    base_url = 'https://bcy.net/u/{}/like'.format(user_id)
    json_url = 'https://bcy.net/apiv3/user/favor'
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"
    }
    cookies = {}

    def start_requests(self):
        # cookie文件 在浏览器里登录把cookie复制到cookies.txt文件中
        f = open(os.path.abspath('picture_work/file/cookies.txt'), 'r')
        for line in f.read().split(';'):
            name, value = line.strip().split('=', 1)
            self.cookies[name] = value
        yield scrapy.Request(cookies=self.cookies,
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
            'ptype': 'like',  # collect 收藏 like 喜欢
            'mid': self.user_id,
            'since': first_page_last_since,
            'size': '1000',
        }
        while True:
            data = requests.get(url=self.json_url,
                                params=params,
                                cookies=self.cookies,
                                verify=False).json().get('data').get('list')
            if not len(data):
                break
            for item in data:
                likes_ids.append(item.get('item_detail').get('item_id'))
            params['since'] = data[-1].get('since')

        print(len(likes_ids))

        for item_id in likes_ids:
            sleep(1)
            meta = {'item_id': item_id}
            url = 'https://bcy.net/item/detail/{}'.format(item_id)
            yield scrapy.Request(url=url, callback=self.dislike_method, dont_filter=True, meta=meta)

    def dislike_method(self, response):
        item_id = response.meta.get('item_id')
        cookies = response.headers.getlist('set-cookie')
        for cookie in cookies:
            cookie_list = bytes.decode(cookie).split(';')
            for item in cookie_list:
                key_val = item.split('=')
                if len(key_val) > 1:
                    key = key_val[0].strip()
                    val = key_val[1].strip()
                    self.cookies[key] = val
        _csrf_token = bytes.decode(response.headers.getlist('set-cookie')[1]).split(';')[0].split('=')[1]
        data = {
            'item_id': item_id,
            '_csrf_token': _csrf_token,
        }
        print(data)
        res = requests.post(url=self.dislike_url,
                            data=data,
                            headers=self.headers,
                            cookies=self.cookies)
        print(res.text)  # 返回的code是0就是成功
