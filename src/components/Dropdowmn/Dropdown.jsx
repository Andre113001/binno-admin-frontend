import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown(props) {
    const {height = "35px", width = "179px", background = "", selected, onSelect} = props

    const [verdict, setVerdict] = React.useState(selected);

    const handleChange = (event) => {
        setVerdict(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={verdict}
                    // label="Age"
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
                    <MenuItem value={1}>Approve for interview</MenuItem>
                    <MenuItem value={2}>Reject Applicattion</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
