import requests

base_url = 'https://f.sketchmac.com'


def get_url_list():
    ret = requests.get(base_url + '/u2ku_single')
    print('-----------------')
    print(ret)
    return ret
