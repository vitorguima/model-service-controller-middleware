const express = require('express');

const router = express.Router();

const { validateCep, validatePostRequest, treatPostError } = require('../middlewares/cepMiddleware');

const { getDataByCep, addNewAddress } = require('../services/CepService');

router.get('/:cep', 
  validateCep,
  async (req, res) => {
    const { cep } = req.params;
    try {
      const data = await getDataByCep(cep);
      return res.status(data.status).json(data.data);
    } catch (error) {
      return res.status(404).json({ code: 'notFound', message: error.message });
    }
  }
)

router.post('/',
  validatePostRequest,
  treatPostError,
  validateCep,
  async (req, res, _next) => {
    const {
      cep,
      logradouro,
      bairro,
      localidade,
      uf,
    } = req.body;
    const newAddres = await addNewAddress(cep, logradouro, bairro, localidade, uf);
    
    if (newAddres.error) {
      return res.status(409).json(newAddres.error);
    }

    return res.status(201).json(newAddres);
  },
)

module.exports = router;
