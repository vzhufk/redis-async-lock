const Saved = require("saved");
const uuidv1 = require("uuid/v1");

module.exports = redisClient =>
  new Proxy(
    {},
    {
      get: (it, key) => it[key],
      set: (it, key, value) => {
        if (Array.isArray(value)) {
          value = Saved.Array(redisClient, uuidv1());
        }

        it[key] = value;
      }
    }
  );
