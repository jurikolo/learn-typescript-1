# Information

This project is based on https://www.udemy.com/course/understanding-typescript , Drag & Drop

## Build application

In original project all sources were developed in a single file, simple `tsc` command was enough to compile.
In this version sources are distributed across various files and web application doesn't support multiple JSes, as imports cannot be handled.
For this reason webpack was introduced to compile all the sources into a single file.
To build the project, run `npm run build`.

## Run application

Execute `npm start` in a project root directory to launch a web server.