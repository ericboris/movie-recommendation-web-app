import pytest
from flask_testing import TestCase
from app import create_app

class TestViews(TestCase):

    def create_app(self):
        app = create_app()
        app.config['TESTING'] = True
        return app

    def test_example_route(self):
        response = self.client.get('api/')
        print("HELLO TEST WORLD")
        self.assert200(response)

