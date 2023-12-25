# Social Mail Community Server

Social Mail Community Server contains simple Alpine Base with inbuilt Postgres Server, NodeJS and ClamAV antivirus. You can simply run the server and expose port 25, 80 and 443 to get started.

## Environment Variables

You will need to setup following variables.

### Password

#### SOCIAL_MAIL_ADMIN_PASSWORD
Admin username is `admin`, and you can use this variable to setup default password. This will only be set on first time. If user with username `admin`, this setting will be ignored.

### Lets Encrypt
By default the server starts with self-signed certificate, to enable SSL with Lets Encrypt, you can setup following Environment Variables.

```
SOCIAL_MAIL_SSL_MODE=lets-encrypt
SOCIAL_MAIL_SSL_LE_EMAIL=valid email address
SOCIAL_MAIL_SSL_LE=production
```

### ACME EP Bindings (Optional)
If you want to use some different ACME certificate provider, you can setup EP binding as below.

```
SOCIAL_MAIL_SSL_ACME_EP=endpoint
SOCIAL_MAIL_SSL_ACME_EAB_KID=key id
SOCIAL_MAIL_SSL_ACME_EAB_HMAC=hmac
```

### Storage
Emails, Attachments and all drive files are stored in Postgres Database itself. To setup different storage, you can configure following environment variables.

#### AWS S3
Bucket must exist before you set this.
```
SOCIAL_MAIL_STORAGE=s3
SOCIAL_MAIL_S3_END_POINT=
SOCIAL_MAIL_S3_BUCKET=
SOCIAL_MAIL_S3_ACCESS_KEY=
SOCIAL_MAIL_S3_SECRET=
```

#### Azure Blobs
Container must exist before you set this.
```
SOCIAL_MAIL_STORAGE=azure
SOCIAL_MAIL_AZURE_BLOB_CONN_STRING=
SOCIAL_MAIL_AZURE_BLOB_CONTAINER=
```

#### Local Volume
We do not recommend this unless you have a durable volume with proper backups.
```
SOCIAL_MAIL_STORAGE=volume
SOCIAL_MAIL_STORAGE_PATH=
```
