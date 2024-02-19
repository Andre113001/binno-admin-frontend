import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton from Material-UI

import styles from './MembershipManagement.module.css';
import processingStyle from '../ApplicationProcessing/ApplicationProcessing.module.css';
import SearchIcon from "@mui/icons-material/Search";
import { Email, ExpandMore } from "@mui/icons-material"

// import Topbar from "../../components/Topbar/Topbar";
import Back from "../../components/Back/Back";
import Moment from "react-moment";
import Dropdown from "../../components/Dropdowmn/Dropdown";
import ActivitiesList from "./ActivityList";
import { 
    TextField, 
    Button, 
    Pagination, 
    Divider, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Tabs, 
    Tab, 
    Typography,
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    IconButton
} from "@mui/material";
import MembershipManagementList from "./MembershipManagementList";
import Topbar from "../../components/Topbar/Topbar";
import useHttp from "../../hooks/http-hook";
import { makeStyles } from '@mui/system';

const MemberView = () => {
    const [ members, setMembers ] = useState();
    const [ memberDetails, setMemberDetails ] = useState();
    const { sendRequest, isLoading} = useHttp();
    const [selectedOption, setSelectedOption] = useState(0); // Initial selected option
    const [selection, setSelection] = useState([]);
    const [ appCount, setAppCount ] = useState();
    const navigate = useNavigate();
    const member_id = useParams();
    const [memberType, setMemberType] = useState();
    const [contents, setContents] = useState();
    const [expandedIndex, setExpandedIndex] = useState(null);


    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Set the number of items per page
    const [contentPage, setContentPage] = useState(1); // State for current page of contents
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [contentSearch, setContentSearch] = useState(""); // State for search term

    // console.log(member_id.member_id);

    const fetchContent = async (link) => {
        const result = await sendRequest({
            url: link,
        });

        return result;
    }

    const handleSelect = async (event, newValue) => {
        setSelectedOption(newValue);
        let res;
        
        switch (selection[newValue]) {
            case 'Events':
                res = await fetchContent(`${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/events/user/${member_id.member_id}`);
                break;
            case 'Blogs':
                res = await fetchContent(`${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/blogs/user/${member_id.member_id}`);
                break;
            case 'Guides':
                res = await fetchContent(`${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/programs/user/${member_id.member_id}`);
                break;            
            case 'Posts':
                res = await fetchContent(`${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/posts/user/${member_id.member_id}`);
                break;
            default:
                console.log("Error");
        }

        setContents(res);
    };

    useEffect(() => {
        const loadData = async () => {
            const result = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/members/member/${member_id.member_id}`,
            });
    
            setMemberDetails(result[0]);
            
            if (result[0].member_type === 2) {
                setMemberType('Startup Enabler');
                setSelection(['Blogs', 'Events', 'Guides']);
                handleSelect(null, 0); // Trigger content fetching for the default selected option
            } else {
                setMemberType('Startup Company');
                setSelection(['Posts', 'Events']);
            }
        }
    
        const loadActivities = async () => {
            const result = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/get/activities/${member_id.member_id}`,
            });
            setActivities(result);
        };
    
        loadData();
        loadActivities();
    }, [member_id]);
    

    useEffect(() => {
        const loadData = async () => {
            handleSelect(null, 0); 
        }

        loadData();
    }, [selection])
    

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter items based on search term
    const filteredItems = activities.filter((activity) =>
        Object.values(activity).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Get current items based on search and pagination
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };

    const handleContentSearchChange = (event) => {
        setContentSearch(event.target.value)
    }

    const handleToggle = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    // console.log('Member Details: ', memberDetails);
    // console.log(memberDetails.setting_coverpic);

    return (
        <Fragment>
            <Topbar />
            <div className="container">
                <div onClick={() => navigate(-1)}>
                    <Back />
                </div>

                {memberDetails && (
                    <div className="relative w-full"> 
                    {/* Cover photo */}
                    <div className="absolute inset-0 bg-cover bg-center rounded-lg shadow-lg" style={{backgroundImage: `url("${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/images?filePath=profile-cover-img/${memberDetails.setting_coverpic}")` || null}}>
                        {/* Profile photo */}
                        <div className="absolute bottom-[-65px] right-20 transform -translate-x-1/2 mb-[-20px] z-10">
                            <img src={`${import.meta.env.VITE_BACKEND_DOMAIN_MEMBERS}/images?filePath=profile-img/${memberDetails.setting_profilepic}` || null} className="w-[170px] h-[170px] rounded-full border-4 bg-gray-200" />
                        </div>
                    </div>

                    
                    {/* Content */}
                    <div className="p-[120px]">
                        &nbsp;
                    </div>
                </div>
                )}

                <div className={`${styles['management-title']}`}>
                    <div className={`${styles['title']}`}>
                        {/* Conditional rendering using ternary operator */}
                        {memberDetails ? (
                            <h1>{memberDetails.setting_institution}</h1>
                        ) : (
                            // Display Skeleton if memberDetails is not loaded
                            <Skeleton animation="wave" variant="text" width={200} />
                        )}
                    </div>

                    
                </div>
                
                <div className={`${processingStyle["about"]}`}>
                    <p>{memberType}</p>
                    <p>{memberDetails?.setting_address}</p>
                    <p>{memberDetails?.contact_number}</p>
                </div>

                
                <Button
                        // variant="contained"
                        startIcon={<Email />}
                        onClick={() => window.open(`mailto:${memberDetails?.email_address}`)}
                    >
                        Send an Email to {memberDetails?.setting_institution}
                    </Button>

                    <div className={`${processingStyle["filters"]}`}>
                        <div className={`${processingStyle["section_1"]}`}>
                            <Tabs
                                value={selectedOption}
                                onChange={(event, newValue) => handleSelect(event, newValue)}
                                aria-label="Horizontal tabs"
                            >
                                {selection.map((item, index) => (
                                    <Tab key={index} label={item}  />
                                ))}
                            </Tabs>
                        </div>

                        <div>
                            {/* <div>
                                <TextField
                                    placeholder="Search"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        height: "35px",
                                        width: '398px',
                                        "& input": {
                                            padding: "6px 0 6px 0",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                        },
                                    }}
                                    onChange={handleContentSearchChange}
                                    value={contentSearch}
                                />
                        </div> */}
                    </div>
                </div>

                <div className={`${processingStyle["application-processing-table"]}`}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Content ID</TableCell>
                                <TableCell>Content Name</TableCell>
                                <TableCell>Date Created</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {contents?.slice((contentPage - 1) * 4, contentPage * 4).map((content, index) => (
                            <>
                                <TableRow key={index} onClick={() => handleToggle(index)} style={{ cursor: 'pointer' }}>
                                    <TableCell>{content.event_id || content.blog_id || content.program_id || content.post_id}</TableCell>
                                    <TableCell>{content.event_title || content.blog_title || content.program_heading || content.post_heading}</TableCell>
                                    <TableCell>
                                        <Moment format="MMMM DD, YYYY">
                                            {content.event_datecreated || content.blog_dateadded || content.program_dateadded || content.post_dateadded}
                                        </Moment>
                                    </TableCell>
                                </TableRow>
                                {index === expandedIndex && (
                                    <TableRow>
                                        <TableCell colSpan={4}> {/* Span the Accordion across all columns */}
                                            {index === expandedIndex && (
                                                <Accordion
                                                    fullWidth
                                                    expanded={index === expandedIndex}
                                                    onChange={() => handleToggle(index)}
                                                    sx={{
                                                        boxShadow: 'none', // Remove the box shadow
                                                        border: 'none', // Remove the border
                                                        backgroundColor: 'transparent', // Make the background transparent
                                                        '& .MuiAccordionSummary-root': {
                                                            borderBottom: 'none', // Remove the bottom border of the summary
                                                        },
                                                        '& .MuiAccordionSummary-content': {
                                                            margin: 0, // Remove margin to make it align with the table rows
                                                        },
                                                        '& .toggleButton': {
                                                            display: 'none', // Hide the toggle button inside the Accordion
                                                        },
                                                    }}
                                                >
                                                    <AccordionDetails>
                                                        {/* Content details here */}
                                                        <Typography variant="h4">
                                                            {content.event_title || content.blog_title || content.program_heading || content.post_heading}
                                                        </Typography>
                                                        <Typography mt={2}>
                                                            {content.event_description || content.blog_content || content.post_bodytext}
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))}
                    </TableBody>
                    </Table>
                </div>

                {contents?.length > 4 && (
                        <Pagination
                        count={Math.ceil(contents?.length / 4)}
                        page={contentPage}
                        onChange={(event, value) => setContentPage(value)} // Update the contentPage state
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            my: 5,
                            "& .MuiPaginationItem-root": {
                                color: '#424864',
                            },
                            "& .MuiPaginationItem-page.Mui-selected": {
                                backgroundColor: '#ff7a01',
                                color: '#fff',
                            },
                        }}
                    />
                )}
                
                <Divider />

                    <div className={`${styles['management-title']}`}>
                        <div className={`${styles['title']}`}>
                            {/* Conditional rendering using ternary operator */}
                            {memberDetails ? (
                                <h2>Recent Activities</h2>
                            ) : (
                                // Display Skeleton if memberDetails is not loaded
                                <Skeleton animation="wave" variant="text" width={200} />
                            )}
                        </div>
                    </div>

                    <div className={`${processingStyle["filters"]}`}>
                    &nbsp;
                    <div>
                        <div>
                            <TextField
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    height: "35px",
                                    width: "398px",
                                    "& input": {
                                        padding: "6px 0 6px 0",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                                onChange={handleSearchChange}
                                value={searchTerm}
                            />
                        </div>
                    </div>
                </div>

                    <div
                        className={`${processingStyle["application-processing-table"]}`}
                    >
                        <table width={"100%"}>
                            <thead>
                                <tr
                                    className={`${processingStyle["table-heading"]}`}
                                >
                                    <th>Activity ID</th>
                                    <th>Member ID</th>
                                    <th>Name of Activity</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody className={`${processingStyle["table-body"]}`}>
                                {currentItems.map((activity) => (
                                    <tr
                                        className={`${processingStyle["table-row"]}`}
                                        key={activity.history_id}
                                    >
                                        <ActivitiesList item={activity} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {currentItems.length > 6 && (
                        <Pagination
                            count={Math.ceil(filteredItems.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                my: 5,
                                "& .MuiPaginationItem-root": {
                                    color: '#424864', // Set your desired color for pagination item
                                },
                                "& .MuiPaginationItem-page.Mui-selected": {
                                    backgroundColor: '#ff7a01', // Set your desired background color for selected page
                                    color: '#fff', // Set your desired text color for selected page
                                },
                            }}
                        />
                    )}
                    </div>
            </div> 
        </Fragment>
    );
};

export default MemberView;
