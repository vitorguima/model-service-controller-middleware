const connection = require('./connection');

const findByCep = async (cep) => {
  const [data] = await connection.execute(
    'SELECT * FROM cep_lookup.ceps WHERE CEP=?', [cep],
  );

  return data;
}

const insertNewAddress = async (cep, logradouro, bairro, localidade, uf) => {
  await connection.execute(
    'INSERT INTO cep_lookup.ceps VALUES (?, ?, ?, ?, ?)',
    [cep, logradouro, bairro, localidade, uf],
  );

  return {
    cep,
    logradouro,
    bairro,
    localidade,
    uf,
  };
}

module.exports = {
  findByCep,
  insertNewAddress,
}