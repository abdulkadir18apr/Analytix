import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { caculateChartData, calculateLineChartData, filterData } from "../Utils/chartCalculations";
import {BarChart} from "../component/BarChart"
import { useLocation } from 'react-router-dom';
import "./dashboard.scss";
import { LineChart } from "../component/LineChart";
import { FilterBar } from "../component/FilterBar";

import queryString from 'query-string';
import { fetchData, setAllFilters } from "../reducers/reducer";
import { Loader } from "../component/Loader";

export const PreviewDashboard=()=>{

    const dispatch=useDispatch();
    const {isAuthenticated,filters,isLoading}=useSelector((state)=>state?.auth);
    const [data,setData]=useState([]);

    const [selectedBar,setSelectedBar]=useState('A');

    const location=useLocation()

    useEffect(()=>{
        dispatch(fetchData()).then((res)=>{
            setData(res.payload.data);
        })
    },[isAuthenticated])


    useEffect(() => {
        const { search } = location;
        const queryParams = queryString.parse(search);
        const { startDate, endDate, isMale, isFeMale, isAboveAge, isUnderAge } = queryParams;
       dispatch(setAllFilters(
        {
            startDate:new Date(startDate),
            endDate:new Date(endDate),
            isMale: isMale === 'true', 
            isFeMale: isFeMale === 'true',
            isAboveAge: isAboveAge === 'true',
            isUnderAge: isUnderAge === 'true',
          }
       ))
      }, [location.search]);



     
    const filteredData=filterData(data,filters);

    const barChartData=caculateChartData(filteredData);

    const lineChartData=calculateLineChartData(filteredData,selectedBar);

    const onBarClick=(e,element)=>{
        console.log(element)
        const featureIndex={5:'A',4:'B',3:"C",2:'D',1:'E',0:'F'};
        setSelectedBar(featureIndex[element]);
    }


    if(isLoading){
        return <Loader/>
    }

    
    return(
        <div className="dashboardContainer">
            <FilterBar />

            <div className="header">
                <h1>This is Read Only Dashboard Shared by user</h1>
            </div>
            
            <div className="dashboard">
          
          <div className="chartContiner">
              <div className="chart">
                  <h2>BarChart</h2>
                  <BarChart data={barChartData} onBarClick={onBarClick}/>
              </div>
          
          </div>            
          <div className="chartContiner">
              <div className="chart">
                  <h2>LineChart </h2>
                  <h4>Feature: {selectedBar}</h4>
                  <LineChart data={lineChartData} />
              </div>
          
          </div>            
      </div>
        </div>
       
    )
}