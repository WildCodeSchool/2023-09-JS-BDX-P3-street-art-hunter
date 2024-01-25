const getStreetArt = async (apiService) => {
  try {
    const data = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/streetart`
    );
    return { streetArtData: data ?? null };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default getStreetArt;
