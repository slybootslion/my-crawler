from scrapy.cmdline import execute

import sys
import os

path = os.path.dirname(os.path.abspath(__file__))
sys.path.append(path)
# sys.path.append(os.path.abspath(__file__))
execute(['scrapy', 'crawl', 'u2ku_single'])
