export const badRequest = (message: string) => ({
  code: 400,
  status: "Bad Request",
  message
});