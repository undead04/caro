export const changeTime=(second:number):string=>{
    const minute=Math.floor(second/60);
    const newSecond=second%60;
    return `${minute.toString().padStart(2,"0")}:${newSecond.toString().padStart(2,"0")}`


}