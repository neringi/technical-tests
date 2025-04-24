import requests
import json

# Uses gene_file_list.txt to create a list of gene names 
def read_gene_names_from_file(file_path):
    with open(file_path, 'r') as file:
        gene_names = [line.strip() for line in file.readlines()]
    return gene_names

# Uses UNIPROT to get a deduplicated list of PDB IDs based on gene name
def get_pdb_ids_from_uniprot(gene_name):
    # Corrected URL format for searching gene names in UniProt (via query parameter)
    url = f'https://rest.uniprot.org/uniprotkb/stream?query=gene:{gene_name}'

    # Send request to UniProt API
    response = requests.get(url)
    
    # print('response', response)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()
        pdb_ids = []

        for entry in data.get('results', []):
        # Look through the 'features' for PDB evidence
            for feature in entry.get('features', []):
                if 'evidences' in feature:
                    for evidence in feature['evidences']:
                        if evidence.get('source') == 'PDB':  # Check if the source is PDB
                            pdb_ids.append(evidence.get('id'))  # Add the PDB ID
            
        pdb_ids = list(set(pdb_ids)) # deduplicate PDB ID list
        return pdb_ids
    else:
        print(f'Error fetching data from UniProt for {gene_name}. Status code: {response.status_code}')
        return []

# Main function to process the gene
def process_gene(gene_name):
    pdb_ids = get_pdb_ids_from_uniprot(gene_name)
    
    print(pdb_ids)
    if pdb_ids:
        print(f'Gene {gene_name} has PDB IDs: {", ".join(pdb_ids)}')
    else:
        print(f'No PDB IDs found for gene {gene_name}.')


def create_gene_pdb_dict(gene_names):
    gene_pdb_dict = {}
    for gene_name in gene_names:
        pdb_ids = get_pdb_ids_from_uniprot(gene_name)
        gene_pdb_dict[gene_name] = pdb_ids
    return gene_pdb_dict

def save_to_json(data, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage
if __name__ == '__main__':
    gene_name = 'C1QA'  # test with a known gene C1QA should return ['5HBA', '5HKJ', '2JG9', '2WNV']
    process_gene(gene_name)

    file_path = 'gene_file_list.txt'  
    gene_names = read_gene_names_from_file(file_path)
    print('Gene list: ', gene_names)

    trunc_gene_names = gene_names[:10]

    print(trunc_gene_names) 

    gene_pdb_dict = create_gene_pdb_dict(trunc_gene_names)
    print('Dictionary: ', gene_pdb_dict)

    output_file = 'gene_pdb_dict.json'
    save_to_json(gene_pdb_dict, output_file)
    print(f'Gene PDB dictionary saved to {output_file}')