import os.path
import glob
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "db")
TABLE_NAME = "data"


def get_databases():
    databases = [os.path.basename(path) for path in glob.glob(DB_PATH + "/*.db")]
    return databases

def get_column_names(db_name):
    con = sqlite3.connect(DB_PATH + f"/{db_name}", check_same_thread=False)
    cursor = con.execute(f"SELECT * FROM {TABLE_NAME}")
    names = list(map(lambda x: x[0], cursor.description))
    return names[1:]


def get_count_of_attr(db_name, attr_name):
    con = sqlite3.connect(DB_PATH + f"/{db_name}", check_same_thread=False)
    cursor = con.execute(f"SELECT {attr_name}, COUNT({attr_name}) FROM {TABLE_NAME} GROUP BY {attr_name}")
    res = dict()
    for k,v in cursor.fetchall():
        res[k] = v

    return res


def get_attr_values_from_name(db_name, attr_name):
    con = sqlite3.connect(DB_PATH + f"/{db_name}", check_same_thread=False)
    cursor = con.execute(f"SELECT DISTINCT {attr_name} FROM {TABLE_NAME}")
    res = []
    for tup in cursor.fetchall():
        res.append(tup[0])

    return res


def get_count_of_attr_w_condition(db_name, attr1_name, attr1_val, attr2_name):
    con = sqlite3.connect(DB_PATH + f"/{db_name}", check_same_thread=False)
    cursor = con.execute(f"SELECT {attr2_name}, COUNT({attr2_name}) FROM {TABLE_NAME} WHERE {attr1_name} = '{attr1_val}' GROUP BY {attr2_name}")
    res = dict()

    for k,v in cursor.fetchall():
        res[k] = v

    return res
