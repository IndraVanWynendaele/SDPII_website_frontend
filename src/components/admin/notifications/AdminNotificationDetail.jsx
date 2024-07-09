import SignUpReview from './signup/SignUpReview';
import EditReview from './edit/EditReview';

export default function AdminNotificationDetail({ notification }) {

    return (
        <>
            <h2 className="centerheading" data-cy="adminNotifDetail">Notification: {notification.text}</h2>
            {notification.notificationType.id === 1 ? <SignUpReview details={notification} /> : <EditReview details={notification} />}
        </>
    )
}