import '../../../css/admin.css';
import { get } from "../../../api/index";
import useSWR from "swr";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import AccountsTable from "../../../components/admin/accounts/AccountsTable";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Suppliers() {
    const [page, setPage] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    let filters = location.pathname + location.search;
    filters = filters.substring(1);

    const {
        data: accounts = [], isLoading, error
    } = useSWR(filters === null ? `admin/accounts?page=${page}` : `${filters}`, get);

    useEffect(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", page.toString());
        navigate({ search: queryParams.toString() });
        setButtonClicked(false);
    }, [buttonClicked, page]);

    return (
        <>
            <h1>Businesses</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <>
                    <AccountsTable accounts={accounts} />
                    <div className="productencentreren">
                        <div className="productenPaginas">
                            <Stack spacing={2} className="wit">
                                <Pagination
                                    page={accounts.meta.currentPage}
                                    count={accounts.meta.lastPage}
                                    shape="rounded"
                                    onChange={handleChangePage}
                                />
                            </Stack>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}