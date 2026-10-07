import json
import boto3
from botocore.exceptions import ClientError

TABLE_NAME = "serverless-web-application-on-aws"
VIEW_COUNTER_ID = "0"

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, context):
    try:
        response = table.update_item(
            Key={"id": VIEW_COUNTER_ID},
            UpdateExpression="SET #views = if_not_exists(#views, :zero) + :increment",
            ExpressionAttributeNames={"#views": "views"},
            ExpressionAttributeValues={
                ":zero": 0,
                ":increment": 1,
            },
            ReturnValues="UPDATED_NEW",
        )

        views = int(response["Attributes"]["views"])

        print(json.dumps({"message": "View counter updated", "views": views}))

        return views

    except ClientError as error:
        print(f"DynamoDB error: {error}")

        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "Unable to update view counter"}),
        }
