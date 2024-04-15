# Quick Start

Copy and paste the commands and get a very quick and dirty copy of your Laravel app running. Perhaps for branch builds or something, I don't know.

## WTF is a SL<small>(dt&it)</small>SaaS

missing:u SL(dt&it)SaaS puts your Laravel app online quickly. It's 3 lambda functions (for web, queue worker and commands), an SQLite database (read and write) and a cloudfront for static shit.

It's for development, testing and internal tooling (dt&it). I wouldn't use this for production if I were you.

## Installation

Install the package

```bash
composer require speakclouder/missingu
```

And install the commands and a few others bits

```bash
php artisan missing:u:install
```

This will force you to login to your missing:u account. Probably should have mentioned that first.

## What do I need to do?

Create a .env.STACK_ENV file (eventually this will be encrypted in your repo and decrypted on missing:u deployment - for now, leave it plain text)

The following deployment command:

```bash
php artisan missing:u:deploy STACK_NAME STACK_ENV
```

The build then:

* Uploads a .zip to the missing:u deployment artifact bucket
* Runs a build (composer install, npm run build)
* Creates 3 Lambda functions (web, queue and artisan)
* Creates a private slice of an EFS volume and mounts it to each function
`/APP_NAME/APP_ENV/` is mounted to `/mnt/store/` on each function
* Creates a default SQS queue for the queue function
* Adds a function URL to the web function
* Sets the Cloudfront Distro as the origin for the web function
* Dumps the /build assets into S3 and sets the Cloudfront Distro as the origin
* Creates an S3 bucket for storage
* Sets the following environment variables for each of the functions:

```
"APP_NAME"=<STACK_NAME>
"APP_ENV"=<STACK_ENV>
"QUEUE_NAME"
"BUCKET_NAME"
"MISSINGU_DEPLOYMENT"
"DB_CONNECTION"="sqlite"
"DB_DATABASE"=/mnt/store/database.sqlite
```


**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
