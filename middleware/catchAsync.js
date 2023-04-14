const catchAsync = (controller) => (request, response, next) =>
  controller(request, response, next).catch(next);

export default catchAsync;
