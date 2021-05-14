import LinearProgress from '@material-ui/core/LinearProgress';
import pokegif from '../images/pokegif.gif';
import '../styles/Loading.scss';

const Loading: React.FC = (props) => {
    return (
        <div className="loading">
            <div className="loading-center">
                <div className="loading-title">
                    Loading Pokemons...
                <div><img alt="pokemon" src={pokegif} /></div>
                </div>
                <LinearProgress />
            </div>
        </div>
    )
}

export default Loading;
