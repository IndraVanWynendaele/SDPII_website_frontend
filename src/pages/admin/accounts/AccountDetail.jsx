import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Error from '../../../components/Error';
import useSWR from 'swr';
import { get } from '../../../api/index';
import AccountProfile from '../../../components/admin/accounts/AccountProfile';

export default function AccountDetail() {
    const { id } = useParams();

    const {
        data: account = {},
        isLoading,
        error,
    } = useSWR(`dashboard/accounts/${id}`, get);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <AccountProfile account={account} />
            )}
        </div>
    );
}