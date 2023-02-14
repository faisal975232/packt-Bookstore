<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    return $user;
});

//auth routes
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});

//admin routes
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::post('/add_book', [AdminController::class, 'addBook']);
    Route::post('/delete_book', [AdminController::class, 'deleteBook']);
    Route::post('/fetch_book', [AdminController::class, 'fetchBook']);
    Route::post('/edit_book', [AdminController::class, 'editBook']);
    Route::post('/all_books', [AdminController::class, 'allBooks']);
});

//customer routes
Route::post('/all_books', [BooksController::class, 'allBooks']);
Route::get('/get_genres', [BooksController::class, 'getGenres']);
Route::post('/fetch_book', [BooksController::class, 'fetchBook']);

// fetch data into database
Route::get('/call_api', [BooksController::class, 'callapi']);


