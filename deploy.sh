# check for bucket present, if not exit
aws s3 ls s3://pandapom.inseng.net

# remove all files in the bucket
aws s3 rm s3://pandapom.inseng.net --recursive

# build site
yarn nuxt generate

# add all files to bucket
aws s3 sync ./dist s3://pandapom.inseng.net