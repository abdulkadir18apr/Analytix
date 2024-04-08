
import {  useState } from "react";
import IconComponent from "./Icon";
import "./css/filterBar.scss"
import { BsCalendar,   } from 'react-icons/bs';
import { FaMale,FaFemale } from "react-icons/fa";
import DatePickerModal from "./DatePickerModal";
import {useDispatch,useSelector} from "react-redux";
import { setLogout, setAgeFilter, setGenderFilter } from "../reducers/reducer";
import {serializeFilters } from "../Utils/searializeFilters";
import { copyToClipboard } from "../Utils/clipboard";
import { useNavigate } from 'react-router-dom';


export const FilterBar=()=>{

    const [dateModal,setDateModal]=useState(false);
    const [toggleFilter,setToggleFilter]=useState(false)
    const isPreviewDashboard = location.pathname === '/previewDashboard';
    const navigate=useNavigate();


    const isOpen=()=>setDateModal(true);
    const onClose=()=>setDateModal(false);

    const {filters}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const handleAgeFilter=(e)=>{
        dispatch(setAgeFilter(e.target.value))
    }
    const handleIconClick=(e,gender)=>{
        e.stopPropagation()
        dispatch(setGenderFilter(gender))
    }

    const handleLogout=()=>{
        console.log("called");
        dispatch(setLogout()).then(res=>console.log(res))
    }


    const handleNavigation=()=>{
        navigate("/dashboard")
    }

    const handleShareLink=async()=>{
        const serializedFilters=serializeFilters(filters);

        const baseURL=import.meta.env.VITE_URL;
        const pathname="/previewDashboard"
        const search = new URLSearchParams(serializedFilters)
        const url = new URL(pathname, baseURL);
        url.search = search;
        const urlString = url.toString();
        const copiedLink=await copyToClipboard(urlString)
        console.log(copiedLink)
    }
  

    return (
        <>
        {
            dateModal && <DatePickerModal isOpen={isOpen} onClose={onClose} />
        }
        <div className={`filterBarContainer`}>
            <div className="filterBtn">
           
                   <button  onClick={()=>{setToggleFilter(!toggleFilter)}}><h2>Filters:</h2></button>
                
            </div>
          
            <div className={`filters ${!toggleFilter?"hide":"show"}`}>
                <div className="date">
                    <button className="filterBtns" onClick={()=>setDateModal((prev)=>!prev)}  disabled={isPreviewDashboard?true:false}>
                    <IconComponent Icon={BsCalendar} color="black" size={32} />
                    </button>
                </div>
                <div className="age">
                <button className={`filterBtns ${filters.isUnderAge?'active':''}`}
                value={"underAge"}
                onClick={handleAgeFilter} disabled={isPreviewDashboard?true:false} >15-25</button>
                <button className={`filterBtns ${filters.isAboveAge?'active':''}`}  
                value={"aboveAge"}
                onClick={handleAgeFilter}
                disabled={isPreviewDashboard?true:false}
                
                >25-80</button>
                </div>
                <div className="gender">
                    <button  className={`filterBtns ${filters.isMale?'active':''}`} value={'male'}   onClick={(e)=>handleIconClick(e,'male')} disabled={isPreviewDashboard?true:false}>
                    <IconComponent Icon={FaMale} color="black" size={32} onClick={(e)=>handleIconClick(e,'male')} />
                    </button>

                    <button className={`filterBtns ${filters.isFeMale?'active':''}`}  onClick={(e)=>handleIconClick(e,'female')} disabled={isPreviewDashboard?true:false}>
                    <IconComponent Icon={FaFemale} color="black" size={32}  onClick={(e)=>handleIconClick(e,'female')}  />
                    </button>
                </div>
            </div>
            <div className="menu">
                {!isPreviewDashboard && <button className="shareButton" onClick={handleShareLink}>Share Link</button>}
                {isPreviewDashboard && <button className="shareButton" onClick={handleNavigation}>Your Dashboard</button>}
                <button className="logoutButton" onClick={handleLogout}>Logout</button>`
            </div>
            
        </div>
        </>
    )
}