const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    passsword: { type: String, required: true,unique:true },
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // // collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
    return  next();
}
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
console.log('Password hashed',this.password);
next();
});

module.exports = mongoose.model('User', userSchema);