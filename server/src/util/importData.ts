import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { Definition } from '../models/definition.model';

dotenv.config(); // Load .env variables

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.ATLAS_URI || 'NO ATLAS_URI IN .ENV');

    console.log('Connected to MongoDB');

    const questionRawData = fs.readFileSync(
      'C:/Users/rosew/Documents/Hack4Impact/asap-f22/dataloader/json_files/questions.json',
      'utf-8',
    ); // Replace with your file path
    const questionData = JSON.parse(questionRawData);

    // Transform the data
    const questionFormattedData = questionData.map((item: any) => ({
      ...item,
      _id: new mongoose.Types.ObjectId(item._id), // Convert _id to ObjectId
      resultantAnswers: item.resultantAnswers.map((ans: any) => ({
        ...ans,
        _id: new mongoose.Types.ObjectId(ans._id), // Convert _id to ObjectId
        resultantQuestionId: new mongoose.Types.ObjectId(
          ans.resultantQuestionId,
        ), // Convert resultantQuestionId to ObjectId
      })),
    }));

    // Insert the transformed data
    await Question.insertMany(questionFormattedData);
    console.log('QuestionData imported successfully');

    const answerRawData = fs.readFileSync(
      'C:/Users/rosew/Documents/Hack4Impact/asap-f22/dataloader/json_files/answers.json',
      'utf-8',
    ); // Replace with your file path
    const answerData = JSON.parse(answerRawData);

    // Transform the data
    const answerFormattedData = answerData.map((item: any) => ({
      ...item,
      _id: new mongoose.Types.ObjectId(item._id), // Convert _id to ObjectId
      resultantQuestionId: new mongoose.Types.ObjectId(
        item.resultantQuestionId,
      ), // Convert resultantQuestionId to ObjectId
    }));

    // Insert the transformed data
    await Answer.insertMany(answerFormattedData);
    console.log('Answer Data imported successfully');

    const definitionsRawData = fs.readFileSync(
      'C:/Users/rosew/Documents/Hack4Impact/asap-f22/dataloader/json_files/definitions.json',
      'utf-8',
    ); // Replace with your file path
    const definitionsData = JSON.parse(definitionsRawData);

    // Transform the data
    const definitionsFormattedData = definitionsData.map((item: any) => ({
      ...item,
      _id: new mongoose.Types.ObjectId(item._id), // Convert _id to ObjectId
      questionIds: item.questionIds.map(
        (id: string) => new mongoose.Types.ObjectId(id),
      ),
    }));

    // Insert the transformed data
    await Definition.insertMany(definitionsFormattedData);
    console.log('Definition Data imported successfully');

    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    return process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    return process.exit(1);
  }
};

importData();
