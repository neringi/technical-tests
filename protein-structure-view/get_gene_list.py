import os

# Path to the directory containing the gene files
directory_path = 'data'

print(os.listdir(directory_path))
# Get a list of all .txt files in the directory
file_names = [f[:-4] for f in os.listdir(directory_path) if f.endswith('.txt')]

# Create and write the list of file names to a new text file
with open('gene_file_list.txt', 'w') as output_file:
    for file_name in file_names:
        output_file.write(f"{file_name}\n")

print("File list created successfully!")
