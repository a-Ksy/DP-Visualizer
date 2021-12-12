from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import json

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

class Hello(Resource):
    def __init__(self):
        self.message = "Hello"

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, help="Missing 'name' field")
        args = parser.parse_args()

        return f"{self.message} {args['name']}", 200



api.add_resource(Hello, '/login')


if __name__ == '__main__':
    app.run(debug=True)
