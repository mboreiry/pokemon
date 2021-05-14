import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { getPokeId } from "../services/PokeService";
import ProfileImage from "./ProfileImages";
import Info from "../types/Info";
import '../styles/Profile.scss';

interface ProfileProps {
    pokeUrl: Info;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { pokeUrl } = props;

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" >
            <Paper elevation={3} className="profile" >
                <ProfileImage url={pokeUrl.url} />
                <div className="profile-title">
                    <Link className="router" to={`/pokemon/${getPokeId(pokeUrl.url)}`}>
                        {(pokeUrl.name.length > 12) ?
                            <Tooltip title={pokeUrl.name}>
                                <h1>{pokeUrl.name.substr(0, 10) + "..."}</h1>
                            </Tooltip> : <h1>{pokeUrl.name}</h1>}
                    </Link>
                </div>
            </Paper>
        </div>
    )
}

export default Profile;