\echo 'Delete and recreate paintrest db?'
\prompt 'Return for yes or control-c to cancel > ' foo

DROP DATABASE paintrest;
CREATE DATABASE paintrest;
\c paintrest;

\i paintrest-schema.sql
\i paintrest-seed.sql