const Joi = require('joi');

const validateCepLength = (cep) => {
  return cep.length === 9;
}

const validateCepFormat = (cep) => {
  const cepRegex = /\d{5}-\d{3}/;
  return cepRegex.test(cep)
}

const validateCep = (req, res, next) => {
  const cep = req.body.cep ? req.body.cep : req.params.cep;

  if (!validateCepLength(cep) || !validateCepFormat(cep)) {
    return res.status(400).json({ error: { code: 'invalidData', message: 'CEP inválido' } });
  }

  next();
}

const validatePostRequest = (req, res, next) => {
  const { error } = Joi.object({
    cep: Joi.string().not().empty().required(),
    logradouro: Joi.string().not().empty().required(),
    bairro: Joi.string().not().empty().required(),
    localidade: Joi.string().not().empty().required(),
    uf: Joi.string().not().empty().required(),
  }).validate(req.body)

  if (error) return next(error);

  next();
}

const treatPostError = (err, _req, res, _next) => {
  res.status(400).json({ code: 'invalidData', message: err.message });
}


module.exports = {
  validateCep,
  validatePostRequest,
  treatPostError,
};
