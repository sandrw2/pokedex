import boto3

# Initialize a DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='your-region')  # Replace 'your-region' with the appropriate AWS region

def create_user_collections_table():
    try:
        table = dynamodb.create_table(
            TableName='UserCollections',
            KeySchema=[
                {
                    'AttributeName': 'userId',
                    'KeyType': 'HASH'  # Partition key
                },
                {
                    'AttributeName': 'cardId',
                    'KeyType': 'RANGE'  # Sort key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'userId',
                    'AttributeType': 'S'  # String type
                },
                {
                    'AttributeName': 'cardId',
                    'AttributeType': 'S'  # String type
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )

        print("Creating table...")
        table.wait_until_exists()  # Wait until the table is created
        print(f"Table '{table.table_name}' created successfully.")

    except Exception as e:
        print(f"Error creating table: {e}")

# Run the function to create the table
create_user_collections_table()
