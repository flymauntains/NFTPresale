const Progress = ({value}) => {
    return (
        <div className="mt-1">
            <div className="lg:w-80 w-72 h-3 bg-[#E30E60] rounded-full">
                <div className="h-3 bg-[rgb(255,86,246)] rounded-full" style={{width:`${value}%`}} />
            </div>
            <div className="text-xs text-[#FF8DF9]" style={{marginLeft: `${value * 0.9}%`}}>{`%${value}`}</div>
        </div>
    )
}

export default Progress