import sqlite3

DB_PATH = "../db/medical_db.db"

con = sqlite3.connect(DB_PATH)

cur = con.cursor()

for row in cur.execute('SELECT * FROM data'):
    print(row)