import AdminNotificationDetail from '../../components/admin/notifications/AdminNotificationDetail';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { get } from '../../api';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

export default function AdminNotificationDetailPage() {

    const { id } = useParams();

    const { data: notification, isLoading, error } = useSWR(`me/notifications/${id}`, get);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <AdminNotificationDetail notification={notification.notification} />
            )}

        </>
    )

}