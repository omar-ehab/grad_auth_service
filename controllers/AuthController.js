const createError = require('http-errors')
const { authSchema } = require('../helpers/validation_schema')
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helpers/jwt_helper');



const login = async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        const user = null; //get user
        if (!user) throw createError.NotFound('These credentials do not match our records.')
  
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch)
          throw createError.Unauthorized('These credentials do not match our records.')
  
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.json({access_token: accessToken, refresh_token: refreshToken, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE})
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('These credentials do not match our records.'));
      }
      next(error)
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        client.DEL(userId, (err, val) => {
          if (err) {
            console.log(err.message)
            throw createError.InternalServerError();
          }
          console.log(val);
          res.sendStatus(204);
        })
      } catch (error) {
        next(error)
      }
    
}

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
  
        const access_token = await signAccessToken(userId);
        const refresh_token = await signRefreshToken(userId);
        res.json({access_token, refresh_token, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE})
      } catch (error) {
        next(error)
      }
}


module.exports = {
    login,
    logout,
    refresh
 }