FROM mysql

# set the root password
ENV MYSQL_ROOT_PASSWORD root

# specify  the database name
ENV MYSQL_DATABASE mydb

# copy db.sql to the image's /docker-entrypoint-initdb.d
COPY db.sql /docker-entrypoint-initdb.d

EXPOSE 3306

