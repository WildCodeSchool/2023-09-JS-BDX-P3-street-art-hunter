const accountLoader = async (apiService) => {
  try {
    const response = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/pendingImages`
    );
    return {
      userCaptures: response?.data ?? [],
    };
  } catch (err) {
    console.error(err);
    return { userCaptures: [] };
  }
};

export default accountLoader;
