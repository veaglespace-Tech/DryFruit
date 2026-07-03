const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.errors[0].message,
      errors: result.error.errors,
    });
  }
  next();
};

module.exports = { validateBody };
