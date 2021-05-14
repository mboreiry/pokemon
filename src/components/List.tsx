import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { limit, pokeUrl } from '../config/config';
import { fetchUrl } from '../services/PokeService';
import { Page } from '../types/Page';
import Loading from './Loading';
import Profile from './Profile';
import '../styles/List.scss'

const List: React.FC = (props) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<Page>();
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        getPage(`${pokeUrl}?limit=${limit}`);
    }, []);

    async function getPage(url: string) {
        setLoading(true);
        setPage(await fetchUrl(url));
        setLoading(false);
    }
    
    const body = (loading) ? <Loading /> :
        (page?.results?.length) ?
            <>
                {page.results.map((item, index) => {
                    return <Profile key={"poke" + index} pokeUrl={item} />
                })}
                <div>
                    <Pagination classes={{ root: 'pagination-root' }}
                        count={(page?.count) ? Math.floor(page.count / limit) : 0}
                        page={pageNo} onChange={handlePageChange} />
                </div>
            </>
            : <div className="error"> No pokemon found! try again later... </div>;
    return (
        <div className="list">
            <div className="row">
                {body}
            </div>
        </div>
    )
    function handlePageChange(event: React.ChangeEvent<unknown>, newPage: number) {
        setPageNo(newPage)
        getPage(`${pokeUrl}?offset=${(newPage) * limit}&limit=${limit}`);
    }
}
export default List;





