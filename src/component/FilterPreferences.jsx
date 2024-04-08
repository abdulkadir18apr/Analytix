import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import "./css/filterPreference.scss"


const FilterPreferences = () => {

    const { filters } = useSelector((state) => state.auth);
    const [showPrompt, setShowPromt] = useState(false);
    const [isUserPreferenceSaved,setIsUserPreferenceSaved] = useState(Cookies.get('userPreferences')?true:false)

    useEffect(() => {
        const preferenceTimeout = setTimeout(() => {
            setShowPromt(true);
            setIsUserPreferenceSaved(Cookies.get('userPreferences')?true:false)
        }, 3000);

       
        return () => clearTimeout(preferenceTimeout);
    }, [filters]);

    useEffect(()=>{
        const closePromtTimer=setTimeout(()=>{
            setShowPromt(false);
        },10000)
        return () => clearTimeout(closePromtTimer);
    },[showPrompt])

    const saveUserPreferences = () => {
        
        if(isUserPreferenceSaved){
            Cookies.remove('userPreferences');
        }
        Cookies.set('userPreferences', JSON.stringify(filters));
        toast.success("Cookies Saved");

        setIsUserPreferenceSaved(true)
        const closePromtTimer=setTimeout(()=>{
            setShowPromt(false)
        },4000)
        return () => clearTimeout(closePromtTimer);

    };

    const clearUserPreferences = () => {
        Cookies.remove('userPreferences');
        toast.success("cookies Cleared")
        setShowPromt(false);
    };

    return (
        <div className="filterPreference">
            {showPrompt &&
                <div className='preferenceBox'>
                    <h2>Save Filter Preferences</h2>
                    <button onClick={saveUserPreferences}>Capture Filters in Cookies</button>
                    {
                        isUserPreferenceSaved && <button onClick={clearUserPreferences}>Clear Cookies</button>
                    }
                </div>
            }

        </div>
    );
};

export default FilterPreferences;
