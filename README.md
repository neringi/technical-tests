# protein-structure-viewe
A web application for storing, searching, and visualizing protein structure data. This project includes a pipeline to import protein data and PDB structures. Users can search by gene name to view details and interact with 3D visualizations.


## Overview

Wiki data for genes not included (/data/{gene_name}.txt where gene_name is the official gene symbol approved by the HGNC, which is typically a short form of the gene name.)

* get_gene_list.py - creates gene_file_list.txt from /data/*.txt 
* gene_file_list.txt - list of gene names
* get_pbd_id_uniprot.py - using UNIPROT API and gene_file_list.txt fetches corresponding PBD IDs 
* gene_pdb_dict.json - dictionary where each gene name corresponds to a list of PBD IDs
* download_pdb.py - uses gene_pdb_dict.json and RCSB API to fetch .pbd files  - currently fetches only first .pbd file for each gene


/web contains a simple Flask app which has a search bar - searching a gene shows PBD IDs and allows to view the first one in Mol* (molstar)

## Relevant documentation

* Mol* (molstar) - https://molstar.org/docs/plugin/instance/
                  https://www.jsdelivr.com/package/npm/molstar
* Gene names - https://www.genenames.org/data/ 
    example for HRT3A: https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/5297
* RCSB API - https://files.rcsb.org/download/
* UNIPROT API - https://www.uniprot.org/help/api_queries
    example:  f'https://rest.uniprot.org/uniprotkb/stream?query=gene:{gene_name}'

## Screenshot of Mol* showing PDB ID '6W1Y'
![Capture2](https://github.com/user-attachments/assets/eb7611d3-5502-4553-bdd2-34ba5ee926b1)
![Capture3](https://github.com/user-attachments/assets/44b80d9a-ba1a-4db8-a3db-4e2c0cf192a5)
![Capture4](https://github.com/user-attachments/assets/6f27fa6b-7ff4-4067-b672-c03b1ecf60a9)
![Capture](https://github.com/user-attachments/assets/d4b00d6e-9086-4dd1-ae77-368f5438330f)
