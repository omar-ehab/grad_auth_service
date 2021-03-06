const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./init_redis');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.SECRET_KEY
      const options = {
        expiresIn: '1d',
        issuer: 'auth_service',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
          return
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message));
      }
      req.payload = payload
      next()
    })
  },
  signRefreshToken: (userId, type) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.REFRESH_KEY
      const options = {
        expiresIn: '14d',
        issuer: 'auth_service',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError())
        }

        client.SET(`${userId}_${type}_refresh`, token, 'EX', 14 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            reject(createError.InternalServerError())
            return
          }
          resolve(token)
        });
      })
    })
  },
  verifyRefreshToken: (refreshToken, type) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized())
          }
          const userId = payload.aud;
          client.GET(`${userId}_${type}_refresh`, (err, result) => {
            if (err) {
              reject(createError.InternalServerError());
              return
            }
            if (refreshToken === result) { 
              return resolve(userId);
            }
            reject(createError.Unauthorized());
          });
        }
      )
    });
  },
}