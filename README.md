# ☁️ Serverless Web Application on AWS

A clean, lightweight greeting application built with **AWS Lambda, DynamoDB, S3, and CloudFront**.

The project combines a simple frontend with a serverless backend that tracks page views in DynamoDB. The original project describes the architecture as S3-hosted static files, Lambda for DynamoDB operations, and CloudFront for low-latency delivery.

## ✨ Features

- Modern responsive greeting UI
- Personalized greeting using the visitor's name
- Serverless page-view counter
- DynamoDB-backed view storage
- AWS Lambda backend
- Static hosting through S3
- CloudFront-ready frontend
- Accessible form labels, focus states, and live status messages
- Friendly error handling when the view counter cannot be reached

## 🏗️ Architecture

```text
                    ┌────────────────────┐
                    │      Browser       │
                    │  HTML / CSS / JS   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │   S3 / CloudFront  │
                    │   Static Website    │
                    └─────────┬──────────┘
                              │
                              │ fetch()
                              ▼
                    ┌────────────────────┐
                    │   AWS Lambda       │
                    │  View Counter API  │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │     DynamoDB       │
                    │   View Counter     │
                    └────────────────────┘
```

The project documentation also identifies DynamoDB, Lambda, S3, and CloudFront as the core AWS services used by the application.

## 📁 Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── lambda-function.py
└── README.md
```

## 🚀 Deployment Steps

### 1. Create the DynamoDB table

Create a DynamoDB table named:

```text
serverless-web-application-on-aws
```

Use:

```text
Partition key: id
Type: String
```

The Lambda function uses the item:

```json
{
  "id": "0"
}
```

The `views` attribute is created automatically the first time the function runs.

### 2. Create the Lambda function

Create a Python Lambda function and use the code from `lambda-function.py`.

Make sure the Lambda execution role has permission to update the DynamoDB table.

The improved function uses an atomic DynamoDB update, which is safer than reading the current value and then writing a new value when multiple requests arrive close together.

### 3. Create a Lambda Function URL

Expose the Lambda function through a Lambda Function URL.

If your URL is different from the existing project URL, update `LAMBDA_URL` in `script.js`.

### 4. Configure CORS

If the Lambda Function URL uses CORS restrictions, allow requests from the domain where the frontend is hosted.

For a quick test, you can allow:

```text
Access-Control-Allow-Origin: *
```

For production, replace the wildcard with your actual website domain.

### 5. Upload the frontend to S3

Upload:

```text
index.html
style.css
script.js
```

to your S3 bucket.

### 6. Add CloudFront

Create a CloudFront distribution pointing to the S3-hosted website.

CloudFront can provide HTTPS, caching, and lower-latency delivery for the static frontend.

## 🎨 Frontend Improvements

The frontend was redesigned with:

- Responsive layout
- Modern card-based interface
- Gradient visual accents
- Better typography and spacing
- Mobile-friendly controls
- Accessible labels and live status messaging
- Keyboard focus states
- Empty-name validation
- Friendly API failure handling
- Cleaner semantic HTML

## 🔐 Security & Production Notes

For production deployments:

- Prefer a specific `Access-Control-Allow-Origin` instead of `*`.
- Give the Lambda execution role only the DynamoDB permissions it needs.
- Consider CloudFront + HTTPS for the frontend.
- Add monitoring and logging with Amazon CloudWatch.
- Consider API Gateway or another controlled API layer if the application grows.
