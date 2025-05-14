export default function AddressLink({children, className=null}) {
    //  This component creates a link to Google Maps with the provided address
    //  It uses the children prop to display the address
    if (!className) {
        // If no className is provided, set a default className
        className = 'my-2 block'
    }
    //  If the className is not null, append additional classes
    className += ' flex gap-1 underline font-bold'

    return (
        //  The link opens in a new tab and uses Google Maps to display the address
        <a className={className} target="_blank" href={'https://maps.google.com/?q='+children}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {children}
        </a>
    );
}