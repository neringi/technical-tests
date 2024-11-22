import os
import psycopg2
import json
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Access the variables
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

def connect_to_db():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None
    
# Establish connection
conn = connect_to_db()
if conn is None:
    print("Failed to connect to the database. Exiting.")
    exit()

cur = conn.cursor()

# Ensure the table exists
cur.execute("""
CREATE TABLE IF NOT EXISTS genes.gene_pdb_id (
    gene_name VARCHAR PRIMARY KEY,
    pdb_ids TEXT[]
);
""")

# Load the JSON file
with open("gene_pdb_dict.json", "r") as f:
    gene_pdb_dict = json.load(f)

# Insert the data into the table
for gene, pdb_ids in gene_pdb_dict.items():
    try:
        cur.execute(
            "INSERT INTO genes.gene_pdb_id (gene_name, pdb_ids) VALUES (%s, %s) ON CONFLICT (gene_name) DO NOTHING;",
            (gene, pdb_ids)
        )
    except Exception as e:
        print(f"Error inserting data for gene {gene}: {e}")

# Commit the transaction and close the connection
conn.commit()
cur.close()
conn.close()

print("Data successfully inserted!")