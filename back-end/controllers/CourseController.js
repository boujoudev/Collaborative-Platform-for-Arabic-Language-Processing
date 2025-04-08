const Course = require('../models/courseModels.js');

class CourseController {
    // Get all courses
    static async getAllCourses() {
        try {
            const courses = await Course.getAllCourses();
            return courses;
        } catch (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }
    }

    // Get course by ID
    static async getCourseById(id) {
        try {
            const course = await Course.getCourseById(id);
            if (!course) {
                throw new Error('Course not found');
            }
            return course;
        } catch (error) {
            throw new Error(`Error fetching course: ${error.message}`);
        }
    }

    // Create new course
    static async createCourse(courseData) {
        try {
            const newCourse = await Course.createCourse(courseData);
            return newCourse;
        } catch (error) {
            throw new Error(`Error creating course: ${error.message}`);
        }
    }

    // Update course
    static async updateCourse(id, courseData) {
        try {
            const updatedCourse = await Course.updateCourse(id, courseData);
            if (!updatedCourse) {
                throw new Error('Course not found');
            }
            return updatedCourse;
        } catch (error) {
            throw new Error(`Error updating course: ${error.message}`);
        }
    }

    // Delete course
    static async deleteCourse(id) {
        try {
            const result = await Course.deleteCourse(id);
            if (!result) {
                throw new Error('Course not found');
            }
            return result;
        } catch (error) {
            throw new Error(`Error deleting course: ${error.message}`);
        }
    }
}

module.exports = CourseController;