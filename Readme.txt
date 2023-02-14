
Please run composer install in the back end folder.
Please run npm install in the front end folder.

Create a database by name Laravel.



Laravel Backend
rename .env.example to .env in backend folder

Run-> php artisan migrate

Run-> Php artisan db::seed

Run->php artisan key:generate

Run-> Php artisan serve

Under frontend folder run npm start. and here you go ..

Frontend admin route -> /login
Admin credentials
email->john@gmail.com
pass-> 123456


You can hit /api/call_api (get api) to fetch data from the fakerapi . Although an sql file is also provided for more books data .

You are good to go.


Auth Apis
| Type| Url|Param|
| --- | --- |
|post | /api/register| name,email,password |
|post | /api/login| email,password


Admin Apis
| Type| Url|Param|
| --- | --- |
|post | /api/admin/add_book| title,author,genre,description,isbn,image,published,publisher|
|post | /api/admin/edit_book| id,title,author,genre,description,isbn,image,published,publisher|
|post | /api/admin/delete_book| id|
|post | /api/admin/fetch_book| id|
|post | /api/admin/all_book| skip,limit|


/client Apis
| Type| Url|Param|
| --- | --- |
|post | /api/all_book| search,genre,fromdate,todate,skip,limit |
|get| /api/get_genres|  |
|post | /api/fetch_book| id|
