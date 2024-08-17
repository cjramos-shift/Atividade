CREATE PROC FI_SP_AltCliente
    @NOME          VARCHAR (50) ,
    @CPF           VARCHAR (11)  ,
	@Id           BIGINT
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		NOME = @NOME, 
		CPF = @CEP 
	WHERE Id = @Id
END