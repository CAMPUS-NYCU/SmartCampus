import React from 'react'
import {
    Button,
    withStyles
} from '@material-ui/core'

export default withStyles(theme=>({

}))(props=>{
    const{position,right,noShadow, className, variant, color,backgroundColor, size,children,borderRadius, ...rest}=props
    return(
        <Button
          className={className}
          variant={variant}
          size={size}
          //color={color}
          style={{
            color: color==='primary' ?'#000000'
                :color==='default'?'#686868'
                :{color},
            backgroundColor: color==='primary' ?'#FDCC4F'
                :color==='default'?'#EEEEEE'
                :{backgroundColor},
            boxShadow: noShadow==='true'
                ?'0px 0px 0px rgba(0, 0, 0, 0)'
                :'0px 2px 2px rgba(0, 0, 0, 0.12)',
            borderRadius: borderRadius,
            position:{position},
            right:{right}
            }
            }
          {...rest}
        >
            {children}
        </Button>
    )
})
