import React from 'react'
import Datepicker from 'react-tailwindcss-datepicker';

function Datepicker() {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
      });
    
      const handleValueChange = (newValue) => {
        console.log("newValue: ", newValue);
        setValue(newValue);
      };

    return (
        <div>
        <Datepicker
            minDate={new Date()}
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
        />
        </div>
  )
}

export default Datepicker
