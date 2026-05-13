<<<<<<< HEAD
# criando o database de filmes 
create database db_filmes_20261_a;

# indicando que vai usar 
use db_filmes_20261_a;

# criando a tabela de filmes 
create table tbl_filme(
# complementos dentro da tabela
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    duracao time not null,
    sinopse text not null,
    avaliacao decimal(3,2) default null,
    valor decimal (5,2) not null default 0,
    capa varchar(255)
);

create table tbl_sexo(
# complementos dentro da tabela
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    sigla varchar(4) not null
);

delete from tbl_filme where id = 1

desc tbl_filme;
# mostrar tabela
show tables;

select * from tbl_filme;

update tbl_filme set 
		nome = 'filme2',
        data_lancamento = '2008-01=01',
        duracao = '02:00',
        sinopse = 'testando o update',
        avaliacao = '2',
        valor = '15',
        capa = 'teste'
			where id = 1;



=======
# criando o banco de dados que armazenará as informações dos filmes
create database db_filmes_20261_a;

# selecionando o banco de dados para uso
use db_filmes_20261_a;

# =========================
# TABELA PRINCIPAL
# =========================

# criando a tabela principal de filmes
create table tbl_filme(
    # id único do filme, gerado automaticamente
	id int not null primary key auto_increment,
    
    # nome do filme (obrigatório)
    nome varchar(80) not null,
    
    # data de lançamento do filme (obrigatória)
    data_lancamento date not null,
    
    # duração do filme (obrigatória)
    duracao time not null,
    
    # sinopse do filme (obrigatória)
    sinopse text not null,
    
    # avaliação do filme (opcional, até 3 dígitos sendo 2 decimais)
    avaliacao decimal(3,2) default null,
    
    # valor do filme (obrigatório, padrão 0)
    valor decimal (5,2) not null default 0,
    
    # caminho ou nome da imagem de capa (opcional)
    capa varchar(255)
);

# =========================
# TABELAS DE APOIO (DOMÍNIOS)
# =========================

# tabela para armazenar gêneros de filmes (ação, comédia, etc.)
create table tbl_genero(
    # id único
	id int not null primary key auto_increment,
    
    # nome do gênero (obrigatório)
    nome varchar(80) not null
);

# tabela para armazenar classificação indicativa (ex: +18, livre, etc.)
create table tbl_classificacao(
    # id único
	id int not null primary key auto_increment,
    
    # tipo de classificação (obrigatório)
    classe varchar(80) not null
);

# tabela para armazenar nacionalidades
create table tbl_nacionalidade(
    # id único
	id int not null primary key auto_increment,
    
    # nome da nacionalidade (obrigatório)
    nome varchar(80) not null
);

# tabela para armazenar sexo (ex: masculino, feminino, etc.)
create table tbl_sexo(
    # id único
	id int not null primary key auto_increment,
    
    # nome do sexo (obrigatório)
    nome varchar(80) not null,
    
    # sigla do sexo (obrigatória)
    sigla varchar(4) not null
);

# =========================
# TABELAS RELACIONADAS A PESSOAS
# =========================

# tabela para armazenar atividades (ex: ator, diretor, etc.)
create table tbl_atividade(
    # id único
	id int not null primary key auto_increment,
    
    # nome da atividade (obrigatório)
    atividade varchar(80) not null
);

# tabela para armazenar personagens
create table tbl_personagem(
    # id único
	id int not null primary key auto_increment,
    
    # nome do personagem (obrigatório)
    nome varchar(80) not null
);
>>>>>>> ffe0990 (teste)
