import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { getPokeId } from "../services/PokeService";
import ProfileImage from "./ProfileImages";
import Info from "../types/Info";
import '../styles/Profile.scss';

interface ProfileProps {
    pokeUrl: Info;
    pageNo: number;
    hasLink?: boolean;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { pokeUrl, hasLink, pageNo } = props;
    const body = (hasLink) ?
        <Link className="router" to={(hasLink) ? `/pokemon/${pageNo}/${getPokeId(pokeUrl.url)}` : "#"}>
            {getProfile()}
        </Link> : getProfile();
    return (
        <Paper elevation={3} className="profile" >
            {body}
        </Paper>
    )
    function getProfile() {
        return (
            <> <ProfileImage url={pokeUrl.url} />
                <div className="profile-title">
                    {(pokeUrl.name.length > 12) ?
                        <Tooltip title={pokeUrl.name}>
                            <h1>{pokeUrl.name.substr(0, 10) + "..."}</h1>
                        </Tooltip> : <h1>{pokeUrl.name}</h1>}
                </div></>
        )
    }
}

export default Profile;