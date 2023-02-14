import React,{useEffect, useState} from "react";
import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent (prop){
const[counter,setCounter] = useState(1);

const page = Math.ceil(prop.dataLength /prop.showperpage ) ;


useEffect (()=>{
    const value = prop.showperpage * counter ;
    

    prop.pg(value - prop.showperpage , value)
   
},[counter])

const onButtonclick = (type) =>{

    if(type === 'prev'){

        if(counter === 1 ){
            setCounter(1)
        }
        else{
            setCounter(counter - 1)
        }
    }
    else if (type === 'next'){
        if(Math.ceil(prop.dataLength /prop.showperpage ) === counter ){
            setCounter(counter)
        }
        else{
            setCounter(counter +1);
        }
    }
}

const changePage = (page) =>{
    setCounter(page)
}


    return (
        <div>
            <div className="d-flex justify-content-center mt-2" >
                

                <Pagination>
  
  <Pagination.Prev onClick={ ()=> onButtonclick('prev')} />
  
  
{ new Array(page).fill('').map((el,index) => (
    <Pagination.Item key={index} onClick={ ()=> changePage(index+1)} >{index+1}</Pagination.Item>
))

}
  

  
  <Pagination.Next onClick={ ()=> onButtonclick('next')}/>
 
</Pagination>
            </div>
        </div>
    )
}


export default PaginationComponent;