

import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/router'
export async function getServerSideProps({params}) {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
    const data= await res.json();
    console.log(data)
    return{
        props:{
            book:data
        }
       
    }
    
    
}
const editBook=({ book })=>{
const router=useRouter()
const [bookTitle,setBookTitle]= useState(book.title)
const [errors,setErrors]= useState('')
const[enviando,setEnvios]=useState(false)

async function handleSubmit(e) {
    setEnvios(true)
    e.preventDefault()
  const res=  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
        method:'POST',
        headers:{
            accept: 'application/json',
            'content-type':'application/json'
        },
        body: JSON.stringify({
            title: bookTitle,
            _method:'PATCH'

        })

    })

    if (res.ok) {
        setErrors([])
        setBookTitle('')
        return router.push('/libros')
        
    }
    const data=await res.json()
    setErrors(data.errors)
    setEnvios(false)
    
    
}
return(
    <div>
        <h1>Editar Libro</h1>
        <form onSubmit={handleSubmit}>
            <input 
            onChange={(e)=>setBookTitle(e.target.value)}
            value={String(bookTitle)}
            disabled={enviando}
            type="text"/>
             {errors.title &&<span>{errors.title}</span>}
            <button 
            disabled={enviando}
            type='submit'>{enviando ?'enviando':'ennviar'}</button>

        </form>
        <Link href='/libros'>Ver libros</Link>
        
    </div>

)

}

    
    export default editBook;