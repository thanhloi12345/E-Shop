interface NullDataProps{
    title:string;
}

const NullData:React.FC<NullDataProps>=({title})=>{
    return(
        <div className="w-full h-[50vh] flex items-center justify-center text-x1 md:text-2x1">
            <p className="font-medium">{title}</p>
        </div>
    )
}

export default NullData;