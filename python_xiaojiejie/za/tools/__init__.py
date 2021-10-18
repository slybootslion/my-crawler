import imghdr
import json
import os


def chunk_download(url, title, path):
    import requests
    r = requests.get(url, stream=True)
    if r.content:
        img_type = imghdr.what('', r.content)
        with open('{}\\{}.{}'.format(path, title, img_type), 'wb') as f:
            for chunk in r.iter_content(chunk_size=32):
                f.write(chunk)


def write_album_list_file(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(data, indent=4, ensure_ascii=False))


def write_data_to_json_file(path, result, base_img_path):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(json.dumps(result, indent=4, ensure_ascii=False))

    for group in result:
        # https://blog.csdn.net/qq_34504481/article/details/79716106
        os.makedirs(base_img_path + '\\' + group['title'], exist_ok=True)
        # 遍历，下载图片
        for idx, image in enumerate(group['images']):
            chunk_download(image['url'], image['title'], base_img_path + '\\' + group['title'])
            print(idx + 1, group['title'], image['title'])


def luohua_single_method(response, url_link, path, base_img_path, result=[]):
    meta = {
        'title': response.css('.article-title::text').extract()[-1],
        'url': response.url,
        'images': [],
    }
    pictures = response.css('#gallery-1 .size-thumbnail')
    if not response.css('#gallery-1'):
        pictures = response.css('#gallery-2 .size-thumbnail')
    for picture in pictures:
        origin_url = picture.css('::attr(src)').extract_first('')
        url = 'https:' + origin_url.replace('-285x180', '')
        title = (origin_url.split('/')[-1]).split('.')[0][:-8]
        image = {
            'url': url,
            'title': title
        }
        meta['images'].append(image)

    meta['count'] = len(meta['images'])

    result.append(meta)
    if len(result) >= len(url_link):
        write_data_to_json_file(path=path, result=result, base_img_path=base_img_path)

        print('----------------------加载完成:{}--------------------------'.format(len(url_link)))
