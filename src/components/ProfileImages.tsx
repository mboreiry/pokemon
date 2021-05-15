import { useState, useEffect } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { getPokeId, getPokeImage } from "../services/PokeService";
import defaultImg from '../images/pokemon.png';
import '../styles/ProfileImage.scss';

interface ProfileProps {
    url: string;
    size?: string;
}

const ProfileImage: React.FC<ProfileProps> = (props) => {
    const { url, size } = props;
    const [pokeImg, setPokeImg] = useState<string | undefined>();

    useEffect(() => {
        (async function fetchImg() {
            const tmpImg = await getPokeImage(getPokeId(url));
            setPokeImg(tmpImg);
            // check image => if the image dose not exist on the server show the default image
            const img = new Image();
            img.src = tmpImg;
            img.onerror = () => {
                setPokeImg(defaultImg);
            };
        })();
    }, [])

    return (
        <div className={(size === "sm") ? "profile-sm" : "profile-md"}>
            {(pokeImg) ?
                <img alt="pokemon" loading="lazy" src={pokeImg} />
                : <Skeleton variant="rect" width="100%" height={(size === "sm") ? "100px" : "150px"} />
            }
        </div>
    )
}

export default ProfileImage;