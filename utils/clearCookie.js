const clearCookie = (request, response) => {
  response.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: request.secure || request.headers["x-forwarded-proto"] === "https",
  });
};

export default clearCookie;
