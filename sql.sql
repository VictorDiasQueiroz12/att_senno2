create table autores(
id serial primary key,
nome varchar(150)
);

create table livros(
id serial primary key,
titulo varchar(150) not null,
autor_id int not null references autores(id)
);

insert into autores(nome) values
('Senno Amado'),
('Senno Odiado'),
('Senno Respeitado'),
('Senno Maluco'),
('Senno Normal');

insert into livros(titulo, autor_id) values
('As cronicas de Senno', 1),
('Senno no Pais da Maravilha', 3),
('O inferno de Senno', 2),
('Senno Maluco Beleza', 5),
('Senno e sua jornada', 4);

select * from livros;