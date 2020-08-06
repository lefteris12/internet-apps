import pandas as pd 
import psycopg2 

df = pd.read_excel('db/dedomena_aktwn_kolymvhshs_2015.xls',
        usecols=[0, 3, 4, 5, 16, 17],
        skiprows=[1])
df.rename(columns=lambda x: x.split(',')[0], inplace=True)
df2 = pd.read_excel('db/dedomena_aktwn_kolymvhshs_2015.xls',
        sheet_name=1,
        usecols=[0,4])

conn = psycopg2.connect(
    host="localhost",
    database="internet-apps",
    user="postgres",
    password="postgres")

cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS beaches")
conn.commit()

cur.execute('''
CREATE TABLE IF NOT EXISTS beaches (
        bwid CHAR(16),
        name VARCHAR(100),
        name_gr VARCHAR(254),
        description VARCHAR(254),
        lon NUMERIC(16,6),
        lat NUMERIC(16,6),
        category INT
        )
''')

for index, row in df.iterrows():
    query = "INSERT INTO beaches VALUES (%s, %s, %s, %s, %s, %s)" 
    cur.execute(query, row.tolist())

for index, row in df2.iterrows():
    query = "UPDATE beaches SET category = %s WHERE bwid = %s" 
    cur.execute(query, (row['Class'], row['BWID']))

conn.commit()

cur.close()
conn.close()
