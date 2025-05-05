export default function BookingWidget({place}) {
    return (
        <div className= "bg-white shadow p-4 rounded-2xl">
            <div className="text-center text-2xl">
                Price: ₱ {place.price} / night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className=" py-3 px-4">
                        <label>Check-in: </label>
                        <input type="date" />
                    </div>
                    <div className=" py-3 px-4 border-l">
                        <label>Check-out: </label>
                        <input type="date" />
                    </div>
                </div>
                <div className="px-4 py-3 border-t">
                    <label>Max guests: </label>
                    <input type="number" value={1}/>
                </div>
            </div>
            <button className="bg-[#F5385D] text-white py-2 px-6 rounded-full w-full mt-4">Book this place</button>
        </div>
    )
}