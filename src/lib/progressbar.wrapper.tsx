'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarWrapper = ({ children }:{ children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#fff"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};
export default ProgressBarWrapper;