const createError = require('http-errors');
const User = require('../models/User');
const { authSchema } = require('../helpers/validation_schema');
const client = require('../helpers/init_redis');
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helpers/jwt_helper');



const student_login = async (req, res, next) => {
    try {
        let user;
        const result = await authSchema.validateAsync(req.body);
        const response = await User.find_student(result.email);
        if(response.data.success){
            user = response.data.user
        } else{
            user = null;
        }
        if (!user) {
            throw createError.NotFound('These credentials do not match our records.')
        }
  
        const isMatch = await User.isValidPassword(user, result.password)
        if (!isMatch) {
          throw createError.Unauthorized('These credentials do not match our records.')
        }
  
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id, 'student')

        res.json({access_token: accessToken, refresh_token: refreshToken, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE})
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('These credentials do not match our records.'));
      }
      next(error)
    }
}

const teacher_login = async (req, res, next) => {
    try {
        let user;
        const result = await authSchema.validateAsync(req.body);
        const response = await User.find_teacher(result.email);
        if(response.data.success){
            user = response.data.user
        } else{
            user = null;
        }
        if (!user) {
            throw createError.NotFound('These credentials do not match our records.')
        }

        const isMatch = await User.isValidPassword(user, result.password)
        if (!isMatch) {
            throw createError.Unauthorized('These credentials do not match our records.')
        }

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id, 'teacher')

        res.json({access_token: accessToken, refresh_token: refreshToken, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE})
    } catch (error) {
        if (error.isJoi === true) {
            return next(createError.BadRequest('These credentials do not match our records.'));
        }
        next(error)
    }
}

const student_logout = async (req, res, next) => {
    try {
        const userId = req.payload.aud;

        client.DEL(`${userId}_student_refresh`, (err, val) => {
          if (err) {
            throw createError.InternalServerError();
          }
          res.json({ success: true, message: "logout successfully"});
        });
      } catch (error) {
        next(error)
    }
}

const teacher_logout = async (req, res, next) => {
    try {
        const userId = req.payload.aud;

        client.DEL(`${userId}_teacher_refresh`, (err, val) => {
            if (err) {
                throw createError.InternalServerError();
            }
            res.json({ success: true, message: "logout successfully"});
        });
    } catch (error) {
        next(error)
    }
}

const student_refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken, 'student')
  
        const access_token = await signAccessToken(userId);
        const refresh_token = await signRefreshToken(userId, 'student');
        res.json({access_token, refresh_token, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE});
      } catch (error) {
        next(error)
      }
}

const teacher_refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken, 'teacher')

        const access_token = await signAccessToken(userId);
        const refresh_token = await signRefreshToken(userId, 'teacher');
        res.json({access_token, refresh_token, type: "Bearer", expiresIn: process.env.ACCESS_TOKEN_LIFE});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    student_login,
    teacher_login,
    student_logout,
    teacher_logout,
    student_refresh,
    teacher_refresh,
}