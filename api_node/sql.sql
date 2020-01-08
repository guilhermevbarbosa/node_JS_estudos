create database api_pag;

use api_pag;

create table pagamentos (
	id int(11) not null auto_increment primary key,
    forma_de_pagamento varchar(255) not null,
    valor decimal(10,2) not null,
    moeda varchar(3) not null,
    descricao text,
    status varchar(255) not null,
    data date
);