export function getData(req, res, next) {
  req.data = [{ foo: "bar" }];

  next();
}
