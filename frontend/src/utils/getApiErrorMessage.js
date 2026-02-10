export const getApiErrorMessage = (error, fallbackMessage) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors[0].msg || fallbackMessage;
  }

  if (error?.code === 'ERR_NETWORK') {
    return 'Cannot connect to backend (http://localhost:5000). Start backend server and check it is running.';
  }

  return fallbackMessage;
};
