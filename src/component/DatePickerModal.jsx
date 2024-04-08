import  { useState } from 'react';
import Modal from 'react-modal';
import { DateRangePicker } from 'react-date-range';
import { useSpring, animated } from 'react-spring';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import {useDispatch,useSelector} from "react-redux";
import "./css/modal.css"
import { setDateRangeFilter } from '../reducers/reducer';

Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const DatePickerModal = ({ isOpen, onClose, }) => {
    const dispatch=useDispatch();
    const {filters}=useSelector((state)=>state.auth)

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
      key: 'selection'
    }
  ]);


  const modalStyles = useSpring({
    to: { opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0 },
    from: { opacity: 0, scale: 0 }
  });

  const handleRangeChange = range => {
    setSelectedRange([range.selection]);
  };

  const handleApply = () => {
    
    dispatch(setDateRangeFilter({startDate:selectedRange[0].startDate,endDate:selectedRange[0].endDate})  ) 
    onClose();
  };

  const handleCancel = () => {

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Date Picker Modal"
      style={{ overlay: { background: 'rgba(0, 0, 0, 0.5)' } }}
    >
      <animated.div style={modalStyles} className="modal-content">
        <h2>Select a Date Range</h2>
        <DateRangePicker
          ranges={selectedRange}
          onChange={handleRangeChange}
          rangeColors={['#007bff']}
        />
        <div className="modal-buttons">
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </animated.div>
    </Modal>
  );
};

export default DatePickerModal;
