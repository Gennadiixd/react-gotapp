import React from 'react'

export default function ErrorMessage({ error }) {
    return (
        <>
            <img src={process.env.PUBLIC_URL + './favicon.ico'} alt='error'/> 
            <span>
                Something goes wrong !
            {error}
            </span>
        </>
    )
}
