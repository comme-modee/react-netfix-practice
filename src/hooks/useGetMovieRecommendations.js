import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendations = (id) => {
    return api.get(`/movie/${id}/recommendations`)
}

export const useMovieRecommendations = (id) => {
    return useQuery({
        queryKey: ['movie-recommendations'],
        queryFn: () => fetchRecommendations(id),
        select: (result) => result.data.results
    })
}