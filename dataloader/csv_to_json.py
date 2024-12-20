import csv
import json
from bson import ObjectId
import re
import struct

def int_to_objectid(i):
    i = int(str(i).strip())
    return ObjectId(struct.pack('>I8x', i))

def clean_string(s):
    return re.sub(r'^[\'"]|[\'"]$', '', str(s))

def questions_to_json(csv_file, json_output):
    data = []
    with open(csv_file, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            id, text, resultantAnswers_str, isQuestion = row

            data.append({
                "_id": int_to_objectid(id),
                "text": clean_string(text),
                "resultantAnswers": [] if clean_string(resultantAnswers_str) == "" else [int_to_objectid(oid) for oid in re.split(r',\s*', clean_string(resultantAnswers_str))],
                "isQuestion": bool(isQuestion)
            })

    # Write the data as JSON
    with open(json_output, 'w') as json_file:
        json.dump(data, json_file, default=str)

def answers_to_json(csv_file, json_output):
    data = []
    with open(csv_file, encoding="utf-8", mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            id, text, resultantQuestionId, resourceContent, resourceLink = row
            data.append({
                "_id": int_to_objectid(id),
                "text": clean_string(text),
                "resultantQuestionId": None if resultantQuestionId == "" else int_to_objectid(resultantQuestionId),
                "resourceContent": clean_string(resourceContent),
                "resourceLink": clean_string(resourceLink)
            })


    # Write the data as JSON
    with open(json_output, 'w') as json_file:
        json.dump(data, json_file, default=str)

def definitions_to_json(csv_file, json_output):
    data = []
    with open(csv_file, encoding="utf-8", mode='r') as file:
        csv_reader = csv.reader(file)
        row_idx = 0
        # try:
        for row in csv_reader:
            row_idx += 1
            id, word, definition, questionIds, link = row
            
            data.append({
                "_id": int_to_objectid(id),
                "word": clean_string(word),
                "definition": clean_string(definition),
                "questionIds": [int_to_objectid(qid) for qid in re.split(r',\s*', clean_string(questionIds))],
                "link": clean_string(link)
            })
        # except:
        #     print(row_idx)

    # Write the data as JSON
    with open(json_output, 'w') as json_file:
        json.dump(data, json_file, default=str)

def main():
    csv_path = 'csv_files/'
    questions_csv = csv_path + 'questions.csv'
    answers_csv = csv_path + 'answers.csv'
    definitions_csv = csv_path + 'definitions.csv'

    json_path = 'json_files/'
    questions_json = json_path + 'questions.json'
    answers_json = json_path + 'answers.json'
    definitions_json = json_path + 'definitions.json'

    questions_to_json(questions_csv, questions_json)
    print(f"Data has been successfully converted to JSON and saved to {questions_json}")

    answers_to_json(answers_csv, answers_json)
    print(f"Data has been successfully converted to JSON and saved to {answers_json}")

    definitions_to_json(definitions_csv, definitions_json)
    print(f"Data has been successfully converted to JSON and saved to {definitions_json}")

if __name__ == '__main__':
    main()