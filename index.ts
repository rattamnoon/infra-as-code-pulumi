import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("pulumi-s3-bucket");

// Export the name of the bucket
export const bucketName = bucket.id;

// Create an AWS resource (ECR Repository)
const repository = new awsx.ecr.Repository("pulumi-ecr-repo", {
  imageScanningConfiguration: {
    scanOnPush: true,
  },
  forceDelete: true,
});

// Export the URL of the repository
const image = new awsx.ecr.Image("image", {
  repositoryUrl: repository.url,
  context: "./app",
  platform: "linux/amd64",
});

export const url = repository.url;
