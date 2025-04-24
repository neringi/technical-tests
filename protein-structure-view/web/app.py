import os
import json
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

# def load_gene_pdb_dict(json_file):
#     # Load JSON dictionary one level up from the current file
#     parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
#     json_path = os.path.join(parent_dir, json_file)
#     with open(json_path, 'r') as f:
#         return json.load(f)


# Database connection settings 
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

def connect_to_db():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def fetch_gene_pdb_data(gene_name):
    """Fetches PDB IDs for the given gene name from the database."""
    conn = connect_to_db()
    if conn is None:
        return None

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT pdb_ids FROM gene_pdb_id WHERE gene_name = %s;", (gene_name,))
            result = cur.fetchone()
            return result['pdb_ids'] if result else None
    except Exception as e:
        print(f"Error querying database: {e}")
        return None
    finally:
        conn.close()


# Route for the search page
@app.route('/', methods=['GET', 'POST'])
def search():
    # gene_pdb_dict = load_gene_pdb_dict('gene_pdb_dict.json')
    gene_info = None  # Initialize to None
    
    if request.method == 'POST':
        gene_name = request.form['gene_name']
        gene_name_upper = gene_name.upper()
        # pdb_ids = gene_pdb_dict.get(gene_name_upper, None)
        pdb_ids = fetch_gene_pdb_data(gene_name_upper)

        if pdb_ids:
            # Return the search results and allow the user to click to view
            gene_info = {'gene': gene_name_upper, 'pdb_ids': pdb_ids}
        else:
            # If no PDB IDs found, display an error message
            return f"No PDB IDs found for gene: {gene_name_upper}", 404
    
    return render_template('search.html', gene_info=gene_info)

# Route to serve the PDB file and display it using Mol*
@app.route('/view_pdb/<gene_name>/<pdb_id>')
def view_pdb(gene_name, pdb_id):
    # Check if the PDB file exists in the `pdb` directory
    pdb_file_path = os.path.join('pdb', f'{pdb_id}.pdb')
    if not os.path.exists(pdb_file_path):
        return f'PDB file {pdb_id} not found.', 404
    return render_template('view_pdb2.html', gene_name=gene_name, pdb_id=pdb_id, pdb_file=f'/pdb/{pdb_id}.pdb')

# Route to serve the PDB files from the `pdb` directory
@app.route('/pdb/<path:filename>', methods=['GET'])
def serve_pdb(filename):
    pdb_file_path = os.path.join('pdb', filename)
    print(pdb_file_path)
    print(f"Serving file from: {pdb_file_path}")  # Debugging line
    if not os.path.exists(pdb_file_path):
        print(f"File not found: {pdb_file_path}")  # Debugging line
        return f'PDB file {filename} not found.', 404
    return send_from_directory('pdb', filename)

if __name__ == '__main__':
    app.run(debug=True)
