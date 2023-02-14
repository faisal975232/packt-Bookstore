<?php

namespace Database\Seeders;
use App\Models\Books;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Books::create([
            'title' => 'Beyond a Boundary',
            'author' => '	C. L. R. James',
            'genre' => 'Sport',
            'description' => 'James recounts the role cricket played in his family',
            'isbn' =>'1454321f23dsa' ,
            'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Beyond_a_Boundary.jpg/220px-Beyond_a_Boundary.jpg',
            'published' => '1980-02-21',
            'publisher' => 'Hutchinson'
        ]);

        Books::create([
            'title' => 'Playing It My Way',
            'author' => 'C. L. R. James',
            'genre' => 'Cricket',
            'description' => 'James recounts the role cricket played in his family',
            'isbn' =>'145432fdsfds3dsa' ,
            'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Playingitmywaybookcover.jpeg/220px-Playingitmywaybookcover.jpeg',
            'published' => '1970-02-21',
            'publisher' => 'Hutchinson'
        ]);

        Books::create([
            'title' => 'The Test of My Life',
            'author' => 'C. L. R. James',
            'genre' => 'Sport',
            'description' => 'James recounts the role cricket played in his family',
            'isbn' =>'145434423dsa' ,
            'image' => 'https://everipedia-storage.s3-accelerate.amazonaws.com/ProfilePics/696938761649.PNG',
            'published' => '1975-02-21',
            'publisher' => 'Hutchinson'
        ]);
    }
}
