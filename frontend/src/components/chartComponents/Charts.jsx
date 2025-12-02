import React from 'react'
import Chart from 'chart.js/auto';
import { useRef } from 'react';
import { useEffect } from 'react';

const Charts = ({options, width,height}) => {
   
  const chartRef = useRef(null)
  
   
   useEffect(() => {

        new Chart(chartRef.current, options)
   },[])

  return (
    <>
       <canvas ref={chartRef} id='canva' width={Number(width)} height={Number(height)} ></canvas>
    </>
  )
}

export default Charts