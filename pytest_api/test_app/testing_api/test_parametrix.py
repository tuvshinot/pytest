import pytest


@pytest.fixture(scope='class')
def paratmer_test_fixture(request):
    def header_add(self, obj):
        return {
            'name' : obj['name'] + 'NONONO'
        }
    request.cls.header_add = header_add

@pytest.mark.usefixtures('paratmer_test_fixture')
class TestClass:
    def test_parameter(self, paratmer_test_fixture):
        obj = self.header_add({'name' : 'HAHA'})
        print(obj)
        assert 1
