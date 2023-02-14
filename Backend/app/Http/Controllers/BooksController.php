<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use App\Models\Books;
use Exception;
use Illuminate\Support\Facades\Validator;

class BooksController extends Controller
{
    public function callapi()
    {
        $httpClient = new \GuzzleHttp\Client();
        $request =
            $httpClient
            ->get("https://fakerapi.it/api/v1/books?_quantity=150");

        $response = json_decode($request->getBody()->getContents());

        $data = $response->data;

        foreach ($data as $key => $value) {
            $insert = DB::table('books')->insert([
                'title' => $value->title,
                'author' => $value->author,
                'genre' => $value->genre,
                'description' => $value->description,
                'isbn' => $value->isbn,
                'image' => $value->image,
                'published' => $value->published,
                'publisher' => $value->publisher,
            ]);
        }

        return 'Data Fetched Successfully';

        
    }

    public function allBooks(Request $request)
    {

        try {
            $books = Books::query();
            if ($request->search != '') {
                $books =   $books->where('title', 'LIKE', '%' . $request->search . '%')->orWhere('author', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('description', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('isbn', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('publisher', 'LIKE', '%' . $request->search . '%');
            }

            if ($request->genre != '') {
                $books = $books->where('genre', $request->genre);
            }

            if ($request->fromdate != '') {
                $books = $books->where('published', '>',date($request->fromdate));
            }

            if ($request->todate != '') {
                $books = $books->where('published', '<',date($request->todate));
            }



            $books =   $books->skip($request->skip)->take($request->limit)->get();


            if ($request->search == '' && $request->genre == '' && $request->fromdate =='' && $request->todate =='' ) {
                $total =  Books::count();
            }else{
                $total = count($books);
            }



            return response()->json([
                'status' => 'Success',
                'count' => $total,
                'data' => $books
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Failed',
                'message' => $e
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
            if ($book) {
                return response()->json([
                    'status' => 'Success',
                    'data' => $book
                ]);
            } else {
                return response()->json([
                    'status' => 'Success',
                    'data' => 'Not Found'
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Some error occured',

            ]);
        }
    }

    
}
