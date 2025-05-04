import {model, Schema} from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter course title'],
        minLength: [8, 'Course title must be at least 8 characters long'],
        maxLength: [59, 'Course title must not exceed 60 characters'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter course Description'],
        minLength: [8, 'Course Description must be at least 8 characters long'],
        maxLength: [200, 'Course Description must not exceed 200 characters'],
    },
    category: {
        type: String,
        required: [true, 'Please enter course category'],
    },
    thumbnail:{
        public_id: {
            type: String,
            required: true 
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    lectures: [
        {
            title: String,
            descriptiion: String,
            lecture: {
                public_id: {
                    type: String,
                    required: true
                },
                secure_url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0
    },
    createdBy:{
        type: String,
        required: true
    },
    
},{
    timestamps: true
});

const Course = model('Course', courseSchema);

export default Course;