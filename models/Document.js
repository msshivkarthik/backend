const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Document || mongoose.model('Document', documentSchema);