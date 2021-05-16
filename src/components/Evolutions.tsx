
import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { pokeUrl } from '../config/config';
import { fetchUrl, getSpecies } from '../services/PokeService';
import Pokemon from '../types/Pokemon';
import Profile from './Profile';
import '../styles/Evolution.scss';

interface IEvolutionsProp {
    pokemon: Pokemon;
    pageNo: number;
}

const Evolutions: React.FC<IEvolutionsProp> = (props) => {
    const { pokemon, pageNo } = props;
    const [evolutions, setEvolutions] = useState<Pokemon[]>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const species = await getSpecies(pokemon.id);
            // get evolution chain from where, we can get evolution ids
            const evolutionChain = await fetchUrl(species?.evolution_chain?.url);
            // load evolution pokemons by evolutionIds from the chain
            const pokeEvolution = await getEvolutions(getEvIds(evolutionChain?.chain));
            // sort them from the child to adult
            setEvolutions(pokeEvolution?.sort() ?? undefined);
            setIsLoaded(true);
        })();
    }, [])

    function getEvIds(poke: any): number[] {
        // get pokemon evolution Ids
        let ids: number[] = [];
        if (poke) {
            const url = poke?.species.url.substr(0, poke?.species.url.length - 1);
            ids.push(+url.substr(url.lastIndexOf('/') + 1));
            const evolution = poke?.evolves_to;
            for (var i = 0; i < evolution.length; i++) {
                ids = ids.concat(getEvIds(evolution[i]));
            }
        }
        return ids;
    }
    async function getEvolutions(ids: number[]) {
        // get pokemon Evolution objects
        if (!ids?.length) {
            return null;
        }
        let evList: Pokemon[] = [];
        for (const id of ids) {
            const newPokemon = await fetchUrl(`${pokeUrl}/${id}`);
            evList.push(newPokemon);
        }
        return evList;
    }
    const body = (isLoaded) ?
        (evolutions?.length) ? <div className="grid-container">
            {evolutions?.map((ev, index) => {
                return <Profile key={"ev" + index} pokeUrl={{ name: ev.name, url: `${pokeUrl}/${ev.id}` }} size="sm" pageNo={pageNo} />
            })} </div> : <div className="error"> No evaluation found !</div>
        : <Skeleton variant="rect" width="100%" height={200} />;
    return (
        <div className="evolution">
            {body}
        </div>
    )
}

export default Evolutions;





