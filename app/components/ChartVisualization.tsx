import React from 'react'
import {ResponsivePie} from "@nivo/pie"
import {Box, Typography, useTheme} from "@mui/material"

 


const sampleData=[
  {
    id: "athleisure",
    label: "Athleisure (Hoodies, Leggings)",
    value: 18240,
    color: "hsl(160, 70%, 45%)"
  },
  {
    id: "denim",
    label: "Denim & Jeans",
    value: 14650,
    "color": "hsl(220, 70%, 50%)"
  },
  {
    id: "basics",
    label: "Basics & T-Shirts",
    value: 9820,
    color: "hsl(40, 90%, 55%)"
  },
  {
    id: "outerwear",
    label: "Outerwear & Jackets",
    value: 8400,
    color: "hsl(0, 70%, 60%)"
  },
  {
    id: "accessories",
    label: "Accessories (Socks, Hats)",
    value: 3140,
    color: "hsl(280, 60%, 60%)"
  }
]

const formattedData=sampleData.map((data)=>({
    id: data.id,
    label:data.label,
    value:data.value,
    color:data.color
}))
const ChartVisualization = () => {
    const theme=useTheme()
    const colors=[
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500]
 ]
   
  return (
        <ResponsivePie
            data={formattedData}
            theme={{
                axis:{
                    domain:{
                        line:{
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend:{
                        text:{
                            fill: theme.palette.secondary[200]
                        }
                    },
                    ticks:{
                        line:{
                            stroke: theme.palette.secondary[200],
                            strokeWidth:1
                        },
                        text:{
                            fill: theme.palette.secondary[200]
                        }
                    }
                },
                legends:{
                    text:{
                        fill: theme.palette.secondary[200]
                    }
                },
                tooltip:{
                    container:{
                        color: theme.palette.primary.main,
                    }
                }
            }}
            color={{datum:"data.color"}}
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [["darker",2]]
            }}
            arcLinmkLabelsTextColor={theme.palette.secondary[200]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{from:'color'}}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from:'color',
                modifiers:[["darker",2]]
            }}
            legends={[
                {
                    anchor:'bottom',
                    translateX:20,
                    translateY:50,
                    direction:'row',
                    justify:false,
                    itemsSpacing:0,
                    itemWidth:85,
                    itemHeight:18,
                    itemTextColor:'#999',
                    itemDirection:'left-to-right',
                    itemOpacity:1,
                    symbolSize:18,
                    symbolShape:'circle',
                    effects:[
                        {
                            on:'hover',
                            style:{
                                itemTextColor:theme.palette.primary[500]
                            }
                        }
                    ]
                }
            ]}


        />
  )
}

export default ChartVisualization