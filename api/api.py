from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import dp.dp as dp

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


class GetCountOfAttribute(Resource):
    def __init__(self):
        self.columns = dp.get_column_names()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('attr', type=str, help="Missing 'attr' field")
        args = parser.parse_args()

        if args['attr'] not in self.columns:
            return f"Attribute {args['attr']} is not found", 404

        result = dp.get_noisy_count_of_attr(args['attr'])

        return result, 200


class GetCountOfAttributeWithCondition(Resource):
    def __init__(self):
        self.columns = dp.get_column_names()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('attr1', type=str, help="Missing 'attr1' field")
        parser.add_argument('attr1_val', type=str, help="Missing 'attr1_val' field")
        parser.add_argument('attr2', type=str, help="Missing 'attr2' field")
        args = parser.parse_args()

        if args['attr1'] not in self.columns or args['attr2'] not in self.columns:
            return f"Attribute {args['attr1']} or {args['attr2']} is not found", 404

        result = dp.get_noisy_count_w_condition(args['attr1'], args['attr1_val'], args['attr2'])

        return result, 200


api.add_resource(GetCountOfAttribute, '/getCount')
api.add_resource(GetCountOfAttributeWithCondition, '/getCountWithCondition')


if __name__ == '__main__':
    app.run(debug=True)
