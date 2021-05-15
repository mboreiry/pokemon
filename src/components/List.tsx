import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { limit, pokeUrl } from '../config/config';
import { fetchUrl } from '../services/PokeService';
import { Page } from '../types/Page';
import Loading from './Loading';
import Profile from './Profile';
import '../styles/List.scss'

interface ListParams {
    pageNo: string;
}

const List: React.FC = (props) => {
    const routeMatch = useRouteMatch<ListParams>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<Page>();
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        const urlPageNo = parseInt(routeMatch.params.pageNo);
        let url = `${pokeUrl}?limit=${limit}`;
        if (!isNaN(urlPageNo)) {
            setPageNo(urlPageNo);
            url = `${pokeUrl}?offset=${(urlPageNo - 1) * limit}&limit=${limit}`;
        }
        getPage(url);
    }, [pageNo]);

    async function getPage(url: string) {
        setLoading(true);
        setPage(await fetchUrl(url));
        setLoading(false);
    }

    const body = (loading) ? <Loading /> :
        (page?.results?.length) ?
            <>
                {page.results.map((item, index) => {
                    return <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" >
                        <Profile key={"poke" + index} pokeUrl={item} pageNo={pageNo} hasLink={true} />
                    </div>
                })}
                <div>
                    <Pagination classes={{ root: 'pagination-root' }}
                        count={(page?.count) ? Math.ceil(page.count / limit) : 0}
                        page={pageNo} onChange={handlePageChange} />
                </div>
            </>
            : <div className="error" data-test="error"> No pokemon found! try again later... </div>;
    return (
        <div className="list">
            <div className="row">
                {body}
            </div>
        </div>
    )
    function handlePageChange(event: React.ChangeEvent<unknown>, newPage: number) {
        setPageNo(newPage);
        history.push(`/page/${newPage}`);
    }
}
export default List;





