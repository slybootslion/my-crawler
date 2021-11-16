import json

from bs4 import BeautifulSoup


def bcy_json_str2dict(txt):
    soup = BeautifulSoup(txt, 'html.parser')
    scr_str = soup.select('#app')[0].next_sibling
    json_str = scr_str.string.split('__ssr_data = JSON.parse(')[-1].split('window._UID_')[0].strip()[1:-3].replace(
        '\\"', '"').replace('\\\\', '\\')
    d = json.loads(json_str)
    return d
