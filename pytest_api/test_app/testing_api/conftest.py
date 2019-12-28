import pytest
import requests
import os
from .test_test_session import TestClassHasSessionMessage


fileDir = os.path.dirname(os.path.realpath('__file__'))
base_url = 'http://localhost:8081/api'


@pytest.fixture(scope='session')
def supply_base_url():
    """ Supplying  """
    return base_url


@pytest.fixture(scope='module')
def setup_and_teardown():
    """ Run before and after """
    # run before all test
    yield
    print("\nRunning teardown")
    comf = os.path.join(fileDir, 'tmp//tmp_company.txt')
    userf = os.path.join(fileDir, 'tmp//tmp_user.txt')
    clean_up(comf, '/companies/')
    clean_up(userf, '/users/')


def clean_up(filename, url):
    with open(filename, "r") as f:
        obj_id = f.readline()
        url_req = url + obj_id
        clean_up_request(url_req)


def clean_up_request(url):
    """ Delete request to server to clean up """
    url_req = base_url + url
    headers = {'Content-Type': 'application/json'}
    requests.delete(url_req, headers=headers)

@pytest.fixture(scope='session')
def set_message_to_session(request):
    session = request.node
    print('---------------------------------')
    print(dir(request.config.option))
    print('---------------------------------')

    def say_hello(self): # self is TestClassHasSessionMessage
        return 'Hello ' + self.name

    for item in session.items:
        cls = item.getparent(pytest.Class)
        print('\n----------------------')
        if cls.cls is TestClassHasSessionMessage:
            cls.cls.isCool = False
        cls.cls.name = 'Hey'
        cls.cls.say_hello = say_hello

