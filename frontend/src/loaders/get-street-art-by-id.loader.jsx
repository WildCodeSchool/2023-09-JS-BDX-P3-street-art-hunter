const getStreetArtByIdLoader = async (apiService, id) => {
  const loaderData = { streetArt: null };
  try {
    const response = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/streetart/${id}`
    );

    loaderData.streetArt = response.data;
  } catch (err) {
    console.error(err);
  }

  return loaderData;
};

export default getStreetArtByIdLoader;
