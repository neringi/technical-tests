create schema if not exists genes;

set search_path to genes;
drop table gene_names;

create table genes.gene_names (
gene_id char(10)
, overview text
, gene_structure text
, gene_function text
, significance text
, interactions text
, refs text
);


ALTER TABLE gene_names
ADD CONSTRAINT unique_gene_name UNIQUE (gene_id);

select * from gene_names;

-- delete from gene_names where gene_id = 'A1BG';
