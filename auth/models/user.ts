import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sanitizedConfig from '../utils/config'

const UserSchema: mongoose.Schema = new mongoose.Schema({
 name: { type: String, unique: true },
 password: { type: String },
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this.password);
    
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ name: this.name }, sanitizedConfig.JWT_SECRET, { expiresIn: sanitizedConfig.JWT_LIFETIME })
}

UserSchema.methods.checkPassword = async function (candidatePassword: any) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export const User =  mongoose.model('User', UserSchema);