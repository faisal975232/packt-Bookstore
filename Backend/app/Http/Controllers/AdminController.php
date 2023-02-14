<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use App\Models\Books;
use Exception;

class AdminController extends Controller
{
    public function addBook(Request $request)
    {
        //validation
        $validator = Validator::make(request()->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'isbn' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'published' => 'required',
            'publisher' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }
        //end validation

        //saving book
        try {
            $addBook = Books::create([
                'title' => $request->title,
                'author' => $request->author,
                'genre' => $request->genre,
                'description' => $request->description,
                'isbn' => $request->isbn,
                'image' => $request->image,
                'published' => $request->published,
                'publisher' => $request->publisher
            ]);

            if($addBook){
                return response()->json([
                    'status' => 'Success',
                    'message' => 'New Book Added Successfully',
    
                ]);
            }
            else{
                return response()->json([
                    'status' => 'Failed',
                    'message' => 'Faied,Try again',
    
                ]);
            }

            
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Some error occured',

            ]);
        }
    }

    public function deleteBook(Request $request)
    {
        //validation
        $validator = Validator::make(request()->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }
        //end validation

        //saving book
        try {
            $delete = Books::where('id', $request->id)->delete();

            if($delete ==0){
                return response()->json([
                    'status' => 'Failed',
                    'message' => 'Book Not Found',
                ]);
            }
            else{
                return response()->json([
                    'status' => 'Success',
                    'message' => 'Book Deleted Successfully',
                ]);
            }
           
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Some error occured',

            ]);
        }
    }

    public function fetchBook(Request $request)
    {
        //validation
        $validator = Validator::make(request()->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }
        //end validation

        //saving book
        try {
            $book = Books::where('id', $request->id)->first();
            return response()->json([
                'status' => 'Success',
                'data' => $book
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Some error occured',

            ]);
        }
    }


    public function editBook(Request $request)
    {
        //validation
        $validator = Validator::make(request()->all(), [
            'id' => 'required',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'isbn' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'published' => 'required',
            'publisher' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }
        //end validation

        //editing book
        try {
            $editBooks = Books::where('id', $request->id)->update([
                'title' => $request->title,
                'author' => $request->author,
                'genre' => $request->genre,
                'description' => $request->description,
                'isbn' => $request->isbn,
                'image' => $request->image,
                'published' => $request->published,
                'publisher' => $request->publisher
            ]);

            if($editBooks){
                return response()->json([
                    'status' => 'Success',
                    'message' => 'Book Edited Successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Failed,try again',
                ]);
            }
            
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Some error occured',

            ]);
        }
    }


    public function getGenres()
    {
        $genres = Books::select('genre')->groupBy('genre')->get();

        return response()->json([
            'status' => 'Success',
            'data' => $genres
        ]);
    }

    public function searchBooks(Request $request)
    {
        try{
            $books = Books::query();

            $books= $books->where('title', 'LIKE', '%'.$request->search.'%')->orWhere('author', 'LIKE', '%'.$request->search.'%')
            ->orWhere('description', 'LIKE', '%'.$request->search.'%')
            ->orWhere('isbn', 'LIKE', '%'.$request->search.'%')
            ->orWhere('publisher', 'LIKE', '%'.$request->search.'%');
    
            if ($request->has('genre')) {
                $books = $books->where('genre', 'LIKE', '%'.$request->genre.'%');
            }
            
            $books = $books->take($request->limit)->skip($request->skip)->get();
    
            
    
            return response()->json([
                'status' => 'Success',
                'data' => $books
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'status' => 'Failed',
                'message' => $e
            ]);
        }
        
    }

    public function allBooks(Request $request)
    {
        try{
            
            $books =  Books::skip($request->skip)->take($request->limit)->get();

            $total =  Books::count();
            
            return response()->json([
                'status' => 'Success',
                'count' => $total,
                'data' => $books
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'status' => 'Failed',
                'message' => 'Some Error Occured'
            ]);
        }
        
    }
}
