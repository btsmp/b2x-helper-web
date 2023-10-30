import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Notify() {

  return (
    <ToastContainer
      theme="light"
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnHover={false}
    />
  );
}