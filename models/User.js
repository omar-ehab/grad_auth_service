const axios = require('axios');
const bcrypt = require('bcrypt');

const STUDENT_OPTIONS = {
    hostname: process.env.STUDENT_HOST,
    port: process.env.STUDENT_PORT,
    path: '/find',
}

const TEACHER_OPTIONS = {
    hostname: process.env.TEACHER_HOST,
    port: process.env.TEACHER_PORT,
    path: '/find',
}

const find_student = async (email) => {
    try {
        return await axios.get(`${STUDENT_OPTIONS.hostname}:${STUDENT_OPTIONS.port}${STUDENT_OPTIONS.path}`,{
            params: {
                email: email
            }
        });
    }catch (err) {
        console.error(err.message);
    }
}

const find_teacher = async (email) => {
    try {
        return await axios.get(`${TEACHER_OPTIONS.hostname}:${TEACHER_OPTIONS.port}${TEACHER_OPTIONS.path}`,{
            params: {
                email: email
            }
        });
    }catch (err) {
        console.error(err.message);
    }
}

const isValidPassword = async (user, password) => {
    try {
        return await bcrypt.compare(password, user.password)
    } catch (err) {
        throw err
    }
}

module.exports = {
    find_student,
    find_teacher,
    isValidPassword
}

