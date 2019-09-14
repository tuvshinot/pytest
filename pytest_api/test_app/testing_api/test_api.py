import pytest
import requests
import json
import os


def save_id_to_file(save_id, name):
    """ saving id to file to clean up next """
    cur_dir = os.path.dirname(os.path.realpath('__file__'))
    file_path = os.path.join(cur_dir, f'tmp//tmp_{name}.txt')
    with open(file_path, 'w') as f:
        f.write(save_id)


def test_company_create(supply_base_url, setup_and_teardown):
    """ Test creating single user """
    url = supply_base_url + '/company/create'

    data = json.dumps({
        "name": "test_real",
        "address": "test_address",
        "status": "true"
    })

    headers = {'Content-Type': 'application/json'}
    resp = requests.post(url, data=data, headers=headers)
    json_data = json.loads(resp.text)

    assert resp.status_code == 201, resp.text
    assert json_data['company']['name'] == 'test_real'
    save_id_to_file(json_data['company']['_id'], 'company')


def test_company_retrieve(supply_base_url, setup_and_teardown):
    """ Test that checks after creation retrieve """
    url = supply_base_url + '/companies'
    res = requests.get(url)
    json_data = json.loads(res.text)
    assert res.status_code == 200, res.text
    assert len(json_data['companies']) == 1, res.text


def test_create_user_token(supply_base_url, setup_and_teardown):
    """ Test user create and token """
    url = supply_base_url + '/users/signup'
    data = json.dumps({
        "name": "test_user_python",
        "email": "test_user_pythonnnnn@email.com",
        "address": "fucking city",
        "password": "123"
    })
    headers = {'Content-Type': 'application/json'}
    res = requests.post(url, data=data, headers=headers)
    json_data = json.loads(res.text)
    assert res.status_code == 200, res.text
    assert json_data['name'] == 'test_user_python', res.text
    assert json_data['token'] != '', res.text
    save_id_to_file(json_data['userId'], 'user')
