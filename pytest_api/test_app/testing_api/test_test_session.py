import pytest


@pytest.mark.usefixtures('set_message_to_session')
class TestClassHasSessionMessage(object):
    def __str__(self):
        return 'My class shit'
    @property
    def isCool(self):
        return True
    def test_session_has_message(self):
        assert self.name == 'Hey'
        assert self.isCool == False
        assert self.say_hello() == 'Hello ' + self.name
