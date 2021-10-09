from scrapy.cmdline import execute

import sys
import os

path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(path)

luohua_type = input('输入类型：1、 album， 3、single')
if not luohua_type:
    luohua_type = '3'

if luohua_type == '1':
    execute(['scrapy', 'crawl', 'luohuaxiu_album'])
elif luohua_type == '3':
    execute(['scrapy', 'crawl', 'luohuaxiu_single'])
print('输入有误')


