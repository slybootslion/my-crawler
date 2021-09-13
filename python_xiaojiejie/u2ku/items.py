# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class U2KuItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class U2KuLinkSingleItem(scrapy.Item):
    title = scrapy.Field()
    images = scrapy.Field()
    count = scrapy.Field()
    url = scrapy.Field()
