<?php

use App\Http\Controllers\publicControllers\profileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// default data from local api
Route::get('/testing/local/api', [profileController::class,'test'])->name('test');

// for testing the components
Route::inertia('/test', 'Affiliates/Affiliates');

// route for affiliates
Route::inertia('/affiliates','Affiliates/Affiliates');

// route for leads
Route::inertia('/leads', 'Leads/LeadsM');

Route::inertia('/myPage', 'MyPage/MyPage');

Route::group(['middleware' => 'auth'], function() {
    Route::inertia('/home', 'Home');

    Route::get('/profile', [profileController::class, 'index'])->name('profile');
    Route::delete('/profilePhotoDelete', [profileController::class, 'deleteProfilePhoto'])->name('profilePhotoDelete');
    Route::put('/profilePhotoUpdate', [profileController::class, 'updateProfilePhoto'])->name('profilePhotoUpdate');
    Route::delete('/profileDelete', [profileController::class, 'deleteProfile'])->name('profileDelete');

});
