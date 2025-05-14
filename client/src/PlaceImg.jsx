export default function PlaceImg({place, index=0,className=null}) {
    //  This component displays an image of a place
    if (!place.photos?.length) {
        //  If there are no photos, return an empty string
        return '';
    }
    if (!className) {
        //  If no className is provided, set a default className
        className = 'object-cover'
    }
    //  If the className is not null, append additional classes
    return (
        <img className={className} src={place.photos.length > 0 && place.photos[index].startsWith('http') ? place.photos[index] : `http://localhost:4000/uploads/${place.photos[index]}`} alt="" />
    )
}