import { Fragment, useState, useRef } from 'react';
import { Print } from 'react-to-print';
import styles from './Reports.module.css';

import Topbar from '../../components/Topbar/Topbar';

import { LineChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { Tabs, Tab, Select, MenuItem, Button } from '@mui/material';

function TestComponents() {
  const [tabIndex, setTabIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState('week');
  const containerRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const getXAxisData = () => {
    // Generate x-axis data based on the selected time period
    if (timePeriod === 'week') {
      return [1, 2, 3, 4, 5, 6, 7]; // Example data for a week
    } else if (timePeriod === 'month') {
      return [
        '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
        '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th',
        '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'
      ]; // Example data for a month
    } else if (timePeriod === 'year') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Example data for a year
    }
  };

  // const handlePrint = () => {
  //   const container = containerRef.current;
  //   if (container) {
  //     window.print();
  //   }
  // }

  return (
    <Fragment>
      <Topbar className={`${styles['print-hidden']}`} />
      <div className={`${styles['container']}`} ref={containerRef}>
        <Button variant='contained' className={`${styles['print-hidden']}`}>
          Print
        </Button>
        <main className={`${styles['main-contents']}`}>
          <div className={`${styles['row']}`}>
            <div className={`${styles['col']}`}>
              <h1>Members</h1>
              <div className={`${styles['members-chart-container']}`}>
                <div className={`${styles['members-pie-chart']}`}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'Enabler', color: '#2c90c8' },
                          { id: 1, value: 15, label: 'Company', color: '#ff7a00' },
                        ],
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        arcLabel: (item) => `${item.value} (${item.label})`,
                        arcLabelMinAngle: 45,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 22,
                        itemMarkHeight: 10,
                        markGap: 10,
                        itemGap: 22,
                      }
                    }}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                      },
                    }}
                    width={500}
                    height={250}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles['col']}`}>
              <div className={`${styles['dropdown-container']}`}>
                <h1>Newsletter</h1>
                <Select
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  className={`${styles['dropdown']}`}
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>
              </div>
              <div className={`${styles['newsletter-container']}`}>
                <div className={`${styles['newsletter-line-graph']}`}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    width={500}
                    height={250}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles['dropdown-container']}`}>
              <h1>Contents</h1>
              <Select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className={`${styles['dropdown']}`}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.mui-focused .muioutlinedinput-notchedoutline": {
                  border: "1px solid #484850",
                  borderradius: "5px 5px 0 0"
                }, }}
                
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </div>
            
          <div className={`${styles['content-graph-container']}`}>
            <LineChart
              xAxis={[{ 
                data: getXAxisData(),
                scaleType: 'point'
              }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  label: 'Blogs',
                  color: '#ff0000' // Red color for Blogs
                },
                {
                  data: [1, 3, 2, 7, 2.5, 4],
                  label: 'Events',
                  color: '#00ff00' // Green color for Events
                },
                {
                  data: [0.5, 1, 1.5, 3, 4, 2],
                  label: 'Guides',
                  color: '#0000ff' // Blue color for Guides
                },
                {
                  data: [3, 4, 2.5, 6, 3.5, 5],
                  label: 'Posts',
                  color: '#ff00ff' // Magenta color for Posts
                },
              ]}
              width={950}
              height={450}
            />
          </div>

          <div className={`${styles['content-metrict-container']}`}>
            <div className={`${styles['vertical-sort']}`}>
              <Tabs
                orientation="vertical"
                value={tabIndex}
                onChange={handleTabChange}
              >
                <Tab label="All" />
                <Tab label="Blogs" />
                <Tab label="Events" />
                <Tab label="Posts" />
                <Tab label="Guides" />
              </Tabs>
            </div>
            
            <div className={`${styles['content-metrics']}`}>    
              <div className={`${styles['content-metrics-child']}`}>
                <h2>This Day</h2>
                <h1>20</h1>
              </div>

              <div className={`${styles['content-metrics-child']}`}>
                <h2>This Week</h2>
                <h1>87</h1>
              </div>

              <div className={`${styles['content-metrics-child']}`}>
                <h2>This Month</h2>
                <h1>342</h1>
              </div>

              <div className={`${styles['content-metrics-child']}`}>
                <h2>This Year</h2>
                <h1>1229</h1>
              </div>
            </div>
          </div>

        </main>
      </div>
    </Fragment>
  )
}

export default TestComponents;
