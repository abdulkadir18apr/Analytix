import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { fetchData, setAllFilters } from "../reducers/reducer";
import { caculateChartData, calculateLineChartData, filterData } from "../Utils/chartCalculations";
import {BarChart} from "../component/BarChart"
import Cookies from 'js-cookie';
import { LineChart } from "../component/LineChart";
import { FilterBar } from "../component/FilterBar";
import FilterPreferences from "../component/FilterPreferences";
import { Loader } from "../component/Loader";
import {toast} from "react-toastify";


import "./dashboard.scss";


export const Dashboard=()=>{

    const dispatch=useDispatch();
    const {isLoading,isAuthenticated,filters}=useSelector((state)=>state?.auth);
    const [data,setData]=useState([]);

    const [selectedBar,setSelectedBar]=useState('A');


    useEffect(()=>{
        const filters=Cookies.get('userPreferences');
        if(filters){
            const filterObj=JSON.parse(filters);
            dispatch(setAllFilters(filterObj))
            toast.success("Your Preferences Have Been Restored!")
            
        }

    },[])


    useEffect(()=>{
        dispatch(fetchData()).then((res)=>{
            setData(res.payload.data);
        })
    },[isAuthenticated])


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
        <>
        <div className="dashboardContainer">
            <FilterBar />
            
            <div className="dashboard">
          
          <div className="chartContiner">
              <div className="chart barchart">
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
      <FilterPreferences/>
        </div>
       
        </>
       
    )
}