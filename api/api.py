from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import dp.dp as dp

app = Flask(__name__)
api = Api(app)
CORS(app, origins="*")

class GetDatabases(Resource):
    def __init__(self):
        self.databases = dp.get_databases()

    def get(self):
        return self.databases, 200

class GetColumns(Resource):
    def __init__(self):
        self.databases = dp.get_databases()
    
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('db_name', type=str, help="Missing 'db_name' field")
        args = parser.parse_args()

        if args['db_name'] not in self.databases:
            return f"Database {args['db_name']} is not found", 404

        columns = dp.get_column_names(args['db_name'])
        return columns, 200


class GetCountOfAttribute(Resource):
    def __init__(self):
        self.databases = dp.get_databases()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('db_name', type=str, help="Missing 'db_name' field")
        parser.add_argument('attr', type=str, help="Missing 'attr' field")
        args = parser.parse_args()

        if args['db_name'] not in self.databases:
            return f"Database {args['db_name']} is not found", 404

        columns = dp.get_column_names(args['db_name'])

        if args['attr'] not in columns:
            return f"Attribute {args['attr']} is not found", 404


        result = dp.get_noisy_count_of_attr(args['db_name'], args['attr'])

        return result, 200


class GetColumnValues(Resource):
    def __init__(self):
        self.databases = dp.get_databases()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('db_name', type=str, help="Missing 'db_name' field")
        parser.add_argument('attr', type=str, help="Missing 'attr' field")
        args = parser.parse_args()

        if args['db_name'] not in self.databases:
            return f"Database {args['db_name']} is not found", 404
            
        columns = dp.get_column_names(args['db_name'])

        if args['attr'] not in columns:
            return f"Attribute {args['attr']} is not found", 404

        result = dp.get_column_values(args['db_name'], args['attr'])

        return result, 200


class GetCountOfAttributeWithCondition(Resource):
    def __init__(self):
        self.databases = dp.get_databases()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('db_name', type=str, help="Missing 'db_name' field")
        parser.add_argument('attr1', type=str, help="Missing 'attr1' field")
        parser.add_argument('attr1_val', type=str, help="Missing 'attr1_val' field")
        parser.add_argument('attr2', type=str, help="Missing 'attr2' field")
        args = parser.parse_args()

        if args['db_name'] not in self.databases:
            return f"Database {args['db_name']} is not found", 404

        columns = dp.get_column_names(args['db_name'])

        if args['attr1'] not in columns or args['attr2'] not in columns:
            return f"Attribute {args['attr1']} or {args['attr2']} is not found", 404

        result = dp.get_noisy_count_of_attr_w_condition(args['db_name'], args['attr1'], args['attr1_val'], args['attr2'])

        return result, 200

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


api.add_resource(GetDatabases, '/databases')
api.add_resource(GetColumns, '/columns')
api.add_resource(GetCountOfAttribute, '/count')
api.add_resource(GetColumnValues, '/columnValues')
api.add_resource(GetCountOfAttributeWithCondition, '/countWithCondition')


if __name__ == '__main__':
    app.run(debug=True)
