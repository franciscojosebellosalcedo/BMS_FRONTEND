
export const handlerKeydown = (e: KeyboardEvent, callback: Function ) =>{
    if( !e.repeat && e.key === "Enter"){
        callback()
    }
}