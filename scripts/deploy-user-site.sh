#!/bin/bash
# This script is triggered by the Backend API when a user clicks "Publish"
# It packages the AI-generated build and pushes it to the Edge Network.

USER_ID=$1
SITE_ID=$2
BUILD_DIR=$3 # Path to the generated Next.js/Static export

if [ -z "$USER_ID" ] || [ -z "$SITE_ID" ] || [ -z "$BUILD_DIR" ]; then
    echo "Usage: ./deploy-user-site.sh [user_id] [site_id] [build_dir]"
    exit 1
fi

BUCKET_NAME="ai-portfolio-user-sites-prod"
S3_PATH="s3://$BUCKET_NAME/$USER_ID/$SITE_ID"

echo "🚀 Deploying Site $SITE_ID for User $USER_ID..."

# 1. Upload assets to S3
aws s3 sync $BUILD_DIR $S3_PATH --delete --acl public-read

# 2. Invalidate CloudFront Cache for this specific site
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items!=null && contains(Aliases.Items, 'sites.ai-portfolio.com')].Id" --output text)

aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/$USER_ID/$SITE_ID/*"

echo "✅ Deployment Successful!"
echo "🔗 URL: https://sites.ai-portfolio.com/$USER_ID/$SITE_ID"