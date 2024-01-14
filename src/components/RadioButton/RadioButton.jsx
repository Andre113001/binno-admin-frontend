import * as React from 'react'
import Radio from '@mui/material/Radio'

import styles from './RadioButton.module.css'

export default function RadioButton(props) {
    const { data, onSelect, selected } = props

    const [selectedValue, setSelectedValue] = React.useState(selected)

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
        onSelect(event.target.value)
    }

    const content = data.map((value) => (
        <div className={`${styles['radio-button']}`}>
            <Radio
                checked={selectedValue === value}
                onChange={handleChange}
                value={value}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
                sx={{
                    color: '#BEBEBE',
                    '&.Mui-checked': {
                        color: '#616161',
                    },
                }}
            />
            <p>{value}</p>
        </div>
    ))

    return (
        <div className={`${styles['container']}`} {...props}>
            {content}
        </div>
    )
}
