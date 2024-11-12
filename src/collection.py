from flask import Flask, jsonify, request
import boto3
from datetime import datetime

app = Flask(__name__)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserCollections')

@app.route('/api/collection/<user_id>', methods=['GET'])
def get_user_collection(user_id):
    response = table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('userId').eq(user_id)
    )
    return jsonify(response['Items'])

@app.route('/api/collection', methods=['POST'])
def add_card_to_collection():
    data = request.json
    item = {
        'userId': data['userId'],
        'cardId': data['cardId'],
        'cardName': data['cardName'],
        'dateAdded': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    table.put_item(Item=item)
    return jsonify({"message": "Card added successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
