import os.path
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "db/medical_db.db")
TABLE_NAME = "data"

con = sqlite3.connect(DB_PATH, check_same_thread=False)


def get_column_names():
    cursor = con.execute(f"SELECT * FROM {TABLE_NAME}")
    names = list(map(lambda x: x[0], cursor.description))
    return names[1:]


def get_count_of_attr(attr_name):
    cursor = con.execute(f"SELECT {attr_name}, COUNT({attr_name}) FROM {TABLE_NAME} GROUP BY {attr_name}")
    res = dict()
    for k,v in cursor.fetchall():
        res[k] = v

    return res


def get_attr_values_from_name(attr_name):
    cursor = con.execute(f"SELECT DISTINCT {attr_name} FROM {TABLE_NAME}")
    res = []
    for tup in cursor.fetchall():
        res.append(tup[0])

    return res


def get_count_of_attr_w_condition(attr1_name, attr1_val, attr2_name):
    cursor = con.execute(f"SELECT {attr2_name}, COUNT({attr2_name}) FROM {TABLE_NAME} WHERE {attr1_name} = '{attr1_val}' GROUP BY {attr2_name}")
    res = dict()

    for k,v in cursor.fetchall():
        res[k] = v

    return res
