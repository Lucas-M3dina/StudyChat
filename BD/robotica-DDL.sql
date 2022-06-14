
USE ROBOTICA;
GO

CREATE TABLE TipoUsuario(
	idTipoUsuario INT PRIMARY KEY IDENTITY (1,1),
	titulo VARCHAR(40),
)

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY IDENTITY (1,1),
	idTipoUsuario INT FOREIGN KEY REFERENCES TipoUsuario(idTipoUsuario),
	email VARCHAR(100),
	senha VARCHAR(150),
)
GO

CREATE TABLE Serie(
	idSerie INT PRIMARY KEY IDENTITY (1,1),
	sala VARCHAR(50) NOT NULL,
);
GO

CREATE TABLE Questionario(
	idQuestionario INT PRIMARY KEY IDENTITY (1,1),
	idSerie INT FOREIGN KEY REFERENCES Serie(idSerie),
	materia VARCHAR(50) NOT NULL,
	assunto VARCHAR(50) NOT NULL,
);
GO

CREATE TABLE Questao(
	idQuestao INT PRIMARY KEY IDENTITY (1,1),
	idQuestionario INT FOREIGN KEY REFERENCES Questionario(idQuestionario),
	enunciado VARCHAR(800) NOT NULL,
	alternativaA VARCHAR(400) NOT NULL,
	alternativaB VARCHAR(400) NOT NULL,
	alternativaC VARCHAR(400) NOT NULL,
	alternativaD VARCHAR(400) NOT NULL,
	alternativaCorreta VARCHAR(3) NOT NULL,
);
GO



CREATE TABLE Professor(
	idProfessor INT PRIMARY KEY IDENTITY (1,1),
	idUsuario INT FOREIGN KEY REFERENCES Usuario(idUsuario),
	nome VARCHAR(80) NOT NULL,
	materia VARCHAR(50) NOT NULL,

);
GO

CREATE TABLE Estudante(
	idEstudante INT PRIMARY KEY IDENTITY (1,1),
	idUsuario INT FOREIGN KEY REFERENCES Usuario(idUsuario),
	idSerie INT FOREIGN KEY REFERENCES Serie(idSerie),
	nome VARCHAR(50) NOT NULL,

);
GO
