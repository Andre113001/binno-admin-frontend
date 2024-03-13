import { Fragment, useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import Moment from "react-moment";

import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import logo from "../../assets/binno.svg";

import { LineChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import useHttp from "../../hooks/http-hook";

import Sidebar from "../../components/Sidebar/Sidebar";
import Back from "../../components/Back/Back";

import styles from "./Reports.module.css";

const Reports = () => {
  const [selectedRange, setSelectedRange] = useState("This Week");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const contentToPrint = useRef(null);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const { sendRequest, isLoading } = useHttp();
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState();

  const [newsletterY, setNewsletterY] = useState([]);
  const [newsletterX, setNewsletterX] = useState([]);
  const [blogY, setBlogY] = useState([]);
  const [blogX, setBlogX] = useState([]);
  const [postY, setPostY] = useState([]);
  const [postX, setPostX] = useState([]);
  const [guideY, setGuideY] = useState([]);
  const [guideX, setGuideX] = useState([]);
  const [eventY, setEventY] = useState([]);
  const [eventX, setEventX] = useState([]);

  const [recentEnablers, setRecentEnablers] = useState([]);
  const [recentCompanies, setRecentCompanies] = useState([]);

  useEffect(() => {
    const fetchDateTime = () => {
      const now = moment().tz("Asia/Manila"); // Get current date and time for the Philippines
      setCurrentDateTime(now.format("LLLL")); // Format the date and time as desired
    };

    fetchDateTime(); // Initial call
    const interval = setInterval(fetchDateTime, 1000); // Update every second

    handleChangeRange({ target: { value: "This Week" } });

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleChangeRange = async (event) => {
    const range = event.target.value;
    console.log(range);
    setSelectedRange(range);
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/reports`,
      method: "POST",
      body: JSON.stringify({
        range: range,
      }),
    });

    setFetchedData(res);

    setRecentEnablers(res.memberStat.recent_enablers);
    setRecentCompanies(res.memberStat.recent_companies);

    // Initialize Arrays
    let subscribeRes = res.newsletterStat.total_stat_count;
    let blogRes = res.blogStat.total_stat_count;
    let postRes = res.postStat.total_stat_count;
    let guideRes = res.guideStat.total_stat_count;
    let eventRes = res.eventStat.total_stat_count;

    const blog_dates = blogRes.map((item) =>
      moment(item.stat_date).format("MM/DD")
    );
    const post_dates = postRes.map((item) =>
      moment(item.stat_date).format("MM/DD")
    );
    const event_dates = eventRes.map((item) =>
      moment(item.stat_date).format("MM/DD")
    );
    const guide_dates = guideRes.map((item) =>
      moment(item.stat_date).format("MM/DD")
    );

    const blog_counts = blogRes.map((item) => item.stat_count);
    const post_counts = postRes.map((item) => item.stat_count);
    const event_counts = eventRes.map((item) => item.stat_count);
    const guide_counts = guideRes.map((item) => item.stat_count);

    const subscriberCounts = subscribeRes.map((item) => item.subscriber_count);
    const subscribeWeek = subscribeRes.map((item) =>
      moment(item.stat_date).format("MM/DD")
    );

    setBlogY(blog_counts);
    setBlogX(blog_dates);

    setPostY(post_counts);
    setPostX(post_dates);

    setEventY(event_counts);
    setEventX(event_dates);

    setGuideY(guide_counts);
    setGuideX(guide_dates);

    setNewsletterY(subscriberCounts);
    setNewsletterX(subscribeWeek);
    // console.log("newsletetter x: ", res.newsletterStat.total_stat_count);
  };

  const handleCustomStartDateChange = (event) => {
    setCustomStartDate(event.target.value);
  };

  const handleCustomEndDateChange = (event) => {
    setCustomEndDate(event.target.value);
  };

  const getXAxisData = () => {
    // Generate x-axis data based on the selected time period
    if (selectedRange === "This Week") {
      const xAxisData = new Array(31).fill(""); // Assuming 31 days in a month

      // Parse and insert subscribeWeek into the xAxisData array
      newsletterX.forEach((date, index) => {
        xAxisData[index] = date;
      });

      return xAxisData;
    } else if (selectedRange === "This Month") {
      return [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ]; // Example data for a month
    } else if (selectedRange === "This Year") {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]; // Example data for a year
    }
  };

  const handleExportPDF = useReactToPrint({
    documentTitle: `BiNNO Report - ${currentDateTime}`,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  console.log({
    blog: fetchedData?.blogStat.total,
    event: fetchedData?.eventStat.total,
    guide: fetchedData?.guideStat.total,
    post: fetchedData?.postStat.total,
  });

  return (
    <Fragment>
      <header>
        <Sidebar />
      </header>
      <main className="container">
        <Back link={"/dashboard"} />
        <div className={styles["heading"]}>
          <h1 className={styles["heading-title"]}>Reports</h1>
          <div className={styles["print-btn"]}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#FF7A00",
                p: 2,
              }}
              onClick={() => {
                handleExportPDF(null, () => contentToPrint.current);
              }}
              disabled={isLoading}
            >
              Print to PDF
            </Button>
          </div>
        </div>

        <div ref={contentToPrint} className={styles["printable"]}>
          <div className={styles["logo-img"]}>
            <img src={logo} />
          </div>
          <section className={styles["heading-date"]}>
            <div className={styles["date"]}>
              <section>
                <span>As of:</span>
                {selectedRange === "This Week" && (
                  <>
                    <h1 className={styles["day"]}>
                      <Moment format="dddd">{currentDateTime}</Moment>
                    </h1>
                    <h1 className={styles["full-date"]}>
                      <Moment format="MMMM DD, YYYY">{currentDateTime}</Moment>
                    </h1>
                  </>
                )}
                {selectedRange === "This Month" && (
                  <>
                    <h1 className={styles["day"]}>
                      <Moment format="MMMM">{currentDateTime}</Moment>
                    </h1>
                    <h1 className={styles["full-date"]}>
                      <Moment format="YYYY">{currentDateTime}</Moment>
                    </h1>
                  </>
                )}
                {selectedRange === "This Year" && (
                  <>
                    <h1
                      className={styles["day"]}
                      style={{ fontSize: 100, marginBottom: 60 }}
                    >
                      <Moment format="YYYY">{currentDateTime}</Moment>
                    </h1>
                  </>
                )}
              </section>
            </div>
            <div className={styles["date-range"]}>
              <div>
                <RadioGroup value={selectedRange} onChange={handleChangeRange}>
                  <FormControlLabel
                    value="This Week"
                    control={<Radio />}
                    label="This Week"
                  />
                  <FormControlLabel
                    value="This Month"
                    control={<Radio />}
                    label="This Month"
                  />
                  <FormControlLabel
                    value="This Year"
                    control={<Radio />}
                    label="This Year"
                  />
                  {/* <FormControlLabel value="Custom Range" control={<Radio />} label="Custom Range" />
                                    {selectedRange === 'Custom Range' && (
                                        <>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Start Date"
                                                    value={customStartDate}
                                                    onChange={(newValue) => setCustomStartDate(newValue)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                <DatePicker
                                                    label="End Date"
                                                    value={customEndDate}
                                                    onChange={(newValue) => setCustomEndDate(newValue)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </>
                                    )} */}
                </RadioGroup>
              </div>
            </div>
          </section>

          {isLoading ? (
            <Fragment>
              <Skeleton variant="text" width={"20%"} height={60} />{" "}
              {/* Adjust width and height as needed */}
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={200}
              />{" "}
              {/* Adjust width and height as needed */}
              {/* Add more Skeleton components as needed */}
            </Fragment>
          ) : (
            <Fragment>
              <h1 className={styles["section-title"]}>Members</h1>
              <section className={styles["members-section"]}>
                <div className={`${styles["members-pie-chart"]}`}>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: fetchedData?.memberStat.count_enablers,
                            label: "Enabler",
                            color: "#2c90c8",
                          },
                          {
                            id: 1,
                            value: fetchedData?.memberStat.count_company,
                            label: "Company",
                            color: "#ff7a00",
                          },
                        ],
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 45,
                        paddingAngle: 3,
                        innerRadius: 35,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 22,
                        itemMarkHeight: 10,
                        markGap: 10,
                        itemGap: 22,
                      },
                    }}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: "white",
                        fontSize: 50,
                        fontWeight: "bold",
                      },
                    }}
                    width={700}
                    height={500}
                  />
                </div>

                <div className={styles["recently-joined"]}>
                  <div className={styles["recently-joined-header"]}>
                    <h2>Recently Joined</h2>
                  </div>
                  <div className={styles["startup-box"]}>
                    <h3>Startup Companies</h3>
                    <div className={styles["list"]}>
                      {recentCompanies.length === 0 ? (
                        <div className={styles["list-item"]}>
                          <p style={{ fontWeight: "bold" }}>No results found</p>
                        </div>
                      ) : (
                        recentCompanies.map((company, index) => (
                          <div
                            className={styles["list-item"]}
                            key={index}
                            onClick={() => {
                              navigate(`/membership/${company.member_id}`);
                            }}
                          >
                            {/* <div className={styles['list-img']} style={{backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Glastonbury2022_%28235_of_413%29_%2852181386307%29_%28cropped%29.jpg/800px-Glastonbury2022_%28235_of_413%29_%2852181386307%29_%28cropped%29.jpg)`}}>
                                                            &nbsp;
                                                        </div> */}
                            {/* <div className={styles['list-divider']} /> */}
                            <div className={styles["list-details"]}>
                              <p>
                                <b>{company.setting_institution}</b>
                              </p>
                              <p>{company.setting_address}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className={styles["startup-box"]}>
                    <h3>Startup Enablers</h3>
                    <div className={styles["list"]}>
                      {recentEnablers.length === 0 ? (
                        <p style={{ fontWeight: "bold" }}>No results found</p>
                      ) : (
                        recentEnablers.map((enabler, index) => (
                          <div
                            className={styles["list-item"]}
                            key={index}
                            onClick={() => {
                              navigate(`/membership/${enabler.member_id}`);
                            }}
                          >
                            <div className={styles["list-details"]}>
                              <p>
                                <b>{enabler.setting_institution}</b>
                              </p>
                              <p>{enabler.setting_address}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className={styles["more-btn"]}>
                    <Button
                      sx={{ w: 10 }}
                      fullWidth
                      onClick={() => {
                        navigate("/membership");
                      }}
                    >
                      See More
                    </Button>
                  </div>
                </div>
              </section>

              <hr className={styles["custom-hr"]} />

              <h3 className={styles["section-title"]}>Contents</h3>
              <section className={styles["content-section"]}>
                <div className={styles["content-graph"]}>
                  <LineChart
                    xAxis={[
                      {
                        data: getXAxisData(),
                        scaleType: "point",
                        label: "Duration",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Content Count",
                      },
                    ]}
                    series={[
                      {
                        data: blogY,
                        label: "Blogs",
                        color: "#ff0000", // Red color for Blogs
                      },
                      {
                        data: eventY,
                        label: "Events",
                        color: "#00ff00", // Green color for Events
                      },
                      {
                        data: guideY,
                        label: "Guides",
                        color: "#0000ff", // Blue color for Guides
                      },
                      {
                        data: postY,
                        label: "Posts",
                        color: "#ff00ff", // Magenta color for Posts
                      },
                    ]}
                    width={950}
                    height={450}
                  />
                </div>
                <div className={styles["content-metrics"]}>
                  <div className={styles["metrics"]}>
                    <h1 className={styles["metric-number"]}>
                      {isLoading ? (
                        <CircularProgress />
                      ) : fetchedData?.postStat.total === null ? (
                        0
                      ) : (
                        fetchedData?.postStat.total
                      )}
                    </h1>
                    <h5 className={styles["metric-type"]}>Posts</h5>
                  </div>

                  <div className={styles["metrics"]}>
                    <h1 className={styles["metric-number"]}>
                      {isLoading ? (
                        <CircularProgress />
                      ) : fetchedData?.blogStat.total === null ? (
                        0
                      ) : (
                        fetchedData?.blogStat.total
                      )}
                    </h1>
                    <h5 className={styles["metric-type"]}>Blogs</h5>
                  </div>

                  <div className={styles["metrics"]}>
                    <h1 className={styles["metric-number"]}>
                      {isLoading ? (
                        <CircularProgress />
                      ) : fetchedData?.eventStat.total === null ? (
                        0
                      ) : (
                        fetchedData?.eventStat.total
                      )}
                    </h1>
                    <h5 className={styles["metric-type"]}>Events</h5>
                  </div>

                  <div className={styles["metrics"]}>
                    <h1 className={styles["metric-number"]}>
                      {isLoading ? (
                        <CircularProgress />
                      ) : fetchedData?.guideStat.total === null ? (
                        0
                      ) : (
                        fetchedData?.guideStat.total
                      )}
                    </h1>
                    <h5 className={styles["metric-type"]}>Guides</h5>
                  </div>
                </div>
              </section>

              <hr className={styles["custom-hr"]} />

              <h1 className={styles["section-title"]}>
                Newsletter Subscribers
              </h1>
              <section className={styles["newsletter-section"]}>
                <div className={styles["newsletter-metric"]}>
                  <h1 className={styles["newsletter-metric-number"]}>
                    {isLoading ? (
                      <CircularProgress />
                    ) : fetchedData?.newsletterStat.total_subscriber === null ||
                      0 ? (
                      0
                    ) : (
                      fetchedData?.newsletterStat.total_subscriber
                    )}
                  </h1>
                  <span className={styles["newsletter-metric-label"]}>
                    Total Subscribers
                  </span>
                </div>

                <div className={styles["newsletter-graph"]}>
                  <LineChart
                    xAxis={[
                      {
                        data: getXAxisData(),
                        scaleType: "point",
                        label: "Duration",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Subscriber Count",
                      },
                    ]}
                    series={[
                      {
                        data: newsletterY,
                      },
                    ]}
                    width={700}
                    height={400}
                  />
                </div>
              </section>
            </Fragment>
          )}

          <footer>
            <span>Copyright 2024 BU-CTCED</span>
            <span>Printed: {currentDateTime}</span>
          </footer>
        </div>
      </main>
    </Fragment>
  );
};

export default Reports;
