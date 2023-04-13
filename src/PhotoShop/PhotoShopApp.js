import React, { useState } from 'react';
import Slider from './Slider.jsx';
import SidebarItem from './SidebarItem.jsx';
import './PhotoShopApp.css'

export default function PhotoShopApp() {
    const [selectedOptionIndex,setSelectedOptionIndex] = useState(0);
    const [options,setOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex];

    function handleSliderChange({target}){
        setOptions(prev=>{
            return prev.map((options,index)=>{
                if(index!==selectedOptionIndex) return options;
                return {...options,value:target.value}
            })
        })
    }

    function getImageStyle(){
        const filters = options.map( opt=>{
            return `${opt.property}(${opt.value}${opt.unit})`
        })

        return {filter: filters.join(" ")}
    }


  return (
    <div className='container' >
        <div className="main-image" style={getImageStyle()}></div>
        <div className="sidebar">
            {options.map((option,index)=>(
                <SidebarItem 
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={()=>setSelectedOptionIndex(index)}
                />
            ))}
        </div>
        <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange = {handleSliderChange }
        />
    </div>
  )
}

const DEFAULT_OPTIONS =[
    {
        name: 'Brightness',
        property:"brightness",
        value: 100,
        range:{
            min: 0,
            max:200,
        },
        unit :'%'
    },
    {
        name: 'Contrast',
        property:"contrast",
        value: 100,
        range:{
            min: 0,
            max:200,
        },
        unit :'%'
    },
    {
        name: 'Saturation',
        property:"saturate",
        value: 100,
        range:{
            min: 0,
            max:200,
        },
        unit :'%'
    },
    {
        name: 'Grayscale',
        property:"grayscale",
        value: 0,
        range:{
            min: 0,
            max:100,
        },
        unit :'%'
    },
    {
        name: 'Sepia',
        property:"sepia",
        value: 0,
        range:{
            min: 0,
            max:100,
        },
        unit :'%'
    },
    {
        name: 'Hue Rotate',
        property:"hue-rotate",
        value: 0,
        range:{
            min: 0,
            max:360,
        },
        unit :'deg'
    },
    {
        name: 'Blur',
        property:"blur",
        value: 0,
        range:{
            min: 0,
            max:20,
        },
        unit :'px'
    },
]
