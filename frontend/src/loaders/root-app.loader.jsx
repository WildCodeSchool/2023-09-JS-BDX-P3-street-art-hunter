import getStreetArt from "../services/street-art.service";

const rootAppLoader = async (apiService) => {
  if (!localStorage.getItem("token")) {
    return null;
  }
  try {
    const userData = await apiService.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`
    );
    const streetArtData = await getStreetArt(apiService);

    return {
      preloadUser: userData ?? null,
      preloadStreetArt: streetArtData ?? null,
    };
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export default rootAppLoader;
