import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (request, response) => {
    try {
        const { username, password } = request.body

        const isUsed = await User.findOne({ username })

        if(isUsed) {
            return response.json({
                message: 'Имя пользователя уже занято'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })
        
        await newUser.save()

        response.json({
            newUser, message: 'Регистрация прошла успешно.'
        })

    } catch (error) {
        response.json({message: 'Ошибка при создании пользователя.'})
    }
}
// Login user
export const login = async (request, response) => {
    try {
        const { username, password } = request.body
        const user = await User.findOne({ username })

        if (!user) {
            return response.json({
                message: 'Такого пользователя не существует'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return response.json({
                message: 'Неверный пароль'
            })
        }
        
        const token = jwt.sign({
            id: user.id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'},
    )

    response.json({
        token,
        user,
        message: 'Вы вошли в аккаунт.',
    })

    } catch (error) {
        response.json({message: 'Ошибка при авторизации.'})
    }
}
// Get Me
export const getMe = async (request, response) => {
    try {
        
    } catch (error) {}
}