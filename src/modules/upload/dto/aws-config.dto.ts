export interface AwsConfigDto {
  upload_path: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_bucket_name: string;
  aws_region: string;
  domain: string;
  upload_limit: number;
}
