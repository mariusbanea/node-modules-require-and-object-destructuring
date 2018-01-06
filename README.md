Live coding practice interview question
=======================================

Getting Started (Not part of the test):

- Go to `mLab.com` and create a new Sandbox database
- Create a User for this database:  
  - Click "Users" tab and then click "Add database user"
  - Enter "Username" and "Password"
- Copy the `mongodb://...` URI to the `.env` file in this project

```
DATABASE_URL=mongodb://<USER>:<PASSWORD>@ds112345.mlab.com:12345/<DBNAME>
```

- Open the "Logs" in this project
- You should see output from 10 integration tests