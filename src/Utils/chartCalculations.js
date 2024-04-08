

export const dateFilter=(data,startDate=new Date(2022,9,4),endDate=new Date(2022,9,30))=>{
    const filteredData=data.filter((dataItem)=>new Date(dataItem.Date)>=new Date(startDate) && new Date(dataItem.Date)<=new Date(endDate))
  
    return filteredData
}

export const genderFilter=(data,isMale=true,isFeMale=true)=>{
    if(!isMale && !isFeMale){
        return data.filter((dataItem)=>dataItem.Gender!=="Female" && dataItem.Gender!=='Male')
    }else if(!isMale){
        return data.filter((dataItem)=>dataItem.Gender!=='Male')
    }else if(!isFeMale){
        return data.filter((dataItem)=>dataItem.Gender!=="Female")
    }else{
       return data 
    }
}

export const ageFilter=(data,isAboveAge=true,isUnderAge=true)=>{
    if(!isAboveAge && !isUnderAge){
        return data.filter((dataItem)=>dataItem.Age!==">25" && dataItem.Age!=='15-25') 
    }else if(!isAboveAge){
        return data.filter((dataItem)=>dataItem.Age!=='>25')
    }else if(!isUnderAge){
        return data.filter((dataItem)=>dataItem.Age!=='15-25')
    }else{
        return data
    }
}


export const filterData=(data,filters)=>{
    const dateFilteredData=dateFilter(data,filters.startDate,filters.endDate);
    const ageFilteredData=ageFilter(dateFilteredData,filters.isAboveAge,filters.isUnderAge)
    const filteredData=genderFilter(ageFilteredData,filters.isMale,filters.isFeMale);
    return filteredData
}




export const caculateChartData=(filteredData)=>{

    

    const barChartData=filteredData.reduce((acc,dataItem)=>{
        acc.A+=Number(dataItem.A)
        acc.B+=Number(dataItem.B)
        acc.C+=Number(dataItem.C)
        acc.D+=Number(dataItem.D)
        acc.E+=Number(dataItem.E)
        acc.F+=Number(dataItem.F)
        return acc
    },{A:0,B:0,C:0,D:0,E:0,F:0})
    return barChartData
}


export const calculateLineChartData=(filteredData,feature)=>{

    const lineChartData=filteredData.reduce((acc,dataItem)=>{
       
        if(acc[dataItem.Date]===undefined){
            return {...acc,[dataItem.Date]:Number(dataItem[feature])}
        }else{
             acc[dataItem.Date]+=Number(dataItem[feature])
             return acc;
        }
    },{});

    const lineChartDataObject=Object.keys(lineChartData).reduce((acc,date)=>{
        const parsedDate=new Date(date);
        const day=parsedDate.getDate();
        const monthName=parsedDate.toLocaleString('default', { month: 'short' });
        const dateKey=`${day} ${monthName}`
        return {...acc,[dateKey]:lineChartData[date]}
    },{})

    return lineChartDataObject
}