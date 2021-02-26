const UNPROCESSABLE_ENTITY = 422;
const idLength = 24;

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== idLength) return res.status(UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });

  next();
};

module.exports = validateId;
