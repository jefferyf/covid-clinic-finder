/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Grid from '@mui/material/Grid'

const VerticalPattern = () => {
  return (
    <Grid item xs={2} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
      <img
        src="/pattern.png"
        alt="pattern"
        width="102"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      ></img>
    </Grid>
  )
}

export default VerticalPattern
