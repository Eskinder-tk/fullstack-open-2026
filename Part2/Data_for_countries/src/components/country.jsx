
const Country = ({ countries , search , showHandler }) => {

    const countriesToShow = countries.filter( item => item.name.common.toLowerCase().includes(search.toLowerCase()) )

    if (countriesToShow.length < 10 && countriesToShow.length > 1) {
        return (
         <div>
            
            { countriesToShow.map(country => <p key={country.capital}>{country.name.common} : 
                                        <button onClick={(event) => { showHandler(event, country.name.common)} }>Show</button>    </p> 
            )}  
            
         </div>
    )} 
    
    else if (countriesToShow.length === 1 ) {


        return (
         <div>
                <h1>{countriesToShow[0].name.common}</h1>

                <p>Capital : {countriesToShow[0].capital}</p>

                <p>Area : {countriesToShow[0].area}</p>


                <h1>Languages</h1>

                <ul>
                    {Object.values(countriesToShow[0].languages).map(lan => <li key={lan}>{lan}</li>)}
                </ul>

                <img src={countriesToShow[0].flags.png}/>
        </div>
    )}
    
    else {
        return <div><p>Too many matches, please specify your search.</p></div>
    }
}

export default Country