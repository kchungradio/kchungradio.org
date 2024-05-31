export const parseErrorObject = (error) => {
  if (error.response) {
    return {
      status: error.response.data.error.code,
      message: error.response.data.error.message,
    }
  }
  return null
}
