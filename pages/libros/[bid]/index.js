export async function getStaticProps(context) {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${context.params.bid}`)
    const data= await res.json();
    return{
        props:{
            book:data
        }
    }
}

export async function getStaticPaths() {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`)
    const data= await res.json();
    return{
        
            paths:data.map(book=>{
                return{params:{bid:String(book.id)}
                }}),
            fallback: false
        }
    }
    


const showBook=({book})=>{
    return(
        <div>
            <h1>{book.title}</h1>
            
            
        </div>
    
    )
    
    }
    
    export default showBook;
    