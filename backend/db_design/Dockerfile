FROM mysql:latest

COPY db.sql /docker-entrypoint-initdb.d/db.sql
COPY create_user.sql /docker-entrypoint-initdb.d/create_user.sql

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=healthify

EXPOSE 3306

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]