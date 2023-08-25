// ShipCard.tsx
import React from 'react';

interface Ship {
    name: string;
    model: string;
    films: string[];
    crew: number;
    highestFilms: boolean;
}

interface ShipCardProps {
    ship: Ship;
    index: number;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, index }) => {
    return (
        <div className="ship-container">
            <div>
                <div className="ship-image">
                    <img alt="" src={require(`../src/static/space-ship${index <= 5 ? index + 1 : 1}.jpeg`)} />
                </div>
                <div className="ship-info">
                    <div className="ship-name">
                        {ship.highestFilms && " 🏆 "}{ship.name}
                    </div>
                    <div>{ship.model}</div>
                </div>
            </div>
            <div className="film-info">
                <label>Number of films</label>
                <p>{ship.films.length}</p>
            </div>
        </div>
    );
};

export default ShipCard;
