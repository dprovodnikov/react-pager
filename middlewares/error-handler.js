export default function(err, req, res, next) {

  const { status = 500, message = 'Internal server error' } = err;

  return res
    .status(status)
    .json({ message });

} 