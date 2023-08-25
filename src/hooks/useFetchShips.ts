import {useEffect, useState} from "react";

interface Ship {
    name: string;
    model: string;
    films: string[];
    crew: number;
    highestFilms: boolean;
}

function useFetchShips() {
    const [data, setData] = useState<Ship[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/starships');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                let parseData = jsonData.results;

                parseData.forEach((ship: any) => {
                    ship.crew = parseFloat(ship.crew.replace(/,/g, ''));
                });

                parseData.forEach((ship: any) => {
                    ship.highestFilms = true;
                });
                const sortedParsedData = parseData.sort((a: { crew: number; }, b: { crew: number; }) => a.crew - b.crew);
                const filterCrewMoreThanTen = sortedParsedData.filter((ship: { crew: number; }) => ship.crew <=10);

                const shipInHighestNumberOfMovies = Math.max(...filterCrewMoreThanTen.map((ship: { films: string | any[]; }) => ship.films.length))

                filterCrewMoreThanTen.forEach((ship: any) => {
                    ship.highestFilms = ship.films.length === shipInHighestNumberOfMovies;
                });

                setData(filterCrewMoreThanTen);
                setIsLoading(false);
            } catch (error: any) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, isLoading };
}

export {useFetchShips}
