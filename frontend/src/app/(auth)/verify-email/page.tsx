import React, { Suspense } from 'react'
import VerfiyEmailForm from './VerfiyEmailForm'


const OtpPage = async () => {


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerfiyEmailForm />

        </Suspense>
    )
}

export default OtpPage
