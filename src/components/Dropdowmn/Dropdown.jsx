import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown(props) {
    const { height = "35px", width = "179px", background = "", selected, onSelect, options } = props;

    const [verdict, setVerdict] = React.useState(selected);

    const handleChange = (event) => {
        setVerdict(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    value={verdict}
                    onChange={handleChange}
                    sx={{
                        height: height,
                        width: width,
                        paddingLeft: '21px',
                        borderRadius: '10px',
                        "& MuiSelect-select": {
                            paddingLeft: "21px",
                        },
                        background: background === '' ? 'inherit' : background
                    }}
                    {...props}
                >
                    {options?.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
