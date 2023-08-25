import React from 'react';
import "./App.scss";
import ShipCard from './ShipCard';
import {useFetchShips} from "./hooks/useFetchShips";



function App() {
    const { data, error, isLoading } = useFetchShips();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <h1 className="app-title">Star Wars</h1>
            <div>
                {data.map((ship, index) => (
                    <ShipCard key={ship.model} ship={ship} index={index} />
                ))}
            </div>
        </div>
    );
}



export default App;
