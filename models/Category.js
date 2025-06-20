const mongoose = require('mongoose');

const slugify = require('slugify')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        // required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('save', function(next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Category', categorySchema);
