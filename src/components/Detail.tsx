import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { useRouteMatch, Link } from 'react-router-dom';
import { pokeUrl } from '../config/config';
import { fetchUrl } from '../services/PokeService';
import Info from '../types/Info';
import Pokemon from '../types/Pokemon';
import Profile from './Profile';
import Evolutions from './Evolutions';
import Loading from './Loading';
import '../styles/Detail.scss';

interface PokemonParams {
    pokeId: string;
    pageNo: string;
}

const Detail: React.FC = (props) => {
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState<Pokemon>();
    const routeMatch = useRouteMatch<PokemonParams>();
    const pageNo = parseInt(routeMatch.params.pageNo);
    const pokeId = parseInt(routeMatch.params.pokeId);
    
    useEffect(() => {
        (async () => {
            setLoading(true)
            setPokemon(await fetchUrl(`${pokeUrl}/${pokeId}`));
            setLoading(false)
        })();
    }, []);

    const body = (loading) ? <Loading /> :
        (pokemon) ?
            <div className="detail" data-test="poke-image">
                <div className="row">
                    <div className="col-md-4 col-sm-12" >
                        <Profile pokeUrl={{ name: pokemon.name, url: `${pokeUrl}/${pokeId}` }} pageNo={pageNo} />
                    </div>
                    <div className="col-md-8 col-sm-12" style={{ paddingLeft: 24 }}>
                        <br />
                        <div className="detail-features">
                            <div className="detail-title">
                                <span className="bullet">&#8226;</span>Abilities:
                            </div>
                            <div>
                                {pokemon.abilities.map((item: { ability: Info }) =>
                                    <Chip key={item.ability.name} color="primary" label={item.ability.name} variant="outlined" />)}
                            </div>
                            <div className="detail-title">
                                <span className="bullet">&#8226;</span>Types:
                            </div>
                            <div>
                                {pokemon.types.map((item: { type: Info }) =>
                                    <Chip key={item.type.name} color="primary" label={item.type.name} variant="outlined" />)}
                            </div>
                            <div className="detail-title">
                                <span className="bullet">&#8226;</span> Stats:
                            </div>
                            <div>
                                {pokemon.stats.map((item: { stat: Info }) =>
                                    <Chip key={item.stat.name} color="primary" label={item.stat.name} variant="outlined" />)}
                            </div>
                            <div className="detail-title">
                                <span className="bullet">&#8226;</span>Moves:
                            </div>
                            <div className="detail-moves">
                                {(pokemon.moves.map((item: { move: Info }) => item.move.name + ", "))}
                            </div>
                            <div className="detail-title">
                                <span className="bullet">&#8226;</span>Evolutions:
                            </div>
                            <div>
                                <Evolutions pokemon={pokemon} pageNo={pageNo} />
                            </div>
                        </div>
                        <div className="back">
                            <Link className="router" to={`/page/${pageNo}`}>
                                &#8249; Back to pokemon list
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="error" data-test="error">
                Something wrong occured while loading the page!
                Please back to Main page and try again
            </div>;

    return (
        <div>
            {body}
        </div>
    )
}

export default Detail;
