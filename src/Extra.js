export default function Extra(props) {
    let items =props.items.map((item,index) => {
        console.log(props.values[index])
        return (<>
            <div>
                <h2>{item}</h2>
                <h6>{props.values[index]}</h6>
            </div>
            {index!==props.items.length-1 && <div className="vl"></div>}
        </>)
    })
    return (
        <div className="section">
            {items}
        </div>
    )
}
