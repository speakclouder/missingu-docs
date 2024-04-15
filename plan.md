---
outline: deep
---

# The Plan

We now have a basic 3 function stack which works with SQLite (EFS), SQS, Artisan, all fairly decent enough. Cloudfront, etc.

> Big issue, we don't have internet access yes, that needs a NAT gateway and I'm not paying for that yet.

I need to make 2 things now, the missingu application where people can sign up and the missingu package that people can install.

## The missingu application

Documentation on how to use it, how to create a .env file, and what the deploy does.

Users that can create API tokens and manage their stacks - view logs, resources, metrics, that sort of thing.

Stacks of what they have deployed and when. Keep this insanely simple.

Users - blah
Stacks - user_id, name, env, region, account, resources, status (live, destroyed)
Deployments - build arn, start time, end time, result, logs

ONLY 1 STACK AT FIRST!!!

### API

The package will have commands that hit the missingu API, so:

`php artisan missing:u:deploy --app APP_NAME`

- user downloads the php package
- if no token, then asks for the users name and password, generates an access token, puts it somewhere in the users local
- then asked for the app name
- then zips up the artifact
- then asks for a presigned URL to dump the artifact in S3
- then asks the application to kick off the deployment, tails the logs here
- then returns the stack information to the user (but they shouldn't need it)

POST `api/v1/login` - generates a token for auth
POST `api/v1/stack/<STACK_NAME>/presigned_url` - generate a presigned URL to upload the artifact
POST `api/v1/stack/<STACK_NAME>/deploy` - run the codebuild against the stack
GET `api/v1/stack/<STACK_NAME>/details` - return the stack details (cloudfront distro URL important here)
GET `api/v1/stack/<STACK_NAME>/deployments/DEPLOYMENT_ID`
POST `api/v1/stack/<STACK_NAME>/artisan` - run an artisan command on the Artisan function
POST `api/v1/stack/<STACK_NAME>/destroy` - deletes the stack completely

# The package

Install the package:

```bash
composer require speakclouder/missingu
```

then:

```bash
php artisan missing:u:deploy --app my-hot-stack
```

which will ask you to login `enter email` and `enter password` then stores the token in the local somewhere, I dunno.

Then asks if you're sure you want to create the stack `my-hot-stack-dev`

Then requests an S3 presigned URL from the application

Then zips the artifact and dumps it into the presigned URL

Then kicks off a deployment from the application

Then gets the deployment logs and keeps an eye on it deploying

Then returns the cloudfront URL (maybe lets use another URL here and setup aliases?)

`php artisan missing:u:artisan "migrate:fresh --force"` will run artisan commands via the application. Again needs a login token first.

`php artisan missing:u:destroy --app my-hot-stack` will destroy the stack and all it's artifacts