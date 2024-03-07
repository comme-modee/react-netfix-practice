import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetailPage = (id) => {
    return api.get(`/movie/${id}`)
}

export const useMovieDetailPage = (id) => {
    return useQuery({
        queryKey: ['movie-detail-page', id],
        queryFn: () => fetchMovieDetailPage(id),
        select: (result) => result.data
    })
}