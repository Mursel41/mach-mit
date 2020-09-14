const bcrypt = require('bcrypt');

exports.encrypt = async (payload) => {
  if (!payload) return null;
  const saltRound = 12;
  const hash = await bcrypt.hash(payload, saltRound);
  return hash;
};

exports.check = async (clear, hash) => {
  return await bcrypt.compare(clear, hash);
};
