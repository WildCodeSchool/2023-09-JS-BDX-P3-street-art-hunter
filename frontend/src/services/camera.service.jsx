class CameraService {
  #apiService = null;

  constructor(apiService) {
    this.apiService = apiService;
  }

  async fetchPendingImageData(path, user, userLocation, getDate, getTime) {
    try {
      await this.#apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/pendingImages/`,
        {
          userId: user.id,
          imgSrc: path,
          uploadDate: getDate(),
          uploadTime: getTime(),
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          streetArtId: 27,
          status: "pending",
        }
      );
    } catch (error) {
      console.error("Erreur lors de la requête Axios:", error);
    }
  }
}

export default CameraService;
