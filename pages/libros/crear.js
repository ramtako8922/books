
import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/router'

const createBook=()=>{
const router=useRouter()
const [bookTitle,setBookTitle]= useState('')
const [errors,setErrors]= useState('')
const[enviando,setEnvios]=useState(false)
    async function handleSubmit(e) {
        setEnvios(true)
        e.preventDefault()
      const res=  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,{
            method:'POST',
            headers:{
                accept: 'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title: bookTitle

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
        <h1>Crea Libro</h1>
        <form onSubmit={handleSubmit}>
            <input 
            onChange={(e)=>setBookTitle(e.target.value)}
            value={bookTitle}
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

export default createBook;
