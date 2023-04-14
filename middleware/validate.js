const validate = (schema) => (request, response, next) => {
  try {
    schema.parse({
      body: request.body,
      params: request.params,
      query: request.query,
    });
    next();
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.errors);
  }
};

export default validate;
