const { findByCep, insertNewAddress } = require('../models/CepModel.js');

const treatedCepToSearch = (cep) => {
  return cep.replace('-', '');
}

const treatedCepToReturn = (cep) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

const getDataByCep = async (cep) => {
  const data = await findByCep(treatedCepToSearch(cep));

  if (data) {
    return {
      status: 200,
      data: {
        ...data[0],
        cep: treatedCepToReturn(data[0].cep)
      }
    }
  }

  throw new Error('CEP não encontrado');
}

const addNewAddress = async (cep, logradouro, bairro, localidade, uf) => {
  const cepAlreadyExists = await findByCep(treatedCepToSearch(cep));

  if (cepAlreadyExists[0]) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'CEP já existente',
      }
    };
  };

  const newAddress = await insertNewAddress(treatedCepToSearch(cep), logradouro, bairro, localidade, uf);
  return newAddress;
}

module.exports = {
  getDataByCep,
  addNewAddress,
}
