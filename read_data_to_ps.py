import os
import psycopg2
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

def extract_sections(file_content):
    """Extract sections from the text content."""
    sections = {
        'overview': '',
        'structure': '',
        'function': '',
        'significance': '',
        'interactions': '',
        'refs': ''
    }

    current_section = None

    # Split the content line by line and process each line
    for line in file_content.splitlines():
        line = line.strip()
        
        if line.startswith("## Overview"):
            current_section = 'overview'
        elif line.startswith("## Structure"):
            current_section = 'structure'
        elif line.startswith("## Function"):
            current_section = 'function'
        elif line.startswith("## Clinical Significance"):
            current_section = 'significance'
        elif line.startswith("## Interactions"):
            current_section = 'interactions'
        elif line.startswith("## References"):
            current_section = 'refs'
        elif current_section:
            # Append the line to the current section
            sections[current_section] += line + ' '
    
    return sections

def insert_data(conn, gene_id, sections):
    """Insert data into the PostgreSQL table."""
    query = """
    INSERT INTO genes.gene_names (gene_id, overview, gene_structure, gene_function, significance, interactions, refs)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (gene_id) DO NOTHING;
    """
    try:
        with conn.cursor() as cur:
            cur.execute(query, (
                gene_id,
                sections['overview'],
                sections['structure'],
                sections['function'],
                sections['significance'],
                sections['interactions'],
                sections['refs']
            ))
        conn.commit()
        print(f"Inserted data for gene ID: {gene_id}")
    except Exception as e:
        print(f"Error inserting data: {e}")
        conn.rollback()

def process_files():
    """Read files from the 'data' folder and process each."""
    conn = connect_to_db()
    if not conn:
        return
    print('Connection successful!')
    folder_path = 'data'
    
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            gene_id = filename.split('.')[0]  # Use the filename (without extension) as gene_id

            with open(file_path, 'r') as file:
                file_content = file.read()
                sections = extract_sections(file_content)
                insert_data(conn, gene_id, sections)

    conn.close()

if __name__ == '__main__':
    process_files()
