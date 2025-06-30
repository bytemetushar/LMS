import Course from "../models/course.model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses = async (req, res, next) => {
    try{
        const courses = await Course.find({}).select('-lectures');

        res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        }); 
    }catch(e){
        return next(new AppError(e.message, 500));
    }
};

const getLecturesByCourseId = async (req, res, next) => {
    try{
        const {id} = req.params;

        const course = await Course.findById(id);
        res.status(200).json({
            success: true,
            message: `Lectures fetch successfully`,
            lectures: course.lectures
        });
    }catch(e){
        return next(new AppError(e.message, 400));
    }
};

const createCourse = async (req, res, next) => {
    const {title, description, category, createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(new AppError('Please enter all fields', 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail:{
            public_id:'dummy',
            secure_url: 'dummy'
        }
    });
    if(!course){
        return next(new AppError('Course not created, try again', 500));
    }

    if(req.file){
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms'
            });
            if(result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
    
            await fs.rm(`uploads/images/${req.file.filename}`); // remove file from uploads folder
        }catch(e){
            return next(new AppError(e.message, 500));
        }
    }

    await course.save();
    res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course
    });
};

const updateCourse = async (req, res, next) => {
    try{
        const {id} = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            { 
                $set: req.body
            },
            {
                runValidators: true
            }
        );
        if(!course){
            return next(new AppError('Course does not exists',500));
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course
        })

    }catch(e){
        return next(new AppError(e.message, 500));
    }
};

const deleteCourse = async (req, res, next) => {
    try{
        const {id} = req.params;

        const course = await Course.findByIdAndDelete(id);

        if(!course){
            return next(new AppError('Course does not exists',500));
        }
        
        res.status(200).json({
            success: true,
            message: 'Course Deleted Successfully!!'
        })

    }catch(e){
        return next(new AppError(e.message,500));
    }
};

const addlecturesById = async (req, res, next) =>{
    try{
        const {title, description} = req.body;
        const {id} = req.params;

        if(!title || !description){
            return next(new AppError('All fields are reuired!!',400));
        }

        const course = await Course.findById(id);
        if(!course){
            return next(new AppError('Course does not exists', 500));
        }

        const lectureData = {
            title,
            description,
            lecture: {}
        };
        if(req.file){
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: 'lms',
                    resource_type: 'video'
                });
                if(result){
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }
        
                await fs.rm(`uploads/videos/${req.file.filename}`); // remove file from uploads folder
            }catch(e){
                return next(new AppError(e.message, 500));
            }
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;
        console.log(course.lectures);   
        await course.save();

        res.status(200).json({
            success: true,
            message: 'lecture uploaded successfully to the course!!',
            course
        })
    }catch(e){
        return next(new AppError(e.message,500))
    }

}


const deleteLecture = async (req, res, next) => {
    try{
        const {lectureId, courseId} = req.query;

        if(!lectureId){
            return next(new AppError('lecture ID is required!!', 400));
        }
        if(!courseId){
            return next(new AppError('Course ID is required!!', 400));
        }

        const course = await Course.findById(courseId);
        if(!course){
            return next(new AppError('Course does not exists', 500));
        }

        const lectureIndex = course.lectures.findIndex((lecture) => lecture._id.toString() === lectureId.toString());
        if(lectureIndex === -1){
            return next(new AppError('Lecture does not exists', 500));
        }

        // delete lecture from cloudinary
        await cloudinary.v2.uploader.destroy(
            course.lectures[lectureIndex].lecture.public_id,
            {
                resource_type: 'video'
            }
        );
        course.lectures.splice(lectureIndex, 1);
        course.numberOfLectures = course.lectures.length;
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture deleted successfully!!'
        })

    }catch(e){
        return next(new AppError(e.message, 500));
    }
};


export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    deleteCourse,
    addlecturesById,
    deleteLecture
};