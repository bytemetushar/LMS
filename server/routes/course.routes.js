import {Router} from 'express';
import { addlecturesById, createCourse, deleteCourse, deleteLecture, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controller.js';
import {uploadImage, uploadVideo} from '../middlewares/multer.middleware.js';
import {authorizeSubscriber ,authorizedRoles, isLoggedIn} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        uploadImage.single('thumbnail'),
        createCourse)
    .delete(isLoggedIn,authorizedRoles('ADMIN') ,deleteLecture);

router.route('/:id')
    .get(isLoggedIn ,authorizeSubscriber ,getLecturesByCourseId)
    .put(isLoggedIn,authorizedRoles('ADMIN') , updateCourse)
    .delete(isLoggedIn,authorizedRoles('ADMIN') ,deleteCourse)
    .post(isLoggedIn, authorizedRoles('ADMIN'),uploadVideo.single('lecture'), addlecturesById);
    


export default router;