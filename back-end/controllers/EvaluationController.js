const Evaluation = require('../models/Evaluation.js');

class EvaluationController {
    // Get all evaluations
    static async getAllEvaluations() {
        try {
            const evaluations = await Evaluation.getAllEvaluations();
            return evaluations;
        } catch (error) {
            throw new Error(`Error fetching evaluations: ${error.message}`);
        }
    }

    // Get evaluation by ID
    static async getEvaluationById(id) {
        try {
            const evaluation = await Evaluation.getEvaluationById(id);
            if (!evaluation) {
                throw new Error('Evaluation not found');
            }
            return evaluation;
        } catch (error) {
            throw new Error(`Error fetching evaluation: ${error.message}`);
        }
    }

    // Create new evaluation
    static async createEvaluation(evaluationData) {
        try {
            const newEvaluation = await Evaluation.createEvaluation(evaluationData);
            return newEvaluation;
        } catch (error) {
            throw new Error(`Error creating evaluation: ${error.message}`);
        }
    }

    // Update evaluation
    static async updateEvaluation(id, evaluationData) {
        try {
            const updatedEvaluation = await Evaluation.updateEvaluation(id, evaluationData);
            if (!updatedEvaluation) {
                throw new Error('Evaluation not found');
            }
            return updatedEvaluation;
        } catch (error) {
            throw new Error(`Error updating evaluation: ${error.message}`);
        }
    }

    // Delete evaluation
    static async deleteEvaluation(id) {
        try {
            const result = await Evaluation.deleteEvaluation(id);
            if (!result) {
                throw new Error('Evaluation not found');
            }
            return result;
        } catch (error) {
            throw new Error(`Error deleting evaluation: ${error.message}`);
        }
    }
}

module.exports = EvaluationController;