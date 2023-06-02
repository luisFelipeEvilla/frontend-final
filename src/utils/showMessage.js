import Swal from 'sweetalert2';

const showMessage = (title, icon, confirmButtonText) => {
    Swal.fire({
        title,
        icon,
        confirmButtonText
    });
}

export default showMessage;