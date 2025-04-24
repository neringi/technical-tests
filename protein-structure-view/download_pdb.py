import json
import os
import requests

# Function to download a PDB file by its PDB ID
def download_pdb(pdb_id, download_dir):
    url = f'https://files.rcsb.org/download/{pdb_id}.pdb'  # RCSB PDB URL format
    response = requests.get(url)

    # If the request is successful, save the file
    if response.status_code == 200:
        file_path = os.path.join(download_dir, f'{pdb_id}.pdb')
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print(f'{pdb_id}.pdb downloaded successfully.')
    else:
        print(f'Error downloading {pdb_id}: {response.status_code}')

# Function to load the gene PDB dictionary from JSON file
def load_gene_pdb_dict(json_file):
    with open(json_file, 'r') as f:
        return json.load(f)

# Function to download all PDB files from the dictionary
# def download_all_pdb_files(gene_pdb_dict, download_dir):
#     # Create the download directory if it doesn't exist
#     if not os.path.exists(download_dir):
#         os.makedirs(download_dir)

#     for gene, pdb_ids in gene_pdb_dict.items():
#         for pdb_id in pdb_ids:
#             download_pdb(pdb_id, download_dir)

# Function to download one PDB file per gene from the dictionary
def download_one_pdb_file_per_gene(gene_pdb_dict, download_dir):
    # Create the download directory if it doesn't exist
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)

    for gene, pdb_ids in gene_pdb_dict.items():
        if pdb_ids:  # If there are PDB IDs for the gene
            # Download only the first PDB ID for each gene
            download_pdb(pdb_ids[0], download_dir)

# Example usage
if __name__ == '__main__':
    json_file = 'gene_pdb_dict.json'  # Path to the JSON file with PDB IDs
    download_dir = 'pdb'  # Directory where PDB files will be saved

    # Load the gene PDB dictionary from the JSON file
    gene_pdb_dict = load_gene_pdb_dict(json_file)

    # Download all PDB files
    download_one_pdb_file_per_gene(gene_pdb_dict, download_dir)
