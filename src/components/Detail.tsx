import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { pokeUrl } from '../config/config';
import { fetchUrl } from '../services/PokeService';
import Pokemon from '../types/Pokemon';
import Profile from './Profile';
import Evolutions from './Evolutions';
import Loading from './Loading';
import '../styles/Detail.scss';
import Feature from './Feature';

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
                            <Feature title="Abilities" featureName="ability" feature={pokemon.abilities} />
                            <Feature title="Types" featureName="type" feature={pokemon.types} />
                            <Feature title="Stats" featureName="stat" feature={pokemon.stats} />
                            <Feature title="Moves" featureName="move" feature={pokemon.moves} showAsText={true} />
                            <Feature title="Evolutions" featureName="" feature={[]} showAsText={true} />
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
                Something wrong occurred while loading the page!
                Please back to Main page and try again
            </div>;

    return (
        <div>
            {body}
        </div>
    )
}

export default Detail;
